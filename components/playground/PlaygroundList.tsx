"use client";

import { useEffect, useState } from "react";
import FilterChips from "@/components/ui/FilterChips";
import ViewToggle, { type View } from "@/components/ui/ViewToggle";
import PlaygroundCard from "./PlaygroundCard";
import type { PlaygroundItem } from "@/lib/playground";
import styles from "./PlaygroundList.module.css";

const ALL = "All";
const KEY = "playground-view";

/** Filter chips and a list/grid switch, then the (already sorted) projects. */
export default function PlaygroundList({ items }: { items: PlaygroundItem[] }) {
  const [filter, setFilter] = useState(ALL);
  const [view, setView] = useState<View>("list");
  const categories = [...new Set(items.map((i) => i.category))];
  const shown = filter === ALL ? items : items.filter((i) => i.category === filter);

  // Remember the visitor's layout choice (best-effort; storage can be blocked).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from storage after hydration
      if (saved === "grid" || saved === "list") setView(saved);
    } catch {}
  }, []);
  const choose = (v: View) => {
    setView(v);
    try { localStorage.setItem(KEY, v); } catch {}
  };

  if (!items.length) {
    return <p className={styles.empty}>Nothing here yet. New projects appear as soon as they&rsquo;re published.</p>;
  }

  return (
    <section className={styles.wrap} aria-label="Projects">
      <div className={styles.bar}>
        {categories.length > 1 ? (
          <FilterChips label="Filter projects" options={[ALL, ...categories]} value={filter} onChange={setFilter} />
        ) : <span />}
        <ViewToggle value={view} onChange={choose} />
      </div>
      <ul className={view === "grid" ? styles.grid : styles.list}>
        {shown.map((item) => <PlaygroundCard key={item.id} item={item} view={view} />)}
      </ul>
    </section>
  );
}
