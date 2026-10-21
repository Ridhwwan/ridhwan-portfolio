import Img from "@/components/ui/Img";
import s from "./study.module.css";

type Step = { tab: string; src: string; caption: string };

/**
 * The final design as a walk-through. Every step repeats the tab row with its own
 * stage highlighted, so the page reads like a flow without any script. The tabs
 * are links that jump between steps.
 */
export default function StepTabs({ id, steps }: { id: string; steps: Step[] }) {
  return (
    <ol className={s.steps}>
      {steps.map((st, i) => (
        <li key={st.tab} id={`${id}-${i + 1}`} className={s.step}>
          <nav className={s.tabs} aria-label="Steps">
            {steps.map((t, j) => (
              <a key={t.tab} href={`#${id}-${j + 1}`} className={j === i ? s.tabOn : s.tab} aria-current={j === i ? "step" : undefined}>{t.tab}</a>
            ))}
          </nav>
          <figure className={s.stepShot}>
            <Img src={st.src} alt={st.tab} sizes="(max-width: 1100px) 100vw, 1040px" />
          </figure>
          <p className={s.caption}><span>{String(i + 1).padStart(2, "0")}</span>{st.caption}</p>
        </li>
      ))}
    </ol>
  );
}
