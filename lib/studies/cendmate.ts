// Cendmate case study (/work/cendmate). Facts from the original case study and
// Ridhwan's resume: Feb–Mar 2023, remote, concept to tested prototype in 2 months.
// Layout leans on the "fictiv workbench" reference: problem split, decisions grid, alternating screens.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const cendmate: Study = {
  slug: "cendmate",
  accent: "#6B2EE6",
  hero: {
    mark: "C",
    wordmark: "cendmate",
    markBg: "#6B2EE6",
    title: "Sending money from Canada to West Africa as easily as a text.",
    intro:
      "Designing a mobile web app for Cendmate, a Canadian fintech, that merges two kinds of bank account into one simple transfer.",
    meta: [
      { label: "My contributions", text: "Personas, journey mapping, wireframes, prototyping and usability testing, through to a tested high-fidelity prototype." },
      { label: "Timeline", text: "2 months, February to March 2023, remote from Vancouver." },
      { label: "Team", text: "Daniel Bello (CEO), Jazz Grewal (developer) and me as UI/UX designer." },
    ],
    image: { src: F("JRnklZy5JjM4ee46ncyuOdRC6r8.png"), alt: "Cendmate: send money from Canada to Africa as fast as a text message" },
  },
  sections: [
    {
      kind: "tldr",
      label: "TL;DR",
      heading: "A quick overview of the entire project.",
      cards: [
        { icon: "challenge", title: "The challenge", text: "Some banks identify you by account number, others by email, and one transfer had to handle both." },
        { icon: "approach", title: "Approach", text: "Personas, journey maps, wireframes, and moderated, screen-recorded usability tests." },
        { icon: "solution", title: "Solution", text: "A mobile web flow that merges both account types into one transfer, with live rates kept out of the way." },
        { icon: "impact", title: "Impact", text: "A tested high-fidelity prototype in two months, ready for development." },
      ],
    },
    {
      kind: "blocks",
      label: "Research",
      heading: "Bad bank apps had made people wary of trying new ones.",
      intro:
        "Cendmate moves money between Canada and West Africa. Some banks identify you by account number, others by email, so the flow had to handle both with as little effort from the user as possible.",
      blocks: [
        {
          type: "problem",
          label: "What research told us",
          heading: "People split their money by job, not by bank.",
          items: [
            "Bad bank apps make people reluctant to try new ones.",
            "People keep separate accounts for separate jobs, like foreign currency and stipends.",
            "Digital accounts win on international payments.",
            "Local payments stay with traditional banks because they match local account norms.",
          ],
        },
        { type: "callout", label: "The opportunity", text: ["In a crowded fintech market, merging account types into one transfer was the differentiator."] },
      ],
    },
    {
      kind: "blocks",
      label: "Testing",
      heading: "Not every page needs a navigation bar.",
      intro: "Moderated, screen-recorded sessions shaped every decision below.",
      blocks: [
        {
          type: "decisions",
          label: "Product decisions",
          items: [
            { title: "No bottom nav on top-level pages", text: "Testing showed it blocked parts of those pages without helping anyone, so it came off there." },
            { title: "Labels rewritten for every market", text: "Navigation copy was rewritten until it was short and clear in every market." },
            { title: "One transfer for both account types", text: "Account-number and email-based accounts go through the same flow." },
            { title: "Live rates kept out of the way", text: "Rates are there when you convert, without crowding the transfer itself." },
          ],
        },
        { type: "images", images: [{ src: F("6SUXuMd14c9STHNMlX4eR9LiHI.png"), alt: "Early iterations of the navigation", caption: "Early iterations of the currency page and navigation bar, later rejected." }] },
      ],
    },
    {
      kind: "blocks",
      label: "Final design",
      heading: "From sign-up to money sent, in a few taps.",
      intro: "The finished prototype covers onboarding, deposits and transfers, built on a small design system.",
      blocks: [
        {
          type: "features",
          items: [
            { title: "Onboarding to accounts", text: "A short onboarding lands people on their accounts, with Naira and Canadian dollar balances side by side.", image: { src: F("ShxebgBfY26HxXpGeLqpv5Kf0.png"), alt: "Onboarding, accounts and a successful withdrawal" } },
            { title: "Deposit", text: "Pick a currency, then deposit into it.", image: { src: F("oA2h9vxHayjXzLXibcFwPtrrLGE.png"), alt: "Choosing a currency and making a deposit" } },
            { title: "Transfer", text: "Details, a review, a short wait and a clear confirmation.", image: { src: F("vAnXpgiyC5Sr08XL6zMPoj9A68.png"), alt: "Transfer flow from details to confirmation" } },
            { title: "Design system", text: "Inputs, headers and settings rows built as components, so every screen stays consistent.", image: { src: F("xSm9SSAeCPiXmha4J8XBEJBmKX4.png"), alt: "Input components from the design system" } },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Reflection",
      heading: "The differentiator was what we merged, not what we added.",
      blocks: [
        {
          type: "reflections",
          items: [
            { icon: "craft", title: "Remove what doesn't help", text: "A navigation bar on every page felt standard, but testing showed it got in the way." },
            { icon: "research", title: "Copy is part of the interface", text: "Labels that work in one market can confuse another, so they were tested and rewritten." },
            { icon: "system", title: "Merge, don't multiply", text: "One transfer for every kind of account did more than any extra feature could." },
          ],
        },
      ],
    },
  ],
};
