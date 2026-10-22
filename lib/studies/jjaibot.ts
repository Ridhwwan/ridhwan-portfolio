// JJAIBOT case study (/work/jjaibot). Sources: the resume (Aug 2020 – Feb 2021,
// front-end developer and UI/UX designer, remote) and jjaibot.org.
// Short on purpose: there are no design files from this project yet.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const jjaibot: Study = {
  slug: "jjaibot",
  accent: "#1C3FAA",
  hero: {
    mark: "J",
    markBg: "#1C3FAA",
    title: "Turning wildfire and weather models into views people can act on.",
    intro:
      "Designing and building the interface for JJAIBOT's remote weather-prediction software, used in wildfire tracking, with the data scientists behind the models.",
    logo: { src: "/logos/row-jjaibot.webp", alt: "JJAIBOT", height: 72 },
    meta: [
      { label: "My contributions", text: "Wireframes, low-fidelity prototypes and testing, then the front-end build." },
      { label: "Timeline", text: "7 months, August 2020 to February 2021, remote." },
      { label: "Role", text: "Front-end developer and UI/UX designer." },
    ],
    links: [{ label: "jjaibot.org", href: "https://jjaibot.org/" }],
    image: { src: F("jjaibot-site.png"), alt: "The JJAIBOT website" },
  },
  sections: [
    {
      kind: "blocks",
      label: "Context",
      heading: "AI for the environment, wildlife and people.",
      intro:
        "JJAIBOT is a private initiative created by Julian Jewel Jeyaraj to raise awareness of environmental protection, wildlife conservation and mental illness, using AI that recognises images, text and sound.",
      blocks: [
        {
          type: "decisions",
          label: "Its programmes",
          items: [
            { title: "Environment protection", text: "Predictive models for climate change, air quality and weather." },
            { title: "Wildlife conservation", text: "Fire detection, wildlife surveillance and animal trap camera apps." },
            { title: "Mental illness", text: "Data-driven analysis and an emotional processing unit." },
            { title: "Human trafficking", text: "A programme of its own on jjaibot.org." },
          ],
        },
        { type: "images", images: [{ src: F("jjaibot-models.png"), alt: "JJAIBOT machine learning models page", caption: "The models page on jjaibot.org." }] },
      ],
    },
    {
      kind: "blocks",
      label: "The work",
      tone: "tint",
      heading: "Model outputs are only useful if someone can read them in a hurry.",
      intro: "Working with the data scientists, I turned model outputs into views for remote weather prediction and wildfire tracking, then built them.",
      blocks: [
        { type: "phases", items: ["Model outputs", "Wireframes", "Low-fidelity prototypes", "Testing", "Front-end build"], note: "How each view was made." },
        {
          type: "decisions",
          items: [
            { title: "Start from the data", text: "Every view began with what the model actually produces, not with a layout." },
            { title: "Test before building", text: "Wireframes and low-fidelity prototypes were tested before any front-end code was written." },
            { title: "Remote by default", text: "Designed for people tracking conditions from somewhere else, on whatever screen they have." },
          ],
        },
      ],
    },
  ],
};
