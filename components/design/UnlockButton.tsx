"use client";

import { useActionState, useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { unlock } from "@/app/design-system/actions";
import { useEditor } from "./EditorProvider";
import styles from "./design.module.css";

/** "Unlock to edit" → password form. Once unlocked, offers "Lock" to end the session. */
export default function UnlockButton() {
  const { unlocked, markUnlocked, lock } = useEditor();
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    async (prev: unknown, fd: FormData) => {
      const res = await unlock(prev, fd);
      if (res.ok) { markUnlocked(); setOpen(false); }
      return res;
    },
    null as null | { ok: boolean; error?: string },
  );

  if (unlocked) {
    return (
      <div className={styles.unlock}>
        <span className={styles.lockTag}><Unlock aria-hidden size={14} /> Editing unlocked</span>
        <button type="button" className={styles.textBtn} onClick={() => void lock()}>Lock</button>
      </div>
    );
  }

  return (
    <div className={styles.unlock}>
      {open ? (
        <form action={action} className={styles.unlockForm}>
          <input type="password" name="password" placeholder="Edit password" autoFocus className={styles.hex} aria-label="Edit password" />
          <button type="submit" className="btn" disabled={pending}>{pending ? "Checking…" : "Unlock"}</button>
          {state && !state.ok && <span className={styles.unlockError} role="alert">{state.error}</span>}
        </form>
      ) : (
        <button type="button" className="btn btn-outline" onClick={() => setOpen(true)}>
          <Lock aria-hidden size={15} /> Unlock to edit
        </button>
      )}
    </div>
  );
}
