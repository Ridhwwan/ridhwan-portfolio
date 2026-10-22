// Shape of a long-form case study (the amandesign-style layout).
// Content lives in lib/studies/*.ts; components/study/* render it.
export type Pic = { src: string; alt: string };
export type Figure = Pic & { caption?: string };

export type MapPerson = { name: string; icon: "customer" | "courier" | "owner" | "team" };

export type TldrIcon = "challenge" | "approach" | "solution" | "impact";

export type StudySection =
  | { kind: "tldr"; label: string; heading: string; intro?: string; cards: { icon: TldrIcon; title: string; text: string }[] }
  | {
      kind: "context"; label: string; heading: string; intro: string;
      pair?: { label: string; text: string }[];
      legacy?: { heading: string; text: string; image?: Pic; problems: string[] };
    }
  | { kind: "discovery"; label: string; heading: string; intro: string; quotes?: string[]; pains: { title: string; text?: string }[]; hmw?: string }
  | {
      kind: "users"; label: string; heading: string; intro: string;
      map?: { top: MapPerson[]; hub: string; bottom: MapPerson[] };
      roles: { tag: string; title: string; text: string }[];
      research?: { heading: string; text: string; images: Figure[] };
    }
  | {
      kind: "ideation"; label: string; heading: string; intro: string;
      columns: { title: string; sub: string; items: string[] }[];
      test?: { heading: string; text: string; image: Pic };
    }
  | { kind: "final"; label: string; heading: string; intro: string; steps: { tab: string; src: string; caption: string }[] }
  | { kind: "outcomes"; label: string; heading: string; intro?: string; stats: { value: string; text: string }[] }
  | { kind: "learnings"; label: string; heading: string; items: { title: string; text: string }[] }
  /** A section assembled from blocks (see Block). `tone` gives it a warm tint or the dark band. */
  | { kind: "blocks"; label: string; heading: string; intro?: string; body?: string[]; tone?: "plain" | "tint" | "dark"; blocks: Block[] }
  /** Free-form chapter: heading, text, an optional list and figures. */
  | { kind: "story"; label: string; heading: string; intro?: string; body?: string[]; points?: string[]; images?: Figure[] };

/** Building blocks for "blocks" sections, modelled on the reference case studies. */
export type Block =
  /** Big accent numbers in outlined cards, with an optional note underneath. */
  | { type: "stats"; items: { value: string; label: string; text?: string }[]; note?: string }
  /** A quote on a warm panel with an accent edge. */
  | { type: "quote"; text: string; by?: string }
  /** Tinted panel with a small label, for a key insight. */
  | { type: "callout"; label?: string; text: string[]; tone?: "accent" | "warm" }
  /** Two numbered step lists side by side; "after" is tinted. */
  | { type: "beforeAfter"; before: { title: string; steps: string[] }; after: { title: string; steps: string[] } }
  /** "The problem" headline on the left, numbered hairline list on the right. */
  | { type: "problem"; label?: string; heading: string; items: string[] }
  /** Numbered cards joined into a 2-up grid (product decisions, trade-offs, findings). */
  | { type: "decisions"; label?: string; items: { title: string; text: string }[] }
  /** Image and numbered text, alternating sides. */
  | { type: "features"; items: { title: string; text: string; image: Pic }[] }
  /** Process chips in a row. */
  | { type: "phases"; items: string[]; note?: string }
  /** People cards: initials, a line in their words, a name and a short description. */
  | { type: "archetypes"; label?: string; items: { initials: string; quote?: string; title: string; meta?: string; text: string }[] }
  /** Numbered rows with tags, a description and a pain/fix pair. */
  | { type: "rows"; items: { title: string; tags?: string[]; text: string; pain?: string; fix?: string }[] }
  /** Stages across, rows down (journey map, blueprint); a row's tone tints it. */
  | { type: "table"; label?: string; columns: string[]; rows: { name: string; cells: string[]; tone?: "pain" | "gain" }[] }
  /** Icon cards for reflections, with an optional "what I'd do differently" panel. */
  | { type: "reflections"; items: { icon: "research" | "system" | "balance" | "craft"; title: string; text: string }[]; differently?: string[] }
  /** Figures: one full width, or two side by side. */
  | { type: "images"; images: Figure[] }
  /** The scrolling row of client logos. */
  | { type: "logos"; label?: string }
  /** A video with a poster and an optional caption. */
  | { type: "video"; src: string; poster?: string; caption?: string };

export type Study = {
  /** Must match the project's slug in lib/projects.ts. */
  slug: string;
  accent: string;
  /** Where the back link goes; false hides it (e.g. on About). */
  back?: { href: string; label: string } | false;
  hero: {
    mark?: string; markBg?: string; markImg?: string; wordmark?: string; title: string; intro: string;
    /** The client or product logo shown above the headline (any shape; shown at a fixed height). */
    logo?: { src: string; alt: string; height?: number };
    /** Live site, prototype, design file and so on; shown next to the timeline. */
    links?: { label: string; href: string }[];
    meta: { label: string; text: string }[];
    image?: Pic;
  };
  sections: StudySection[];
};
