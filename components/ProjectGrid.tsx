import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";
import styles from "./ProjectGrid.module.css";

/** Three-up grid of project cards (two on tablets, one on phones). */
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className={styles.grid}>
      {projects.map((p, i) => (
        <li key={p.slug}><ProjectCard p={p} priority={i < 3} /></li>
      ))}
    </ul>
  );
}
