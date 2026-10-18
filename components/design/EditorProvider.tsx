"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { TOKEN_MAP, toCss, validate } from "@/lib/design-tokens";
import { saveTokens } from "@/app/design-system/actions";

/**
 * Holds the working copy of every token while someone edits the design system.
 *
 * - Any change previews instantly by writing the CSS variable onto <html>.
 * - When unlocked, changes auto-save to Notion a few seconds after you stop,
 *   and a bar lets you save now or discard.
 * - When locked, changes stay as a local preview only (nobody else sees them).
 */

type SaveState = "idle" | "pending" | "saving" | "saved" | "error";

type Ctx = {
  values: Record<string, string>;
  defaults: Record<string, string>;
  unlocked: boolean;
  dirty: string[];
  autosave: boolean;
  setAutosave: (on: boolean) => void;
  state: SaveState;
  error: string | null;
  set: (name: string, value: string) => void;
  saveNow: () => Promise<void>;
  reset: () => void;
};

const EditorContext = createContext<Ctx | null>(null);
export const useEditor = () => {
  const c = useContext(EditorContext);
  if (!c) throw new Error("useEditor must be used inside EditorProvider");
  return c;
};

const AUTOSAVE_MS = 2500;

export default function EditorProvider({
  initial,
  unlocked,
  children,
}: {
  initial: Record<string, string>;
  unlocked: boolean;
  children: React.ReactNode;
}) {
  const [saved, setSaved] = useState(initial); // last persisted values
  const [values, setValues] = useState(initial); // working copy
  const [autosave, setAutosave] = useState(true);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dirty = useMemo(() => Object.keys(values).filter((k) => values[k] !== saved[k]), [values, saved]);

  // Preview: push the working value onto the live stylesheet as it changes.
  const paint = useCallback((name: string, value: string) => {
    const def = TOKEN_MAP.get(name);
    if (!def) return;
    const v = validate(def, value);
    if (v !== null) document.documentElement.style.setProperty(name, toCss(def, v));
  }, []);

  const commit = useCallback(async () => {
    const changes = Object.fromEntries(dirty.map((k) => [k, values[k]]));
    if (!Object.keys(changes).length) return;
    setState("saving");
    setError(null);
    const res = await saveTokens(changes);
    if (res.ok) {
      setSaved((s) => ({ ...s, ...changes }));
      setState("saved");
      setTimeout(() => setState((cur) => (cur === "saved" ? "idle" : cur)), 2000);
    } else {
      setState("error");
      setError(res.error ?? "Couldn't save.");
    }
  }, [dirty, values]);

  const set = useCallback(
    (name: string, value: string) => {
      setValues((v) => ({ ...v, [name]: value }));
      paint(name, value);
      if (!unlocked) return;
      if (timer.current) clearTimeout(timer.current);
      if (autosave) {
        setState("pending");
        timer.current = setTimeout(() => void commit(), AUTOSAVE_MS);
      }
    },
    [paint, unlocked, autosave, commit],
  );

  const saveNow = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    await commit();
  }, [commit]);

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    for (const k of dirty) {
      const def = TOKEN_MAP.get(k);
      if (def) document.documentElement.style.setProperty(k, toCss(def, saved[k]));
    }
    setValues(saved);
    setState("idle");
    setError(null);
  }, [dirty, saved]);

  // Warn before leaving with unsaved local changes that won't persist.
  useEffect(() => {
    if (!dirty.length) return;
    const h = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty.length]);

  const ctx: Ctx = {
    values,
    defaults: initial,
    unlocked,
    dirty,
    autosave,
    setAutosave,
    state,
    error,
    set,
    saveNow,
    reset,
  };

  return <EditorContext.Provider value={ctx}>{children}</EditorContext.Provider>;
}
