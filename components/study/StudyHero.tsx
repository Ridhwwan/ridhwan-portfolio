import BackLink from "@/components/ui/BackLink";
import Img from "@/components/ui/Img";
import type { Study } from "./types";
import s from "./study.module.css";

/** Back link, client mark, outcome headline, intro, the meta row and the hero shot. */
export default function StudyHero({ study }: { study: Study }) {
  const h = study.hero;
  return (
    <header className={s.hero}>
      {study.back !== false && <BackLink href={study.back?.href ?? "/#work"}>{study.back?.label ?? "Selected work"}</BackLink>}
      {h.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- small logo file, not a photo
        <img className={s.logo} src={h.logo.src} alt={h.logo.alt} style={{ height: h.logo.height ?? 56 }} />
      ) : h.markImg ? (
        <span className={s.mark} style={{ background: h.markBg }} aria-hidden>
          <Img src={h.markImg} alt="" sizes="64px" priority />
        </span>
      ) : h.wordmark || h.mark ? (
        // No logo file: the project's name as a wordmark in its accent colour.
        <span className={s.wordmark} aria-hidden>{h.wordmark ?? h.mark}</span>
      ) : null}
      <h1 className={s.title}>{h.title}</h1>
      <p className={s.lede}>{h.intro}</p>
      <dl className={s.meta}>
        {h.meta.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.text}</dd>
          </div>
        ))}
        {h.links && h.links.length > 0 && (
          <div>
            <dt>Links</dt>
            <dd className={s.links}>
              {h.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}<span aria-hidden> ↗</span></a>
              ))}
            </dd>
          </div>
        )}
      </dl>
      {h.image && (
        <figure className={s.heroShot}>
          <Img src={h.image.src} alt={h.image.alt} sizes="(max-width: 1100px) 100vw, 1040px" priority />
        </figure>
      )}
    </header>
  );
}
