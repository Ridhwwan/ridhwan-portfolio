import Stats from "./blocks/Stats";
import Quote from "./blocks/Quote";
import Callout from "./blocks/Callout";
import BeforeAfter from "./blocks/BeforeAfter";
import Problem from "./blocks/Problem";
import Decisions from "./blocks/Decisions";
import Features from "./blocks/Features";
import Phases from "./blocks/Phases";
import Archetypes from "./blocks/Archetypes";
import Rows from "./blocks/Rows";
import Table from "./blocks/Table";
import Reflections from "./blocks/Reflections";
import Images from "./blocks/Images";
import type { Block } from "./types";
import s from "./study.module.css";

function One({ b }: { b: Block }) {
  switch (b.type) {
    case "stats": return <Stats {...b} />;
    case "quote": return <Quote {...b} />;
    case "callout": return <Callout {...b} />;
    case "beforeAfter": return <BeforeAfter {...b} />;
    case "problem": return <Problem {...b} />;
    case "decisions": return <Decisions {...b} />;
    case "features": return <Features {...b} />;
    case "phases": return <Phases {...b} />;
    case "archetypes": return <Archetypes {...b} />;
    case "rows": return <Rows {...b} />;
    case "table": return <Table {...b} />;
    case "reflections": return <Reflections {...b} />;
    case "images": return <Images {...b} />;
  }
}

/** Renders a "blocks" section's content in order, evenly spaced. */
export default function Blocks({ blocks, body }: { blocks: Block[]; body?: string[] }) {
  return (
    <div className={s.blocks}>
      {body?.map((t) => <p key={t} className={s.intro}>{t}</p>)}
      {blocks.map((b, i) => <One key={i} b={b} />)}
    </div>
  );
}
