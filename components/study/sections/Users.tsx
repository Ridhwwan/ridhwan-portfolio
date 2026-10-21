import Img from "@/components/ui/Img";
import UserMap from "../UserMap";
import type { StudySection } from "../types";
import s from "../study.module.css";

type P = Extract<StudySection, { kind: "users" }>;

/** Who's involved (diagram + role cards), then the research artefacts. */
export default function Users({ map, roles, research }: P) {
  return (
    <>
      {map && <UserMap {...map} />}
      <div className={s.grid3}>
        {roles.map((r) => (
          <article key={r.title} className={s.card}>
            <h3 className={s.cardTitle}><span className={s.tag}>{r.tag}</span>{r.title}</h3>
            <p>{r.text}</p>
          </article>
        ))}
      </div>
      {research && (
        <div className={s.sub}>
          <h3 className={s.h3}>{research.heading}</h3>
          <p className={s.intro}>{research.text}</p>
          <div className={s.grid2}>
            {research.images.map((im) => (
              <figure key={im.src} className={s.panel}><Img src={im.src} alt={im.alt} sizes="(max-width: 860px) 100vw, 520px" /></figure>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
