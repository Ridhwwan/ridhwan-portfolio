// Cendmate case study (/work/cendmate). Facts from the original case study and
// Ridhwan's resume: Feb–Mar 2023, remote, concept to tested prototype in 2 months.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const cendmate: Study = {
  slug: "cendmate",
  accent: "#6B2EE6",
  hero: {
    mark: "C",
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
      kind: "context",
      label: "Context & problem",
      heading: "Two kinds of bank account, one transfer.",
      intro:
        "Cendmate moves money between Canada and West Africa. Some banks identify you by account number, others by email. The challenge was a mobile web flow that handles both with as little effort from the user as possible.",
    },
    {
      kind: "discovery",
      label: "Research",
      heading: "Bad bank apps had made people wary of trying new ones.",
      intro: "Research looked at how people already split their money across accounts, and why.",
      pains: [
        { title: "Wary of new apps", text: "Bad bank apps make people reluctant to try new ones." },
        { title: "Accounts for different jobs", text: "People keep separate accounts for separate jobs, like foreign currency and stipends." },
        { title: "Digital wins abroad", text: "Digital accounts win on international payments." },
        { title: "Banks win at home", text: "Local payments stay with traditional banks because they match local account norms." },
      ],
      hmw: "Let people send money abroad without caring which kind of account is on the other end?",
    },
    {
      kind: "story",
      label: "Testing",
      heading: "Not every page needs a navigation bar.",
      intro:
        "Moderated, screen-recorded sessions showed the bottom nav blocking parts of top-level pages without helping anyone, so it was removed there.",
      body: ["Copy mattered just as much. The navigation labels were rewritten until they were short and clear for every market."],
      images: [{ src: F("6SUXuMd14c9STHNMlX4eR9LiHI.png"), alt: "Early iterations of the navigation", caption: "Early iterations of the currency page and navigation bar, later rejected." }],
    },
    {
      kind: "final",
      label: "Final design",
      heading: "From sign-up to money sent, in a few taps.",
      intro: "The finished prototype covers onboarding, deposits and transfers, built on a small design system.",
      steps: [
        { tab: "Onboarding", src: F("ShxebgBfY26HxXpGeLqpv5Kf0.png"), caption: "Onboarding, the accounts home and a successful withdrawal." },
        { tab: "Deposit", src: F("oA2h9vxHayjXzLXibcFwPtrrLGE.png"), caption: "Choosing a currency and making a deposit." },
        { tab: "Transfer", src: F("vAnXpgiyC5Sr08XL6zMPoj9A68.png"), caption: "A transfer from details to confirmation, with live rates kept out of the way." },
        { tab: "Design system", src: F("xSm9SSAeCPiXmha4J8XBEJBmKX4.png"), caption: "Input components from the design system." },
      ],
    },
    {
      kind: "learnings",
      label: "Learnings",
      heading: "In a crowded fintech market, merging account types was the differentiator.",
      items: [
        { title: "Remove what doesn't help", text: "A navigation bar on every page felt standard, but testing showed it got in the way on top-level pages." },
        { title: "Copy is part of the interface", text: "Labels that work in one market can confuse another, so they were tested and rewritten for every market." },
      ],
    },
  ],
};
