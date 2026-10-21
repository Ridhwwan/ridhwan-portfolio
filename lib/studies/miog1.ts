// MIO-G1 case study (/work/miog1). Facts from the original case study.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const miog1: Study = {
  slug: "miog1",
  accent: "#0B7FA0",
  hero: {
    mark: "M",
    markBg: "#0B4F6C",
    title: "Swim goggles you can wear over your glasses.",
    intro: "MIO-G1 lets visually impaired swimmers keep their prescription glasses on in the water, so they can see where they're going.",
    meta: [
      { label: "My contributions", text: "Research, a focus group, product requirements, sketches and orthographic drawings." },
      { label: "Timeline", text: "2024." },
      { label: "Role", text: "Product designer." },
    ],
    image: { src: F("dRx9NfOEZ4RcVDJ6WILZq2aTwI.png"), alt: "Line drawing of the MIO-G1 goggles" },
  },
  sections: [
    {
      kind: "context",
      label: "Context",
      heading: "A boy stood in shallow water, waving at lifeguards. He couldn't tell which way the beach was.",
      intro:
        "Prescription swim goggles exist, but they're niche and hard to get. Glasses aren't built for water: frames fail, metal rusts, and they don't stay on.",
    },
    {
      kind: "discovery",
      label: "Research",
      heading: "Contacts were the obvious answer, until they weren't.",
      intro: "A focus group could only bear contacts in water for about ten minutes before pain and redness set in. Swimmers with glasses told me:",
      pains: [
        { title: "Frames aren't made for swimming." },
        { title: "Contacts dry the eyes within ten minutes." },
        { title: "Weight on the face matters." },
        { title: "Looking through two lenses might distort the prescription." },
        { title: "They want their eyes fully shielded from water." },
      ],
      hmw: "Let swimmers keep their own glasses on in the water?",
    },
    {
      kind: "story",
      label: "Requirements",
      heading: "Three criteria for anything that ships.",
      points: ["No special lens preparation", "Easy for the public to get", "Simple enough for a child"],
      images: [
        { src: F("TGNFZKjQu5NKMFVvjyMqzG0.png"), alt: "A pair of glasses taken apart", caption: "Taking glasses apart." },
        { src: F("RaLKNmTm2M8qvZKZIU5ZNoSg88.png"), alt: "Labelled parts of a pair of glasses", caption: "The parts of a pair of glasses." },
      ],
    },
    {
      kind: "story",
      label: "Design",
      heading: "Glasses fit inside the frame, with room to spare.",
      intro: "A distortion-free view frame, a corner seal, an over-ear strap with an entry slot and temple housing, a rear buckle and a silicone hinge strap.",
      body: ["The frame leaves about 20mm between lens and cornea so glasses fit inside. The curve at the hinge was thickened after asking which part of a pair of glasses breaks first."],
      images: [
        { src: F("FtEKcSH8JiMaxGWMLRgAAgTTW4Q.png"), alt: "Pencil sketch of the first goggles", caption: "First iteration." },
        { src: F("Y2PcVUJ6GrSzuNh1BpxgQ1CqW4Q.png"), alt: "Sketch note asking which parts of glasses are easily damaged", caption: "Asking which part of a pair of glasses breaks first." },
      ],
    },
    {
      kind: "final",
      label: "Final design",
      heading: "Orthographic drawings, ready for prototyping.",
      intro: "The front and back views show the view frame, the seal and the housing that holds the wearer's glasses.",
      steps: [
        { tab: "Front view", src: F("Umk7CWHqjCtnDSVRL44HdZ1GYY.png"), caption: "Orthographic front view." },
        { tab: "Back view", src: F("B3d56ZiUDeYehH8WjY1F2klfnc.png"), caption: "Orthographic back view." },
      ],
    },
    {
      kind: "learnings",
      label: "What's next",
      heading: "Physical products are slower to fix than screens, so every part has to work before release.",
      items: [
        { title: "Proper 3D renders", text: "Turning the drawings into renders that show every part in context." },
        { title: "Printed prototypes", text: "Putting printed goggles in the hands of swimmers." },
        { title: "Iterate until it's right", text: "Changing the design from what swimmers find in the water." },
      ],
    },
  ],
};
