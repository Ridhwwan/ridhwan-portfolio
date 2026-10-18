import Link from "next/link";
import { GROUPS, TOKENS } from "@/lib/design-tokens";
import { COMPONENTS } from "@/lib/design-components";
import styles from "@/components/design/design.module.css";

export default function DesignSystemHome() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className="label">Living design system</p>
        <h1 className="h-xl">The pieces this site is built from, and how they fit together.</h1>
        <p className={styles.heroLede}>
          Every colour, size, font and spacing value on the site is a token defined once and used everywhere. Change one
          here and it updates across every page that uses it. {TOKENS.length} tokens drive {COMPONENTS.length} shared components.
        </p>
        <p className={styles.heroNote}>
          Anyone can drag a slider or pick a colour to preview a change in their own browser. Saving — which changes the
          real site for everyone — needs the edit password (unlock in the sidebar).
        </p>
      </header>

      <section className={styles.section}>
        <h2 className="label">Foundations</h2>
        <div className={styles.cardGrid}>
          {GROUPS.map((g) => {
            const count = TOKENS.filter((t) => t.group === g.id).length;
            return (
              <Link key={g.id} href={`/design-system/${g.id}`} className={styles.card}>
                <span className={styles.cardCount}>{count}</span>
                <span className={styles.cardName}>{g.title}</span>
                <span className={styles.cardDesc}>{g.intro}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className="label">Components</h2>
        <div className={styles.cardGrid}>
          {COMPONENTS.map((c) => (
            <Link key={c.slug} href={`/design-system/components/${c.slug}`} className={styles.card}>
              <span className={styles.cardCount}>{c.tokens.length}</span>
              <span className={styles.cardName}>{c.name}</span>
              <span className={styles.cardDesc}>{c.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
