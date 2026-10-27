"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TypeTester.module.css";

// Exactly the characters KoreanFirst contains.
const SAMPLE = "Stay curious, build kindly";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!#$%&()+,-;=@[]_~\u2018\u201C".split("");

/**
 * Live specimen for KoreanFirst: size, weight and tracking controls, editable text
 * with a plain-font mirror underneath (so you can read what you typed), and the character grid.
 * `autoFocus` puts the caret in the specimen on load (on devices with a mouse;
 * phones get a blinking caret without the keyboard popping up).
 */
export default function TypeTester({ initialSize, autoFocus = false }: { initialSize?: number; autoFocus?: boolean }) {
  // Default: 32px on mobile (<760px), 72px on tablet, 120px on desktop.
  const getResponsiveDefault = () => {
    if (typeof window === "undefined") return 72;
    if (window.innerWidth <= 760) return 32;
    if (window.innerWidth <= 1024) return 72;
    return 120;
  };
  const specimen = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(SAMPLE);
  const [size, setSize] = useState(initialSize ?? getResponsiveDefault());
  const [track, setTrack] = useState(0);
  const [weight, setWeight] = useState(400);
  const [loaded, setLoaded] = useState<boolean | null>(null);

  // Caret at the end of the sample on load, without scrolling the page.
  useEffect(() => {
    const el = specimen.current;
    if (!autoFocus || !el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // Next frame, so it lands after anything that grabs focus on open (e.g. the Try it window).
    const raf = requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    });
    return () => cancelAnimationFrame(raf);
  }, [autoFocus]);

  useEffect(() => {
    document.fonts
      .load("48px KoreanFirst")
      .then((faces) => setLoaded(faces.length > 0))
      .catch(() => setLoaded(false));
  }, []);

  return (
    <section className={styles.tester} aria-label="KoreanFirst type tester">
      {loaded === false && (
        <p className={styles.notice} role="status">
          KoreanFirst didn&rsquo;t load, so you&rsquo;re seeing a fallback. Refresh the page to try again.
        </p>
      )}

      <div className={styles.controls}>
        <label>
          <span>Size</span>
          <input type="range" min={32} max={260} value={size} onChange={(e) => setSize(+e.target.value)} />
          <output>{size}px</output>
        </label>
        <label>
          <span>Weight</span>
          <input type="range" min={200} max={700} step={10} value={weight} onChange={(e) => setWeight(+e.target.value)} />
          <output>{weight}</output>
        </label>
        <label>
          <span>Tracking</span>
          <input type="range" min={-10} max={30} value={track} onChange={(e) => setTrack(+e.target.value)} />
          <output>{track / 100}em</output>
        </label>
      </div>

      <div
        ref={specimen}
        className={styles.specimen}
        onInput={(e) => setText(e.currentTarget.textContent ?? "")}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        role="textbox"
        aria-label="Editable specimen text"
        style={{ fontSize: size, letterSpacing: `${track / 100}em`, fontWeight: weight }}
      >
        {SAMPLE}
      </div>

      <p className={styles.mirror} aria-live="polite">
        <span className={styles.mirrorLabel}>Reads as</span>
        <span className={styles.mirrorText} data-empty={!text.trim() || undefined}>{text.trim() ? text : "Type above to see it here"}</span>
      </p>

      <h2 className={styles.sub}>Character set</h2>
      <ul className={styles.glyphs}>
        {GLYPHS.map((g) => (
          <li key={g} style={{ fontWeight: weight }}>{g}</li>
        ))}
      </ul>
    </section>
  );
}
