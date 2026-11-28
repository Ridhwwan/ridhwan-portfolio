import SectionIntro from "@/components/ui/SectionIntro";
import ButtonLink from "@/components/ui/ButtonLink";
import ProjectGrid from "@/components/ProjectGrid";
import LogoMarquee from "@/components/ui/LogoMarquee";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

/** CAD project card — collage thumbnail linking to /cad. */
const cadProject: Project = {
  slug: "cad",
  platform: "Hardware",
  title: "CAD modelling",
  short: "CAD",
  years: "2026",
  summary: "Mechanical parts and everyday objects, modelled in Onshape.",
  featured: true,
  external: "/cad",
  cover: "/work/img/cad-collage.png",
  theme: { stage: "#1E1E22", paper: "#E0E0E4" },
};

/** Preview page — identical to Home but with the CAD project card added. */
export default function PreviewHome() {
  const withCad = [...projects, cadProject];
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
      <ProjectGrid projects={withCad} />
    </div>
  );
}
