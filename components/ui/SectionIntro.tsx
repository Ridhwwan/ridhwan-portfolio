import styles from "./SectionIntro.module.css";

type Props = {
  label?: string;
  title: React.ReactNode;
  /** Right-hand column: short text and/or an action. */
  text?: React.ReactNode;
  action?: React.ReactNode;
  as?: "h1" | "h2";
};

/** Label + serif headline on the left, short text and an action on the right. */
export default function SectionIntro({ label, title, text, action, as: H = "h2" }: Props) {
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
