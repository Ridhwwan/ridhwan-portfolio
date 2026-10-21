import BackLink from "@/components/ui/BackLink";
import Img from "@/components/ui/Img";
import type { Study } from "./types";
import s from "./study.module.css";

/** Back link, client mark, outcome headline, intro, the meta row and the hero shot. */
export default function StudyHero({ study }: { study: Study }) {
  const h = study.hero;
  return (
    <header className={s.hero}>
      <BackLink href={study.back?.href ?? "/#work"}>{study.back?.label ?? "Selected work"}</BackLink>
      <span className={s.mark} style={{ background: h.markBg }} aria-hidden>
        {h.markImg ? <Img src={h.markImg} alt="" sizes="64px" priority /> : h.mark}
      </span>
      <h1 className={s.title}>{h.title}</h1>
      <p className={s.lede}>{h.intro}</p>
      <dl className={s.meta}>
        {h.meta.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.text}</dd>
          </div>
        ))}
      </dl>
      <figure className={s.heroShot}>
        <Img src={h.image.src} alt={h.image.alt} sizes="(max-width: 1100px) 100vw, 1040px" priority />
      </figure>
    </header>
  );
}
