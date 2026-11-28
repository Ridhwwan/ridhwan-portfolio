import SectionIntro from "@/components/ui/SectionIntro";
import ButtonLink from "@/components/ui/ButtonLink";
import FilteredProjectGrid from "@/components/FilteredProjectGrid";
import LogoMarquee from "@/components/ui/LogoMarquee";
import { projects } from "@/lib/projects";
import { cadModels } from "@/lib/cad-models";
import type { Project } from "@/lib/projects";

/** Convert each CAD model into a Project card. */
const cadProjects: Project[] = cadModels.map((m) => ({
  slug: `cad-${m.id}`,
  platform: "Hardware" as const,
  title: m.name,
  short: m.name,
  years: "2026",
  summary: "CAD model designed in Onshape.",
  external: m.link,
  cover: m.thumbnail,
  theme: { stage: "#1E1E22", paper: "#E0E0E4" },
}));

/** All projects combined — regular + CAD models. */
const allProjects: Project[] = [...projects, ...cadProjects];

/**
 * Preview landing page with filtered project tabs:
 * All | Product design | Physical product | CAD
 */
export default function PreviewHome2() {
  return (
    <div className="wrap" id="work">
      <SectionIntro
        as="h1"
        layout="stacked"
        label="Product designer and front-end developer"
        title="I build scalable products that feel natural to use."
        text="Currently building BentoSMS at Bento Development. Previously designed for SOS Express, Alveum, Cendmate and Monievend."
        action={<ButtonLink href="/contact" variant="outline">Let&rsquo;s talk</ButtonLink>}
      />
      <div className="home-logos"><LogoMarquee /></div>
      <FilteredProjectGrid projects={allProjects} />
    </div>
  );
}
