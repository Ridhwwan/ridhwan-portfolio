import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "beforeAfter" }>;

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className={s.baSteps}>
      {steps.map((st, i) => <li key={st}><span>{String(i + 1).padStart(2, "0")}</span>{st}</li>)}
    </ol>
  );
}

/** How the work went before, next to how it goes now. */
export default function BeforeAfter({ before, after }: P) {
  return (
    <div className={s.ba}>
      <div className={s.baCol}>
        <p className={s.mini}>Before</p>
        <h3 className={s.cardTitle}>{before.title}</h3>
        <Steps steps={before.steps} />
      </div>
      <div className={`${s.baCol} ${s.baAfter}`}>
        <p className={s.mini}>After</p>
        <h3 className={s.cardTitle}>{after.title}</h3>
        <Steps steps={after.steps} />
      </div>
    </div>
  );
}
