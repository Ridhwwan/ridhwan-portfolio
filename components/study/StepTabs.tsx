"use client";

import { useState } from "react";
import Img from "@/components/ui/Img";
import s from "./study.module.css";

type Step = { tab: string; src: string; caption: string };

/**
 * The final design as a tabbed viewer. One tab row, one image at a time.
 * Clicking a tab switches the visible view in place.
 */
export default function StepTabs({ id, steps }: { id: string; steps: Step[] }) {
  const [active, setActive] = useState(0);
  const st = steps[active];

  return (
    <div className={s.stepViewer} id={id}>
      <nav className={s.tabs} aria-label="Views">
        {steps.map((t, j) => (
          <button
            key={t.tab}
            className={j === active ? s.tabOn : s.tab}
            aria-current={j === active ? "step" : undefined}
            onClick={() => setActive(j)}
            type="button"
          >
            {t.tab}
          </button>
        ))}
      </nav>
      <figure className={s.stepShot}>
        <Img src={st.src} alt={st.tab} sizes="(max-width: 1100px) 100vw, 1040px" />
      </figure>
      <p className={s.caption}><span>{String(active + 1).padStart(2, "0")}</span>{st.caption}</p>
    </div>
  );
}
