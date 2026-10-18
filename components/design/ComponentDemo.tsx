"use client";

import { useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import FilterChips from "@/components/ui/FilterChips";
import BackLink from "@/components/ui/BackLink";
import ViewToggle, { type View } from "@/components/ui/ViewToggle";
import PlaygroundCard from "@/components/playground/PlaygroundCard";
import ProjectWindow from "@/components/playground/ProjectWindow";
import type { PlaygroundItem } from "@/lib/playground";

import SectionIntro from "@/components/ui/SectionIntro";
import PageHeader from "@/components/ui/PageHeader";
import styles from "./design.module.css";

const SAMPLES: PlaygroundItem[] = [
  { id: "demo-kf", title: "KoreanFirst", summary: "Live specimen.", category: "Type design", year: 2026, href: null, cover: null, preview: null, embed: null, live: "koreanfirst", order: 1 },
  { id: "demo-drawn", title: "Sketch converter", summary: "Drawn placeholder until a screenshot is added.", category: "Code", year: null, href: null, cover: null, preview: null, embed: null, live: null, order: 2 },
];

/** Renders the real component so token edits preview on it directly. */
export default function ComponentDemo({ slug }: { slug: string }) {
  const [chip, setChip] = useState("All");
  const [view, setView] = useState<View>("grid");
  const [trying, setTrying] = useState<PlaygroundItem | null>(null);

  switch (slug) {
    case "button":
      return (
        <div className={styles.btnRow}>
          <ButtonLink href="#">Solid</ButtonLink>
          <ButtonLink href="#" variant="outline">Outline</ButtonLink>
        </div>
      );
    case "nav":
      return (
        <div className={styles.navDemo}>
          <span className={styles.navName}>Ridhwan Salaudeen</span>
          <span className={styles.navLinks}>
            <span aria-current="page">Work</span><span>About</span><span>Playground</span>
            <ButtonLink href="#">Resume</ButtonLink>
          </span>
        </div>
      );
    case "footer":
      return (
        <div className={styles.footerDemo}>
          <h2 className="h-lg" style={{ maxWidth: "16ch" }}>Want to work with me or be friends?</h2>
          <ButtonLink href="#" variant="outline">Send me a message</ButtonLink>
        </div>
      );
    case "section-intro":
      return <SectionIntro label="Product designer" title="I build products that feel natural to use." text="Currently building BentoSMS." action={<ButtonLink href="#" variant="outline">Let&rsquo;s talk</ButtonLink>} />;
    case "page-header":
      return <PageHeader label="About" title="A page title" subtitle="An optional serif subtitle" lede="And a lede line beneath it." />;
    case "filter-chips":
      return <FilterChips label="Demo" options={["All", "Type design", "Code", "Tools"]} value={chip} onChange={setChip} />;
    case "view-toggle":
      return <ViewToggle value={view} onChange={setView} />;
    case "back-link":
      return <BackLink href="#">All work</BackLink>;
    case "project-card":
    case "project-grid":
      return (
        <div className={styles.cardDemo}>
          <div className={styles.cardMedia} />
          <p className="label" style={{ marginTop: 18 }}>Web app, 2025</p>
          <h3 style={{ margin: "10px 0 0", fontSize: "var(--fs-card-title)", fontWeight: 550, letterSpacing: "-0.01em" }}>A project</h3>
          <p style={{ margin: "8px 0 0", color: "var(--ink-soft)", fontSize: 16 }}>One line about what it is.</p>
        </div>
      );
    case "playground-card":
    case "project-window":
      return (
        <>
          <ul className={styles.pgGrid}>
            {SAMPLES.map((it) => <PlaygroundCard key={it.id} item={it} view="grid" onTry={setTrying} />)}
          </ul>
          <p className={styles.demoHint}>Hover a card, then press Try it.</p>
          <ProjectWindow item={trying} onClose={() => setTrying(null)} />
        </>
      );
    case "contact-form":
      return (
        <div className={styles.formDemo}>
          <label><span className="label">Name</span><input type="text" /></label>
          <label><span className="label">Message</span><textarea rows={3} /></label>
          <ButtonLink href="#">Send message</ButtonLink>
        </div>
      );
    case "type-tester":
      return <p style={{ fontFamily: "var(--serif)", fontSize: 40 }}>Stay curious, build kindly</p>;
    case "case-study":
      return <p className={styles.demoHint}>Case studies use per-project themes, not the site tokens — only the label font and page margins follow the design system.</p>;
    default:
      return null;
  }
}
