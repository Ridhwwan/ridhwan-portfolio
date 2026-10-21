import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "stats" }>;

/** Accent numbers in outlined cards, then an optional note with an accent edge. */
export default function Stats({ items, note }: P) {
  return (
    <>
      <dl className={s.statCards} style={{ "--n": Math.min(items.length, 4) } as React.CSSProperties}>
        {items.map((it) => (
          <div key={it.label} className={s.statCard}>
            <dt>{it.value}</dt>
            <dd>
              <span>{it.label}</span>
              {it.text && <small>{it.text}</small>}
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className={s.note}>{note}</p>}
    </>
  );
}
