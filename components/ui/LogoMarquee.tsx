/* eslint-disable @next/next/no-img-element -- small logo files */
import { CLIENTS } from "@/lib/clients";
import styles from "./LogoMarquee.module.css";

/**
 * An endless row of client logos, in black and white until hovered.
 * The list is drawn twice so the loop is seamless; the copy is hidden from
 * screen readers. It stops moving for people who prefer reduced motion,
 * and pauses while hovered so a logo can be clicked.
 */
export default function LogoMarquee({ label = "Teams I've designed for" }: { label?: string }) {
  const row = (copy: boolean) => (
    <ul className={styles.row} aria-hidden={copy || undefined}>
      {CLIENTS.map((c) => {
        const img = <img src={c.logo} alt={copy ? "" : c.name} loading="lazy" decoding="async" />;
        return (
          <li key={c.name}>
            {c.href ? (
              <a href={c.href} target="_blank" rel="noreferrer" tabIndex={copy ? -1 : undefined} title={c.name}>{img}</a>
            ) : (
              <span title={c.name}>{img}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
  return (
    <section className={styles.marquee} aria-label={label}>
      <p className="label">{label}</p>
      <div className={styles.track}>
        <div className={styles.slide}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
