import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "archetypes" }>;

/** People the work was designed for: initials, a line in their words, who they are. */
export default function Archetypes({ label, items }: P) {
  return (
    <div className={s.blockGap}>
      {label && <p className={s.mini}>{label}</p>}
      <ul className={s.archetypes} style={{ "--n": Math.min(items.length, 3) } as React.CSSProperties}>
        {items.map((it) => (
          <li key={it.title}>
            <span className={s.initials} aria-hidden>{it.initials}</span>
            {it.quote && <p className={s.archQuote}>&ldquo;{it.quote}&rdquo;</p>}
            <h3 className={s.cardTitle}>{it.title}</h3>
            {it.meta && <p className={s.archMeta}>{it.meta}</p>}
            <p>{it.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
