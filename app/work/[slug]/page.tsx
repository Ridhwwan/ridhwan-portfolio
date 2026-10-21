import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Study from "@/components/study/Study";
import { caseStudies, getProject, publishedStudies } from "@/lib/projects";
import { STUDIES } from "@/lib/studies";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const study = STUDIES[slug];
  return {
    title: p.title,
    description: study.hero.intro,
    openGraph: { images: [study.hero.image.src] },
    // Drafts (projects whose card links elsewhere) stay out of search.
    robots: p.external ? { index: false, follow: false } : undefined,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = publishedStudies.indexOf(p);
  const n = publishedStudies[(i + 1) % publishedStudies.length];
  const next = n && n !== p ? { href: `/work/${n.slug}`, title: n.short } : undefined;
  return <Study study={STUDIES[slug]} next={next} />;
}
