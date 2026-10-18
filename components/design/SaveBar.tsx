"use client";

import { useEditor } from "./EditorProvider";
import styles from "./design.module.css";

const STATUS: Record<string, string> = {
  idle: "",
  pending: "Auto-saving in a moment…",
  saving: "Saving…",
  saved: "Saved. Live on the site.",
  error: "",
};

/** Sticks to the bottom while there are changes: save now, discard, auto-save toggle. */
export default function SaveBar() {
  const { unlocked, dirty, invalid, autosave, setAutosave, state, error, saveNow, reset } = useEditor();
  if (!dirty.length && state !== "saved") return null;

  const n = dirty.length;
  let note = unlocked ? (error ?? STATUS[state]) : "Preview in this browser only. Unlock to save it for everyone.";
  if (unlocked && invalid.length && state !== "saving") note = `${invalid.length} value${invalid.length > 1 ? "s aren't" : " isn't"} valid yet and won't be saved.`;

  return (
    <div className={styles.saveBar} role="region" aria-label="Unsaved changes">
      <div className={styles.saveWrap}>
        <span className={styles.saveCount}>
          {n ? `${n} unsaved change${n > 1 ? "s" : ""}` : "All changes saved"}
          <span className={styles.saveNote} aria-live="polite" data-error={state === "error" || undefined}>{note}</span>
        </span>
        <div className={styles.saveActions}>
          {unlocked && (
            <label className={styles.autosave}>
              <input type="checkbox" checked={autosave} onChange={(e) => setAutosave(e.target.checked)} />
              Auto-save
            </label>
          )}
          <button type="button" className="btn btn-outline" onClick={reset} disabled={!n}>Discard</button>
          {unlocked && (
            <button type="button" className="btn" onClick={() => void saveNow()} disabled={!n || state === "saving"}>
              {state === "saving" ? "Saving…" : "Save now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
