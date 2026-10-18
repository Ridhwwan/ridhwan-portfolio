"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RESUME } from "./Nav";

export default function Footer() {
  const path = usePathname();
  if (path.startsWith("/work/")) return null;
  const onContact = path === "/contact";

  return (
    <footer className="footer wrap">
      {!onContact && (
        <div className="footer-cta glass">
          <h2>Want to work with me or be friends?</h2>
          <div><Link className="btn" href="/contact">Send me a message</Link></div>
        </div>
      )}
      <div className="footer-base">
        <span>© Ridhwan Salaudeen</span>
        <nav aria-label="Elsewhere">
          <a href="https://github.com/Ridhwwan" target="_blank" rel="noreferrer">GitHub</a>
          <a href={RESUME} target="_blank" rel="noreferrer">Resume</a>
        </nav>
      </div>
    </footer>
  );
}
