import Img from "@/components/ui/Img";
import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "images" }>;

/** One figure full width, or two side by side, each with an optional caption. */
export default function Images({ images }: P) {
  const two = images.length === 2;
  return (
    <div className={two ? s.grid2 : s.stack}>
      {images.map((im) => (
        <figure key={im.src} className={s.figure}>
          <div className={s.panel}>
            <Img src={im.src} alt={im.alt} sizes={two ? "(max-width: 620px) 100vw, 520px" : "(max-width: 1100px) 100vw, 1040px"} />
          </div>
          {im.caption && <figcaption className={s.caption}>{im.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
