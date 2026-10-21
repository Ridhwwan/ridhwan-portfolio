import { Lightbulb, Network, Scale, Search } from "lucide-react";
import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "reflections" }>;
const ICONS = { research: Search, system: Network, balance: Scale, craft: Lightbulb };

/** Icon cards, then what I'd do differently. */
export default function Reflections({ items, differently }: P) {
  return (
    <>
      <ul className={s.reflections} style={{ "--n": Math.min(items.length, 3) } as React.CSSProperties}>
        {items.map((it, i) => {
          const I = ICONS[it.icon];
          return (
            <li key={it.title}>
              <p className={s.reflTop}><I aria-hidden size={18} strokeWidth={1.6} /><span>{String(i + 1).padStart(2, "0")}</span></p>
              <h3 className={s.cardTitle}>{it.title}</h3>
              <p>{it.text}</p>
            </li>
          );
        })}
      </ul>
      {differently && (
        <div className={s.callout}>
          <p className={s.mini}>What I&rsquo;d do differently</p>
          {differently.map((t) => <p key={t}>{t}</p>)}
        </div>
      )}
    </>
  );
}
