"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True while a card's preview should play:
 * - on devices that can hover, while the pointer is over it or it has keyboard focus;
 * - on touch devices (no hover), while most of it is on screen.
 * Always false when the visitor prefers reduced motion.
 */
export function useActivePreview(ref: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) {
      const on = () => setActive(true);
      const off = () => setActive(false);
      const blur = (e: FocusEvent) => { if (!el.contains(e.relatedTarget as Node)) off(); };
      el.addEventListener("pointerenter", on);
      el.addEventListener("pointerleave", off);
      el.addEventListener("focusin", on);
      el.addEventListener("focusout", blur);
      return () => {
        el.removeEventListener("pointerenter", on);
        el.removeEventListener("pointerleave", off);
        el.removeEventListener("focusin", on);
        el.removeEventListener("focusout", blur);
      };
    }

    const io = new IntersectionObserver(([e]) => setActive(e.intersectionRatio >= 0.6), { threshold: [0, 0.6, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return active;
}
