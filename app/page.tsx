import SectionIntro from "@/components/ui/SectionIntro";
import ButtonLink from "@/components/ui/ButtonLink";
import ProjectGrid from "@/components/ProjectGrid";
import WaterLily from "@/components/effects/WaterLily";
import LogoMarquee from "@/components/ui/LogoMarquee";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="wrap" id="work">
      <div className="hero-scene" style={{ position: "relative" }}>
        <WaterLily />
        <SectionIntro
          as="h1"
          layout="stacked"
          label="Product designer and front-end developer"
          title="I build scalable products that feel natural to use."
          text="Currently building BentoSMS at Bento Development. Previously designed for SOS Express, Alveum, Cendmate and Monievend."
          action={<ButtonLink href="/contact" variant="outline">Let&rsquo;s talk</ButtonLink>}
        />
      </div>
      <div className="home-logos"><LogoMarquee /></div>
      <ProjectGrid projects={projects} />
    </div>
  );
}
