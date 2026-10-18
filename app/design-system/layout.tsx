import type { Metadata } from "next";
import { getTokens } from "@/lib/tokens";
import EditorProvider from "@/components/design/EditorProvider";
import DesignSidebar from "@/components/design/DesignSidebar";
import SaveBar from "@/components/design/SaveBar";
import styles from "@/components/design/design.module.css";

export const metadata: Metadata = {
  title: { default: "Design system", template: "%s — Design system" },
  description: "The living design system behind ridhwansalaudeen.com — colours, type, spacing, buttons and components, editable in place.",
  robots: { index: false },
};

export default async function DesignLayout({ children }: LayoutProps<"/design-system">) {
  const { values } = await getTokens();
  return (
    <EditorProvider initial={values}>
      <div className={`wrap ${styles.shell}`}>
        <DesignSidebar />
        <div className={styles.main}>{children}</div>
      </div>
      <SaveBar />
    </EditorProvider>
  );
}
