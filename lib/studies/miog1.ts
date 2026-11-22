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
      { label: "My contributions", text: "Research, a focus group, product requirements, sketches, orthographic drawings, engineering specifications, materials research, a cardboard prototype and production planning." },
      { label: "Timeline", text: "2024 – 2026." },
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
    /* ── 2026 restart ── */
    {
      kind: "blocks",
      label: "2026 restart",
      heading: "Two years later, the project came back with a production target.",
      intro:
        "In October 2026 I picked the project back up with one aim: get as close to a manufacturable product as possible. The scope expanded from a single prototype to a first run that works for both personal purchase and public or rental use, in three sizes. Five new sketch pages explored two directions — a flat visor and a ski-goggle-style wrap — before settling on the flat visor.",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "3", label: "Sizes", text: "Small, medium and large — covering most adult head shapes" },
            { value: "~35mm", label: "Visor depth", text: "From the cornea to the inner visor at the edges, enough for even thick prescription lenses" },
            { value: "28", label: "Sketch pages", text: "Covering every part from sealing to strapping to temple pockets" },
          ],
        },
        {
          type: "decisions",
          label: "V2 key decisions",
          items: [
            { title: "3-layer sealing system", text: "Protection, fastening and sealing as three separate layers, stacked like those on large-frame swimming goggles but angled for reverse suction." },
            { title: "Temple pockets carry no strap load", text: "The strap anchors to the rigid front housing. Temple pockets stay soft and floating — they hold the temples but the pull goes around them, not through them." },
            { title: "Single curved visor", text: "Cylindrical, not bowl-shaped. Even thickness, no nose divider, with a transparent silicone skirt so edges almost disappear. Optically neutral by design." },
            { title: "Ratchet buckle at the back", text: "A toothed strap with a ratchet buckle, chosen over elastic cord. The buckle sits at the back of the head, not the sides, keeping adjustment away from the seal." },
            { title: "S / M / L via parametric modelling", text: "One Onshape model with a Variable Studio, so all three sizes come from the same geometry." },
          ],
        },
      ],
    },
    /* ── Engineering ── */
    {
      kind: "blocks",
      label: "Engineering",
      tone: "tint",
      heading: "Every millimetre matters when someone's glasses are inside.",
      intro:
        "November 2026 was spent on the engineering: vertex distance calculations, materials research, parts glossaries and cross-section sketches. I corrected a measurement from the original case study — the 20mm cornea-to-visor gap only fits average glasses with thin lenses, not the thick prescriptions this product is for.",
      blocks: [
        {
          type: "table",
          label: "Materials and manufacturing",
          columns: ["Part", "Prototype", "Production"],
          rows: [
            { name: "Frame / housing", cells: ["PETG or nylon (FDM)", "Injection-moulded PC or PP"], tone: "gain" },
            { name: "Lens (curved visor)", cells: ["Cut from clear polycarbonate sheet", "Injection-moulded optical PC"], tone: "gain" },
            { name: "Face seal (3-layer)", cells: ["Cast silicone in a printed mould", "Liquid silicone rubber moulded onto the frame"], tone: "gain" },
            { name: "Temple pocket and hinge guard", cells: ["Cast silicone", "LSR, co-moulded with the seal"], tone: "gain" },
            { name: "Strap (toothed)", cells: ["TPU 95A print, then cast silicone", "Silicone compression moulding"], tone: "gain" },
            { name: "Ratchet buckles", cells: ["PETG or nylon, printed flexure as the spring", "Injection-moulded nylon or acetal"], tone: "gain" },
          ],
        },
        {
          type: "decisions",
          label: "Optical and fit",
          items: [
            { title: "Vertex distance: up to 20mm", text: "Typical is 12–14mm, but the design accounts for deep-set eyes and glasses that sit lower on the nose." },
            { title: "Thick-lens clearance", text: "A −10 lens in standard plastic has edges about 12mm thick. At high-index (1.74) that drops to 7–8mm. The visor depth of ~35mm at the edges covers both." },
            { title: "Hybrid direction", text: "Wide ~180° view and soft skirt seal from scuba masks, low profile and small air volume from large-frame goggles. The wearer's glasses frame will be the most visible edge, not the goggles." },
          ],
        },
        {
          type: "callout",
          label: "Parts glossary",
          text: [
            "Lens groove: a channel in the frame opening where the visor edge slots in, like a window pane in its frame. Hinge guard: thick silicone padding around the glasses' hinges, the part most likely to break. Mouth seal: a stretchy silicone membrane where the temple exits into its pocket. Corners: the thickened left and right ends of the frame that hold the face seal, strap socket and temple exit.",
          ],
        },
      ],
    },
    /* ── Cardboard prototype ── */
    {
      kind: "blocks",
      label: "Cardboard prototype",
      heading: "A cardboard mockup to find holes in the design before cutting silicone.",
      intro:
        "The first physical prototype was made from cardboard — not a one-to-one replica, but a proof of concept to test proportions, the temple opening and the strap buckle. It used a slot-and-hook mechanism inspired by one of the sketch pages.",
      blocks: [
        {
          type: "decisions",
          label: "Findings from the prototype",
          items: [
            { title: "Insert method needs rethinking", text: "How the glasses go into the goggles is a bigger problem than expected. The temple pocket opening and the face seal interact in ways the sketches didn't predict." },
            { title: "Prototype was too wide", text: "A smaller, more fitting size is needed for the second prototype." },
            { title: "Halfway seal and strap", text: "Merging the seal and strap at the midpoint keeps the temple opening in check — the strap's temple opening starts from inside the seal." },
          ],
        },
      ],
    },
    /* ── Testing plan ── */
    {
      kind: "blocks",
      label: "Testing plan",
      heading: "Simulation first, then real water.",
      blocks: [
        {
          type: "decisions",
          label: "Planned tests",
          items: [
            { title: "FEA simulation", text: "Stress points at tooth roots, temple pocket mouth and the strap-to-housing joint, using Fusion 360 or FreeCAD with CalculiX." },
            { title: "Real-world durability", text: "Fatigue cycling, chlorine and salt water soaking, sunscreen exposure, UV, pull-off and drop tests." },
            { title: "Leak testing on actual faces", text: "The seal has more flex points than a normal goggle, so performance has to be tested, not assumed." },
            { title: "ISO 18527-3 review", text: "The swimming goggles standard, to be checked before finalising the test plan." },
          ],
        },
      ],
    },
    /* ── What's next ── */
    {
      kind: "learnings",
      label: "What's next",
      heading: "Physical products are slower to fix than screens, so every part has to work before cutting a mould.",
      items: [
        { title: "Measure real glasses at the next focus group", text: "Calipers on the thickest pair available, to validate the 35mm visor depth." },
        { title: "Begin Onshape modelling", text: "Variable Studio for S / M / L, building in this order: frame, lens groove, seal, corners, strap sockets." },
        { title: "Source materials for prototyping", text: "Platinum-cure silicone for casting seals, clear polycarbonate sheet for cutting visors, and the easy-to-pour material for first reference samples." },
        { title: "FEA and leak testing", text: "Simulate stress points digitally, then test the first silicone prototype under real pool conditions." },
      ],
    },
  ],
};
