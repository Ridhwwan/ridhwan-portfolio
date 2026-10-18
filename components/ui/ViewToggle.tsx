"use client";

import { LayoutGrid, List } from "lucide-react";
import styles from "./ViewToggle.module.css";

export type View = "list" | "grid";

/** Two-button switch between a list and a grid layout. */
export default function ViewToggle({ value, onChange }: { value: View; onChange: (v: View) => void }) {
  return (
    <div className={styles.toggle} role="group" aria-label="Layout">
      <button type="button" aria-pressed={value === "list"} onClick={() => onChange("list")} title="List">
        <List aria-hidden size={18} strokeWidth={1.75} />
        <span className={styles.sr}>List</span>
      </button>
      <button type="button" aria-pressed={value === "grid"} onClick={() => onChange("grid")} title="Grid">
        <LayoutGrid aria-hidden size={18} strokeWidth={1.75} />
        <span className={styles.sr}>Grid</span>
      </button>
    </div>
  );
}
