"use client";

import { useActionState, useState } from "react";
import { unlock } from "@/app/design-system/actions";
import styles from "./design.module.css";

/** Shows "Unlock to edit"; opens a small password form. On success, reloads so the server marks the session unlocked. */
export default function UnlockButton({ unlocked }: { unlocked: boolean }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    async (prev: unknown, fd: FormData) => {
      const res = await unlock(prev, fd);
      if (res.ok) window.location.reload();
      return res;
    },
    null as null | { ok: boolean; error?: string },
  );

  if (unlocked) return <span className={styles.lockTag}>Editing unlocked</span>;

  return (
    <div className={styles.unlock}>
      {open ? (
        <form action={action} className={styles.unlockForm}>
          <input type="password" name="password" placeholder="Edit password" autoFocus className={styles.hex} aria-label="Edit password" />
          <button type="submit" className="btn" disabled={pending}>{pending ? "…" : "Unlock"}</button>
          {state && !state.ok && <span className={styles.unlockError}>{state.error}</span>}
        </form>
      ) : (
        <button type="button" className="btn btn-outline" onClick={() => setOpen(true)}>Unlock to edit</button>
      )}
    </div>
  );
}
