"use client";

import { usePathname } from "next/navigation";
import ButtonLink from "@/components/ui/ButtonLink";
import { RESUME } from "./Nav";

export default function Footer() {
  const path = usePathname();
  const onContact = path === "/contact";

  return (
    <footer className="footer">
      <div className="wrap">
        {!onContact && (
          <div className="footer-cta">
            <h2 className="h-lg">Want to work with me or be friends?</h2>
            <ButtonLink href="/contact" variant="outline">Send me a message</ButtonLink>
          </div>
        )}
        <div className="footer-base">
          <span>© Ridhwan Salaudeen</span>
          <nav aria-label="Elsewhere">
            <a href="https://github.com/Ridhwwan" target="_blank" rel="noreferrer">GitHub</a>
            <a href={RESUME} target="_blank" rel="noreferrer">Resume</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
