import Img from "@/components/ui/Img";
import type { StudySection } from "../types";
import s from "../study.module.css";

type P = Extract<StudySection, { kind: "story" }>;

/** A free-form chapter: extra paragraphs, a dotted list, then figures (two side by side when there are two). */
export default function Story({ body, points, images }: P) {
  return (
    <>
      {body?.map((t) => <p key={t} className={s.intro}>{t}</p>)}
      {points && points.length > 0 && (
        <ul className={`${s.dots} ${s.storyDots}`}>{points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
      )}
      {images && images.length > 0 && (
        <div className={images.length === 2 ? s.grid2 : s.stack}>
          {images.map((im) => (
            <figure key={im.src} className={s.figure}>
              <div className={s.panel}>
                <Img src={im.src} alt={im.alt} sizes={images.length === 2 ? "(max-width: 620px) 100vw, 520px" : "(max-width: 1100px) 100vw, 1040px"} />
              </div>
              {im.caption && <figcaption className={s.caption}>{im.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
