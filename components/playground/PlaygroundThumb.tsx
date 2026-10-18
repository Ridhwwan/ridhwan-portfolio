"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { Box, Code2, Film, Lightbulb, Sparkles, Trophy, Type, type LucideIcon } from "lucide-react";
import type { PlaygroundItem } from "@/lib/playground";
import styles from "./PlaygroundThumb.module.css";

const ICONS: Record<string, LucideIcon> = {
  Code: Code2, "Type design": Type, "AI tool": Sparkles, "3D": Box, Motion: Film, "Design concept": Lightbulb, Hackathon: Trophy,
};

/**
 * What sits in a Playground card's image slot, best available first:
 * 1. KoreanFirst's own live specimen (weight sweeps while active)
 * 2. the Cover image, with the Preview clip playing over it while active
 * 3. a drawn app window, laid out from the project's name, animating while active
 */
export default function PlaygroundThumb({ item, active }: { item: PlaygroundItem; active: boolean }) {
  if (item.live === "koreanfirst") return <KoreanFirstSpecimen active={active} />;
  if (item.cover || item.preview) return <Media item={item} active={active} />;
  return <DrawnWindow item={item} active={active} />;
}

function KoreanFirstSpecimen({ active }: { active: boolean }) {
  return (
    <div className={styles.specimen} data-active={active || undefined} aria-hidden>
      <span className={styles.specimenGlyphs}>Aa</span>
      <span className={styles.specimenScale}>200 — 700</span>
    </div>
  );
}

function Media({ item, active }: { item: PlaygroundItem; active: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [wanted, setWanted] = useState(false); // load the clip only once someone shows interest

  useEffect(() => {
    if (!active || !item.preview) return;
    setWanted(true); // eslint-disable-line react-hooks/set-state-in-effect -- lazy-load on first activation
  }, [active, item.preview]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active, wanted]);

  return (
    <div className={styles.media} data-active={active || undefined}>
      {item.cover ? <img src={item.cover} alt="" loading="lazy" /> : <DrawnWindow item={item} active={false} />}
      {item.preview && wanted && (item.preview.kind === "video" ? (
        <video ref={video} className={styles.clip} src={item.preview.src} muted loop playsInline preload="auto" aria-hidden />
      ) : (
        <img className={styles.clip} src={item.preview.src} alt="" aria-hidden />
      ))}
    </div>
  );
}

/** Small deterministic hash so each project gets its own (stable) layout. */
function seed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) % 1000) / 1000;
}

function DrawnWindow({ item, active }: { item: PlaygroundItem; active: boolean }) {
  const rnd = seed(item.title);
  const lines = Array.from({ length: 6 }, (_, i) => ({ indent: i === 0 ? 0 : Math.floor(rnd() * 3) * 6, w: 22 + rnd() * 40, alt: 18 + rnd() * 44 }));
  const Icon = ICONS[item.category] ?? Code2;

  return (
    <div className={styles.drawn} data-active={active || undefined} aria-hidden>
      <svg viewBox="0 0 100 80" className={styles.window}>
        <rect x="1" y="1" width="98" height="78" rx="6" className={styles.frame} />
        <line x1="1" y1="13" x2="99" y2="13" className={styles.rule} />
        {[8, 14, 20].map((cx) => <circle key={cx} cx={cx} cy="7" r="2" className={styles.light} />)}
        {lines.map((l, i) => (
          <rect
            key={i}
            x={10 + l.indent}
            y={22 + i * 9}
            width="62"
            height="4"
            rx="2"
            className={styles.line}
            style={{ "--s": (l.w / 62).toFixed(3), "--sa": (l.alt / 62).toFixed(3), transitionDelay: `${i * 40}ms` } as React.CSSProperties}
          />
        ))}
        <rect x="10" y={22 + 6 * 9} width="1.6" height="5" className={styles.cursor} />
      </svg>
      <span className={styles.badge}><Icon size={14} strokeWidth={1.75} /> {item.category}</span>
    </div>
  );
}
