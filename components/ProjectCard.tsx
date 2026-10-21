"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { Box, Code2, Globe, Monitor, Smartphone } from "lucide-react";
import SmartLink from "@/components/ui/SmartLink";
import type { Platform, Project } from "@/lib/projects";
import { useSettledHover } from "@/components/ui/useSettledHover";
import styles from "./ProjectCard.module.css";
import Img from "@/components/ui/Img";

const icons: Record<Platform, typeof Monitor> = {
  "Web app": Monitor,
  Mobile: Smartphone,
  Website: Globe,
  Hardware: Box,
  Software: Code2,
};

/** Image on top, then platform label, title and one-line summary. Hover follows through (see useSettledHover). */
export default function ProjectCard({ p, priority = false }: { p: Project; priority?: boolean }) {
  const href = p.external ?? `/work/${p.slug}`;
  const Icon = icons[p.platform];
  const ref = useRef<HTMLDivElement>(null);
  const hover = useSettledHover(ref);
  return (
    <div ref={ref} className={styles.pad} data-hover={hover || undefined} data-lily>
    <SmartLink className={styles.card} href={href}>
      <div className={styles.media} style={{ background: p.theme.stage }}>
        {p.cover ? (
          <Img src={p.cover} sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw" priority={priority} />
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
      <h3 className={styles.title}><span>{p.short}</span></h3>
      <p className={styles.summary}>{p.summary}</p>
    </SmartLink>
    </div>
  );
}
