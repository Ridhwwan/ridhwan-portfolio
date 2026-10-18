"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GROUPS, rootCss } from "@/lib/design-tokens";
import { COMPONENTS } from "@/lib/design-components";
import { useEditor } from "./EditorProvider";
import UnlockButton from "./UnlockButton";
import styles from "./design.module.css";

/** Section nav (with the current page marked), unlock control and a "copy CSS" helper. */
export default function DesignSidebar() {
  const path = usePathname();
  const { values } = useEditor();
  const [copied, setCopied] = useState(false);
  const here = (href: string) => (path === href ? "page" : undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(rootCss(values).replace(/;/g, ";\n  ").replace("{", "{\n  ").replace(/}$/, "\n}"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <aside className={styles.side}>
      <div className={styles.sideInner}>
        <Link href="/design-system" className={styles.sideHome} aria-current={here("/design-system")}>Design system</Link>
        <nav className={styles.sideNav} aria-label="Design system">
          <span className={styles.sideGroup}>Foundations</span>
          {GROUPS.map((g) => (
            <Link key={g.id} href={`/design-system/${g.id}`} aria-current={here(`/design-system/${g.id}`)}>{g.title}</Link>
          ))}
          <span className={styles.sideGroup}>Components</span>
          <Link href="/design-system/components" aria-current={here("/design-system/components")}>Overview</Link>
          {COMPONENTS.map((c) => (
            <Link key={c.slug} href={`/design-system/components/${c.slug}`} aria-current={here(`/design-system/components/${c.slug}`)} className={styles.sideSub}>
              {c.name}
            </Link>
          ))}
        </nav>
        <UnlockButton />
        <button type="button" className={styles.textBtn} onClick={() => void copy()}>
          {copied ? "Copied" : "Copy current tokens as CSS"}
        </button>
      </div>
    </aside>
  );
}
