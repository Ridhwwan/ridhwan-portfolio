import type { Metadata } from "next";
import Link from "next/link";
import { GROUPS } from "@/lib/design-tokens";
import { getTokens } from "@/lib/tokens";
import { isUnlocked } from "./actions";
import EditorProvider from "@/components/design/EditorProvider";
import SaveBar from "@/components/design/SaveBar";
import UnlockButton from "@/components/design/UnlockButton";
import styles from "@/components/design/design.module.css";

export const metadata: Metadata = {
  title: "Design system",
  description: "The living design system behind ridhwansalaudeen.com — colours, type, spacing, buttons and components, editable in place.",
  robots: { index: false },
};

export default async function DesignLayout({ children }: LayoutProps<"/design-system">) {
  const [{ values }, unlocked] = await Promise.all([getTokens(), isUnlocked()]);

  return (
    <EditorProvider initial={values} unlocked={unlocked}>
      <div className={`wrap ${styles.shell}`}>
        <aside className={styles.side}>
          <div className={styles.sideInner}>
            <Link href="/design-system" className={styles.sideHome}>Design system</Link>
            <nav className={styles.sideNav} aria-label="Design system">
              <span className={styles.sideGroup}>Foundations</span>
              {GROUPS.map((g) => (
                <Link key={g.id} href={`/design-system/${g.id}`}>{g.title}</Link>
              ))}
              <span className={styles.sideGroup}>Components</span>
              <Link href="/design-system/components">All components</Link>
            </nav>
            <UnlockButton unlocked={unlocked} />
          </div>
        </aside>
        <div className={styles.main}>{children}</div>
      </div>
      <SaveBar />
    </EditorProvider>
  );
}
