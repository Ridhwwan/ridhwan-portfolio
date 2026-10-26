// The About page, written in the same shape as a case study so it uses the same
// layout (components/study). Facts come from the resume (Oct 2026).
import type { Study } from "@/components/study/types";
import { EMAIL, GITHUB_URL, RESUME, X_URL } from "./contact";

const F = (id: string) => `/work/img/${id}`;

export const about: Study = {
  slug: "about",
  accent: "#141414",
  back: false,
  hero: {
    title: "I'm a designer, builder, teacher and student.",
    intro:
      "Product designer and front-end engineer with 5+ years of shipping 0-to-1 products across education, logistics and fintech. I founded Bento Development and built BentoSMS, a school platform live at its first school.",
    meta: [
      { label: "Based in", text: "Abuja, Nigeria." },
      { label: "Currently", text: "Founder and CTO at Bento Development." },
      { label: "Focus", text: "Product design, design systems and front-end engineering in Next.js and TypeScript." },
    ],
    links: [
      { label: "Resume", href: RESUME },
      { label: "GitHub", href: GITHUB_URL },
      { label: "X", href: X_URL },
      { label: "Email", href: `mailto:${EMAIL}` },
    ],
  },
  sections: [
    {
      kind: "blocks",
      label: "The designer",
      heading: "Long-term products that feel natural to use.",
      blocks: [
        {
          type: "features",
          items: [
            {
              title: "How I work",
              text: "I design and build end-to-end products for the long term, accessible even to people who've never seen them before. My approach starts with strategy and planning, builds components from the ground up, and documents the design system so anyone on the team understands what's being built. Function comes first, because form is part of function.",
              image: { src: F("97aaHf49tOePKgw0z0uGAev7QgU.jpg"), alt: "Ridhwan Salaudeen speaking at an event" },
            },
          ],
        },
        {
          type: "stats",
          items: [
            { value: "5+", label: "Years shipping", text: "0-to-1 products in education, logistics and fintech" },
            { value: "9", label: "Case studies", text: "On this site, from research to launch" },
            { value: "7", label: "Teams", text: "Designed for, from startups to my own company" },
            { value: "1", label: "School live", text: "Running on BentoSMS today" },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Experience",
      heading: "Where I've designed and built.",
      blocks: [
        { type: "logos" },
        {
          type: "rows",
          items: [
            { title: "Bento Development", tags: ["Jun 2023 – present", "Abuja"], text: "Founder and CTO. Designed and built BentoSMS solo in 6 months: a multi-tenant, offline-capable school platform with 12 modules and 7 kinds of user, now live at Alpha Academy, Abuja." },
            { title: "SOS Express", tags: ["Jan – Aug 2025"], text: "Product designer and brand designer. Three portals as progressive web apps, a 500+ variant component library and a brand used across 7 touchpoints." },
            { title: "Alveum", tags: ["Dec 2024 – Mar 2025"], text: "Product designer and UX strategist. A 300+ variant design system and the full back office for a warehouse management SaaS." },
            { title: "Cerebro Hive", tags: ["Oct – Nov 2023"], text: "Product designer. User interviews and usability tests that shaped an admin portal for student documentation and international payments, delivered in 2 months." },
            { title: "Cendmate", tags: ["Feb – Mar 2023", "Remote"], text: "UI/UX designer. A cross-border money transfer app from concept to a tested high-fidelity prototype in 2 months." },
            { title: "Monievend", tags: ["May 2022 – Jul 2023", "Lagos"], text: "Web designer and UI/UX designer. The company website and client portal, with dev-ready specs." },
            { title: "JJAIBOT", tags: ["Aug 2020 – Feb 2021", "Remote"], text: "Front-end developer and UI/UX designer. The interface for remote weather-prediction software used in wildfire tracking." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Certifications & education",
      tone: "tint",
      heading: "AI-certified, and always learning.",
      blocks: [
        {
          type: "decisions",
          label: "Certifications",
          items: [
            { title: "Claude 101", text: "Anthropic, 2026." },
            { title: "AI Fluency", text: "Anthropic, 2026." },
            { title: "Artificial Intelligence Training", text: "NCDMB and Royal Horizon Ventures, 2025." },
          ],
        },
        {
          type: "decisions",
          label: "Education",
          items: [
            { title: "Postgraduate Diploma, Computer Science", text: "Nigerian Defence Academy, Kaduna, 2021 – 2022." },
            { title: "BSc Geology and Mineral Sciences", text: "University of Ilorin, 2014 – 2019." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Skills",
      heading: "Design and code, with AI in the loop.",
      blocks: [
        {
          type: "decisions",
          items: [
            { title: "AI & LLM", text: "Claude, Claude Code, Cursor, prompt engineering, AI-assisted development, LLM-powered product design." },
            { title: "Languages", text: "JavaScript, TypeScript, HTML, CSS, SQL (PostgreSQL), Python, PHP." },
            { title: "Frameworks & tools", text: "Next.js, React, Redux, Supabase, Vercel, Git and GitHub." },
            { title: "Design tools", text: "Figma, Framer, Webflow, Phase, Adobe XD." },
            { title: "UX & product", text: "Design systems, user research, usability testing, journey mapping, personas, information architecture, prototyping, accessibility, brand identity." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Beyond work",
      heading: "The student, the builder and the teacher.",
      blocks: [
        {
          type: "features",
          items: [
            { title: "The student and builder", text: "I'm a habitual learner who likes merging fields to get somewhere new. Curiosity from tinkering as a kid led me into robotics, AI engineering and software development.", image: { src: F("ItxhDVbd489k63JPrtCHkea2gc.jpg"), alt: "Ridhwan at an AI training event" } },
          ],
        },
        { type: "callout", label: "The teacher", text: ["Having benefited from other people's knowledge, I find it fulfilling to give back to people learning the way I did. In 2025 I taught a group of students web development at The Renewed Hope Agenda."] },
        { type: "video", src: "/work/img/u1dSpFl4jBU5QZriSwx2xmbbfw.mp4", poster: "/work/img/opt/81pJXMLq0ICGo6psgax9NdIF26g-644.webp", caption: "Teaching web development at The Renewed Hope Agenda, 2025." },
      ],
    },
  ],
};
