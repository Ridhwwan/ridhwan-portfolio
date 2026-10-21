import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "rows" }>;

/** Numbered moments, each with what went wrong and what changed. */
export default function Rows({ items }: P) {
  return (
    <ol className={s.rows}>
      {items.map((it, i) => (
        <li key={it.title}>
          <span className={s.lnum}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className={s.cardTitle}>{it.title}</h3>
            {it.tags && <p className={s.tags}>{it.tags.map((t) => <span key={t}>{t}</span>)}</p>}
            <p>{it.text}</p>
          </div>
          {(it.pain || it.fix) && (
            <div className={s.painFix}>
              {it.pain && <p className={s.pain}><span>Pain</span>{it.pain}</p>}
              {it.fix && <p className={s.fix}><span>Fix</span>{it.fix}</p>}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
