/**
 * The design system's single source of truth for site-wide tokens.
 *
 * Each token becomes a CSS variable on :root. Defaults live here; overrides
 * come from the Notion "Design tokens" table and are edited on /design-system.
 * Every value is validated against this registry before it reaches CSS.
 */

export type TokenGroup = "colors" | "typography" | "spacing" | "radius" | "buttons" | "motion";

type Base = { name: string; label: string; group: TokenGroup; description: string };

export type TokenDef =
  | (Base & { type: "color"; default: string })
  | (Base & { type: "length"; default: string; unit: "px" | "em"; min: number; max: number; step: number })
  | (Base & { type: "number"; default: string; min: number; max: number; step: number })
  | (Base & { type: "select"; default: string; options: string[] })
  | (Base & { type: "font"; default: string; options: string[] });

/** Fonts the site has loaded; a font token can only pick from these. */
export const FONT_STACKS: Record<string, string> = {
  "IBM Plex Serif": 'var(--font-plex-serif), "IBM Plex Serif", Georgia, serif',
  Geist: "var(--font-geist-sans), system-ui, sans-serif",
  Georgia: 'Georgia, "Times New Roman", serif',
  KoreanFirst: '"KoreanFirst", var(--font-geist-sans), sans-serif',
  System: 'system-ui, -apple-system, "Segoe UI", sans-serif',
};
const FONTS = Object.keys(FONT_STACKS);

export type GroupDef = { id: TokenGroup; title: string; intro: string; ties: string[] };

/** Foundations. `ties` is the written explanation of how each one connects to the rest. */
export const GROUPS: GroupDef[] = [
  {
    id: "colors",
    title: "Colour",
    intro: "Seven colours run everything outside the case studies.",
    ties: [
      "Text and Secondary text form the reading hierarchy: titles and anything you must read use Text; summaries, captions and inactive links step back to Secondary text.",
      "Button fill doubles as the outline colour of outline buttons and the fill of the selected filter chip, so every clickable thing shares one accent. Button text is what sits on top of it.",
      "Hairlines separate the top bar, footer, Playground rows and form fields. Placeholder fill sits behind images and empty thumbnails, so cards keep their shape while loading.",
      "Page background is also used for the frosted top bar and form fields, so changing it re-tints the whole frame. Keep enough contrast between Page background, Text and Secondary text.",
    ],
  },
  {
    id: "typography",
    title: "Typography",
    intro: "A serif for headlines, a sans for everything else.",
    ties: [
      "Headline font, size, weight and letter-spacing drive every page title (Section intro, Page header) and the footer line, so the voice of the site changes in one place.",
      "Page title size is a maximum: titles shrink to 55% of it on phones. Section heading size does the same for About headings and the footer, down to 65%.",
      "Label size, letter-spacing and case style every small caps line: card meta, chips, Playground categories, form labels and the case-study labels. Keep labels smaller than Body size.",
      "Body font also sets buttons and navigation, so it follows into the Button foundation.",
    ],
  },
  {
    id: "spacing",
    title: "Spacing",
    intro: "The rhythm of the page: margins, widths and gaps.",
    ties: [
      "Page side margin and Max content width define the frame every section, the top bar and the footer sit in. The margin is a maximum; it shrinks on narrow screens.",
      "Space above page titles and Section spacing wrap every Page header and Section intro, so all pages open with the same rhythm. On phones both drop to 60%.",
      "Top bar height also sets where the menu opens on phones and where the KoreanFirst controls stick, so they never overlap the bar.",
      "Card grid gaps only affect the project grid; Space above footer ends every page.",
    ],
  },
  {
    id: "radius",
    title: "Corner radius",
    intro: "Two radii: one for pictures, one for controls.",
    ties: [
      "Images and cards rounds every picture: project images, About photos, Playground thumbnails and the glyph tiles.",
      "Buttons, chips and inputs rounds everything you click or type into, so buttons, filter chips and form fields always match. Keeping it smaller than the image radius keeps controls feeling tighter than content.",
    ],
  },
  {
    id: "buttons",
    title: "Buttons",
    intro: "The size and weight shared by every button.",
    ties: [
      "Every button is the Button component, so these values change the Resume, Let's talk, Send me a message and Send message buttons together.",
      "The top bar uses a compact version: 8px shorter and 4px narrower on each side, derived from these values.",
      "Colours come from the Colour foundation (Button fill and Button text) and the corners from Corner radius, so a button touches three foundations.",
    ],
  },
  {
    id: "motion",
    title: "Motion",
    intro: "The water under the page: ripples that follow the cursor.",
    ties: [
      "Moving the cursor drops ripples into a sheet of water over the whole site, and the page bends where they pass. Ripple strength sets how far it bends; 0 turns the bending off.",
      "Anything you click (buttons, links, form fields) never starts a ripple, so controls always stay crisp and still.",
      "Project cards on Home and the Playground are lily pads: ripples barely touch them, and when the cursor swims underneath they drift by Card float, like a fish passing below.",
      "Everything stops for visitors who've asked their device for less motion, on touch screens, and on computers too slow to keep it smooth.",
    ],
  },
];

export const TOKENS: TokenDef[] = [
  // colours
  { name: "--bg", label: "Page background", group: "colors", type: "color", default: "#ffffff", description: "Background behind every page." },
  { name: "--ink", label: "Text", group: "colors", type: "color", default: "#141414", description: "Main text, headings and active nav links." },
  { name: "--ink-soft", label: "Secondary text", group: "colors", type: "color", default: "#5c5c5c", description: "Summaries, captions, inactive nav links, footer text." },
  { name: "--line", label: "Hairlines and borders", group: "colors", type: "color", default: "#e7e7e7", description: "Dividers, input borders, chip borders, nav and footer rules." },
  { name: "--tile", label: "Placeholder fill", group: "colors", type: "color", default: "#f4f4f4", description: "Behind images while they load, and empty thumbnails." },
  { name: "--btn-bg", label: "Button fill", group: "colors", type: "color", default: "#141414", description: "Solid buttons, and the border and hover fill of outline buttons." },
  { name: "--btn-ink", label: "Button text", group: "colors", type: "color", default: "#ffffff", description: "Text on solid buttons and selected chips." },

  // typography
  { name: "--serif", label: "Headline font", group: "typography", type: "font", default: "IBM Plex Serif", options: FONTS, description: "Page titles, section headings, the footer line." },
  { name: "--sans", label: "Body font", group: "typography", type: "font", default: "Geist", options: FONTS, description: "Body text, labels, nav and buttons." },
  { name: "--fs-display", label: "Page title size", group: "typography", type: "length", unit: "px", min: 36, max: 120, step: 1, default: "76", description: "Largest size of page titles; shrinks on small screens." },
  { name: "--display-weight", label: "Headline weight", group: "typography", type: "select", options: ["400", "500"], default: "400", description: "Weight of the headline font." },
  { name: "--display-tracking", label: "Headline letter-spacing", group: "typography", type: "length", unit: "em", min: -0.06, max: 0.04, step: 0.005, default: "-0.015", description: "Tighter or looser headlines." },
  { name: "--fs-heading", label: "Section heading size", group: "typography", type: "length", unit: "px", min: 22, max: 72, step: 1, default: "46", description: "About section headings and the footer line." },
  { name: "--fs-body", label: "Body size", group: "typography", type: "length", unit: "px", min: 14, max: 22, step: 0.5, default: "17", description: "Default text size." },
  { name: "--fs-card-title", label: "Card title size", group: "typography", type: "length", unit: "px", min: 16, max: 36, step: 1, default: "22", description: "Project names under the cards." },
  { name: "--fs-label", label: "Label size", group: "typography", type: "length", unit: "px", min: 11, max: 18, step: 0.5, default: "14", description: "Small labels, chips and form labels." },
  { name: "--label-tracking", label: "Label letter-spacing", group: "typography", type: "length", unit: "em", min: 0, max: 0.2, step: 0.01, default: "0.03", description: "Spacing between letters in labels." },
  { name: "--label-case", label: "Label case", group: "typography", type: "select", options: ["uppercase", "none"], default: "uppercase", description: "All caps or as written." },

  // spacing
  { name: "--gutter-max", label: "Page side margin", group: "spacing", type: "length", unit: "px", min: 16, max: 160, step: 1, default: "68", description: "Space between content and the screen edge (shrinks on phones)." },
  { name: "--wrap", label: "Max content width", group: "spacing", type: "length", unit: "px", min: 900, max: 1800, step: 10, default: "1400", description: "How wide content can grow on large screens." },
  { name: "--nav-height", label: "Top bar height", group: "spacing", type: "length", unit: "px", min: 48, max: 104, step: 1, default: "68", description: "Height of the navigation bar." },
  { name: "--space-page-top", label: "Space above page titles", group: "spacing", type: "length", unit: "px", min: 24, max: 220, step: 4, default: "96", description: "Gap between the top bar and each page's title." },
  { name: "--space-section", label: "Section spacing", group: "spacing", type: "length", unit: "px", min: 16, max: 180, step: 4, default: "64", description: "Space under page intros and between About sections." },
  { name: "--space-footer", label: "Space above footer", group: "spacing", type: "length", unit: "px", min: 32, max: 320, step: 4, default: "160", description: "Gap between page content and the footer." },
  { name: "--grid-gap-x", label: "Card grid column gap", group: "spacing", type: "length", unit: "px", min: 8, max: 96, step: 1, default: "34", description: "Horizontal space between project cards." },
  { name: "--grid-gap-y", label: "Card grid row gap", group: "spacing", type: "length", unit: "px", min: 16, max: 160, step: 2, default: "64", description: "Vertical space between rows of project cards." },

  // radius
  { name: "--radius", label: "Images and cards", group: "radius", type: "length", unit: "px", min: 0, max: 48, step: 1, default: "10", description: "Project images, About photos, Playground thumbnails, glyph tiles." },
  { name: "--radius-control", label: "Buttons, chips and inputs", group: "radius", type: "length", unit: "px", min: 0, max: 32, step: 1, default: "6", description: "Anything you click or type into." },

  // buttons
  { name: "--btn-height", label: "Button height", group: "buttons", type: "length", unit: "px", min: 30, max: 72, step: 1, default: "46", description: "Height of every button." },
  { name: "--btn-pad-x", label: "Button side padding", group: "buttons", type: "length", unit: "px", min: 6, max: 48, step: 1, default: "18", description: "Space either side of the button text." },
  { name: "--btn-weight", label: "Button text weight", group: "buttons", type: "number", min: 300, max: 800, step: 50, default: "550", description: "How bold button text is." },
  { name: "--btn-border", label: "Button border width", group: "buttons", type: "length", unit: "px", min: 0, max: 4, step: 0.5, default: "1.5", description: "Outline thickness on buttons." },

  // motion
  { name: "--ripple-strength", label: "Ripple strength", group: "motion", type: "number", min: 0, max: 40, step: 1, default: "16", description: "How far the page bends under a ripple. 0 turns the bending off." },
  { name: "--card-float", label: "Card float", group: "motion", type: "length", unit: "px", min: 0, max: 6, step: 0.5, default: "2", description: "How far a project card drifts when the cursor passes underneath." },
];

export const TOKEN_MAP = new Map(TOKENS.map((t) => [t.name, t]));

/** Returns a clean value if it's allowed for this token, otherwise null. */
export function validate(def: TokenDef, raw: string): string | null {
  const v = String(raw).trim();
  switch (def.type) {
    case "color":
      return /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v) ? v.toLowerCase() : null;
    case "length":
    case "number": {
      const n = Number(v);
      if (!Number.isFinite(n) || n < def.min || n > def.max) return null;
      return String(n);
    }
    case "select":
    case "font":
      return def.options.includes(v) ? v : null;
  }
}

/** The CSS a token's stored value turns into. */
export function toCss(def: TokenDef, value: string): string {
  switch (def.type) {
    case "length":
      return `${value}${def.unit}`;
    case "font":
      return FONT_STACKS[value] ?? FONT_STACKS[def.default];
    default:
      return value;
  }
}

export const defaults = (): Record<string, string> => Object.fromEntries(TOKENS.map((t) => [t.name, t.default]));

/** `:root { ... }` for a set of token values (missing or invalid ones fall back to defaults). */
export function rootCss(values: Record<string, string>): string {
  const decls = TOKENS.map((t) => {
    const v = validate(t, values[t.name] ?? "") ?? t.default;
    return `${t.name}:${toCss(t, v)}`;
  });
  return `:root{${decls.join(";")}}`;
}
