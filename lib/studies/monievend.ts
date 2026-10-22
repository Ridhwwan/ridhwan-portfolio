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
    title: "Bill payments, transfers and airtime for Nigerian businesses, with or without internet.",
    intro: "Designing the website and client portal for Monievend, a Nigerian fintech for small and medium businesses and solo traders.",
    meta: [
      { label: "My contributions", text: "Research, site architecture, prototypes, the high-fidelity website and dev-ready specs." },
      { label: "Timeline", text: "May 2022 to July 2023, Lagos." },
      { label: "Team", text: "Buhari Abdulhakeem (CEO), Pitwa Isaac (CTO), Buhari Amina (front-end developer) and me as web and UI/UX designer." },
    ],
    logo: { src: "/logos/monievend.webp", alt: "Monievend", height: 48 },
    links: [{ label: "Monievend on LinkedIn", href: "https://www.linkedin.com/company/monievend/posts/?feedView=all" }],
    image: { src: F("nKsKHdoGX0hof1MT6WcRXyyHNKs.png"), alt: "Monievend website on desktop and phone" },
  },
  sections: [
    {
      kind: "blocks",
      label: "Context",
      heading: "No internet, no problem.",
      intro: "Outside major cities, Nigerian internet is unstable and ISP coverage is thin. Monievend set out to make utility bills, transfers and airtime work with or without internet, by making USSD payments more versatile.",
      blocks: [
        { type: "images", images: [{ src: F("sWfkgd9vUjwveQRaXGK0Bjvhswc.png"), alt: "Map of network coverage across Nigeria", caption: "MTN's network coverage, the widest in Nigeria, still leaves gaps." }] },
        {
          type: "decisions",
          label: "Project goals",
          items: [
            { title: "Know the audience", text: "Research who would actually use it before designing anything." },
            { title: "Keep people coming back", text: "A site built for retention and engagement." },
            { title: "Few clicks", text: "Clear, business-focused pages with low-click navigation." },
          ],
        },
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
        {
          type: "images",
          images: [
            { src: F("024RIqvPelioqdoGdJeybyZLO6o.png"), alt: "Low-fidelity website prototype", caption: "Low-fidelity prototype, including the customer profile." },
            { src: F("acHTs1d4qiv68Vzmk1Xsx5rst0.png"), alt: "Initial dashboard prototype", caption: "The first dashboard prototype." },
          ],
        },
        { type: "callout", label: "From the FAQ", text: ["In Nigeria, phone numbers are linked to national IDs, so recovering a lost number also recovers the account."] },
      ],
    },
    {
      kind: "final",
      label: "Final design",
      heading: "A website and portal built to be trusted.",
      intro: "A scalable style guide built with the brand team's assets, then the high-fidelity website. The in-house financial software was researched, not designed, by me.",
      steps: [
        { tab: "Website", src: F("nKsKHdoGX0hof1MT6WcRXyyHNKs.png"), caption: "The high-fidelity website on desktop and phone." },
        { tab: "Sign-up and support", src: F("JdxwqHkpxOghILSJfELqMQLxQzE.png"), caption: "Sign-up with a phone number or email, the FAQ and support." },
        { tab: "Style guide", src: F("7vQBIxh8RflSIFPPPfCscN1YWA.png"), caption: "The style guide applied across the site." },
        { tab: "Type and buttons", src: F("80OiuaxtXQaWhtXMsmHyJ46nXM8.png"), caption: "Type and button styles." },
      ],
    },
    {
      kind: "learnings",
      label: "Learnings",
      heading: "Small details like copy decide whether someone signs up.",
      items: [
        { title: "Plain words build trust", text: "People already wary of tech walked away from jargon, so every label was written the way they speak." },
        { title: "Design for the user you have", text: "Most users didn't have an email address, so sign-up couldn't require one." },
        { title: "Specialists make the work better", text: "Working alongside the CTO, the developer and the brand team kept every screen buildable and on-brand." },
      ],
    },
  ],
};
