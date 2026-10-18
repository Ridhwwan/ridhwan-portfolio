"use client";

import { useEffect, useState } from "react";
import styles from "./playground.module.css";

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&?!@#%()".split("");
const HANGUL = "가나다라마바사아자차카타파하".split("");

export default function TypeTester() {
  const [size, setSize] = useState(120);
  const [track, setTrack] = useState(0);
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
          KoreanFirst isn&rsquo;t installed yet, so you&rsquo;re seeing a fallback. Add KoreanFirst.woff2 to /public/fonts and it appears here automatically.
        </p>
      )}

      <div className={`${styles.controls} glass`}>
        <label>
          <span>Size</span>
          <input type="range" min={32} max={260} value={size} onChange={(e) => setSize(+e.target.value)} />
          <output>{size}px</output>
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
        style={{ fontSize: size, letterSpacing: `${track / 100}em` }}
      >
        Stay curious, build kindly.
      </div>

      <h2 className={styles.sub}>Character set</h2>
      <ul className={styles.glyphs}>
        {[...GLYPHS, ...HANGUL].map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </section>
  );
}
