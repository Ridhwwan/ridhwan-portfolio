"use client";

import { TOKEN_MAP, validate, type TokenDef } from "@/lib/design-tokens";
import { useEditor } from "./EditorProvider";
import styles from "./design.module.css";

/** The right input for a token's type, plus unsaved / invalid / reset-to-default states. */
export default function TokenControl({ name }: { name: string }) {
  const def = TOKEN_MAP.get(name);
  const { values, saved, set } = useEditor();
  if (!def) return null;
  const value = values[name] ?? def.default;
  const changed = value !== saved[name];
  const bad = validate(def, value) === null;
  const atDefault = value === def.default;

  return (
    <div className={styles.control} data-changed={changed || undefined}>
      <div className={styles.controlHead}>
        <label htmlFor={`t-${name}`} className={styles.controlLabel}>
          {def.label}
          {changed && <span className={styles.dot} title="Unsaved change" aria-label="unsaved" />}
        </label>
        <code className={styles.var}>{name}</code>
      </div>
      <Input def={def} value={value} bad={bad} onChange={(v) => set(name, v)} />
      {bad && <p className={styles.badNote} role="alert">{hint(def)}</p>}
      <p className={styles.controlDesc}>{def.description}</p>
      {!atDefault && (
        <button type="button" className={styles.textBtn} onClick={() => set(name, def.default)}>
          Reset to default ({def.default}{def.type === "length" ? def.unit : ""})
        </button>
      )}
    </div>
  );
}

function hint(def: TokenDef) {
  if (def.type === "color") return "Use a hex colour like #1a1a1a.";
  if (def.type === "length" || def.type === "number") return `Use a number from ${def.min} to ${def.max}.`;
  return "Pick one of the options.";
}

function Input({ def, value, bad, onChange }: { def: TokenDef; value: string; bad: boolean; onChange: (v: string) => void }) {
  if (def.type === "color") {
    return (
      <div className={styles.colorRow}>
        <input
          type="color"
          value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className={styles.swatch}
          aria-label={`${def.label} picker`}
        />
        <input type="text" id={`t-${def.name}`} value={value} onChange={(e) => onChange(e.target.value)} className={styles.hex} aria-invalid={bad} spellCheck={false} />
      </div>
    );
  }

  if (def.type === "select" || def.type === "font") {
    return (
      <select id={`t-${def.name}`} value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
        {def.options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  }

  const n = Number(value);
  return (
    <div className={styles.rangeRow}>
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={Number.isFinite(n) ? n : Number(def.default)}
        onChange={(e) => onChange(e.target.value)}
        className={styles.range}
        aria-label={`${def.label} slider`}
      />
      <input type="number" id={`t-${def.name}`} min={def.min} max={def.max} step={def.step} value={value} onChange={(e) => onChange(e.target.value)} className={styles.number} aria-invalid={bad} />
      <span className={styles.unit}>{def.type === "length" ? def.unit : ""}</span>
    </div>
  );
}
