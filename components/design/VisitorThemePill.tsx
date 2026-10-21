"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { visitorTokens } from "@/lib/visitor-tokens";
import styles from "./VisitorThemePill.module.css";

/**
 * Shown on every page (except the design system itself, which has its own bar)
 * while a visitor is browsing with their own design-system changes.
 */
export default function VisitorThemePill() {
  const path = usePathname();
  const count = useSyncExternalStore(visitorTokens.subscribe, visitorTokens.size, () => 0);
  if (!count || path.startsWith("/design-system")) return null;

  return (
    <div className={styles.pill} role="status" data-no-ripple>
      <span>You&rsquo;re seeing your own version of this site</span>
      <Link href="/design-system" className={styles.action}>Edit</Link>
      <button type="button" className={styles.action} onClick={() => visitorTokens.reset()}>Reset</button>
    </div>
  );
}
