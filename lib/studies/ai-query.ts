// AI Query (LLM-powered file search) case study (/work/ai-query).
// Facts from the original case study and the resume's Projects section.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const aiQuery: Study = {
  slug: "ai-query",
  accent: "#6D4AE0",
  hero: {
    mark: "AI",
    markBg: "#160F29",
    title: "Find any file on your phone just by describing it.",
    intro: "A file manager that finds images and documents through natural-language queries and image recognition.",
    meta: [
      { label: "My contributions", text: "Research, personas, journey maps, A/B tests, and low- and high-fidelity design." },
      { label: "Timeline", text: "2024." },
      { label: "Team", text: "Me as product designer, with Dr. Habeeb Salaudeen as AI expert." },
    ],
    image: { src: F("NaJhIOx6sqaPjDNOtFdzmAiQ8.png"), alt: "AI Query recent files screen" },
  },
  sections: [
    {
      kind: "story",
      label: "The problem",
      heading: "Tens of thousands of screenshots. No way to find the one I needed.",
      intro: "Describe an image or document, or show a similar one, and the phone finds it.",
      images: [{ src: F("hHkGjZjqWrRcRHhsz5HSKz6TQk.png"), alt: "Photo albums with 55,430 screenshots", caption: "55,430 screenshots in one album." }],
    },
    {
      kind: "story",
      label: "Feasibility",
      heading: "Can a mid-range phone do this?",
      intro: "With Dr. Habeeb Salaudeen, I researched phone hardware, search algorithms, caching and indexing to see what would run smoothly on an ordinary device.",
      body: ["Search runs on the phone by default, so it works offline, costs nothing per search and keeps files private. An extended server-based recognition mode is there for when higher accuracy matters."],
    },
    {
      kind: "story",
      label: "Users & research",
      heading: "Two people who search their phones every day.",
      images: [
        { src: F("TMDedS97cJWKA0OfuE48dE0BPc.png"), alt: "Persona: Mark Johnson", caption: "Mark, a freelance graphic designer who searches for media daily." },
        { src: F("b8C6kkmdCNWE3VpuJx6mWGhud4.png"), alt: "Persona and journey map: Emily Davis", caption: "Emily, a college student, and her journey map." },
      ],
    },
    {
      kind: "story",
      label: "Testing",
      heading: "The hardest part wasn't the model. It was onboarding people to a way of searching they'd never used.",
      intro: "A/B tests settled behaviour and edge cases. Site maps, user flows and a mid-fidelity prototype went through usability testing before the high-fidelity design on a 4/8px grid.",
      images: [
        { src: F("a50BgD5QXgi0rPs9qmhILngr7k.png"), alt: "A/B test screens", caption: "A/B testing the search flow." },
        { src: F("5OWB6MFWL6sKQCrZu8CZNwz8s.png"), alt: "Findings from iterations one and two", caption: "Findings from each round, fixed before the next." },
      ],
    },
    {
      kind: "story",
      label: "Final design",
      heading: "A file manager with search up front.",
      images: [{ src: F("BwyRHx8kA5WHGBMgXMNccnyhuU.png"), alt: "File manager with search", caption: "Recent files, with natural-language and image search in the search bar." }],
    },
  ],
};
