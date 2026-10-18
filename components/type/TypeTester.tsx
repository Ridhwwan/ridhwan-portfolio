"use client";

import { useEffect, useState } from "react";
import styles from "./TypeTester.module.css";

// Exactly the characters KoreanFirst contains.
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!#$%&()+,-;=@[]_~\u2018\u201C".split("");

/** Live specimen for KoreanFirst: size, weight and tracking controls, editable text, character grid. */
export default function TypeTester() {
  const [size, setSize] = useState(120);
  const [track, setTrack] = useState(0);
  const [weight, setWeight] = useState(400);
  const [loaded, setLoaded] = useState<boolean | null>(null);

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
        className={styles.specimen}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        role="textbox"
        aria-label="Editable specimen text"
        style={{ fontSize: size, letterSpacing: `${track / 100}em`, fontWeight: weight }}
      >
        Stay curious, build kindly
      </div>

      <h2 className={styles.sub}>Character set</h2>
      <ul className={styles.glyphs}>
        {GLYPHS.map((g) => (
          <li key={g} style={{ fontWeight: weight }}>{g}</li>
        ))}
      </ul>
    </section>
  );
}
