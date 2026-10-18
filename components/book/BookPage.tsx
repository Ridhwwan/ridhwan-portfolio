/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Page, Project } from "@/lib/projects";
import { Bubbles } from "@/components/three/Scene";

type Props = {
  project: Project;
  page: Page;
  n: number; // 1-based page number
  next?: Project;
  thumb?: boolean;
};

/** One page of a case-study book. Everything inside scales with the page (container units). */
export default function BookPage({ project: p, page, n, next, thumb }: Props) {
  const tone = "tone" in page && page.tone ? page.tone : "paper";
  return (
    <div className="bk-pagebox">
    <article className="bk-page" data-kind={page.kind} data-tone={tone} data-side={n % 2 === 0 ? "left" : "right"}>
      {page.kind !== "cover" && (
        <header className="bk-run" aria-hidden>
          <span>{p.short}</span>
          <span>{p.years}</span>
        </header>
      )}
      <div className="bk-body">{renderBody(p, page, next, thumb)}</div>
      {page.kind !== "cover" && <footer className="bk-folio">{n}</footer>}
    </article>
    </div>
  );
}

function renderBody(p: Project, page: Page, next?: Project, thumb?: boolean) {
  switch (page.kind) {
    case "cover":
      return (
        <div className="bk-cover">
          <div className="bk-cover-art">
            {p.slug === "bentosms" ? (
              thumb ? null : <Bubbles />
            ) : p.cover ? (
              <img src={p.cover} alt="" />
            ) : null}
            {p.slug === "bentosms" && <img className="bk-cover-logo" src="/work/bentosms-logo.png" alt="BentoSMS" />}
          </div>
          <div className="bk-cover-text">
            <h1 className="bk-title">{p.title}</h1>
            <p className="bk-sum">{p.summary}</p>
            <p className="bk-by">Ridhwan Salaudeen, {p.years}</p>
          </div>
        </div>
      );
    case "meta":
      return (
        <dl className="bk-meta">
          {p.role && (<><dt>Role</dt><dd>{p.role}</dd></>)}
          {p.team && (<><dt>Team</dt><dd>{p.team.map((t) => <span key={t}>{t}</span>)}</dd></>)}
          {p.contributions && (<><dt>Contributions</dt><dd className="bk-chips">{p.contributions.map((t) => <span key={t}>{t}</span>)}</dd></>)}
          {p.tools && (<><dt>Tools</dt><dd className="bk-chips">{p.tools.map((t) => <span key={t}>{t}</span>)}</dd></>)}
        </dl>
      );
    case "text":
      return (
        <div className="bk-text">
          <h2 className="bk-h">{page.heading}</h2>
          {page.body.map((b, i) => <p key={i}>{b}</p>)}
        </div>
      );
    case "statement":
      return <p className="bk-statement">{page.text}</p>;
    case "list":
      return (
        <div className="bk-text">
          <h2 className="bk-h">{page.heading}</h2>
          <ul className="bk-list">{page.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </div>
      );
    case "image":
      return (
        <figure className="bk-fig">
          <div className="bk-frame"><img src={page.src} alt={page.caption ?? ""} loading="lazy" style={{ objectFit: page.fit ?? "contain" }} /></div>
          {page.caption && <figcaption>{page.caption}</figcaption>}
        </figure>
      );
    case "images":
      return (
        <figure className="bk-fig">
          <div className="bk-stack">{page.srcs.map((s) => <div className="bk-frame" key={s}><img src={s} alt="" loading="lazy" /></div>)}</div>
          {page.caption && <figcaption>{page.caption}</figcaption>}
        </figure>
      );
    case "end":
      return (
        <div className="bk-end">
          <p className="bk-statement">Thanks for reading.</p>
          <nav className="bk-end-links">
            {next && <Link href={`/work/${next.slug}`} tabIndex={thumb ? -1 : 0}>Next: {next.short}</Link>}
            <Link href="/#work" tabIndex={thumb ? -1 : 0}>All work</Link>
            <Link href="/contact" tabIndex={thumb ? -1 : 0}>Send me a message</Link>
          </nav>
        </div>
      );
  }
}
