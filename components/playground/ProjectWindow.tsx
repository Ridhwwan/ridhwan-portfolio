"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import TypeTester from "@/components/type/TypeTester";
import type { PlaygroundItem } from "@/lib/playground";
import styles from "./ProjectWindow.module.css";

/**
 * A desktop-style window that opens over the page so visitors can use a
 * project without leaving. Built-in previews render directly; anything else
 * loads in a sandboxed frame. Full-screen on phones. Esc or ✕ closes it.
 */
export default function ProjectWindow({ item, onClose }: { item: PlaygroundItem | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (item && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!item && d.open) d.close();
    if (!item) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset per opened project
    setLoaded(false);
    setSlow(false);
    const t = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(t);
  }, [item]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const closed = () => { document.documentElement.style.overflow = ""; onClose(); };
    d.addEventListener("close", closed);
    return () => d.removeEventListener("close", closed);
  }, [onClose]);

  const external = item?.href && /^https?:/.test(item.href) ? item.href : item?.embed ?? item?.href ?? null;
  const sleepy = !!item?.embed && /streamlit\.app/.test(item.embed);

  return (
    <dialog
      ref={dialog}
      className={styles.window}
      aria-labelledby="pw-title"
      onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }}
    >
      {item && (
        <div className={styles.frame}>
          <header className={styles.bar}>
            <span className={styles.lights} aria-hidden><i /><i /><i /></span>
            <h2 id="pw-title" className={styles.title}>{item.title}</h2>
            <div className={styles.actions}>
              {external && (
                <a href={external} target={external.startsWith("/") ? undefined : "_blank"} rel="noreferrer" className={styles.open}>
                  {external.startsWith("/") ? "Full page" : "Open in new tab"} <ArrowUpRight aria-hidden size={15} />
                </a>
              )}
              <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close window" autoFocus>
                <X aria-hidden size={18} />
              </button>
            </div>
          </header>

          <div className={styles.body}>
            {item.live === "koreanfirst" ? (
              // The tester's control bar sticks under the site nav; inside the window there is no nav.
              <div className={styles.live} style={{ "--nav-height": "0px" } as React.CSSProperties}>
                <TypeTester autoFocus initialSize={typeof window !== "undefined" && window.innerWidth < 700 ? 64 : 120} />
              </div>
            ) : item.embed ? (
              <>
                {!loaded && (
                  <div className={styles.loading} role="status">
                    <span className={styles.spinner} aria-hidden />
                    <p>Loading {item.title}…</p>
                    {sleepy && <p className={styles.hint}>This app sleeps when no one is using it, so the first load can take up to half a minute.</p>}
                    {slow && external && (
                      <p className={styles.hint}>
                        Taking a while? <a href={external} target="_blank" rel="noreferrer">Open it in a new tab</a> instead.
                      </p>
                    )}
                  </div>
                )}
                <iframe
                  key={item.id}
                  src={item.embed}
                  title={item.title}
                  className={styles.frameEl}
                  data-loaded={loaded || undefined}
                  onLoad={() => setLoaded(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals"
                  allow="clipboard-write; fullscreen"
                  loading="eager"
                />
              </>
            ) : null}
          </div>
        </div>
      )}
    </dialog>
  );
}
