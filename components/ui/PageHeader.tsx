import styles from "./PageHeader.module.css";

type Props = {
  title: React.ReactNode;
  /** Sits directly under the title, larger than the lede. */
  subtitle?: React.ReactNode;
  lede?: React.ReactNode;
  /** Optional right-hand visual, e.g. a 3D object. */
  aside?: React.ReactNode;
};

/** The opening block shared by every inner page. */
export default function PageHeader({ title, subtitle, lede, aside }: Props) {
  return (
    <header className={`${styles.head} ${aside ? styles.withAside : ""}`}>
      <div className={styles.text}>
        <h1 className="h-xl">{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {lede && <p className="lede">{lede}</p>}
      </div>
      {aside && <div className={styles.aside} aria-hidden>{aside}</div>}
    </header>
  );
}
