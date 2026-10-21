import Img from "@/components/ui/Img";
import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "features" }>;

/** Screens with their story, alternating sides down the page. */
export default function Features({ items }: P) {
  return (
    <ol className={s.features}>
      {items.map((it, i) => (
        <li key={it.title} className={i % 2 ? `${s.feature} ${s.featureFlip}` : s.feature}>
          <div className={s.featureText}>
            <span className={s.lnum}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={s.h3}>{it.title}</h3>
            <p>{it.text}</p>
          </div>
          <figure className={s.panel}>
            <Img src={it.image.src} alt={it.image.alt} sizes="(max-width: 860px) 100vw, 520px" />
          </figure>
        </li>
      ))}
    </ol>
  );
}
