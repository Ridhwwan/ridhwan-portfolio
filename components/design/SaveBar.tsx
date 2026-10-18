"use client";

import { useEditor } from "./EditorProvider";
import styles from "./design.module.css";

const STATUS: Record<string, string> = {
  idle: "",
  pending: "Auto-saving shortly…",
  saving: "Saving…",
  saved: "Saved — live on the site",
  error: "",
};

/** Sticks to the bottom while there are changes: save now, discard, auto-save toggle. */
export default function SaveBar() {
  const { unlocked, dirty, autosave, setAutosave, state, error, saveNow, reset } = useEditor();
  if (!dirty.length && state !== "saved") return null;

  return (
    <div className={styles.saveBar} role="region" aria-label="Unsaved changes">
      <div className={styles.saveWrap}>
        <span className={styles.saveCount}>
          {dirty.length ? `${dirty.length} change${dirty.length > 1 ? "s" : ""}` : ""}
          {unlocked ? (
            <span className={styles.saveNote}>{error ?? STATUS[state]}</span>
          ) : (
            <span className={styles.saveNote}>Preview only — unlock to save for everyone</span>
          )}
        </span>
        <div className={styles.saveActions}>
          {unlocked && (
            <label className={styles.autosave}>
              <input type="checkbox" checked={autosave} onChange={(e) => setAutosave(e.target.checked)} />
              Auto-save
            </label>
          )}
          <button type="button" className="btn btn-outline" onClick={reset} disabled={!dirty.length}>Discard</button>
          {unlocked && (
            <button type="button" className="btn" onClick={() => void saveNow()} disabled={!dirty.length || state === "saving"}>
              {state === "saving" ? "Saving…" : "Save now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
