import { Zap } from "lucide-react";
import type { StudySection } from "../types";
import s from "../study.module.css";

type P = Extract<StudySection, { kind: "discovery" }>;

/** Optional user quotes, numbered pain points, then the "How might we" problem statement. */
export default function Discovery({ quotes, pains, hmw }: P) {
  return (
    <>
      {quotes && quotes.length > 0 && (
        <div className={s.grid2}>
          {quotes.map((q) => <blockquote key={q} className={s.quote}>&ldquo;{q}&rdquo;</blockquote>)}
        </div>
      )}
      <ol className={s.grid3}>
        {pains.map((p, i) => (
          <li key={p.title} className={s.card}>
            <span className={s.num}>{i + 1}</span>
            <h3 className={s.cardTitle}>{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ol>
      {hmw && (
        <div className={s.hmw}>
          <p className={s.hmwHead}><Zap aria-hidden size={16} strokeWidth={1.8} />Problem statement</p>
          <div className={s.hmwBody}>
            <p className={s.mini}>How might we</p>
            <p className={s.hmwText}>{hmw}</p>
          </div>
        </div>
      )}
    </>
  );
}
