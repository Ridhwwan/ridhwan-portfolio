import Link from "next/link";
import type { Project } from "@/lib/projects";

/** End of a case study: the next project, and a way back to all work. */
export default function CaseNext({ next }: { next?: Project }) {
  return (
    <nav className="cs-next" aria-label="More work">
      <div className="wrap">
        {next && (
          <Link href={`/work/${next.slug}`} className="cs-next-link">
            <span className="cs-label">Next project</span>
            <span className="cs-next-title">{next.title}</span>
          </Link>
        )}
        <Link href="/#work" className="cs-all">All work</Link>
      </div>
    </nav>
  );
}
