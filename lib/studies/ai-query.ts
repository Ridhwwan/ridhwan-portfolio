// AI Query (LLM-powered file search) case study (/work/ai-query).
// Facts from the original case study, its persona/journey/test images and the resume.
// Layout leans on the research-heavy "Designing for loyalty" reference.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const aiQuery: Study = {
  slug: "ai-query",
  accent: "#6D4AE0",
  hero: {
    mark: "AI",
    wordmark: "AI Query",
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
      kind: "blocks",
      label: "The brief",
      heading: "Tens of thousands of screenshots. No way to find the one I needed.",
      intro: "Describe an image or document, or show a similar one, and the phone finds it.",
      blocks: [
        { type: "phases", items: ["Research", "Personas", "Site maps and flows", "Mid-fidelity prototype", "Usability testing", "High-fidelity design"], note: "The process, in order." },
        { type: "images", images: [{ src: F("hHkGjZjqWrRcRHhsz5HSKz6TQk.png"), alt: "Photo albums with 55,430 screenshots", caption: "55,430 screenshots in one album." }] },
      ],
    },
    {
      kind: "blocks",
      label: "Feasibility",
      heading: "Can a mid-range phone do this?",
      intro: "With Dr. Habeeb Salaudeen, I researched phone hardware, search algorithms, caching and indexing to see what would run smoothly on an ordinary device.",
      blocks: [
        {
          type: "decisions",
          label: "What that settled",
          items: [
            { title: "On the phone by default", text: "Searches work offline, cost nothing per search and keep files private." },
            { title: "A server mode for accuracy", text: "An extended server-based recognition mode is there when a search needs more accuracy." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Users & research",
      heading: "Two people who search their phones every day.",
      blocks: [
        {
          type: "archetypes",
          label: "Personas",
          items: [
            { initials: "MJ", title: "Mark Johnson", meta: "35 · Freelance graphic designer", text: "Searches for images daily for his projects, often on his phone when inspiration strikes. Wants a clutter-free search and creation dates he can check." },
            { initials: "ED", title: "Emily Davis", meta: "24 · College student", text: "Needs specific media for coursework quickly, using speech search. Loses time to ads and unclear date information." },
          ],
        },
        {
          type: "table",
          label: "Emily's journey",
          columns: ["Awareness", "Search initiation", "Searching", "Evaluation", "Completion"],
          rows: [
            { name: "Activity", cells: ["Realises she needs specific videos for a class assignment", "Opens her mobile search app", "Uses speech search for “videos on media theories from 2022”", "Reviews results and checks the dates of media files", "Finds the right video and saves it"] },
            { name: "Emotion", cells: ["Determined, focused", "Optimistic, ready", "Engaged, curious", "Analytical, focused", "Satisfied, accomplished"] },
            { name: "Pain points", tone: "pain", cells: ["Needs quick access to files with accurate dates", "Finding specific dated content is complex", "Ad interruptions and unclear dates in results", "Hard to verify dates, distracted by ads", "Time lost to ads and unclear dates"] },
          ],
        },
        { type: "callout", label: "Opportunities", text: ["Let people specify a date range when they search by speech.", "Keep search free of ads."] },
      ],
    },
    {
      kind: "blocks",
      label: "Testing",
      tone: "tint",
      heading: "The hardest part wasn't the model. It was onboarding people to a way of searching they'd never used.",
      intro: "A/B tests settled behaviour and edge cases, and each round of usability testing fixed what the last one exposed before the high-fidelity design on a 4/8px grid.",
      blocks: [
        {
          type: "problem",
          label: "What testing found",
          heading: "Each round fixed what the last one exposed.",
          items: [
            "Putting the test tasks inside onboarding confused people, so they went looking for the task list elsewhere.",
            "People tapped unlabelled recent images instead of the search bar to search for images with text.",
            "Users chose the right folder to search, but still tapped inactive document and image icons.",
            "The persona search sat in a menu bar nobody explored.",
          ],
        },
        {
          type: "images",
          images: [
            { src: F("a50BgD5QXgi0rPs9qmhILngr7k.png"), alt: "A/B test screens", caption: "A/B testing the search flow." },
            { src: F("5OWB6MFWL6sKQCrZu8CZNwz8s.png"), alt: "Findings from iterations one and two", caption: "Findings from each round, crossed off once fixed." },
          ],
        },
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
