// Monievend case study (/work/monievend). Facts from the original case study and
// the resume: web designer and UI/UX designer, May 2022 – Jul 2023, Lagos.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const monievend: Study = {
  slug: "monievend",
  accent: "#1F3A93",
  hero: {
    mark: "M",
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
      kind: "story",
      label: "Context",
      heading: "No internet, no problem.",
      intro: "Outside major cities, Nigerian internet is unstable and ISP coverage is thin. Monievend set out to make USSD payments more useful for small businesses and solo traders.",
      images: [{ src: F("sWfkgd9vUjwveQRaXGK0Bjvhswc.png"), alt: "Map of network coverage across Nigeria", caption: "Network coverage across Nigeria." }],
    },
    {
      kind: "story",
      label: "Users & research",
      heading: "Recruiting took persistence, incentives and word of mouth.",
      intro: "Google Forms, paper questionnaires and one-on-one interviews. People were sceptical of tech, so finding participants was work in itself. Three users emerged: merchants, customers and portal users.",
      points: ["Avoid jargon.", "Trust travels by word of mouth.", "Most users don't have an email address."],
      images: [{ src: F("PpE0Xo3EbrLCEUrJJxZs2SxJWoc.png"), alt: "Persona: Sarah Odenigbo", caption: "Sarah, a boutique owner in Lagos who needs payments to work when the internet doesn't." }],
    },
    {
      kind: "story",
      label: "Decisions",
      heading: "So sign-up accepts a phone number or an email.",
      intro: "With most users lacking an email address, a phone number became an equal way in. The site architecture was built around the three user types.",
      images: [{ src: F("uWFNAzturRDLRqO4mjfFn75cQ.png"), alt: "Site architecture diagram", caption: "Site architecture." }],
    },
    {
      kind: "final",
      label: "Final design",
      heading: "A website and portal built to be trusted.",
      intro: "I worked with the engineers on technical constraints so every screen went to development with ready-to-build specs.",
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
