import Img from "@/components/ui/Img";
import type { StudySection } from "../types";
import s from "../study.module.css";

type P = Extract<StudySection, { kind: "ideation" }>;

/** Needs in columns (one per user or category), then a test that shaped the design. */
export default function Ideation({ columns, test }: P) {
  return (
    <>
      <div className={s.columns}>
        {columns.map((c) => (
          <div key={c.title} className={s.column}>
            <h3 className={s.cardTitle}>{c.title}</h3>
            <p className={s.mini}>{c.sub}</p>
            <ul className={s.dots}>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
      {test && (
        <div className={s.sub}>
          <h3 className={s.h3}>{test.heading}</h3>
          <p className={s.intro}>{test.text}</p>
          <figure className={s.panel}><Img src={test.image.src} alt={test.image.alt} sizes="(max-width: 1100px) 100vw, 1040px" /></figure>
        </div>
      )}
    </>
  );
}
