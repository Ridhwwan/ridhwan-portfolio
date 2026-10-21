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
    relations: [{ slug: "playground-card", how: "Filters the Playground rows by category." }, { slug: "view-toggle", how: "Shares the row and the selected-state colours." }, { slug: "button", how: "Shares control radius and the button colour pair." }],
    usedOn: [{ label: "Playground", href: "/playground" }],
  },
  {
    slug: "playground-card",
    name: "Playground row",
    file: "components/playground/PlaygroundCard.tsx",
    description: "A Playground project. The image comes alive on hover (or when scrolled into view on phones): KoreanFirst sweeps through its weights, clips play over covers, and projects without images get a drawn app window. 'Try it' opens the project in a window. A row in list view, a tile in grid view.",
    tokens: ["--radius", "--tile", "--serif", "--line", "--ink", "--ink-soft", "--grid-gap-x", "--grid-gap-y", ...label],
    relations: [{ slug: "filter-chips", how: "Filtered by the chips above the list." }, { slug: "view-toggle", how: "Switches between rows and tiles." }, { slug: "project-window", how: "Its Try it button opens the project here." }, { slug: "project-card", how: "Shares image radius, placeholder fill and label style with project cards; in grid view it also uses the same grid gaps." }],
    usedOn: [{ label: "Playground", href: "/playground" }],
  },
  {
    slug: "view-toggle",
    name: "View toggle",
    file: "components/ui/ViewToggle.tsx",
    description: "Two-button switch between list and grid layouts. Remembers the visitor's choice.",
    tokens: ["--radius-control", "--line", "--bg", "--ink", "--ink-soft", "--btn-bg", "--btn-ink"],
    relations: [{ slug: "filter-chips", how: "Sits on the same row as the chips; same control radius, border and selected colours." }, { slug: "playground-card", how: "Changes how Playground cards are laid out." }],
    usedOn: [{ label: "Playground", href: "/playground" }],
  },
  {
    slug: "project-window",
    name: "Project window",
    file: "components/playground/ProjectWindow.tsx",
    description: "A desktop-style window that opens over the page so visitors can use a project without leaving: KoreanFirst's type tester, or any site set in the Notion 'Embed' field. Full-screen on phones; Esc closes it.",
    tokens: ["--bg", "--ink", "--ink-soft", "--line", "--tile", "--radius", "--radius-control", "--gutter-max"],
    relations: [{ slug: "playground-card", how: "Opened from a card's Try it button." }, { slug: "type-tester", how: "Shows the full KoreanFirst tester inside the window." }, { slug: "button", how: "Try it uses the outline button style." }],
    usedOn: [{ label: "Playground", href: "/playground" }],
  },
  {
    slug: "water-ripple",
    name: "Water ripple",
    file: "components/effects/WaterRipple.tsx",
    description: "A sheet of water over every page. The mouse drops ripples and the page bends where they pass (Chromium browsers; others get soft light rings). Clickable things never start ripples; project cards float like lily pads.",
    tokens: ["--ripple-strength", "--card-float"],
    relations: [{ slug: "project-card", how: "A lily pad: ripples barely touch it and it drifts when the cursor passes under." }, { slug: "playground-card", how: "Also a lily pad, in both list and grid view." }, { slug: "button", how: "Buttons are masked out, so they never bend or start ripples." }],
    usedOn: [{ label: "Every page", href: "/" }],
  },
  {
    slug: "visitor-pill",
    name: "Your-version pill",
    file: "components/design/VisitorThemePill.tsx",
    description: "Appears at the bottom of every page while a visitor browses with their own design-system changes, with Edit and Reset. Their changes vanish when they reload or leave.",
    tokens: ["--ink", "--bg"],
    relations: [{ slug: "water-ripple", how: "Marked so ripples never start on it." }],
    usedOn: [{ label: "Every page, after editing the design system", href: "/design-system" }],
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
    slug: "contact-links",
    name: "Contact links",
    file: "components/ui/ContactLinks.tsx",
    description: "Icon links to reach Ridhwan directly: email (opens the visitor's mail app), X and GitHub.",
    tokens: ["--ink", "--ink-soft", "--line", "--tile", "--radius-control"],
    relations: [{ slug: "page-header", how: "Sits under the Contact page header as the no-form way to get in touch." }, { slug: "contact-form", how: "The alternative to the form for people who'd rather email directly." }],
    usedOn: [{ label: "Contact", href: "/contact" }],
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
    relations: [{ slug: "project-window", how: "Also runs inside the Try it window, where its control bar sticks to the top of the window instead." }, { slug: "nav", how: "Its control bar sticks right under the top bar." }, { slug: "page-header", how: "Opened by a Page header on the KoreanFirst page." }],
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
// Shared token sets can overlap (e.g. the button set includes the body font), so dedupe.
for (const c of COMPONENTS) {
  c.tokens = [...new Set(c.tokens)];
  for (const t of c.tokens) {
    if (!TOKENS.some((d) => d.name === t)) throw new Error(`Component ${c.slug} lists unknown token ${t}`);
  }
  for (const r of c.relations) {
    if (!COMPONENTS.some((d) => d.slug === r.slug)) throw new Error(`Component ${c.slug} relates to unknown ${r.slug}`);
  }
}
