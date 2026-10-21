import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "quote" }>;

/** A pulled quote on a warm panel. */
export default function Quote({ text, by }: P) {
  return (
    <figure className={s.pull}>
      <blockquote>&ldquo;{text}&rdquo;</blockquote>
      {by && <figcaption>{by}</figcaption>}
    </figure>
  );
}
