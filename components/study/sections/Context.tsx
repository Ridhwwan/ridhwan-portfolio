import Img from "@/components/ui/Img";
import type { StudySection } from "../types";
import s from "../study.module.css";

type P = Extract<StudySection, { kind: "context" }>;

/** Two framing cards, then "the old way" with red problem callouts. */
export default function Context({ pair, legacy }: P) {
  return (
    <>
      {pair && (
        <div className={s.grid2}>
          {pair.map((c) => (
            <div key={c.label} className={s.card}>
              <p className={s.mini}>{c.label}</p>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      )}
      {legacy && (
        <div className={s.sub}>
          <h3 className={s.h3}>{legacy.heading}</h3>
          <p className={s.intro}>{legacy.text}</p>
          {legacy.image && (
            <figure className={s.warnShot}><Img src={legacy.image.src} alt={legacy.image.alt} sizes="(max-width: 1100px) 100vw, 1040px" /></figure>
          )}
          <ul className={s.grid3}>
            {legacy.problems.map((p) => <li key={p} className={s.warn}>{p}</li>)}
          </ul>
        </div>
      )}
    </>
  );
}
