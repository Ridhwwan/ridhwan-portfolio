/* eslint-disable @next/next/no-img-element */
import SmartLink from "@/components/ui/SmartLink";
import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ p, size }: { p: Project; size: "feature" | "standard" }) {
  const href = p.external ?? `/work/${p.slug}`;
  const ext = Boolean(p.external);
  const inner = (
    <>
      {/* The cover sits on the project's own stage colour: a preview of its book. */}
      <div className={styles.cover} style={{ background: p.theme.stage }}>
        {p.cover ? (
          <img src={p.cover} alt="" loading="lazy" />
        ) : p.slug === "bentosms" ? (
          <div className={styles.bento}>
            <span className={styles.b1} /><span className={styles.b2} /><span className={styles.b3} />
            <img src="/work/bentosms-logo.png" alt="" className={styles.bentoLogo} />
          </div>
        ) : (
          <span className={styles.word} style={{ color: p.theme.paper }}>{p.short}</span>
        )}
      </div>
      <div className={styles.meta}>
        <h3>{p.short}</h3>
        <span className={styles.years}>{p.years}</span>
        <p>{p.summary}</p>
        {ext && <span className={styles.ext}>Opens {p.external?.includes("figma") ? "Figma prototype" : "website"}</span>}
      </div>
    </>
  );
  const cls = `${styles.card} ${size === "feature" ? styles.feature : ""}`;
  return <SmartLink className={cls} href={href}>{inner}</SmartLink>;
}
