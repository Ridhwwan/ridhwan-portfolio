import s from "./study.module.css";

type Props = { n: number; label: string; heading: string; intro?: string; tone?: "plain" | "tint" | "dark"; children?: React.ReactNode };

/** Numbered section: "01 · LABEL", a headline, an intro paragraph, then its content. Tint and dark change the band. */
export default function StudySectionShell({ n, label, heading, intro, tone = "plain", children }: Props) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const cls = tone === "dark" ? `${s.section} ${s.dark}` : tone === "tint" ? `${s.section} ${s.tint}` : s.section;
  return (
    <section className={cls} aria-labelledby={id}>
      <div className={s.inner}>
        <p className={s.eyebrow}><span>{String(n).padStart(2, "0")}</span>{label}</p>
        <h2 id={id} className={s.h2}>{heading}</h2>
        {intro && <p className={s.intro}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}
