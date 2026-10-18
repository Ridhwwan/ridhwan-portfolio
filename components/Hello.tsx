"use client";

import { useState } from "react";
import styles from "./Hello.module.css";

/** "Hello", where the o sprouts a waving glass hand. Hover or tap the o to wave again. */
export default function Hello() {
  const [wave, setWave] = useState(0);
  return (
    <h1 className={styles.hello} aria-label="Hello">
      <span aria-hidden>Hell</span>
      <button
        type="button"
        className={styles.o}
        aria-label="Wave"
        onMouseEnter={() => setWave((w) => w + 1)}
        onClick={() => setWave((w) => w + 1)}
      >
        <svg key={wave} className={styles.hand} viewBox="0 0 120 170" aria-hidden>
          <defs>
            <linearGradient id="film" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8fe3f3" />
              <stop offset="0.38" stopColor="#c6b3ff" />
              <stop offset="0.66" stopColor="#ffc2e5" />
              <stop offset="1" stopColor="#ccf7c0" />
            </linearGradient>
            <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className={styles.wave}>
            {/* wrist, rooted inside the o */}
            <rect x="46" y="96" width="30" height="80" rx="15" fill="url(#film)" />
            {/* fingers */}
            <rect x="29" y="18" width="15" height="58" rx="7.5" fill="url(#film)" />
            <rect x="45" y="6" width="15" height="66" rx="7.5" fill="url(#film)" />
            <rect x="61" y="10" width="15" height="62" rx="7.5" fill="url(#film)" />
            <rect x="77" y="24" width="14" height="52" rx="7" fill="url(#film)" />
            {/* thumb */}
            <rect x="20" y="58" width="16" height="48" rx="8" fill="url(#film)" transform="rotate(-38 28 104)" />
            {/* palm */}
            <rect x="27" y="52" width="66" height="62" rx="28" fill="url(#film)" />
            {/* glass highlights */}
            <rect x="33" y="24" width="4" height="40" rx="2" fill="url(#shine)" />
            <rect x="49" y="12" width="4" height="48" rx="2" fill="url(#shine)" />
            <rect x="34" y="62" width="30" height="6" rx="3" fill="url(#shine)" />
          </g>
        </svg>
        <span className={styles.oGlyph}>o</span>
      </button>
    </h1>
  );
}
