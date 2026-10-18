"use client";

import { useRef } from "react";
import { AppWindow } from "lucide-react";
import SmartLink, { isExternal } from "@/components/ui/SmartLink";
import type { PlaygroundItem } from "@/lib/playground";
import PlaygroundThumb from "./PlaygroundThumb";
import { useActivePreview } from "./useActivePreview";
import styles from "./PlaygroundCard.module.css";

type Props = {
  item: PlaygroundItem;
  view?: "list" | "grid";
  /** Opens the project in the in-page window. Only shown for projects that can run there. */
  onTry?: (item: PlaygroundItem) => void;
};

/**
 * One Playground project. The thumbnail comes alive on hover (or when scrolled
 * into view on touch screens); "Try it" opens the project in a window on the page.
 * The title link stretches over the card, so the whole card stays clickable.
 */
export default function PlaygroundCard({ item, view = "list", onTry }: Props) {
  const grid = view === "grid";
  const ref = useRef<HTMLElement>(null);
  const active = useActivePreview(ref);
  const canTry = !!onTry && (!!item.embed || !!item.live);

  return (
    <li className={grid ? styles.tileItem : styles.item}>
      <article ref={ref} className={grid ? styles.tile : styles.row} data-active={active || undefined}>
        <div className={styles.thumb}>
          <PlaygroundThumb item={item} active={active} />
        </div>
        <div className={styles.text}>
          <h3 className={styles.title}>
            {item.href ? <SmartLink href={item.href} className={styles.stretch}>{item.title}</SmartLink> : item.title}
          </h3>
          <p className={styles.meta}>
            {item.category}
            {item.year ? `, ${item.year}` : ""}
            {item.href && isExternal(item.href) ? <span className={styles.ext}>Opens in a new tab</span> : null}
          </p>
          {item.summary && <p className={styles.summary}>{item.summary}</p>}
        </div>
        {canTry && (
          <button type="button" className={`btn btn-outline ${styles.try}`} onClick={() => onTry!(item)}>
            <AppWindow aria-hidden size={16} strokeWidth={1.75} /> Try it
          </button>
        )}
      </article>
    </li>
  );
}
