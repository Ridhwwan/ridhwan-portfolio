import Link from "next/link";
import { COMPONENTS } from "@/lib/design-components";
import BackLink from "@/components/ui/BackLink";
import styles from "@/components/design/design.module.css";

export default function ComponentsIndex() {
  return (
    <div className={styles.page}>
      <BackLink href="/design-system">Design system</BackLink>
      <header className={styles.pageHead}>
        <h1 className="h-xl">Components</h1>
        <p className={styles.heroLede}>
          The reusable building blocks of the site. Each one is styled only by tokens, so it stays consistent wherever it
          appears. Open one to see it live, edit its tokens, and read how it ties to the rest.
        </p>
      </header>

      <div className={styles.compList}>
        {COMPONENTS.map((c) => (
          <Link key={c.slug} href={`/design-system/components/${c.slug}`} className={styles.compRow}>
            <div>
              <h2 className={styles.compName}>{c.name}</h2>
              <p className={styles.compDesc}>{c.description}</p>
            </div>
            <div className={styles.compMeta}>
              <span>{c.tokens.length} tokens</span>
              <code>{c.file}</code>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
