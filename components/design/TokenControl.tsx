"use client";

import { TOKEN_MAP, type TokenDef } from "@/lib/design-tokens";
import { useEditor } from "./EditorProvider";
import styles from "./design.module.css";

/** The right input for a token's type: swatch+hex, slider+number, or a dropdown. */
export default function TokenControl({ name }: { name: string }) {
  const def = TOKEN_MAP.get(name);
  const { values, set } = useEditor();
  if (!def) return null;
  const value = values[name] ?? def.default;

  return (
    <div className={styles.control}>
      <div className={styles.controlHead}>
        <label htmlFor={`t-${name}`} className={styles.controlLabel}>{def.label}</label>
        <code className={styles.var}>{name}</code>
      </div>
      <Input def={def} value={value} onChange={(v) => set(name, v)} />
      <p className={styles.controlDesc}>{def.description}</p>
    </div>
  );
}

function Input({ def, value, onChange }: { def: TokenDef; value: string; onChange: (v: string) => void }) {
  if (def.type === "color") {
    return (
      <div className={styles.colorRow}>
        <input
          type="color"
          value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className={styles.swatch}
          aria-label={def.label}
        />
        <input
          type="text"
          id={`t-${def.name}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.hex}
          spellCheck={false}
        />
      </div>
    );
  }

  if (def.type === "select" || def.type === "font") {
    return (
      <select id={`t-${def.name}`} value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
        {def.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  // length or number
  return (
    <div className={styles.rangeRow}>
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={Number(value)}
        onChange={(e) => onChange(e.target.value)}
        className={styles.range}
        aria-label={def.label}
      />
      <input
        type="number"
        id={`t-${def.name}`}
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.number}
      />
      <span className={styles.unit}>{def.type === "length" ? def.unit : ""}</span>
    </div>
  );
}
