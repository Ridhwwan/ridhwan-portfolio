"use client";

import styles from "./FilterChips.module.css";

type Props = {
  label: string; // accessible name for the group
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

/** A single-choice row of pill buttons, used to filter lists. */
export default function FilterChips({ label, options, value, onChange }: Props) {
  return (
    <div className={styles.row} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={styles.chip}
          aria-pressed={o === value}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
