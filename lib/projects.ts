// Every project on the site: what its card shows and where it links.
// Case study pages live in lib/studies (one file per project).

// Images live on this domain. scripts/fetch-images.mjs copies any missing ones
// from the old Framer site into public/work/img before every build.
import { STUDIES } from "./studies";

const F = (id: string) => `/work/img/${id}`;

/** Card colours: stage is the image backdrop, paper the text colour on it. */
export type Theme = { stage: string; paper: string };

/** What kind of thing it is; drives the small icon + label on project cards. */
export type Platform = "Web app" | "Mobile" | "Website" | "Hardware" | "Software";

export type Project = {
  slug: string;
  platform: Platform;
  title: string;
  short: string; // card title
  years: string;
  summary: string;
  featured?: boolean;
  external?: string; // card links out instead of to its case study (the study may still exist as an unlinked draft)
  cover?: string;
  theme: Theme;
};

export const projects: Project[] = [
  {
    slug: "sos-express",
    platform: "Web app",
    title: "SOS Express",
    short: "SOS Express",
    years: "2025",
    featured: true,
    summary:
      "A three-way logistics platform connecting customers, couriers and the business owner in real time.",
    cover: F("MQ8E3kGVYFWWlz4cvRrpnkNwk.png"),
    theme: { stage: "#0F1B4C", paper: "#F6F7FB" },
  },
  {
    slug: "bentosms",
    platform: "Web app",
    title: "Bento School Management System",
    short: "BentoSMS",
    years: "2024 – present",
    featured: true,
    summary: "A multi-portal school management system for Nigerian secondary schools.",
    cover: F("bentosms-cover.webp"),
    // The book below is a draft, kept for review. Until then the card opens the live product.
    external: "https://bentosms.com",
    theme: { stage: "#E6EFE9", paper: "#F5F7F5" },
  },
  {
    slug: "cendmate",
    platform: "Mobile",
    title: "Cendmate",
    short: "Cendmate",
    years: "2023",
    summary:
      "Text-message-simple transfers from Canada to West Africa.",
    cover: F("oA2h9vxHayjXzLXibcFwPtrrLGE.png"),
    theme: { stage: "#0D3B35", paper: "#F3F8F5" },
  },
  {
    slug: "miog1",
    platform: "Hardware",
    title: "MIO-G1 swimming goggles",
    short: "MIO-G1",
    years: "2024",
    summary: "Swim goggles that let visually impaired people keep their prescription glasses on in the water.",
    cover: F("dRx9NfOEZ4RcVDJ6WILZq2aTwI.png"),
    theme: { stage: "#0B4F6C", paper: "#EAF7FA" },
  },
  {
    slug: "ai-query",
    platform: "Mobile",
    title: "File search with large language models",
    short: "AI Query",
    years: "2024",
    summary: "Find images and documents on your phone just by describing them.",
    cover: F("NaJhIOx6sqaPjDNOtFdzmAiQ8.png"),
    theme: { stage: "#160F29", paper: "#1F1638" },
  },
  {
    slug: "monievend",
    platform: "Website",
    title: "Monievend",
    short: "Monievend",
    years: "2022 – 2023",
    summary: "Bill payments, transfers and airtime for Nigerian businesses, with or without internet.",
    cover: F("JdxwqHkpxOghILSJfELqMQLxQzE.png"),
    theme: { stage: "#2B3A1F", paper: "#C9D4AE" },
  },
  {
    slug: "preset-saver",
    platform: "Mobile",
    title: "Preset saver",
    short: "Preset saver",
    years: "2023",
    summary: "Save camera settings as reusable presets, and share them inside the photos you send.",
    cover: F("1CPs6b655OWZGUCDtKP3BEmb9BY.png"),
    theme: { stage: "#141414", paper: "#222222" },
  },
  {
    slug: "warehouse",
    platform: "Web app",
    title: "Alveum warehouse management system",
    short: "Alveum",
    years: "2024 – 2025",
    summary: "A 300+ variant design system and the full back office for a warehouse management SaaS.",
    cover: F("alveum-cover.webp"),
    external:
      "https://www.figma.com/proto/PVo6t4Wtpn4KRwPDOGMfsv/Warehouse-Management-System--Copy-?node-id=2701-37387&t=Fka9RTuVAsLJMjHa-1",
    theme: { stage: "#2A2A2E", paper: "#EDEDEF" },
  },
  {
    slug: "jjaibot",
    platform: "Software",
    title: "JJAIBOT",
    short: "JJAIBOT",
    years: "2020 – 2021",
    summary: "Interface for remote weather-prediction software used in wildfire tracking.",
    external: "https://jjaibot.org/",
    theme: { stage: "#24402F", paper: "#EEF2EC" },
  },
];

/** Every project that has a case study, including unlinked drafts. */
export const caseStudies = projects.filter((p) => STUDIES[p.slug]);
/** Case studies linked from the site, in grid order. */
export const publishedStudies = caseStudies.filter((p) => !p.external);
export const getProject = (slug: string) => caseStudies.find((p) => p.slug === slug);
