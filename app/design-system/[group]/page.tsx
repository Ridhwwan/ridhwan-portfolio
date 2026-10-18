import { notFound } from "next/navigation";
import Link from "next/link";
import { GROUPS, TOKENS, type TokenGroup } from "@/lib/design-tokens";
import { affectedBy } from "@/lib/design-components";
import GroupDemo from "@/components/design/GroupDemo";
import TokenControl from "@/components/design/TokenControl";
import BackLink from "@/components/ui/BackLink";
import styles from "@/components/design/design.module.css";

export function generateStaticParams() {
  return GROUPS.map((g) => ({ group: g.id }));
}

export default async function GroupPage({ params }: PageProps<"/design-system/[group]">) {
  const { group } = await params;
  const meta = GROUPS.find((g) => g.id === group);
  if (!meta) notFound();
  const tokens = TOKENS.filter((t) => t.group === (group as TokenGroup));

  return (
    <div className={styles.page}>
      <BackLink href="/design-system">Design system</BackLink>
      <header className={styles.pageHead}>
        <h1 className="h-xl">{meta.title}</h1>
        <p className={styles.heroLede}>{meta.intro}</p>
      </header>

      <section className={styles.preview}>
        <h2 className="label">Live preview</h2>
        <GroupDemo group={group as TokenGroup} />
      </section>

      <section className={styles.section}>
        <h2 className="label">How these connect</h2>
        <ul className={styles.ties}>
          {meta.ties.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className="label">Tokens</h2>
        <div className={styles.controlGrid}>
          {tokens.map((t) => {
            const used = affectedBy(t.name);
            return (
              <div key={t.name} className={styles.controlCard}>
                <TokenControl name={t.name} />
                {used.length > 0 && (
                  <p className={styles.affects}>
                    <span>Affects</span>{" "}
                    {used.map((c, i) => (
                      <span key={c.slug}>
                        <Link href={`/design-system/components/${c.slug}`}>{c.name}</Link>
                        {i < used.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
