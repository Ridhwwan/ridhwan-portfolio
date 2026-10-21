import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StudyHero from "./StudyHero";
import StudySectionShell from "./StudySectionShell";
import StepTabs from "./StepTabs";
import Tldr from "./sections/Tldr";
import Context from "./sections/Context";
import Discovery from "./sections/Discovery";
import Users from "./sections/Users";
import Ideation from "./sections/Ideation";
import Outcomes from "./sections/Outcomes";
import Learnings from "./sections/Learnings";
import Story from "./sections/Story";
import Blocks from "./Blocks";
import SayHi from "./SayHi";
import type { Study as StudyData, StudySection } from "./types";
import s from "./study.module.css";

function Body({ sec, slug }: { sec: StudySection; slug: string }) {
  switch (sec.kind) {
    case "tldr": return <Tldr {...sec} />;
    case "context": return <Context {...sec} />;
    case "discovery": return <Discovery {...sec} />;
    case "users": return <Users {...sec} />;
    case "ideation": return <Ideation {...sec} />;
    case "final": return <StepTabs id={`${slug}-step`} steps={sec.steps} />;
    case "outcomes": return <Outcomes {...sec} />;
    case "learnings": return <Learnings {...sec} />;
    case "story": return <Story {...sec} />;
    case "blocks": return <Blocks blocks={sec.blocks} body={sec.body} />;
  }
}

function toneOf(sec: StudySection) {
  if (sec.kind === "outcomes") return "dark" as const;
  if (sec.kind === "blocks") return sec.tone ?? "plain";
  return "plain" as const;
}

/**
 * A long-form case study: hero, then numbered sections, then "next case study".
 * Light and airy, with the project's colour as the only accent.
 */
export default function Study({ study, next }: { study: StudyData; next?: { href: string; title: string } }) {
  return (
    <article className={s.study} style={{ "--study-accent": study.accent } as React.CSSProperties}>
      <div className={s.inner}><StudyHero study={study} /></div>
      {study.sections.map((sec, i) => (
        <StudySectionShell key={sec.label} n={i + 1} label={sec.label} heading={sec.heading} intro={"intro" in sec ? sec.intro : undefined} tone={toneOf(sec)}>
          <Body sec={sec} slug={study.slug} />
        </StudySectionShell>
      ))}
      <div className={s.inner}>
        {next && (
          <Link href={next.href} className={s.next}>
            <span><span className={s.mini}>Next case study</span><span className={s.nextTitle}>{next.title}</span></span>
            <span className={s.nextCta}>View next case study <ArrowRight aria-hidden size={16} /></span>
          </Link>
        )}
        <SayHi />
      </div>
    </article>
  );
}
