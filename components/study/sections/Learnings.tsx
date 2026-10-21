import type { StudySection } from "../types";
import s from "../study.module.css";

type P = Extract<StudySection, { kind: "learnings" }>;

/** Numbered lessons separated by hairlines. */
export default function Learnings({ items }: P) {
  return (
    <ol className={s.learnings}>
      {items.map((it, i) => (
        <li key={it.title}>
          <span className={s.lnum}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className={s.cardTitle}>{it.title}</h3>
            <p>{it.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
