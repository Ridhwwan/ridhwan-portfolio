import { EMAIL, GITHUB_URL, X_URL } from "@/lib/contact";
import styles from "./ContactLinks.module.css";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.1 14.43Z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

type Channel = "email" | "x" | "github";
type Props = { showEmailText?: boolean; className?: string; only?: Channel[] };

/** Icon links for reaching Ridhwan directly: email (opens the visitor's mail app), X and GitHub. */
export default function ContactLinks({ showEmailText = false, className, only = ["email", "x", "github"] }: Props) {
  return (
    <ul className={`${styles.list} ${className ?? ""}`} aria-label="Other ways to reach me">
      {only.includes("email") && <li>
        <a className={styles.link} href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`} title="Email me">
          <MailIcon />
          {showEmailText && <span className={styles.text}>{EMAIL}</span>}
        </a>
      </li>}
      {only.includes("x") && <li>
        <a className={styles.link} href={X_URL} target="_blank" rel="noreferrer" aria-label="X (Twitter): @Ridhwwan" title="@Ridhwwan on X">
          <XIcon />
        </a>
      </li>}
      {only.includes("github") && <li>
        <a className={styles.link} href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub: Ridhwwan" title="GitHub">
          <GitHubIcon />
        </a>
      </li>}
    </ul>
  );
}
