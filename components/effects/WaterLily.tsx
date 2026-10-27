"use client";

import { useEffect, useRef } from "react";
import LilySVG from "./LilySVG";
import styles from "./WaterLily.module.css";

const REACH = 300; // px from the lily's centre where the cursor starts to push it
const MAX_TILT = 4; // deg

/**
 * Frosted panel behind the home hero with a water lily floating in it.
 *
 * Layers, outside in: .lily bobs, .sway rocks, .tilt leans away from the
 * cursor and dips on click, and the SVG itself is a data-lily pad, so the
 * water engine drifts it (via `translate`/`rotate`) and quiets ripples over it.
 */
export default function WaterLily() {
  const frost = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tilt.current;
    const panel = frost.current;
    if (!el || !panel || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    let bobTimer = 0;

    const apply = () => {
      frame = 0;
      const b = el.getBoundingClientRect();
      const dx = x - (b.left + b.width / 2);
      const dy = y - (b.top + b.height / 2);
      const d = Math.hypot(dx, dy);
      // Closer cursor, stronger push; the near edge tips down, away from it.
      const k = d < REACH ? (1 - d / REACH) * MAX_TILT : 0;
      const nx = d ? dx / d : 0;
      const ny = d ? dy / d : 0;
      el.style.setProperty("--tilt-x", `${(ny * k).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(-nx * k).toFixed(2)}deg`);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    // The hero text sits on top of the panel, so clicks are caught on the
    // window and kept if they land inside the panel's box.
    const onDown = (e: PointerEvent) => {
      const b = panel.getBoundingClientRect();
      if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) return;
      el.dataset.bob = "";
      clearTimeout(bobTimer);
      bobTimer = window.setTimeout(() => delete el.dataset.bob, 150);
    };

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(frame);
      clearTimeout(bobTimer);
    };
  }, []);

  return (
    <section className={styles.scene} aria-hidden>
      <div ref={frost} className={styles.frost}>
        <div className={styles.lily}>
          <div className={styles.sway}>
            <div ref={tilt} className={styles.tilt}>
              <LilySVG className={styles.svg} data-lily />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
