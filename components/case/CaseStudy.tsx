import type { Project } from "@/lib/projects";
import CaseHero from "./CaseHero";
import CaseSection from "./CaseSection";
import CaseNext from "./CaseNext";
import "./case.css";

/**
 * The shared case-study layout: a hero, then every section stacked in one scrolling page.
 * The project's theme (colours, fonts, decoration) is applied through CSS variables.
 */
export default function CaseStudy({ project: p, next }: { project: Project; next?: Project }) {
  const t = p.theme;
  const vars = {
    "--cs-stage": t.stage,
    "--cs-paper": t.paper,
    "--cs-ink": t.ink,
    "--cs-muted": t.muted,
    "--cs-accent": t.accent,
    "--cs-accent-ink": t.accentInk,
    "--cs-display": t.display,
    "--cs-body": t.body,
    "--cs-dw": t.displayWeight,
    "--cs-r": t.radius,
  } as React.CSSProperties;

  const sections = p.pages.filter((pg) => pg.kind !== "cover" && pg.kind !== "meta" && pg.kind !== "end");

  return (
    <article className="cs" data-deco={t.decoration} style={vars}>
      <CaseHero project={p} />
      {sections.map((pg, i) => (
        <CaseSection key={i} page={pg} />
      ))}
      <CaseNext next={next} />
    </article>
  );
}
