import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "problem" }>;

/** The problem in one line on the left, its evidence as a numbered list on the right. */
export default function Problem({ label = "The problem", heading, items }: P) {
  return (
    <div className={s.problem}>
      <div>
        <p className={s.mini}>{label}</p>
        <h3 className={s.problemHead}>{heading}</h3>
      </div>
      <ol className={s.hairList}>
        {items.map((it, i) => <li key={it}><span>{String(i + 1).padStart(2, "0")}</span>{it}</li>)}
      </ol>
    </div>
  );
}
