/* eslint-disable @next/next/no-img-element */
import SmartLink, { isExternal } from "@/components/ui/SmartLink";
import type { PlaygroundItem } from "@/lib/playground";
import styles from "./PlaygroundCard.module.css";

/** One Playground project: thumbnail, title, category and year, one-line summary. */
export default function PlaygroundCard({ item }: { item: PlaygroundItem }) {
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
    <li className={styles.item}>
      {item.href ? (
        <SmartLink href={item.href} className={styles.row}>{body}</SmartLink>
      ) : (
        <div className={styles.row}>{body}</div>
      )}
    </li>
  );
}
