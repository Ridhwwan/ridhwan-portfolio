// Monievend case study (/work/monievend). Facts from the original case study, its persona
// image and the resume: web designer and UI/UX designer, May 2022 – Jul 2023, Lagos.
// Layout leans on the research-led "Designing for loyalty" reference.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const monievend: Study = {
  slug: "monievend",
  accent: "#1F3A93",
  hero: {
    mark: "M",
    wordmark: "monievend",
    markBg: "#1F2A14",
    title: "Payments for Nigerian businesses, with or without internet.",
    intro: "Designing the website and client portal for Monievend, which makes USSD and POS payments more useful for small businesses and solo traders.",
    meta: [
      { label: "My contributions", text: "Research, site architecture, prototypes, the high-fidelity website and dev-ready specs." },
      { label: "Timeline", text: "May 2022 to July 2023, Lagos." },
      { label: "Team", text: "Buhari Abdulhakeem (CEO), Pitwa Isaac (CTO), Buhari Amina (front-end developer) and me as web and UI/UX designer." },
    ],
    image: { src: F("JdxwqHkpxOghILSJfELqMQLxQzE.png"), alt: "Monievend website screens" },
  },
  sections: [
    {
      kind: "blocks",
      label: "Context",
      heading: "No internet, no problem.",
      intro: "Outside major cities, Nigerian internet is unstable and ISP coverage is thin. Monievend set out to make USSD payments more useful for small businesses and solo traders.",
      blocks: [
        { type: "images", images: [{ src: F("sWfkgd9vUjwveQRaXGK0Bjvhswc.png"), alt: "Map of network coverage across Nigeria", caption: "Network coverage across Nigeria." }] },
      ],
    },
    {
      kind: "blocks",
      label: "Research",
      heading: "Recruiting took persistence, incentives and word of mouth.",
      intro: "People were sceptical of tech, so finding participants was work in itself. Three users emerged: merchants, customers and portal users.",
      blocks: [
        { type: "phases", items: ["Google Forms", "Paper questionnaires", "One-on-one interviews"], note: "Three ways to reach people who don't trust new tech." },
        {
          type: "archetypes",
          label: "Persona",
          items: [
            { initials: "SO", title: "Sarah Odenigbo", meta: "35 · Boutique owner, Berger market, Lagos", text: "Usually has at least two customers in her store and wants reliable access to her bank account. Wants card payments that work when the internet doesn't, and help understanding the platform." },
          ],
        },
        {
          type: "problem",
          label: "What we learned",
          heading: "Every word had to earn trust.",
          items: ["Avoid jargon.", "Trust travels by word of mouth.", "Most users don't have an email address."],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Decisions",
      tone: "tint",
      heading: "So sign-up accepts a phone number or an email.",
      blocks: [
        {
          type: "decisions",
          items: [
            { title: "Phone number or email", text: "Most users don't have an email address, so either one gets you in." },
            { title: "Plain words", text: "No jargon on the site or in the portal." },
            { title: "Built around three users", text: "Merchants, customers and portal users each have their own path through the site architecture." },
            { title: "Ready to build", text: "I worked with the engineers on technical constraints so every screen went to development with dev-ready specs." },
          ],
        },
        { type: "images", images: [{ src: F("uWFNAzturRDLRqO4mjfFn75cQ.png"), alt: "Site architecture diagram", caption: "Site architecture." }] },
      ],
    },
    {
      kind: "final",
      label: "Final design",
      heading: "A website and portal built to be trusted.",
      intro: "The high-fidelity website, built on a small set of type and button styles.",
      steps: [
        { tab: "Website", src: F("JdxwqHkpxOghILSJfELqMQLxQzE.png"), caption: "The high-fidelity website." },
        { tab: "Type and buttons", src: F("80OiuaxtXQaWhtXMsmHyJ46nXM8.png"), caption: "Type and button styles from the design system." },
      ],
    },
    {
      kind: "learnings",
      label: "Learnings",
      heading: "Small details like copy decide whether someone signs up.",
      items: [
        { title: "Plain words build trust", text: "People already wary of tech walked away from jargon, so every label was written the way they speak." },
        { title: "Design for the user you have", text: "Most users didn't have an email address, so sign-up couldn't require one." },
      ],
    },
  ],
};
