// Preset saver case study (/work/preset-saver). Facts from the original case study.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const presetSaver: Study = {
  slug: "preset-saver",
  accent: "#B57A00",
  hero: {
    mark: "P",
    markBg: "#141414",
    title: "Save a camera setup once, and share it inside every photo.",
    intro: "A native camera feature that stores a full camera setup as a preset you can recall anywhere, and send along with your photos.",
    meta: [
      { label: "My contributions", text: "User interviews, user and task flows, low- and high-fidelity design, and design insights." },
      { label: "Timeline", text: "2023." },
      { label: "Role", text: "Product designer and UX researcher." },
    ],
    image: { src: F("1CPs6b655OWZGUCDtKP3BEmb9BY.png"), alt: "Preset saver camera screens" },
  },
  sections: [
    {
      kind: "story",
      label: "Context",
      heading: "Same shot, every time.",
      intro: "Creators struggle to get consistent photos and video. Preset saver stores a full camera setup so you can recall it in any environment.",
      images: [
        { src: F("smHhuR2DUJPsN5AxRBjazdPFXIw.png"), alt: "Default mode layout", caption: "Default mode layout." },
        { src: F("cVyYqONeFAGRlxAbaJcsl2SWQ64.png"), alt: "Pro mode layout", caption: "Pro mode layout." },
      ],
    },
    {
      kind: "story",
      label: "Problem framing",
      heading: "How might we…",
      points: [
        "Improve image quality with what the phone already has?",
        "Cut reliance on external editing apps?",
        "Work across very different phone hardware?",
      ],
      images: [
        { src: F("dGxdtGupvNSODCUG0EwvxzZkVhg.png"), alt: "Feature architecture diagram", caption: "Feature architecture." },
        { src: F("6RvlRMZY1FbGYJTu3FdYx5UBvM.png"), alt: "Four colour-coded entry flows", caption: "Entry points, colour-coded." },
      ],
    },
    {
      kind: "story",
      label: "Testing",
      heading: "Onboarding decided adoption.",
      intro: "Alpha users tested with screen sharing and recording. People wanted familiar patterns, and they wanted to share presets with each other.",
      images: [{ src: F("FK7XE92GRYxLAjrAJGf25w5H9qw.png"), alt: "Accessing the presets library", caption: "Two ways into the presets library: a dropdown and a Presets tab." }],
    },
    {
      kind: "final",
      label: "Final design",
      heading: "Send a photo, and the preset travels with it.",
      intro: "Presets ride along inside shared photos, with privacy options for anyone who'd rather keep their setup to themselves.",
      steps: [
        { tab: "Sharing", src: F("j7PGO6smEPg8HvISFM6bYD44xg.png"), caption: "Sharing a photo, with privacy options for embedded presets." },
        { tab: "Preset badge", src: F("amTwC9TGHQqVHjy7zso7wy4UA.png"), caption: "A badge shows that a photo carries a preset." },
      ],
    },
  ],
};
