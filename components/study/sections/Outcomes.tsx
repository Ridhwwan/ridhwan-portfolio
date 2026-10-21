import type { StudySection } from "../types";
import s from "../study.module.css";

type P = Extract<StudySection, { kind: "outcomes" }>;

/** Big numbers in a row (the section itself sits on the dark band). */
export default function Outcomes({ stats }: P) {
  return (
    <dl className={s.stats}>
      {stats.map((st) => (
        <div key={st.text}>
          <dt>{st.value}</dt>
          <dd>{st.text}</dd>
        </div>
      ))}
    </dl>
  );
}
