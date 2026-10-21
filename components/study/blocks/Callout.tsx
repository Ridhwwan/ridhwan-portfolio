import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "callout" }>;

/** A key insight on a tinted panel. */
export default function Callout({ label, text, tone = "accent" }: P) {
  return (
    <div className={tone === "warm" ? `${s.callout} ${s.calloutWarm}` : s.callout}>
      {label && <p className={s.mini}>{label}</p>}
      {text.map((t) => <p key={t}>{t}</p>)}
    </div>
  );
}
