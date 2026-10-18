import Link from "next/link";
import styles from "./BackLink.module.css";

/** Small "‹ Parent" link at the top of a nested page. */
export default function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.back}>{children}</Link>;
}
