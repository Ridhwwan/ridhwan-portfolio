import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "phases" }>;

/** The process as a row of numbered chips. */
export default function Phases({ items, note }: P) {
  return (
    <div className={s.blockGap}>
      <ol className={s.phases}>
        {items.map((it, i) => <li key={it}><span>{String(i + 1).padStart(2, "0")}</span>{it}</li>)}
      </ol>
      {note && <p className={s.small}>{note}</p>}
    </div>
  );
}
