/* eslint-disable @next/next/no-img-element */
import type { Page } from "@/lib/projects";
import Img from "@/components/ui/Img";

/** One section of a case study. Tone decides the band colour: paper, accent or stage. */
export default function CaseSection({ page }: { page: Page }) {
  const tone = "tone" in page && page.tone ? page.tone : "paper";
  return (
    <section className="cs-band" data-tone={tone} data-kind={page.kind}>
      <div className="wrap cs-inner">{body(page)}</div>
    </section>
  );
}

function body(page: Page) {
  switch (page.kind) {
    case "text":
      return (
        <div className="cs-split">
          <h2 className="cs-h">{page.heading}</h2>
          <div className="cs-copy">{page.body.map((b, i) => <p key={i}>{b}</p>)}</div>
        </div>
      );
    case "list":
      return (
        <div className="cs-split">
          <h2 className="cs-h">{page.heading}</h2>
          <ul className="cs-list">{page.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </div>
      );
    case "statement":
      return <p className="cs-statement">{page.text}</p>;
    case "image":
      return (
        <figure className="cs-fig">
          <div className="cs-frame"><Img src={page.src} alt={page.caption ?? ""} sizes="(max-width: 1200px) 100vw, 1200px" /></div>
          {page.caption && <figcaption>{page.caption}</figcaption>}
        </figure>
      );
    case "images":
      return (
        <figure className="cs-fig">
          <div className="cs-pair">
            {page.srcs.map((s) => <div className="cs-frame" key={s}><Img src={s} sizes="(max-width: 860px) 100vw, 50vw" /></div>)}
          </div>
          {page.caption && <figcaption>{page.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}
