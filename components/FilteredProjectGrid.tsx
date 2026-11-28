"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import FilterChips from "@/components/ui/FilterChips";
import type { Project } from "@/lib/projects";
import styles from "./ProjectGrid.module.css";

export type WorkCategory = "All" | "Product design" | "Physical product" | "CAD";

/** Map each project slug to a category. */
const CATEGORY_MAP: Record<string, WorkCategory> = {
  // Physical product
  miog1: "Physical product",
  // CAD — handled separately
};

/** Returns the category for a project. Defaults to "Product design". */
function getCategory(p: Project): WorkCategory {
  if (p.slug.startsWith("cad-")) return "CAD";
  return CATEGORY_MAP[p.slug] ?? "Product design";
}

const TABS: WorkCategory[] = ["All", "Product design", "Physical product", "CAD"];

type Props = {
  projects: Project[];
};

/** Project grid with category filter tabs. */
export default function FilteredProjectGrid({ projects }: Props) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => getCategory(p) === active);

  return (
    <>
      <FilterChips label="Filter projects" options={TABS} value={active} onChange={setActive} />
      <ul className={styles.grid}>
        {filtered.map((p, i) => (
          <li key={p.slug}>
            <ProjectCard p={p} priority={i < 3} />
          </li>
        ))}
      </ul>
    </>
  );
}
