import StudyIcon from "../StudyIcon";
import type { StudySection } from "../types";
import s from "../study.module.css";

type P = Extract<StudySection, { kind: "tldr" }>;

/** Four cards: challenge, approach, solution, impact. */
export default function Tldr({ cards }: P) {
  return (
    <div className={s.grid2}>
      {cards.map((c) => (
        <article key={c.title} className={s.card}>
          <h3 className={s.cardTitle}><StudyIcon name={c.icon} />{c.title}</h3>
          <p>{c.text}</p>
        </article>
      ))}
    </div>
  );
}
