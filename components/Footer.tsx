"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SayHi from "@/components/ui/SayHi";
import { EMAIL, GITHUB_URL, RESUME, X_URL } from "@/lib/contact";

export default function Footer() {
  const path = usePathname();
  // Every page ends with "Say hi!", except Contact, which has the form.
  const onContact = path === "/contact";

  return (
    <footer className="footer">
      <div className="wrap">
        {!onContact && (
          <SayHi />
        )}
        <div className="footer-base">
          <span>© Ridhwan Salaudeen</span>
          <nav aria-label="Elsewhere">
            <Link href="/design-system">Design system</Link>
            <a href={`mailto:${EMAIL}`}>Email</a>
            <a href={X_URL} target="_blank" rel="noreferrer">X</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
            <a href={RESUME} target="_blank" rel="noreferrer">Resume</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
