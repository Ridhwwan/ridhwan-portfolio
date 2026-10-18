import Link from "next/link";
import Hello from "@/components/Hello";
import ProjectCard from "@/components/ProjectCard";
import { GlassCubes } from "@/components/three/Scene";
import { projects } from "@/lib/projects";
import styles from "./home.module.css";

const clients = ["SOS Express", "Cendmate", "Monievend", "Alpha Academy", "JJAIBOT", "Bento"];

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.stage}>
          <GlassCubes />
        </div>
        <div className={`wrap ${styles.heroInner}`}>
          <Hello />
          <div className={styles.intro}>
            <p className="lede">
              I&rsquo;m Ridhwan, a product designer who builds scalable products that feel natural to use.
            </p>
            <Link href="/contact" className="btn">Let&rsquo;s talk</Link>
          </div>
        </div>
      </section>

      <section className="wrap" aria-label="Teams I've worked with">
        <ul className={styles.clients}>
          {clients.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>

      <section id="work" className={`wrap ${styles.work}`}>
        <h2 className="h-lg">Selected work</h2>
        <div className={styles.featured}>
          {featured.map((p) => <ProjectCard key={p.slug} p={p} size="feature" />)}
        </div>
        <div className={styles.grid}>
          {rest.map((p) => <ProjectCard key={p.slug} p={p} size="standard" />)}
        </div>
      </section>
    </>
  );
}
