"use client";

import { useState } from "react";
import FilterChips from "@/components/ui/FilterChips";
import PlaygroundCard from "./PlaygroundCard";
import type { PlaygroundItem } from "@/lib/playground";
import styles from "./PlaygroundList.module.css";

const ALL = "All";

/** Filter chips built from the projects' categories, then the (already sorted) list. */
export default function PlaygroundList({ items }: { items: PlaygroundItem[] }) {
  const [filter, setFilter] = useState(ALL);
  const categories = [...new Set(items.map((i) => i.category))];
  const shown = filter === ALL ? items : items.filter((i) => i.category === filter);

  if (!items.length) {
    return <p className={styles.empty}>Nothing here yet. New projects appear as soon as they&rsquo;re published.</p>;
  }

  return (
    <section className={styles.wrap} aria-label="Projects">
      {categories.length > 1 && (
        <FilterChips label="Filter projects" options={[ALL, ...categories]} value={filter} onChange={setFilter} />
      )}
      <ul className={styles.list}>
        {shown.map((item) => <PlaygroundCard key={item.id} item={item} />)}
      </ul>
    </section>
  );
}
