"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { TOKEN_MAP, toCss, validate } from "@/lib/design-tokens";
import { isUnlocked, lock as lockAction, saveTokens } from "@/app/design-system/actions";
import { visitorTokens } from "@/lib/visitor-tokens";

/**
 * Holds the working copy of every token while someone edits the design system.
 *
 * - Any change previews instantly by writing the CSS variable onto <html>.
 * - When unlocked, valid changes auto-save to Notion a few seconds after the
 *   last edit (or on "Save now"), then the live site refreshes.
 * - When locked, changes are the visitor's own: they apply across the whole
 *   site while they browse, and vanish when they reload or leave.
 *
 * The lock state is fetched from the browser after load, so these pages stay
 * statically prerendered (reading cookies on the server would make them dynamic).
 */

type SaveState = "idle" | "pending" | "saving" | "saved" | "error";

type Ctx = {
  values: Record<string, string>;
  saved: Record<string, string>;
  unlocked: boolean;
  dirty: string[];
  invalid: string[];
  autosave: boolean;
  setAutosave: (on: boolean) => void;
  state: SaveState;
  error: string | null;
  set: (name: string, value: string) => void;
  saveNow: () => Promise<void>;
  reset: () => void;
  markUnlocked: () => void;
  lock: () => Promise<void>;
};

const EditorContext = createContext<Ctx | null>(null);
export const useEditor = () => {
  const c = useContext(EditorContext);
  if (!c) throw new Error("useEditor must be used inside EditorProvider");
  return c;
};

const AUTOSAVE_MS = 2500;

function paint(name: string, value: string) {
  const def = TOKEN_MAP.get(name);
  if (!def) return;
  const v = validate(def, value);
  if (v !== null) document.documentElement.style.setProperty(name, toCss(def, v));
}

export default function EditorProvider({ initial, children }: { initial: Record<string, string>; children: React.ReactNode }) {
  const [saved, setSaved] = useState(initial);
  // Start from any changes this visitor already made earlier in the visit.
  const [values, setValues] = useState(() => ({ ...initial, ...visitorTokens.entries() }));
  const [unlocked, setUnlocked] = useState(false);
  const [autosave, setAutosave] = useState(true);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs always hold the latest state, so a delayed auto-save never sends stale values.
  const valuesRef = useRef(values);
  const savedRef = useRef(saved);
  useEffect(() => { valuesRef.current = values; }, [values]);
  useEffect(() => { savedRef.current = saved; }, [saved]);

  useEffect(() => {
    isUnlocked().then(setUnlocked).catch(() => {});
  }, []);

  const dirty = useMemo(() => Object.keys(values).filter((k) => values[k] !== saved[k]), [values, saved]);
  const invalid = useMemo(
    () => dirty.filter((k) => { const d = TOKEN_MAP.get(k); return !d || validate(d, values[k]) === null; }),
    [dirty, values],
  );

  const commit = useCallback(async () => {
    const cur = valuesRef.current;
    const base = savedRef.current;
    // Only valid edits are sent; half-typed values (e.g. "#12") wait until they're complete.
    const changes: Record<string, string> = {};
    for (const k of Object.keys(cur)) {
      if (cur[k] === base[k]) continue;
      const d = TOKEN_MAP.get(k);
      const v = d ? validate(d, cur[k]) : null;
      if (v !== null) changes[k] = v;
    }
    if (!Object.keys(changes).length) { setState("idle"); return; }
    setState("saving");
    setError(null);
    const res = await saveTokens(changes);
    if (res.ok) {
      setSaved((s) => ({ ...s, ...changes }));
      for (const k of Object.keys(changes)) visitorTokens.delete(k);
      setState("saved");
      setTimeout(() => setState((s) => (s === "saved" ? "idle" : s)), 2500);
    } else {
      setState("error");
      setError(res.error ?? "Couldn't save.");
      if (res.error === "Unlock editing first.") setUnlocked(false);
    }
  }, []);

  const schedule = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setState("pending");
    timer.current = setTimeout(() => void commit(), AUTOSAVE_MS);
  }, [commit]);

  const set = useCallback(
    (name: string, value: string) => {
      setValues((v) => ({ ...v, [name]: value }));
      paint(name, value);
      if (value === savedRef.current[name]) visitorTokens.delete(name);
      else visitorTokens.set(name, value);
      if (unlocked && autosave) schedule();
    },
    [unlocked, autosave, schedule],
  );

  const saveNow = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    await commit();
  }, [commit]);

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    const base = savedRef.current;
    for (const k of Object.keys(base)) paint(k, base[k]);
    visitorTokens.reset();
    setValues(base);
    setState("idle");
    setError(null);
  }, []);

  const lock = useCallback(async () => {
    await lockAction();
    setUnlocked(false);
  }, []);

  // Turning auto-save on (or unlocking) with edits already waiting schedules them.
  const hasPending = () => Object.keys(valuesRef.current).some((k) => valuesRef.current[k] !== savedRef.current[k]);
  const toggleAutosave = (on: boolean) => {
    setAutosave(on);
    if (on && unlocked && hasPending()) schedule();
    if (!on && timer.current) { clearTimeout(timer.current); setState("idle"); }
  };
  const markUnlocked = () => {
    setUnlocked(true);
    if (autosave && hasPending()) schedule();
  };

  // Warn the owner before leaving with edits that haven't been saved.
  // Visitors' edits are meant to vanish when they leave, so they get no warning.
  useEffect(() => {
    if (!dirty.length || !unlocked) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty.length, unlocked]);

  const ctx: Ctx = {
    values, saved, unlocked, dirty, invalid, autosave, setAutosave: toggleAutosave, state, error,
    set, saveNow, reset, markUnlocked, lock,
  };
  return <EditorContext.Provider value={ctx}>{children}</EditorContext.Provider>;
}
