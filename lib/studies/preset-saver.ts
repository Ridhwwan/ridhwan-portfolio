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
      { label: "Timeline", text: "2023." },
      { label: "Role", text: "Product designer and UX researcher." },
    ],
    image: { src: F("1CPs6b655OWZGUCDtKP3BEmb9BY.png"), alt: "Preset saver camera screens" },
  },
  sections: [
    {
      kind: "blocks",
      label: "Context",
      heading: "Same shot, every time.",
      intro: "Creators struggle to get consistent photos and video. Preset saver stores a full camera setup so you can recall it in any environment.",
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
      intro: "Alpha users tested with screen sharing and recording.",
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
        { type: "images", images: [{ src: F("FK7XE92GRYxLAjrAJGf25w5H9qw.png"), alt: "Accessing the presets library", caption: "Accessing the presets library from a dropdown or the Presets tab." }] },
      ],
    },
    {
      kind: "blocks",
      label: "Final design",
      heading: "Send a photo, and the preset travels with it.",
      blocks: [
        {
          type: "features",
          items: [
            { title: "Share with privacy options", text: "Sharing a photo can include its preset, with privacy options for anyone who'd rather keep their setup to themselves.", image: { src: F("j7PGO6smEPg8HvISFM6bYD44xg.png"), alt: "Sharing a photo with privacy options" } },
            { title: "A badge that says there's more", text: "A small badge shows that a photo carries a preset, so the person receiving it knows they can use the same look.", image: { src: F("amTwC9TGHQqVHjy7zso7wy4UA.png"), alt: "Badge showing a photo contains a preset" } },
          ],
        },
      ],
    },
  ],
};
