import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Book from "@/components/book/Book";
import { caseStudies, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, openGraph: { images: p.cover ? [p.cover] : undefined } };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = caseStudies.indexOf(p);
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <>
      {p.theme.fonts && <link rel="stylesheet" href={p.theme.fonts} precedence="default" />}
      <Book project={p} next={next} />
    </>
  );
}
