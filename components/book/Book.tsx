"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Project } from "@/lib/projects";
import BookPage from "./BookPage";
import "./book.css";

type Slot = { i: number } | null; // index into project.pages

/**
 * The universal case-study skeleton: a bound portfolio you flip through,
 * like an architecture folio on issuu. The cover sits alone on the right,
 * every other page pairs into a spread.
 */
export default function Book({ project, next }: { project: Project; next?: Project }) {
  const pages = project.pages;
  const spreads = useMemo(() => {
    const s: [Slot, Slot][] = [[null, { i: 0 }]];
    for (let i = 1; i < pages.length; i += 2) {
      s.push([{ i }, i + 1 < pages.length ? { i: i + 1 } : null]);
    }
    return s;
  }, [pages.length]);

  const [idx, setIdx] = useState(0);
  const [turn, setTurn] = useState<"next" | "prev" | null>(null);
  const [thumbs, setThumbs] = useState(false);

  const go = useCallback(
    (dir: "next" | "prev") => {
      if (turn) return;
      if (dir === "next" && idx >= spreads.length - 1) return;
      if (dir === "prev" && idx <= 0) return;
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (still) setIdx((v) => v + (dir === "next" ? 1 : -1));
      else setTurn(dir);
    },
    [idx, spreads.length, turn],
  );

  const land = () => {
    const step = turn === "next" ? 1 : -1;
    setIdx((v) => Math.min(spreads.length - 1, Math.max(0, v + step)));
    setTurn(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === "ArrowRight") go("next");
      if (e.key === "ArrowLeft") go("prev");
      if (e.key === "Escape") setThumbs(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const slot = (s: Slot, thumb = false) =>
    s ? <BookPage project={project} page={pages[s.i]} n={s.i + 1} next={next} thumb={thumb} /> : null;

  // What sits underneath while a leaf is turning.
  const cur = spreads[idx];
  const base: [Slot, Slot] =
    turn === "next" ? [cur[0], spreads[idx + 1][1]] : turn === "prev" ? [spreads[idx - 1][0], cur[1]] : cur;

  const label = (() => {
    const nums = cur.filter(Boolean).map((s) => (s as { i: number }).i + 1);
    return nums.length === 2 ? `Pages ${nums[0]}–${nums[1]} of ${pages.length}` : `Page ${nums[0]} of ${pages.length}`;
  })();

  const t = project.theme;
  const chrome = isLight(t.stage) ? t.ink : t.paper;
  const vars = {
    "--chrome": chrome,
    "--stage": t.stage, "--paper": t.paper, "--ink": t.ink, "--muted": t.muted,
    "--accent": t.accent, "--accent-ink": t.accentInk, "--display": t.display, "--body": t.body,
    "--dw": t.displayWeight, "--r": t.radius,
  } as React.CSSProperties;

  return (
    <div className="bk-root" data-deco={t.decoration} style={vars}>
      <div className="bk-top">
        <Link href="/#work" className="bk-back">Ridhwan Salaudeen</Link>
        <span className="bk-top-title">{project.short}</span>
      </div>

      {/* Desktop: the bound book */}
      <div className="bk-desk">
        <div
          className="bk-book"
          data-closed-left={base[0] === null}
          data-closed-right={base[1] === null}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a, button, canvas")) return;
            const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
            go(e.clientX - r.left > r.width / 2 ? "next" : "prev");
          }}
        >
          <div className="bk-half bk-left">{slot(base[0])}</div>
          <div className="bk-half bk-right">{slot(base[1])}</div>
          <div className="bk-spine" aria-hidden />
          {turn && (
            <div
              className={`bk-leaf bk-leaf-${turn}`}
              onAnimationEnd={(e) => { if (e.target === e.currentTarget) land(); }}
              aria-hidden
            >
              <div className="bk-face bk-front">{slot(turn === "next" ? cur[1] : cur[0])}</div>
              <div className="bk-face bk-back-face">{slot(turn === "next" ? spreads[idx + 1][0] : spreads[idx - 1][1])}</div>
            </div>
          )}
        </div>

        <div className="bk-controls">
          <button onClick={() => go("prev")} disabled={idx === 0 || !!turn} aria-label="Previous pages">Previous</button>
          <span aria-live="polite">{label}</span>
          <button onClick={() => go("next")} disabled={idx === spreads.length - 1 || !!turn} aria-label="Next pages">Next</button>
          <button className="bk-all" onClick={() => setThumbs(true)}>All pages</button>
        </div>
      </div>

      {/* Phones: the same pages, read top to bottom */}
      <div className="bk-scroll">
        {pages.map((pg, i) => (
          <BookPage key={i} project={project} page={pg} n={i + 1} next={next} />
        ))}
      </div>

      {thumbs && (
        <div className="bk-sheet" role="dialog" aria-modal="true" aria-label="All pages" onClick={() => setThumbs(false)}>
          <div className="bk-sheet-head">
            <span>All pages</span>
            <button onClick={() => setThumbs(false)}>Close</button>
          </div>
          <ol className="bk-sheet-grid">
            {spreads.map((s, si) => (
              <li key={si}>
                <button
                  className="bk-mini"
                  data-current={si === idx}
                  aria-label={`Go to spread ${si + 1}`}
                  onClick={(e) => { e.stopPropagation(); setIdx(si); setThumbs(false); }}
                >
                  <span className="bk-mini-half">{slot(s[0], true)}</span>
                  <span className="bk-mini-half">{slot(s[1], true)}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function isLight(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6;
}
