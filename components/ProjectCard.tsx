/* eslint-disable @next/next/no-img-element */
import { Box, Code2, Globe, Monitor, Smartphone } from "lucide-react";
import SmartLink from "@/components/ui/SmartLink";
import type { Platform, Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

const icons: Record<Platform, typeof Monitor> = {
  "Web app": Monitor,
  Mobile: Smartphone,
  Website: Globe,
  Hardware: Box,
  Software: Code2,
};

/** Image on top, then platform label, title and one-line summary. */
export default function ProjectCard({ p }: { p: Project }) {
  const href = p.external ?? `/work/${p.slug}`;
  const Icon = icons[p.platform];
  return (
    <SmartLink className={styles.card} href={href} data-lily>
      <div className={styles.media} style={{ background: p.theme.stage }}>
        {p.cover ? (
          <img src={p.cover} alt="" loading="lazy" />
        ) : p.slug === "bentosms" ? (
          <img src="/work/bentosms-logo.png" alt="" className={styles.logo} />
        ) : (
          <span className={styles.word} style={{ color: p.theme.paper }}>{p.short}</span>
        )}
      </div>
      <p className={`label ${styles.meta}`}>
        <Icon aria-hidden size={18} strokeWidth={1.5} />
        {p.platform}, {p.years}
      </p>
      <h3 className={styles.title}>{p.short}</h3>
      <p className={styles.summary}>{p.summary}</p>
    </SmartLink>
  );
}
