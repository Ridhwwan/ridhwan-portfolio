import { TOKENS } from "./design-tokens";

/**
 * Every shared component on the site: what it is, which tokens style it,
 * and where it appears. Token "affects" lists are derived from this, so the
 * two never drift apart.
 */
export type ComponentDef = {
  slug: string;
  name: string;
  file: string;
  description: string;
  tokens: string[];
  /** Other components this one is built from or sits beside, and why it matters. */
  relations: { slug: string; how: string }[];
  usedOn: { label: string; href: string }[];
};

const label = ["--fs-label", "--label-tracking", "--label-case"];
const headline = ["--serif", "--fs-display", "--display-weight", "--display-tracking"];
const button = ["--btn-height", "--btn-pad-x", "--btn-weight", "--btn-border", "--btn-bg", "--btn-ink", "--radius-control", "--sans"];

export const COMPONENTS: ComponentDef[] = [
  {
    slug: "button",
    name: "Button",
    file: "components/ui/ButtonLink.tsx",
    description: "Solid or outline button, as a link. Outline buttons get the ↗ arrow. External links open in a new tab.",
    tokens: button,
    relations: [{ slug: "nav", how: "The Resume button is this component at a compact size." }, { slug: "footer", how: "The footer's 'Send me a message' is the outline variant." }, { slug: "contact-form", how: "The submit button uses the same .btn class." }, { slug: "filter-chips", how: "Selected chips borrow the button fill and text colours so 'chosen' looks like 'pressed'." }],
    usedOn: [
      { label: "Top bar (Resume)", href: "/" },
      { label: "Home intro (Let's talk)", href: "/" },
      { label: "Footer (Send me a message)", href: "/about" },
      { label: "Contact form (Send message)", href: "/contact" },
    ],
  },
  {
    slug: "nav",
    name: "Top bar",
    file: "components/Nav.tsx",
    description: "Name on the left, page links and the Resume button on the right. Collapses into a menu on phones.",
    tokens: ["--bg", "--ink", "--ink-soft", "--line", "--nav-height", "--gutter-max", "--wrap", "--sans", ...button],
    relations: [{ slug: "button", how: "Holds the Resume button." }, { slug: "footer", how: "Mirrors the footer: same wrapper width and hairline, so the page is framed top and bottom." }, { slug: "type-tester", how: "Its height is where the Type tester controls stick." }],
    usedOn: [{ label: "Every page", href: "/" }],
  },
  {
    slug: "footer",
    name: "Footer",
    file: "components/Footer.tsx",
    description: "The 'Want to work with me?' line with a button, then copyright and links. The line is hidden on Contact.",
    tokens: ["--serif", "--fs-heading", "--line", "--ink-soft", "--space-footer", "--gutter-max", "--wrap", ...button],
    relations: [{ slug: "button", how: "Holds the outline 'Send me a message' button." }, { slug: "nav", how: "Shares the wrapper, hairline colour and link style with the top bar." }, { slug: "page-header", how: "Its headline uses the same serif as page titles, one step smaller." }],
    usedOn: [{ label: "Every page", href: "/" }],
  },
  {
    slug: "section-intro",
    name: "Section intro",
    file: "components/ui/SectionIntro.tsx",
    description: "Label and serif headline on the left, short text and a button on the right. The home page opening.",
    tokens: [...headline, ...label, "--ink", "--space-page-top", "--space-section"],
    relations: [{ slug: "page-header", how: "Same label, headline and top spacing, so the home page and inner pages open at the same height." }, { slug: "button", how: "Its right column carries an outline button." }, { slug: "project-grid", how: "Sits directly above the grid; Section spacing is the gap between them." }],
    usedOn: [{ label: "Home", href: "/" }],
  },
  {
    slug: "page-header",
    name: "Page header",
    file: "components/ui/PageHeader.tsx",
    description: "Label, serif title, optional subtitle and lede. Opens every inner page.",
    tokens: [...headline, ...label, "--ink-soft", "--space-page-top", "--space-section"],
    relations: [{ slug: "section-intro", how: "The one-column sibling of Section intro; both share headline and spacing tokens." }, { slug: "back-link", how: "Nested pages put a Back link above it." }],
    usedOn: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Playground", href: "/playground" },
      { label: "KoreanFirst", href: "/playground/koreanfirst" },
    ],
  },
  {
    slug: "project-card",
    name: "Project card",
    file: "components/ProjectCard.tsx",
    description: "Image, then platform icon and label, title and one-line summary.",
    tokens: ["--radius", "--tile", "--fs-card-title", "--ink", "--ink-soft", ...label],
    relations: [{ slug: "project-grid", how: "Always placed in the grid, which sets the space between cards." }, { slug: "playground-card", how: "The Playground's version of a card: same image radius, placeholder fill and label style." }],
    usedOn: [{ label: "Home", href: "/" }],
  },
  {
    slug: "project-grid",
    name: "Project grid",
    file: "components/ProjectGrid.tsx",
    description: "Three columns of project cards; two on tablets, one on phones.",
    tokens: ["--grid-gap-x", "--grid-gap-y"],
    relations: [{ slug: "project-card", how: "Lays out project cards in 3, 2 or 1 columns." }, { slug: "section-intro", how: "Follows the home page intro." }],
    usedOn: [{ label: "Home", href: "/" }],
  },
  {
    slug: "filter-chips",
    name: "Filter chips",
    file: "components/ui/FilterChips.tsx",
    description: "Single-choice row of buttons for filtering a list.",
    tokens: ["--radius-control", "--line", "--ink", "--btn-bg", "--btn-ink", ...label],
    relations: [{ slug: "playground-card", how: "Filters the Playground rows by category." }, { slug: "button", how: "Shares control radius and the button colour pair." }],
    usedOn: [{ label: "Playground", href: "/playground" }],
  },
  {
    slug: "playground-card",
    name: "Playground row",
    file: "components/playground/PlaygroundCard.tsx",
    description: "Thumbnail, title, category and year, summary. Filled from the Notion Playground table.",
    tokens: ["--radius", "--tile", "--serif", "--line", "--ink", "--ink-soft", ...label],
    relations: [{ slug: "filter-chips", how: "Filtered by the chips above the list." }, { slug: "project-card", how: "Shares image radius, placeholder fill and label style with project cards." }],
    usedOn: [{ label: "Playground", href: "/playground" }],
  },
  {
    slug: "back-link",
    name: "Back link",
    file: "components/ui/BackLink.tsx",
    description: "Small '‹ Parent' link at the top of a nested page.",
    tokens: ["--ink-soft", "--ink"],
    relations: [{ slug: "page-header", how: "Sits above the page header on nested pages." }, { slug: "case-study", how: "Opens every case study ('All work')." }],
    usedOn: [
      { label: "KoreanFirst", href: "/playground/koreanfirst" },
      { label: "Case studies", href: "/work/sos-express" },
    ],
  },
  {
    slug: "contact-form",
    name: "Contact form",
    file: "app/contact/ContactForm.tsx",
    description: "Name, email and message; opens the visitor's mail app with the message ready.",
    tokens: ["--radius-control", "--line", "--ink", "--ink-soft", ...label, ...button],
    relations: [{ slug: "button", how: "Submits with the standard solid button." }, { slug: "filter-chips", how: "Inputs share the control radius and hairline border with chips." }],
    usedOn: [{ label: "Contact", href: "/contact" }],
  },
  {
    slug: "type-tester",
    name: "Type tester",
    file: "components/type/TypeTester.tsx",
    description: "Size, weight and tracking controls, editable sample text and the character grid for KoreanFirst.",
    tokens: ["--radius", "--tile", "--line", "--ink", "--ink-soft", "--nav-height"],
    relations: [{ slug: "nav", how: "Its control bar sticks right under the top bar." }, { slug: "page-header", how: "Opened by a Page header on the KoreanFirst page." }],
    usedOn: [{ label: "KoreanFirst", href: "/playground/koreanfirst" }],
  },
  {
    slug: "case-study",
    name: "Case study layout",
    file: "components/case/CaseStudy.tsx",
    description: "Hero, stacked sections and 'Next project'. Colours and fonts come from each project's own theme in lib/projects.ts, so only the label font and page margins follow the site tokens.",
    tokens: ["--sans", "--gutter-max", "--wrap"],
    relations: [{ slug: "back-link", how: "Starts with a Back link." }, { slug: "nav", how: "Sits between the site's top bar and footer, so those stay on site tokens while the inside follows the project theme." }],
    usedOn: [
      { label: "SOS Express", href: "/work/sos-express" },
      { label: "Cendmate", href: "/work/cendmate" },
      { label: "MIO-G1", href: "/work/miog1" },
    ],
  },
];

export const getComponent = (slug: string) => COMPONENTS.find((c) => c.slug === slug);

/** Components a token affects. */
export const affectedBy = (token: string) => COMPONENTS.filter((c) => c.tokens.includes(token));

// Guard against typos: every token and related component must exist.
for (const c of COMPONENTS) {
  for (const t of c.tokens) {
    if (!TOKENS.some((d) => d.name === t)) throw new Error(`Component ${c.slug} lists unknown token ${t}`);
  }
  for (const r of c.relations) {
    if (!COMPONENTS.some((d) => d.slug === r.slug)) throw new Error(`Component ${c.slug} relates to unknown ${r.slug}`);
  }
}
