import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Book from "@/components/book/Book";
import { caseStudies, getProject, publishedStudies } from "@/lib/projects";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: { images: p.cover ? [p.cover] : undefined },
    // Draft books (projects whose card links elsewhere) stay out of search.
    robots: p.external ? { index: false, follow: false } : undefined,
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = publishedStudies.indexOf(p);
  const next = publishedStudies[(i + 1) % publishedStudies.length];

  return (
    <>
      {p.theme.fonts && <link rel="stylesheet" href={p.theme.fonts} precedence="default" />}
      <Book project={p} next={next} />
    </>
  );
}
