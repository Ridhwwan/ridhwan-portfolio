"use client";

import { useEditor } from "./EditorProvider";
import type { TokenGroup } from "@/lib/design-tokens";
import ButtonLink from "@/components/ui/ButtonLink";
import { contrast, grade } from "@/lib/contrast";
import styles from "./design.module.css";

const PAIRS: [string, string, string][] = [
  ["Text on page", "--ink", "--bg"],
  ["Secondary text on page", "--ink-soft", "--bg"],
  ["Button text on button", "--btn-ink", "--btn-bg"],
  ["Text on placeholder fill", "--ink", "--tile"],
];

/** Live WCAG contrast for the colour pairs that actually appear together on the site. */
function ContrastTable({ values }: { values: Record<string, string> }) {
  return (
    <div className={styles.contrast}>
      <p className="label">Contrast checks</p>
      <ul>
        {PAIRS.map(([label, fg, bg]) => {
          const r = contrast(values[fg], values[bg]);
          const g = r === null ? "—" : grade(r);
          return (
            <li key={label} data-grade={g === "Fails" ? "fail" : g === "AA large only" ? "warn" : "pass"}>
              <span className={styles.contrastSample} style={{ color: `var(${fg})`, background: `var(${bg})` }}>Aa</span>
              <span>{label}</span>
              <span className={styles.contrastRatio}>{r === null ? "—" : `${r.toFixed(2)}:1`}</span>
              <span className={styles.contrastGrade}>{g}</span>
            </li>
          );
        })}
      </ul>
      <p className={styles.demoHint}>AA needs 4.5:1 for body text. These update as you edit.</p>
    </div>
  );
}

/** A live sample for each foundation group, styled entirely by the tokens so edits show instantly. */
export default function GroupDemo({ group }: { group: TokenGroup }) {
  const { values } = useEditor();

  if (group === "colors") {
    const swatches: [string, string][] = [
      ["Page", "--bg"], ["Text", "--ink"], ["Secondary", "--ink-soft"],
      ["Line", "--line"], ["Tile", "--tile"], ["Button", "--btn-bg"], ["Button text", "--btn-ink"],
    ];
    return (
      <div className={styles.demo}>
        <div className={styles.swatchGrid}>
          {swatches.map(([label, name]) => (
            <div key={name} className={styles.swatchCell}>
              <span className={styles.swatchChip} style={{ background: `var(${name})`, borderColor: "var(--line)" }} />
              <span className={styles.swatchName}>{label}</span>
              <code className={styles.swatchHex}>{values[name]}</code>
            </div>
          ))}
        </div>
        <ContrastTable values={values} />
        <div className={styles.demoCard}>
          <p className="label">In context</p>
          <h3 className="h-lg">Readable on the page</h3>
          <p>This paragraph uses the text colour on the page background. <span style={{ color: "var(--ink-soft)" }}>Secondary text sits a shade lighter.</span></p>
          <ButtonLink href="#">A button</ButtonLink>
        </div>
      </div>
    );
  }

  if (group === "typography") {
    return (
      <div className={styles.demo}>
        <p className="label">Label / eyebrow</p>
        <p className="h-xl" style={{ margin: "8px 0 0" }}>Page title in the headline font</p>
        <p className="h-lg" style={{ margin: "20px 0 0" }}>A section heading</p>
        <p style={{ marginTop: 16, maxWidth: "52ch" }}>
          Body text in the body font, at the base size. Everything scales from these few values, so a change here ripples
          through every page consistently.
        </p>
      </div>
    );
  }

  if (group === "spacing") {
    const bars: [string, string][] = [
      ["Section", "--space-section"], ["Page top", "--space-page-top"], ["Footer", "--space-footer"],
      ["Grid row", "--grid-gap-y"], ["Grid column", "--grid-gap-x"],
    ];
    return (
      <div className={styles.demo}>
        {bars.map(([label, name]) => (
          <div key={name} className={styles.spaceRow}>
            <span className={styles.spaceLabel}>{label}</span>
            <span className={styles.spaceBar} style={{ width: `var(${name})` }} />
            <code className={styles.swatchHex}>{values[name]}px</code>
          </div>
        ))}
        <p className={styles.demoHint}>Bars show the real size each value produces.</p>
      </div>
    );
  }

  if (group === "radius") {
    return (
      <div className={styles.demo}>
        <div className={styles.radiusRow}>
          <div className={styles.radiusBox} style={{ borderRadius: "var(--radius)" }}>
            <span>Images &amp; cards</span>
            <code className={styles.swatchHex}>{values["--radius"]}px</code>
          </div>
          <div className={styles.radiusBox} style={{ borderRadius: "var(--radius-control)" }}>
            <span>Controls</span>
            <code className={styles.swatchHex}>{values["--radius-control"]}px</code>
          </div>
        </div>
      </div>
    );
  }

  if (group === "motion") {
    return (
      <div className={styles.demo}>
        <p className={styles.demoHint}>Move your mouse across this box to make ripples, then pass it over the card.</p>
        <div style={{ height: 160, borderRadius: "var(--radius)", background: "repeating-linear-gradient(90deg, var(--tile) 0 24px, var(--bg) 24px 48px)" }} />
        <div data-lily style={{ maxWidth: 280, padding: 20, borderRadius: "var(--radius)", border: "1px solid var(--line)", background: "var(--bg)" }}>
          <p className="label">Lily pad</p>
          <p style={{ margin: "6px 0 0" }}>A project card drifts slightly as the cursor swims under it.</p>
        </div>
      </div>
    );
  }

  // buttons
  return (
    <div className={styles.demo}>
      <div className={styles.btnRow}>
        <ButtonLink href="#">Solid button</ButtonLink>
        <ButtonLink href="#" variant="outline">Outline button</ButtonLink>
      </div>
      <p className={styles.demoHint}>Chips and form fields share the same control radius.</p>
    </div>
  );
}
