"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./arabic.module.css";

/* Lessons live in a separate public repo so a new one each morning doesn't redeploy the site.
   index.json → { lessons: [{ n, date, title, titleAr }] }; lessons/0001.json → one Lesson. */
const SOURCE = "https://raw.githubusercontent.com/Ridhwwan/arabic-lessons/main";

type Line = { who?: string; ar: string; en?: string };
type Section = { heading: string; note?: string; lines: Line[] };
type Entry = { n: number; date?: string; title: string; titleAr?: string };
type Lesson = Entry & { sections: Section[] };
type Lang = "ar" | "en";

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const arNum = (n: number) => String(n).replace(/\d/g, (d) => AR_DIGITS[+d]);
const pad = (n: number) => String(n).padStart(4, "0");

function scoreVoice(v: SpeechSynthesisVoice) {
  let s = 0;
  if (/natural|neural|online/i.test(v.name)) s += 4;
  if (/google/i.test(v.name)) s += 2;
  if (/en-gb|en-us|ar-sa|ar-eg/i.test(v.lang)) s += 1;
  return s;
}

function formatDate(date?: string) {
  if (!date) return "";
  try {
    return new Date(`${date}T06:00:00`).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return date;
  }
}

export default function LessonPlayer() {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [yourTurn, setYourTurn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState("");
  const [slow, setSlow] = useState(false);
  const [voiceNote, setVoiceNote] = useState<{ text: string; warn: boolean }>({ text: "Checking for an Arabic voice on this device…", warn: false });

  const run = useRef(0);
  const voices = useRef<Record<Lang, SpeechSynthesisVoice | null>>({ ar: null, en: null });
  const slowRef = useRef(false);
  const wake = useRef<WakeLockSentinel | null>(null);
  const helpRef = useRef<HTMLDetailsElement>(null);
  const lineRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  /* Voices load asynchronously on most browsers. */
  useEffect(() => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!synth) {
      const t = setTimeout(() => setVoiceNote({ text: "This browser can't play speech. Try Chrome or Edge.", warn: true }), 0);
      return () => clearTimeout(t);
    }
    const pick = () => {
      const all = synth.getVoices() || [];
      const best = (prefix: string) =>
        all.filter((v) => (v.lang || "").toLowerCase().replace("_", "-").startsWith(prefix)).sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] ?? null;
      voices.current = { ar: best("ar"), en: best("en") };
      if (!all.length) return;
      if (voices.current.ar) setVoiceNote({ text: `Arabic voice: ${voices.current.ar.name}`, warn: false });
      else {
        setVoiceNote({ text: "No Arabic voice found on this device yet. Follow the setup steps below.", warn: true });
        if (helpRef.current) helpRef.current.open = true;
      }
    };
    const first = setTimeout(pick, 0);
    synth.addEventListener("voiceschanged", pick);
    const t = setTimeout(pick, 1200);
    return () => {
      synth.removeEventListener("voiceschanged", pick);
      clearTimeout(first);
      clearTimeout(t);
    };
  }, []);

  const openLesson = useCallback(async (n: number) => {
    try {
      const res = await fetch(`${SOURCE}/lessons/${pad(n)}.json`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setLesson((await res.json()) as Lesson);
      setError(null);
    } catch {
      setError("This lesson couldn't load. Check your connection and try again.");
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${SOURCE}/index.json`, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { lessons?: Entry[] };
        const list = (data.lessons ?? []).filter((e) => typeof e.n === "number").sort((a, b) => a.n - b.n);
        setEntries(list);
        if (list.length) openLesson(list[list.length - 1].n);
      } catch {
        setEntries([]);
        setError("Lessons couldn't load. Check your connection and reload the page.");
      }
    })();
  }, [openLesson]);

  const releaseWake = () => {
    wake.current?.release().catch(() => {});
    wake.current = null;
  };

  const stop = useCallback(() => {
    run.current++;
    window.speechSynthesis?.cancel();
    setActive(null);
    setYourTurn(false);
    setPlaying(false);
    setStatus("");
    releaseWake();
  }, []);

  useEffect(() => () => stop(), [stop]);

  const speak = (text: string | undefined, lang: Lang, myRun: number) =>
    new Promise<number>((resolve) => {
      const synth = window.speechSynthesis;
      if (!synth || myRun !== run.current || !text) return resolve(0);
      const u = new SpeechSynthesisUtterance(text);
      const v = voices.current[lang];
      if (v) {
        u.voice = v;
        u.lang = v.lang;
      } else u.lang = lang === "ar" ? "ar-SA" : "en-GB";
      u.rate = lang === "ar" ? (slowRef.current ? 0.65 : 0.9) : 1;
      const t0 = Date.now();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(guard);
        resolve(Date.now() - t0);
      };
      // Some Android builds never fire onend; don't let playback hang.
      const guard = setTimeout(finish, Math.max(4000, (text.length * (lang === "ar" ? 260 : 110)) / u.rate) + 3000);
      u.onend = finish;
      u.onerror = finish;
      synth.speak(u);
    });

  const wait = (ms: number, myRun: number) =>
    new Promise<void>((r) => {
      if (myRun !== run.current) return r();
      setTimeout(r, ms);
    });

  const playLine = async (key: string, line: Line, myRun: number, pause: boolean) => {
    setActive(key);
    setYourTurn(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lineRefs.current[key]?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    const dur = await speak(line.ar, "ar", myRun);
    if (myRun !== run.current) return;
    if (pause) {
      setYourTurn(true);
      setStatus("Your turn: say it back.");
      await wait(Math.max(2000, dur * 1.3 + 900), myRun);
      if (myRun !== run.current) return;
      setYourTurn(false);
      setStatus("");
    } else await wait(350, myRun);
    await speak(line.en, "en", myRun);
    if (myRun !== run.current) return;
    await wait(500, myRun);
  };

  const begin = (msg: string) => {
    stop();
    const myRun = ++run.current;
    setPlaying(true);
    setStatus(msg);
    navigator.wakeLock?.request("screen").then((w) => (wake.current = w)).catch(() => {});
    return myRun;
  };

  const finish = (myRun: number, msg: string) => {
    if (myRun !== run.current) return;
    setActive(null);
    setPlaying(false);
    setStatus(msg);
    releaseWake();
  };

  const playOne = async (key: string, line: Line) => {
    const myRun = begin("Playing one line");
    await playLine(key, line, myRun, false);
    finish(myRun, "");
  };

  const playAll = async (pause: boolean) => {
    if (!lesson) return;
    const myRun = begin(pause ? "Playing with pauses" : "Playing the lesson");
    for (let i = 0; i < lesson.sections.length; i++) {
      const s = lesson.sections[i];
      setActive(null);
      sectionRefs.current[i]?.scrollIntoView({ block: "start", behavior: "smooth" });
      await speak(s.heading + (s.note ? `. ${s.note}` : ""), "en", myRun);
      if (myRun !== run.current) return;
      await wait(400, myRun);
      for (let j = 0; j < (s.lines ?? []).length; j++) {
        if (myRun !== run.current) return;
        await playLine(`${i}-${j}`, s.lines[j], myRun, pause);
      }
    }
    finish(myRun, "Lesson finished. Well done.");
  };

  const choose = (n: number) => {
    stop();
    openLesson(n);
  };

  const idx = lesson && entries ? entries.findIndex((e) => e.n === lesson.n) : -1;

  return (
    <section className={styles.player} aria-label="Arabic lessons">
      <div className={styles.top}>
        <div className={styles.nav}>
          <button className={styles.icon} aria-label="Previous lesson" disabled={idx <= 0} onClick={() => entries && choose(entries[idx - 1].n)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <select
            className={styles.select}
            aria-label="Choose a lesson"
            value={lesson ? String(lesson.n) : ""}
            onChange={(e) => choose(Number(e.target.value))}
            disabled={!entries?.length}
          >
            {!entries && <option value="">Loading lessons…</option>}
            {entries && !entries.length && <option value="">No lessons yet</option>}
            {entries?.map((e) => (
              <option key={e.n} value={String(e.n)}>
                Lesson {e.n} · {e.title}
              </option>
            ))}
          </select>
          <button
            className={styles.icon}
            aria-label="Next lesson"
            disabled={!entries || idx < 0 || idx >= entries.length - 1}
            onClick={() => entries && choose(entries[idx + 1].n)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        <p className={voiceNote.warn ? `${styles.voice} ${styles.warn}` : styles.voice}>{voiceNote.text}</p>
        <details className={styles.help} ref={helpRef}>
          <summary>Set up the Arabic voice</summary>
          <ol>
            <li><b>Android:</b> Settings → search “Text-to-speech” → Preferred engine: Speech Services by Google → tap the gear → Install voice data → Arabic. Then reload this page.</li>
            <li><b>Computer:</b> Microsoft Edge has the most natural Arabic voices. Chrome works too.</li>
            <li>Turn your volume up. Sound starts only after you tap play.</li>
          </ol>
        </details>
      </div>

      {error && <p className={styles.empty}>{error}</p>}
      {!error && entries && !entries.length && (
        <div className={styles.empty}>
          <p className={styles.ar} lang="ar" dir="rtl">أَهْلًا وَسَهْلًا</p>
          <p>The first lesson appears here at 6 AM.</p>
        </div>
      )}

      {lesson && !error && (
        <article className={styles.lesson}>
          <header className={styles.lessonHead}>
            <p className="label">
              Lesson {lesson.n}
              {lesson.date ? ` · ${formatDate(lesson.date)}` : ""}
            </p>
            {lesson.titleAr && (
              <p className={styles.titleAr} lang="ar" dir="rtl">
                الدَّرْسُ {arNum(lesson.n)} · {lesson.titleAr}
              </p>
            )}
            <h2 className="h-lg">{lesson.title}</h2>
          </header>

          {lesson.sections.map((s, i) => (
            <section key={i} className={styles.section} ref={(el) => { sectionRefs.current[i] = el; }}>
              <h3 className={styles.heading}>{s.heading}</h3>
              {s.note && <p className={styles.note}>{s.note}</p>}
              <div className={styles.lines}>
                {(s.lines ?? []).map((line, j) => {
                  const key = `${i}-${j}`;
                  const on = active === key;
                  return (
                    <div key={key} ref={(el) => { lineRefs.current[key] = el; }} className={on ? `${styles.line} ${styles.on}` : styles.line}>
                      <button className={styles.play} aria-label={`Play: ${line.en ?? "line"}`} onClick={() => playOne(key, line)}>
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                      </button>
                      <div className={styles.text}>
                        <p className={styles.ar} lang="ar" dir="rtl">
                          {line.who && <span className={styles.who}>{line.who}</span>}
                          {line.ar}
                        </p>
                        {line.en && <p className={styles.en}>{line.en}</p>}
                        {on && yourTurn && <p className={styles.turn}>Your turn</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </article>
      )}

      <div className={styles.bar} role="region" aria-label="Lesson player">
        <button className="btn" disabled={!lesson || playing} onClick={() => playAll(false)}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
          Play lesson
        </button>
        <button className="btn btn-outline" disabled={!lesson || playing} onClick={() => playAll(true)}>
          Play with pauses
        </button>
        <button
          className={styles.toggle}
          aria-pressed={slow}
          onClick={() => {
            const next = !slow;
            slowRef.current = next;
            setSlow(next);
          }}
        >
          Slow
        </button>
        <button className={styles.toggle} disabled={!playing} onClick={stop}>
          Stop
        </button>
        <p className={styles.status} aria-live="polite">{status}</p>
      </div>
    </section>
  );
}
