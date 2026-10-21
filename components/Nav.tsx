"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";

export const RESUME =
  "https://docs.google.com/document/d/1NVXvr309FesbqY0WjajDDoWTk5Jack18PKSNY66YGj4/edit";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "/design-system", label: "Design system" },
  { href: "/contact", label: "Contact" },
];

const isActive = (path: string, href: string) =>
  href === "/#work" ? path.startsWith("/work/") : path === href || path.startsWith(href + "/");

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-bar wrap">
        <Link href="/" className="nav-name">Ridhwan Salaudeen</Link>
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
        <ul id="nav-links" className="nav-links" data-open={open}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={isActive(path, l.href) ? "page" : undefined} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
          <li><ButtonLink href={RESUME}>Resume</ButtonLink></li>
        </ul>
      </div>
    </header>
  );
}
