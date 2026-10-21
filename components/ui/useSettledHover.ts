"use client";

import { useEffect, useState, type RefObject } from "react";

/** How long a hover lasts at minimum, so its motion always completes (ms). Matches the cards' ease-in time. */
export const HOVER_SETTLE_MS = 650;

/**
 * Hover state with follow-through: once the pointer (or keyboard focus) arrives,
 * the hover stays on for at least `minMs`, even if the pointer has already left.
 * A quick brush past a card still lifts it fully before it eases back, the way a
 * real object would, instead of snapping back halfway.
 */
export function useSettledHover(ref: RefObject<HTMLElement | null>, minMs = HOVER_SETTLE_MS) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let since = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const enter = () => {
      clearTimeout(timer);
      since = performance.now();
      setOn(true);
    };
    const leave = () => {
      const left = Math.max(0, minMs - (performance.now() - since));
      clearTimeout(timer);
      timer = setTimeout(() => setOn(false), left);
    };
    const blur = (e: FocusEvent) => { if (!el.contains(e.relatedTarget as Node)) leave(); };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focusin", enter);
    el.addEventListener("focusout", blur);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", enter);
      el.removeEventListener("focusout", blur);
    };
  }, [ref, minMs]);

  return on;
}
