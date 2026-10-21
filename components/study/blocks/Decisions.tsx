import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "decisions" }>;

/** Numbered cards joined into one 2-up grid. */
export default function Decisions({ label, items }: P) {
  return (
    <div className={s.blockGap}>
      {label && <p className={s.mini}>{label}</p>}
      <ol className={s.joined}>
        {items.map((it, i) => (
          <li key={it.title}>
            <span className={s.lnum}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={s.cardTitle}>{it.title}</h3>
            <p>{it.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
