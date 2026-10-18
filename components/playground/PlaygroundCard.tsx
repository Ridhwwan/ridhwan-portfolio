/* eslint-disable @next/next/no-img-element */
import SmartLink, { isExternal } from "@/components/ui/SmartLink";
import type { PlaygroundItem } from "@/lib/playground";
import styles from "./PlaygroundCard.module.css";

/** One Playground project: thumbnail, title, category and year, one-line summary. Row in list view, tile in grid view. */
export default function PlaygroundCard({ item, view = "list" }: { item: PlaygroundItem; view?: "list" | "grid" }) {
  const grid = view === "grid";
  const body = (
    <>
      <div className={styles.thumb}>
        {item.cover ? (
          <img src={item.cover} alt="" loading="lazy" />
        ) : (
          <span className={styles.mono} aria-hidden>{item.title.charAt(0)}</span>
        )}
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.meta}>
          {item.category}
          {item.year ? `, ${item.year}` : ""}
          {item.href && isExternal(item.href) ? <span className={styles.ext}>Opens in a new tab</span> : null}
        </p>
        {item.summary && <p className={styles.summary}>{item.summary}</p>}
      </div>
    </>
  );

  return (
    <li className={grid ? styles.tileItem : styles.item}>
      {item.href ? (
        <SmartLink href={item.href} className={grid ? styles.tile : styles.row}>{body}</SmartLink>
      ) : (
        <div className={grid ? styles.tile : styles.row}>{body}</div>
      )}
    </li>
  );
}
