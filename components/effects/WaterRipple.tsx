"use client";

import { useEffect, useRef } from "react";

/**
 * A sheet of water over the whole site. Moving the mouse drops ripples into a
 * small simulation, and the page underneath bends where they pass (real
 * refraction through an SVG displacement filter on a backdrop, in Chromium
 * browsers). Other browsers get soft light-and-shadow rings that look similar
 * but don't bend the page.
 *
 * - Clickable things (links, buttons, form fields) never start ripples, and
 *   buttons and inputs are masked out so they always stay crisp.
 * - Elements marked `data-lily` (project cards) are lily pads: ripples barely
 *   touch them, and a cursor passing underneath makes them drift by
 *   `--card-float`, like a fish swimming below.
 * - Bend strength comes from the `--ripple-strength` design token (0 = off).
 * - Nothing runs for reduced motion or touch/pen, and the loop sleeps whenever
 *   the water is still. The filter only covers the patch of water that is
 *   moving. If a machine still can't keep up, ripples switch off for the
 *   visit; the cheap lily-pad drift stays.
 */

const CELL = 8; // simulation cell size in CSS px
const DAMP = 0.965; // how quickly ripples die away
const ACTIVE = 0.003; // below this a cell counts as still
const NO_SPAWN =
  'a,button,input,textarea,select,label,summary,[contenteditable="true"],[contenteditable=""],[role="button"],[data-lily],[data-no-ripple],dialog';
const CRISP = 'button,.btn,input,textarea,select,[role="button"],[data-no-ripple]';
const LILY = "[data-lily]";

type Lily = { x: number; y: number; r: number; vx: number; vy: number; vr: number };

function isChromium() {
  const brands = (navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } }).userAgentData?.brands;
  return !!brands?.some((b) => /Chromium/i.test(b.brand));
}

function readToken(name: string, fallback: number) {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
  return Number.isFinite(v) ? v : fallback;
}

export default function WaterRipple() {
  const overlay = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLCanvasElement>(null);
  const feImage = useRef<SVGFEImageElement>(null);
  const feMap = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const refract = isChromium();
    const ov = overlay.current!, sh = shade.current!, img = feImage.current!, dmap = feMap.current!;
    const mapCanvas = document.createElement("canvas");
    const mapCtx = mapCanvas.getContext("2d")!;
    const shCtx = sh.getContext("2d")!;

    let cols = 0, rows = 0;
    let cur = new Float32Array(0), prev = new Float32Array(0), mask = new Float32Array(0);
    let pixels: ImageData | null = null;

    let strength = readToken("--ripple-strength", 16);
    let floatPx = readToken("--card-float", 2);
    let running = false, ripplesOff = false, raf = 0;
    let quiet = 0, frame = 0, lastT = 0;
    const times: number[] = [];
    const lilies = new Map<HTMLElement, Lily>();
    let lastX = -1, lastY = -1, lastDrop = 0;
    // Bounds (in cells) of water that is still moving.
    let bx0 = 0, by0 = 0, bx1 = -1, by1 = -1;

    function resize() {
      cols = Math.ceil(innerWidth / CELL) + 4;
      rows = Math.ceil(innerHeight / CELL) + 4;
      cur = new Float32Array(cols * rows);
      prev = new Float32Array(cols * rows);
      mask = new Float32Array(cols * rows).fill(1);
      mapCanvas.width = sh.width = cols;
      mapCanvas.height = sh.height = rows;
      pixels = new ImageData(cols, rows);
    }
    // Cell (x, y) covers screen px ((x - 2) * CELL, (y - 2) * CELL).
    const toCell = (px: number) => px / CELL + 2;

    function drop(px: number, py: number, radius: number, amount: number) {
      const cx = toCell(px), cy = toCell(py), r2 = radius * radius;
      for (let y = Math.max(2, Math.floor(cy - radius)); y <= Math.min(rows - 3, Math.ceil(cy + radius)); y++) {
        for (let x = Math.max(2, Math.floor(cx - radius)); x <= Math.min(cols - 3, Math.ceil(cx + radius)); x++) {
          const d2 = (x - cx) ** 2 + (y - cy) ** 2;
          if (d2 < r2) cur[y * cols + x] += amount * (0.5 + 0.5 * Math.cos((Math.PI * Math.sqrt(d2)) / radius));
        }
      }
    }

    // 1 = full ripple, 0.15 over lily pads, 0 over controls.
    function updateMask() {
      mask.fill(1);
      const paint = (sel: string, value: number) => {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          const b = el.getBoundingClientRect();
          if (b.bottom < 0 || b.top > innerHeight || b.right < 0 || b.left > innerWidth || !b.width) return;
          const x0 = Math.max(0, Math.floor(toCell(b.left))), x1 = Math.min(cols - 1, Math.ceil(toCell(b.right)));
          const y0 = Math.max(0, Math.floor(toCell(b.top))), y1 = Math.min(rows - 1, Math.ceil(toCell(b.bottom)));
          for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
            const i = y * cols + x;
            if (value < mask[i]) mask[i] = value;
          }
        });
      };
      paint(LILY, 0.15);
      paint(CRISP, 0);
    }

    function step() {
      let energy = 0;
      bx0 = cols; by0 = rows; bx1 = -1; by1 = -1;
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          const v = ((cur[i - 1] + cur[i + 1] + cur[i - cols] + cur[i + cols]) * 0.5 - prev[i]) * DAMP;
          prev[i] = v;
          const a = v < 0 ? -v : v;
          if (a > energy) energy = a;
          if (a > ACTIVE) {
            if (x < bx0) bx0 = x;
            if (x > bx1) bx1 = x;
            if (y < by0) by0 = y;
            if (y > by1) by1 = y;
          }
        }
      }
      const t = cur; cur = prev; prev = t;
      return energy;
    }

    // Slope over two cells each way: smoother than neighbours, so text bends instead of tearing.
    const slopeX = (i: number) => (cur[i - 2] ?? 0) + (cur[i - 1] ?? 0) - (cur[i + 1] ?? 0) - (cur[i + 2] ?? 0);
    const slopeY = (i: number) => (cur[i - 2 * cols] ?? 0) + (cur[i - cols] ?? 0) - (cur[i + cols] ?? 0) - (cur[i + 2 * cols] ?? 0);

    function render() {
      if (!pixels) return;
      const d = pixels.data;
      if (refract) {
        const gain = 30;
        for (let i = 0, j = 0; i < cur.length; i++, j += 4) {
          const m = mask[i];
          d[j] = 128 + Math.max(-127, Math.min(127, slopeX(i) * gain * m));
          d[j + 1] = 128 + Math.max(-127, Math.min(127, slopeY(i) * gain * m));
          d[j + 2] = 128;
          d[j + 3] = 255;
        }
        mapCtx.putImageData(pixels, 0, 0);
        img.setAttribute("href", mapCanvas.toDataURL());
        // Only filter the patch that is moving (plus a margin), not the whole screen.
        if (bx1 >= bx0) {
          const pad = 8;
          const x0 = Math.max(0, bx0 - pad), y0 = Math.max(0, by0 - pad);
          const x1 = Math.min(cols, bx1 + pad), y1 = Math.min(rows, by1 + pad);
          const left = (x0 - 2) * CELL, top = (y0 - 2) * CELL;
          Object.assign(ov.style, { left: `${left}px`, top: `${top}px`, width: `${(x1 - x0) * CELL}px`, height: `${(y1 - y0) * CELL}px`, display: "block" });
          img.setAttribute("x", String(-left - 2 * CELL));
          img.setAttribute("y", String(-top - 2 * CELL));
          img.setAttribute("width", String(cols * CELL));
          img.setAttribute("height", String(rows * CELL));
        }
      } else {
        for (let i = 0, j = 0; i < cur.length; i++, j += 4) {
          const s = (slopeX(i) + slopeY(i)) * 0.5 * mask[i];
          const light = s > 0;
          d[j] = light ? 255 : 31; d[j + 1] = light ? 255 : 42; d[j + 2] = light ? 255 : 46;
          d[j + 3] = Math.min(Math.abs(s) * 90, 60);
        }
        shCtx.putImageData(pixels, 0, 0);
        sh.style.display = "block";
      }
    }

    function moveLilies() {
      const max = floatPx, maxR = Math.min(0.6, max * 0.25);
      for (const [el, s] of lilies) {
        s.vx = (s.vx - s.x * 0.035) * 0.9;
        s.vy = (s.vy - s.y * 0.035) * 0.9;
        s.vr = (s.vr - s.r * 0.03) * 0.9;
        s.x = Math.max(-max, Math.min(max, s.x + s.vx));
        s.y = Math.max(-max, Math.min(max, s.y + s.vy));
        s.r = Math.max(-maxR, Math.min(maxR, s.r + s.vr));
        if (Math.abs(s.x) + Math.abs(s.y) + Math.abs(s.r) + Math.abs(s.vx) + Math.abs(s.vy) < 0.01) {
          el.style.translate = "";
          el.style.rotate = "";
          lilies.delete(el);
        } else {
          el.style.translate = `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`;
          el.style.rotate = `${s.r.toFixed(3)}deg`;
        }
      }
    }

    function hideWater() {
      ov.style.display = "none";
      sh.style.display = "none";
    }

    function loop(t: number) {
      if (!running) return;
      frame++;
      if (frame % 30 === 1) {
        strength = readToken("--ripple-strength", 16);
        floatPx = readToken("--card-float", 2);
        dmap.setAttribute("scale", String(strength));
      }

      let energy = 0;
      if (!ripplesOff) {
        if (lastT) {
          times.push(t - lastT);
          if (times.length > 30) times.shift();
          // Too slow to stay smooth on this machine: ripples off for the rest of the visit.
          if (frame > 40 && times.length === 30 && times.reduce((a, b) => a + b, 0) / 30 > 34) {
            ripplesOff = true;
            document.documentElement.dataset.water = "off";
            hideWater();
          }
        }
        lastT = t;
        if (!ripplesOff) {
          if (frame % 6 === 1) updateMask();
          energy = step();
          if (energy > ACTIVE && strength > 0) render();
          else hideWater();
        }
      }
      moveLilies();

      quiet = energy < ACTIVE && lilies.size === 0 ? quiet + 1 : 0;
      if (quiet > 10) return stop();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      frame = 0; lastT = 0; quiet = 0; times.length = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      hideWater();
      cur.fill(0); prev.fill(0);
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const target = e.target instanceof Element ? e.target : null;
      const dx = lastX < 0 ? 0 : e.clientX - lastX, dy = lastY < 0 ? 0 : e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      const speed = Math.hypot(dx, dy);

      const lily = target?.closest<HTMLElement>(LILY);
      if (lily && floatPx > 0 && speed > 0) {
        // A fish passing under the pad: a small nudge in the direction it swims.
        const s = lilies.get(lily) ?? { x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0 };
        const b = lily.getBoundingClientRect();
        const side = (e.clientY - (b.top + b.height / 2)) / (b.height / 2 || 1);
        s.vx += Math.max(-0.35, Math.min(0.35, dx * 0.012));
        s.vy += Math.max(-0.35, Math.min(0.35, dy * 0.012));
        s.vr += Math.max(-0.06, Math.min(0.06, dx * 0.0015 * (side || 1)));
        lilies.set(lily, s);
        start();
      }

      if (ripplesOff || strength <= 0 || speed < 2 || target?.closest(NO_SPAWN)) return;
      const now = performance.now();
      if (now - lastDrop < 16) return;
      lastDrop = now;
      drop(e.clientX, e.clientY, 2.6, Math.min(speed * 0.035, 1.2));
      start();
    }

    function onVisibility() { if (document.hidden) stop(); }

    resize();
    dmap.setAttribute("scale", String(strength));
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      for (const el of lilies.keys()) { el.style.translate = ""; el.style.rotate = ""; }
      lilies.clear();
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="water-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage ref={feImage} preserveAspectRatio="none" result="map" />
          <feDisplacementMap ref={feMap} in="SourceGraphic" in2="map" scale="16" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div
        ref={overlay}
        aria-hidden="true"
        style={{ position: "fixed", zIndex: 90, pointerEvents: "none", display: "none", backdropFilter: "url(#water-refract)" }}
      />
      <canvas
        ref={shade}
        aria-hidden="true"
        style={{ position: "fixed", left: -2 * CELL, top: -2 * CELL, width: `calc(100vw + ${4 * CELL}px)`, height: `calc(100vh + ${4 * CELL}px)`, zIndex: 90, pointerEvents: "none", display: "none" }}
      />
    </>
  );
}
