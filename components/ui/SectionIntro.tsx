import styles from "./SectionIntro.module.css";

type Props = {
  label?: string;
  title: React.ReactNode;
  /** Right-hand column (default) or below the headline (stacked). */
  text?: React.ReactNode;
  action?: React.ReactNode;
  /** Inline note shown beside the action button (stacked only). */
  actionNote?: React.ReactNode;
  as?: "h1" | "h2";
  /** "split" (default): headline left, text right. "stacked": everything top-to-bottom, full width. */
  layout?: "split" | "stacked";
};

/** Label + serif headline on the left, short text and an action on the right. */
export default function SectionIntro({ label, title, text, action, actionNote, as: H = "h2", layout = "split" }: Props) {
  if (layout === "stacked") {
    return (
      <header className={styles.stacked}>
        {label && <p className="label">{label}</p>}
        <H className="h-xl">{title}</H>
        {text && <p className={styles.stackedText}>{text}</p>}
        {(action || actionNote) && (
          <div className={styles.stackedActions}>
            {action}
            {actionNote && <span className={styles.actionNote}>{actionNote}</span>}
          </div>
        )}
      </header>
    );
  }

  return (
    <header className={styles.intro}>
      <div className={styles.left}>
        {label && <p className="label">{label}</p>}
        <H className="h-xl">{title}</H>
      </div>
      {(text || action) && (
        <div className={styles.right}>
          {text && <p className={styles.text}>{text}</p>}
          {action}
        </div>
      )}
    </header>
  );
}
