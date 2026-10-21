import s from "./study.module.css";

type Props = { n: number; label: string; heading: string; intro?: string; dark?: boolean; children?: React.ReactNode };

/** Numbered section: "01 · LABEL", a headline, an intro paragraph, then its content. */
export default function StudySectionShell({ n, label, heading, intro, dark, children }: Props) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <section className={dark ? `${s.section} ${s.dark}` : s.section} aria-labelledby={id}>
      <div className={s.inner}>
        <p className={s.eyebrow}><span>{String(n).padStart(2, "0")}</span>{label}</p>
        <h2 id={id} className={s.h2}>{heading}</h2>
        {intro && <p className={s.intro}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}
