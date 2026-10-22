import type { Block } from "../types";
import s from "../study.module.css";

type P = Extract<Block, { type: "video" }>;

/** A video in the same frame as the figures, loading only its first frame until played. */
export default function Video({ src, poster, caption }: P) {
  return (
    <figure className={s.figure}>
      <div className={s.panel}>
        <video className={s.video} src={src} poster={poster} controls playsInline preload="metadata" />
      </div>
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  );
}
