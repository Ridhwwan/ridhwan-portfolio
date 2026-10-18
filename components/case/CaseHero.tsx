/* eslint-disable @next/next/no-img-element */
import BackLink from "@/components/ui/BackLink";
import type { Project } from "@/lib/projects";

/** Title, summary, the project facts, and the cover image. */
export default function CaseHero({ project: p }: { project: Project }) {
  const facts = [
    { label: "Role", items: p.role ? [p.role] : [] },
    { label: "Team", items: p.team ?? [] },
    { label: "Contributions", items: p.contributions ?? [] },
    { label: "Tools", items: p.tools ?? [] },
  ].filter((f) => f.items.length);

  return (
    <header className="cs-hero">
      <div className="wrap">
        <BackLink href="/#work">All work</BackLink>
        <p className="cs-label">{p.platform}, {p.years}</p>
        <h1 className="cs-title">{p.title}</h1>
        <p className="cs-summary">{p.summary}</p>

        {facts.length > 0 && (
          <dl className="cs-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                {f.items.map((it) => <dd key={it}>{it}</dd>)}
              </div>
            ))}
          </dl>
        )}

        <div className="cs-cover">
          {p.cover ? (
            <img src={p.cover} alt="" />
          ) : p.slug === "bentosms" ? (
            <div className="cs-cover-bento" aria-hidden>
              <span /><span /><span /><span />
              <img src="/work/bentosms-logo.png" alt="" />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
