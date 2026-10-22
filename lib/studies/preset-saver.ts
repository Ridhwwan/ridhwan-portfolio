// Preset saver case study (/work/preset-saver). Facts from the original case study.
// Layout leans on the "custom manufacturing quotes" reference: problem split, decisions, alternating screens.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const presetSaver: Study = {
  slug: "preset-saver",
  accent: "#B57A00",
  hero: {
    mark: "P",
    wordmark: "Preset saver",
    markBg: "#141414",
    title: "Save a camera setup once, and share it inside every photo.",
    intro: "A native camera feature that stores a full camera setup as a preset you can recall anywhere, and send along with your photos.",
    meta: [
      { label: "My contributions", text: "User interviews, user and task flows, low- and high-fidelity design, and design insights." },
      { label: "Timeline", text: "About 10 weeks, May to July 2023." },
      { label: "Role", text: "Product designer and UX researcher." },
    ],
    logo: { src: "/logos/preset-saver.webp", alt: "Preset saver", height: 64 },
    links: [
      { label: "Interactive prototype", href: "https://www.figma.com/proto/ISzIR28TfXyyjvhiEoqO8U/Preset-Saver?page-id=460%3A3210&type=design&node-id=959-20232&viewport=719%2C470%2C0.08&t=Dc00YFayfkozblBK-1&scaling=scale-down&starting-point-node-id=959%3A20232&mode=design" },
      { label: "Onboarding prototype", href: "https://www.figma.com/proto/ISzIR28TfXyyjvhiEoqO8U/Preset-Saver?type=design&node-id=460-3210&viewport=1635%2C1879%2C0.35&t=O4MIdx8sHOGecnXV-0&scaling=scale-down&starting-point-node-id=959%3A20232&show-proto-sidebar=1" },
      { label: "Full research (Notion)", href: "https://ridhwan.notion.site/Preset-saver-camera-feature-0bccd254653140118a29789c2dc8a67f" },
    ],
    image: { src: F("1CPs6b655OWZGUCDtKP3BEmb9BY.png"), alt: "Preset saver camera screens" },
  },
  sections: [
    {
      kind: "blocks",
      label: "Context",
      heading: "Same shot, every time.",
      intro: "Creators struggle to get consistent photos and video. Preset saver stores a full camera setup so you can recall it in any environment. Research combined market research, user interviews and a competitive analysis of preset apps.",
      blocks: [
        {
          type: "problem",
          label: "How might we",
          heading: "Help creators repeat a look anywhere, without another app?",
          items: [
            "Improve image quality with what the phone already has?",
            "Cut reliance on external editing apps?",
            "Work across very different phone hardware?",
          ],
        },
        {
          type: "images",
          images: [
            { src: F("smHhuR2DUJPsN5AxRBjazdPFXIw.png"), alt: "Default mode layout", caption: "Default mode layout." },
            { src: F("cVyYqONeFAGRlxAbaJcsl2SWQ64.png"), alt: "Pro mode layout", caption: "Pro mode layout." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Architecture",
      heading: "Four ways in, one presets library.",
      blocks: [
        {
          type: "images",
          images: [
            { src: F("WNI2f5670EatzvNlYuWcuLGk0.png"), alt: "Pencil sketch of the camera interface", caption: "The first sketch of the interface." },
            { src: F("ZEjvY4Srrn9efsRARErQiHfQHg.png"), alt: "User flow diagram", caption: "The user flow." },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("dGxdtGupvNSODCUG0EwvxzZkVhg.png"), alt: "Feature architecture diagram", caption: "Feature architecture." },
            { src: F("6RvlRMZY1FbGYJTu3FdYx5UBvM.png"), alt: "Four colour-coded entry flows", caption: "Entry points, colour-coded." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Testing",
      tone: "tint",
      heading: "Onboarding decided adoption.",
      intro: "Two rounds of usability tests with alpha users on a low-fidelity prototype, with screen sharing and recording.",
      blocks: [
        {
          type: "decisions",
          label: "What alpha users told us",
          items: [
            { title: "Onboarding decides adoption", text: "Whether people kept using presets came down to how they were introduced." },
            { title: "Familiar patterns win", text: "People wanted the feature to behave like the camera controls they already knew." },
            { title: "Presets are social", text: "People wanted to share presets with each other." },
            { title: "Two ways into the library", text: "A dropdown and a Presets tab both lead to the same saved presets." },
          ],
        },
        { type: "images", images: [{ src: F("Q3kQr12CsYdj7fdbsaQaCIsxqM.png"), alt: "Low-fidelity test prototype", caption: "The low-fidelity prototype used in the usability tests." }] },
        { type: "images", images: [{ src: F("FK7XE92GRYxLAjrAJGf25w5H9qw.png"), alt: "Accessing the presets library", caption: "Accessing the presets library from a dropdown or the Presets tab." }] },
      ],
    },
    {
      kind: "blocks",
      label: "Final design",
      heading: "Send a photo, and the preset travels with it.",
      intro: "A system-level feature that adapts to different camera layouts, and a way to share presets without pay-to-use or ad-supported third-party apps.",
      blocks: [
        {
          type: "images",
          images: [
            { src: F("dUfEJkZ4DjGByQA489djnWZs.png"), alt: "Colour scheme and typography", caption: "Colours and type (Roboto) matched to the camera app the project was modelled on, the Xiaomi Redmi Note 9S." },
            { src: F("23prVUyPwCJdZbXcK1XDiBEQ.png"), alt: "Onboarding screens for saving a preset", caption: "Onboarding: saving your first preset." },
          ],
        },
        {
          type: "features",
          items: [
            { title: "Share with privacy options", text: "Sharing a photo can include its preset, with privacy options for anyone who'd rather keep their setup to themselves.", image: { src: F("j7PGO6smEPg8HvISFM6bYD44xg.png"), alt: "Sharing a photo with privacy options" } },
            { title: "A badge that says there's more", text: "A small badge shows that a photo carries a preset, so the person receiving it knows they can use the same look. On phones that don't support presets, the preset stays dormant inside the file.", image: { src: F("amTwC9TGHQqVHjy7zso7wy4UA.png"), alt: "Badge showing a photo contains a preset" } },
            { title: "Access for every camera", text: "Entry points for high-end and mid-range camera apps, so the feature fits phones with very different layouts.", image: { src: F("CxN4skdLjJeaMu69SReyhZQQM.png"), alt: "Preset access points and sharing screens" } },
          ],
        },
      ],
    },
  ],
};
