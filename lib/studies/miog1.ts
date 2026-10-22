// MIO-G1 case study (/work/miog1). Facts from the original case study.
// Layout mixes the references: stat cards up front, numbered findings, a parts grid.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const miog1: Study = {
  slug: "miog1",
  accent: "#0B7FA0",
  hero: {
    mark: "M",
    wordmark: "MIO-G1",
    markBg: "#0B4F6C",
    title: "Swim goggles you can wear over your glasses.",
    intro: "MIO-G1 lets visually impaired swimmers keep their prescription glasses on in the water, so they can see where they're going.",
    meta: [
      { label: "My contributions", text: "Research, a focus group, product requirements, sketches and orthographic drawings." },
      { label: "Timeline", text: "2024." },
      { label: "Role", text: "Product designer." },
    ],
    logo: { src: "/logos/miog1.webp", alt: "MIO-G1", height: 64 },
    links: [
      { label: "The video that started it", href: "https://www.youtube.com/watch?v=MATGKbe5wNA" },
      { label: "Product sketches (Figma)", href: "https://www.figma.com/design/YiawhWIaqsOWeMFZ46PnTT/Mio-Google?node-id=103-2&t=xvQaERBxaXuU9RaK-4" },
      { label: "Full research (Notion)", href: "https://ridhwan.notion.site/Mio-Googles-a0f604b15f914933925246ce6e320b93?pvs=74" },
      { label: "How lenses correct sight", href: "https://youtu.be/CJ6aB5ULqa0?si=0CJ3yhmNidcICGSn" },
      { label: "Wald and the armour problem", href: "https://medium.com/@penguinpress/an-excerpt-from-how-not-to-be-wrong-by-jordan-ellenberg-664e708cfc3d" },
    ],
    image: { src: F("dRx9NfOEZ4RcVDJ6WILZq2aTwI.png"), alt: "Line drawing of the MIO-G1 goggles" },
  },
  sections: [
    {
      kind: "blocks",
      label: "Context",
      heading: "A boy stood in shallow water, waving at lifeguards. He couldn't tell which way the beach was.",
      intro:
        "A 2023 video of a child who couldn't find his way back to the beach started this. Prescription swim goggles exist, but they're niche and hard to get. Glasses aren't built for water: frames fail, metal rusts, and they don't stay on.",
      body: ["The goal: make swimming as close to normal as possible for people who wear glasses, with something easy to get hold of."],
      blocks: [
        {
          type: "stats",
          items: [
            { value: "~10 min", label: "With contacts in water", text: "Before a focus group felt pain and redness" },
            { value: "~20mm", label: "Lens to cornea", text: "Room left for glasses inside the frame" },
            { value: "3", label: "Criteria", text: "For anything that ships" },
          ],
        },
        {
          type: "features",
          items: [
            { title: "The closest thing was made for skiing", text: "One company makes goggles with a slot for prescription lenses, but only for skiing, and the lenses have to be made specially.", image: { src: F("aHDyiMWCXTuFDi3MXRqGRPbaE.png"), alt: "Ski goggles with an insert for prescription lenses" } },
          ],
        },
      ],
    },
    {
      kind: "discovery",
      label: "Research",
      heading: "Contacts were the obvious answer, until they weren't.",
      intro: "A focus group could only bear contacts in water for about ten minutes. Swimmers with glasses told me:",
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
      kind: "blocks",
      label: "Requirements",
      heading: "Simple enough for a child, easy for anyone to get.",
      blocks: [
        {
          type: "problem",
          label: "Criteria",
          heading: "Three rules for anything that ships.",
          items: ["No special lens preparation.", "Easy for the public to get.", "Simple enough for a child."],
        },
        {
          type: "decisions",
          label: "Ideas considered",
          items: [
            { title: "Goggles that hold lenses or whole frames", text: "The direction that met all three rules." },
            { title: "An attachment for glasses", text: "Still leaves frames exposed to water." },
            { title: "Adjustable-focus lenses", text: "Too expensive for most people." },
            { title: "Slots for inserting lenses", text: "Needs special lens preparation." },
          ],
        },
        { type: "callout", label: "Eyewear research", text: ["Research covered lens types and the eye defects they correct, across industries. The product requirements live in the Notion research page linked at the top."] },
        {
          type: "images",
          images: [
            { src: F("TGNFZKjQu5NKMFVvjyMqzG0.png"), alt: "A pair of glasses taken apart", caption: "Taking glasses apart." },
            { src: F("RaLKNmTm2M8qvZKZIU5ZNoSg88.png"), alt: "Labelled parts of a pair of glasses", caption: "The parts of a pair of glasses." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Design",
      tone: "tint",
      heading: "Glasses fit inside the frame, with room to spare.",
      intro: "Prototyping started with different glasses frames to test the fit, then moved to sketches. The hinge was reinforced the way Abraham Wald reinforced WWII planes: by asking where they break, not where they look weak.",
      blocks: [
        {
          type: "images",
          images: [
            { src: F("weBQnMvTpWjh2QvRZOEvLmX7B0.png"), alt: "Rough prototype worn over glasses, with the parts outlined in blue", caption: "The first wearable prototype. The blue outline shows the view frame, the over-ear housing and the under-ear support that keeps the goggles straight." },
            { src: F("BUU3FMyY1nrUGmn22RMcPuHBJIw.png"), alt: "Annotated pencil sketch of the goggles' cross-section", caption: "First iteration, with notes on the housing for the glasses." },
          ],
        },
        {
          type: "decisions",
          label: "Parts",
          items: [
            { title: "Distortion-free view frame", text: "Leaves about 20mm between lens and cornea so glasses fit inside." },
            { title: "Corner seal", text: "Keeps water off the eyes, which swimmers asked for." },
            { title: "Over-ear strap", text: "With an entry slot and temple housing for the arms of the glasses." },
            { title: "Silicone hinge strap", text: "Thickened at the curve after asking which part of a pair of glasses breaks first." },
            { title: "Rear buckle", text: "Closes the strap at the back of the head." },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("FtEKcSH8JiMaxGWMLRgAAgTTW4Q.png"), alt: "Pencil sketch of the first goggles", caption: "First iteration." },
            { src: F("Y2PcVUJ6GrSzuNh1BpxgQ1CqW4Q.png"), alt: "Sketch note asking which parts of glasses are easily damaged", caption: "Asking which part of a pair of glasses breaks first." },
          ],
        },
      ],
    },
    {
      kind: "final",
      label: "Final design",
      heading: "Orthographic drawings, ready for prototyping.",
      intro: "Front, back and side views show the view frame, the seal and the housing that holds the wearer's glasses, ready for a 3D designer to take further.",
      steps: [
        { tab: "Front view", src: F("Umk7CWHqjCtnDSVRL44HdZ1GYY.png"), caption: "Orthographic front view." },
        { tab: "Back view", src: F("B3d56ZiUDeYehH8WjY1F2klfnc.png"), caption: "Orthographic back view." },
        { tab: "Side view", src: F("HlshhNayL1xi0kIlPByBU9oQM.png"), caption: "Orthographic side view: an anti-fog plastic view frame, a silicone fastening strap, a thick silicone housing for the wearer's glasses and a soft sealing gasket." },
        { tab: "Back view A", src: F("m4meWxWWV1UFLlh3kvLlHkju9B8.png"), caption: "An alternative back view, with a thinner rubber housing." },
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
