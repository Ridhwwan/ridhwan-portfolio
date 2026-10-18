/* eslint-disable @next/next/no-img-element */
import type { Page } from "@/lib/projects";

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
          <div className="cs-frame"><img src={page.src} alt={page.caption ?? ""} loading="lazy" /></div>
          {page.caption && <figcaption>{page.caption}</figcaption>}
        </figure>
      );
    case "images":
      return (
        <figure className="cs-fig">
          <div className="cs-pair">
            {page.srcs.map((s) => <div className="cs-frame" key={s}><img src={s} alt="" loading="lazy" /></div>)}
          </div>
          {page.caption && <figcaption>{page.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}
