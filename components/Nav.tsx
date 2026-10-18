"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const RESUME =
  "https://docs.google.com/document/d/1NVXvr309FesbqY0WjajDDoWTk5Jack18PKSNY66YGj4/edit";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // Case studies are full-bleed books with their own chrome.
  if (path.startsWith("/work/")) return null;

  return (
    <header className="nav wrap">
      <div className="nav-bar glass">
        <Link href="/" className="nav-name">Ridhwan Salaudeen</Link>
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
        <ul id="nav-links" className="nav-links glass-mobile" data-open={open}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={path === l.href ? "page" : undefined} onClick={() => setOpen(false)}>{l.label}</Link>
            </li>
          ))}
          <li><a className="btn" href={RESUME} target="_blank" rel="noreferrer">Resume</a></li>
        </ul>
      </div>
    </header>
  );
}
