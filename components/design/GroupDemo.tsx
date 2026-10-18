"use client";

import { useEditor } from "./EditorProvider";
import type { TokenGroup } from "@/lib/design-tokens";
import ButtonLink from "@/components/ui/ButtonLink";
import styles from "./design.module.css";

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
        <h1 className="h-xl" style={{ margin: "8px 0 0" }}>Page title in the headline font</h1>
        <h2 className="h-lg" style={{ margin: "20px 0 0" }}>A section heading</h2>
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
