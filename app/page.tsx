import SectionIntro from "@/components/ui/SectionIntro";
import ButtonLink from "@/components/ui/ButtonLink";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="wrap" id="work">
      <SectionIntro
        as="h1"
        label="Product designer and front-end developer"
        title="I build scalable products that feel natural to use."
        text="Currently building BentoSMS at Bento Development. Previously designed for SOS Express, Alveum, Cendmate and Monievend."
        action={<ButtonLink href="/contact" variant="outline">Let&rsquo;s talk</ButtonLink>}
      />
      <ProjectGrid projects={projects} />
    </div>
  );
}
