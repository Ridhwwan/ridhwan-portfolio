// KoreanFirst case study (/work/koreanfirst).
// A variable typeface that writes Latin letters with Hangul-inspired shapes.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const koreanfirst: Study = {
  slug: "koreanfirst",
  accent: "#D94F30",
  hero: {
    mark: "ㅋ",
    wordmark: "KoreanFirst",
    markBg: "#2C1810",
    title: "A typeface that writes English with Korean shapes.",
    intro:
      "KoreanFirst replaces ten Latin letters with Hangul jamo based on phonetic proximity — sounds that are redundant, inconsistent or difficult for Korean speakers get swapped. The rest of the alphabet stays Latin.",
    meta: [
      { label: "My contributions", text: "Concept, phonetic rule system, glyph design, variable font engineering and the live type tester." },
      { label: "Timeline", text: "2026." },
      { label: "Role", text: "Type designer and front-end developer." },
    ],
    links: [
      { label: "Try the type tester", href: "/playground/koreanfirst" },
      { label: "Phonetic context (Notion)", href: "https://app.notion.com/p/3f0604900d42819eaf7bdd3b5c89382b" },
    ],
    image: { src: F("koreanfirst-cover.webp"), alt: "The word KOREANFIRST set in the KoreanFirst typeface, mixing Latin and Hangul glyphs" },
  },
  sections: [
    /* ── Origin ── */
    {
      kind: "blocks",
      label: "Origin",
      heading: "It started with a t-shirt.",
      intro:
        "A photograph of a t-shirt that spelled out city names — SEOUL, NEW YORK, TOKYO, PARIS, LONDON, MILANO — each with one Latin letter swapped for a Hangul character. The shirt's rule was simple: sound first, shape second, one swap per word, keep it readable.",
      body: [
        "The concept was striking enough to build a whole typeface around. Remove the shape rule, apply phonetics only and push the system across the entire alphabet.",
      ],
      blocks: [
        {
          type: "stats",
          items: [
            { value: "10", label: "Letters swapped", text: "Latin letters replaced by Hangul jamo" },
            { value: "8", label: "Unique jamo", text: "Hangul characters used across those ten slots" },
            { value: "58", label: "Total glyphs", text: "Latin, Hangul, numbers and punctuation" },
          ],
        },
      ],
    },
    /* ── Rule system ── */
    {
      kind: "blocks",
      label: "The rule system",
      heading: "Phonetics decide which letters become Hangul.",
      intro:
        "Every letter in the Latin alphabet was tested against three questions: is this sound difficult for Korean speakers? Is it redundant — already covered by another letter? Does it have multiple, inconsistent pronunciations?",
      blocks: [
        {
          type: "decisions",
          label: "Three categories of swap",
          items: [
            {
              title: "Korean-friendly (F → ㅍ, V → ㅂ, Z → ㅈ)",
              text: "Sounds that Korean speakers typically substitute with a close Korean equivalent. These letters get the jamo Korean already uses for them.",
            },
            {
              title: "Redundant (C → ㅋ, Q → ㅋ, X → ㅅ)",
              text: "Letters whose sound is already covered by another letter. C and Q both map to K's Korean equivalent; X maps to S.",
            },
            {
              title: "Inconsistent (G → ㄱ, S → ㅅ, Y → ㅣ, H → ㅎ)",
              text: "Letters with multiple pronunciations and no fixed identity. Each gets its most common Korean reading.",
            },
          ],
        },
        {
          type: "callout",
          label: "The ratio",
          text: ["8 Hangul jamo : 18 Latin letters. The alphabet stays mostly Latin, so the text is readable but visually distinctive."],
          tone: "accent",
        },
      ],
    },
    /* ── Approaches ── */
    {
      kind: "blocks",
      label: "Distribution",
      heading: "Three ways to ship the font. Only one survived.",
      intro:
        "Before settling on the glyph-remapping approach, two other distribution methods were considered and rejected.",
      tone: "tint",
      blocks: [
        {
          type: "rows",
          items: [
            {
              title: "Font plus a converter",
              tags: ["Rejected"],
              text: "Users download a converter alongside the font. Rules like 'every five letters, swap one' need sentence-level context — a font file can't process that.",
              pain: "Requires sentence context the font can't see",
              fix: "Eliminated by glyph remapping",
            },
            {
              title: "The 'Frankenstein' font",
              tags: ["Rejected"],
              text: "Montserrat and Noto Sans KR spliced into a single file. Mixed-script glitches, OTF inconsistencies and licensing complexity made it unworkable.",
              pain: "Mixed-script rendering breaks across platforms",
              fix: "Eliminated by using Outfit as a single base",
            },
            {
              title: "Glyph remapping",
              tags: ["Chosen"],
              text: "The Hangul shapes sit directly in the Latin glyph slots. No converter needed — type normally and the swaps happen automatically.",
              pain: "None",
              fix: "Ships as a single, standard font file",
            },
          ],
        },
      ],
    },
    /* ── Design process ── */
    {
      kind: "blocks",
      label: "Glyph design",
      heading: "Outfit for the Latin, Noto Sans KR for the Hangul, scaled to match.",
      intro:
        "Both base fonts are licensed under the SIL Open Font License. Each Hangul jamo from Noto Sans KR was converted to outlines, scaled so its top edge matches Outfit's cap height exactly, and placed into the corresponding Latin slot.",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "1000", label: "UPM", text: "Units-per-em — the font's internal coordinate system" },
            { value: "700", label: "Cap height", text: "The height Latin capitals and Hangul jamo share" },
            { value: "200–700", label: "Weight range", text: "Variable font axis, from light to bold" },
          ],
        },
        {
          type: "callout",
          label: "The hardest part",
          text: [
            "Working with an older glyph maker. The tooling for designing individual glyphs — converting outlines, flattening compound paths, aligning to metric guides — was slower and more brittle than expected. Each glyph went through: type the character, convert to outlines, flatten to a single compound path, place into the glyph frame, scale to cap height, name the layer correctly, and export as SVG.",
          ],
          tone: "warm",
        },
      ],
    },
    /* ── Rules removed ── */
    {
      kind: "blocks",
      label: "Decisions",
      heading: "What was removed and why.",
      blocks: [
        {
          type: "decisions",
          label: "Rules dropped during development",
          items: [
            { title: "Shape matching", text: "The original t-shirt used visual similarity as a tiebreaker. The font uses phonetics only — cleaner and more consistent." },
            { title: "TH → Hangul", text: "A digraph (two letters, one sound) breaks the one-to-one swap logic the system depends on." },
            { title: "Every-five-letters rule", text: "Required sentence context that a font file cannot process. Glyph remapping made it unnecessary." },
            { title: "Korean number substitution", text: "Two Korean number systems (Sino-Korean and Native Korean) are context-dependent — cannot be assigned at the glyph level." },
          ],
        },
      ],
    },
    /* ── Type tester ── */
    {
      kind: "story",
      label: "Type tester",
      heading: "A live type tester, built into the portfolio.",
      intro:
        "The KoreanFirst variable font is served as a WOFF2 file. The type tester lets anyone try it: adjust size, weight and tracking, toggle swap groups on and off, and see the font at any scale.",
      body: [
        "The tester is responsive — 32px on mobile, 72px on tablet, 120px on desktop — and loads the actual variable font so the weight slider is continuous, not stepped.",
      ],
    },
    /* ── What's next ── */
    {
      kind: "learnings",
      label: "What's next",
      heading: "The font works. Now it needs a lowercase alphabet.",
      items: [
        { title: "Lowercase letters", text: "Text without lowercase is unusable for body copy. This is the biggest gap before the font can ship for text use." },
        { title: "Display vs text weight", text: "A lighter weight (300–400) for body text, with looser sidebearings. Hangul swaps may be too disruptive at 12–16px." },
        { title: "OpenType stylistic set", text: "A single font with swaps toggleable via font-feature-settings in CSS — instead of shipping two separate files." },
        { title: "Open-source release", text: "Licensed under the SIL Open Font License. Submit to Google Fonts or distribute from the portfolio." },
      ],
    },
  ],
};
