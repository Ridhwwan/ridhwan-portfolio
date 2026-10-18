import { notFound } from "next/navigation";
import Link from "next/link";
import { COMPONENTS, getComponent } from "@/lib/design-components";
import { TOKEN_MAP } from "@/lib/design-tokens";
import ComponentDemo from "@/components/design/ComponentDemo";
import TokenControl from "@/components/design/TokenControl";
import SmartLink from "@/components/ui/SmartLink";
import BackLink from "@/components/ui/BackLink";
import styles from "@/components/design/design.module.css";

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.slug }));
}

export default async function ComponentPage({ params }: PageProps<"/design-system/components/[slug]">) {
  const { slug } = await params;
  const c = getComponent(slug);
  if (!c) notFound();

  // Ties: other components that share at least one token, and which tokens they share.
  const related = COMPONENTS.filter((o) => o.slug !== c.slug)
    .map((o) => ({ comp: o, shared: o.tokens.filter((t) => c.tokens.includes(t)) }))
    .filter((r) => r.shared.length > 0)
    .sort((a, b) => b.shared.length - a.shared.length);

  return (
    <div className={styles.page}>
      <BackLink href="/design-system/components">Components</BackLink>
      <header className={styles.pageHead}>
        <h1 className="h-xl">{c.name}</h1>
        <p className={styles.heroLede}>{c.description}</p>
        <code className={styles.fileTag}>{c.file}</code>
      </header>

      <section className={styles.preview}>
        <h2 className="label">Live preview</h2>
        <div className={styles.demo}><ComponentDemo slug={c.slug} /></div>
      </section>

      <section className={styles.section}>
        <h2 className="label">Tokens it uses</h2>
        <div className={styles.controlGrid}>
          {c.tokens.map((name) => {
            const def = TOKEN_MAP.get(name);
            if (!def) return null;
            return (
              <div key={name} className={styles.controlCard}>
                <TokenControl name={name} />
                <p className={styles.affects}><Link href={`/design-system/${def.group}`}>In {def.group}</Link></p>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className="label">Where it&rsquo;s used</h2>
        <ul className={styles.usedList}>
          {c.usedOn.map((u) => (
            <li key={u.label}><SmartLink href={u.href}>{u.label}</SmartLink></li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className={styles.section}>
          <h2 className="label">How it ties to other components</h2>
          <p className={styles.tieIntro}>
            These components share tokens with {c.name}, so editing a shared token changes them together — that&rsquo;s what
            keeps the interface cohesive.
          </p>
          <ul className={styles.tieList}>
            {related.map(({ comp, shared }) => (
              <li key={comp.slug}>
                <Link href={`/design-system/components/${comp.slug}`} className={styles.tieName}>{comp.name}</Link>
                <span className={styles.tieShared}>
                  shares {shared.map((t) => <code key={t}>{TOKEN_MAP.get(t)?.label ?? t}</code>).reduce((a, b) => <>{a}, {b}</>)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
