import styles from "./PageHeader.module.css";

type Props = {
  label?: string;
  title: React.ReactNode;
  /** Sits directly under the title, larger than the lede. */
  subtitle?: React.ReactNode;
  lede?: React.ReactNode;
};

/** The opening block shared by every inner page: label, serif title, optional subtitle and lede. */
export default function PageHeader({ label, title, subtitle, lede }: Props) {
  return (
    <header className={styles.head}>
      {label && <p className="label">{label}</p>}
      <h1 className="h-xl">{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {lede && <p className={styles.lede}>{lede}</p>}
    </header>
  );
}
