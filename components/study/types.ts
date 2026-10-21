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
      research?: { heading: string; text: string; images: Pic[] };
    }
  | {
      kind: "ideation"; label: string; heading: string; intro: string;
      columns: { title: string; sub: string; items: string[] }[];
      test?: { heading: string; text: string; image: Pic };
    }
  | { kind: "final"; label: string; heading: string; intro: string; steps: { tab: string; src: string; caption: string }[] }
  | { kind: "outcomes"; label: string; heading: string; intro?: string; stats: { value: string; text: string }[] }
  | { kind: "learnings"; label: string; heading: string; items: { title: string; text: string }[] }
  /** Free-form chapter: heading, text, an optional list and figures. */
  | { kind: "story"; label: string; heading: string; intro?: string; body?: string[]; points?: string[]; images?: Figure[] };

export type Study = {
  /** Must match the project's slug in lib/projects.ts. */
  slug: string;
  accent: string;
  back?: { href: string; label: string };
  hero: {
    mark: string; markBg: string; markImg?: string; title: string; intro: string;
    meta: { label: string; text: string }[];
    image: Pic;
  };
  sections: StudySection[];
};
