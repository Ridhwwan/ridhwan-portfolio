// Alveum case study (/work/alveum). Sources: the resume (Dec 2024 – Mar 2025,
// product designer and UX strategist, Ilorin), the "Digital distribution system"
// working notes in Notion, and screens exported from the Figma file.
// "Amedom Stores" is the sample business used in the designs.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const alveum: Study = {
  slug: "alveum",
  accent: "#0B84C6",
  hero: {
    mark: "A",
    markBg: "#0B84C6",
    title: "A back office that runs a wholesale business, not just its stock.",
    intro:
      "Designing Alveum, a warehouse management SaaS for retail and bulk-sales businesses: purchasing, stock and suppliers, pricing, customers, budgets and profit, in one place.",
    logo: { src: "/logos/row-alveum.webp", alt: "Alveum", height: 64 },
    meta: [
      { label: "My contributions", text: "UX strategy, user stories, the full back office, a 300+ variant design system, and the documentation and system guide." },
      { label: "Timeline", text: "4 months, December 2024 to March 2025, on contract from Ilorin." },
      { label: "Role", text: "Product designer and UX strategist." },
    ],
    links: [
      { label: "Live prototype", href: "https://www.figma.com/proto/PVo6t4Wtpn4KRwPDOGMfsv/Warehouse-Management-System--Copy-?node-id=2701-37387&t=Fka9RTuVAsLJMjHa-1" },
    ],
    image: { src: F("alveum-cover.webp"), alt: "Alveum purchase requests screen on a tablet" },
  },
  sections: [
    {
      kind: "tldr",
      label: "TL;DR",
      heading: "A quick overview of the entire project.",
      cards: [
        { icon: "challenge", title: "The challenge", text: "Wholesale foodstuff distribution ran on manual stock counts, supplier price changes and customer credit kept in heads and notebooks." },
        { icon: "approach", title: "Approach", text: "User stories for the business owner, each turned into a specific screen, before any visual design." },
        { icon: "solution", title: "Solution", text: "A desktop back office for the owner: dashboard, inventory, pricing, CRM, finances, employees, notifications and reports." },
        { icon: "impact", title: "Impact", text: "A 300+ variant design system and a documented system guide engineers could build from." },
      ],
    },
    {
      kind: "blocks",
      label: "Context",
      heading: "Automate distribution, and learn from every sale.",
      intro: "The objective: automate and optimise wholesale foodstuff distribution, improve inventory and payment management, and collect data the owner can act on.",
      blocks: [
        {
          type: "decisions",
          label: "Scope",
          items: [
            { title: "The owner's portal first", text: "The first release covers the business owner, who decides and approves everything." },
            { title: "Desktop, responsive-ready", text: "Designed for desktop, but built to stay responsive even in the prototype." },
          ],
        },
        { type: "callout", label: "Research note", text: ["There's very little 'warehouse' or 'distribution' software to learn from, so research went one level down, to CRMs and the parts of the job they cover."] },
      ],
    },
    {
      kind: "blocks",
      label: "User stories",
      heading: "Every screen started as a sentence the owner would say.",
      intro: "Each user story was written down and answered with a specific place in the product.",
      blocks: [
        {
          type: "rows",
          items: [
            { title: "Top sellers", tags: ["Dashboard", "Reports"], text: "\"I want to see which products bring in the most revenue, so I can promote them.\"", fix: "An interactive chart of the week's, month's and year's top sellers." },
            { title: "Prices that move", tags: ["Pricing"], text: "\"Suppliers change prices; I want to update selling prices quickly to protect my margin.\"", fix: "A prices section for supplier, bulk and retail prices, with logs and notifications." },
            { title: "Supplier performance", tags: ["Inventory"], text: "\"I want to see how each supplier performs and record their payment terms.\"", fix: "A supplier profile with their products, purchase history and delivery times." },
            { title: "Approving purchases", tags: ["Inventory"], text: "\"Employees request stock; I need to approve, reject or ask for changes.\"", fix: "Purchase requests with approve, reject and adjust, and the full item list one click away." },
            { title: "Credit customers", tags: ["CRM"], text: "\"I sell on credit to people I trust and need to know who's owing.\"", fix: "Customer profiles with buying history, credit and search for owing customers." },
            { title: "Rewarding loyalty", tags: ["CRM"], text: "\"I want discounts for regular and premium customers.\"", fix: "Customer ranks (new, regular, premium) and promotions that target them." },
            { title: "Budgets", tags: ["Finances"], text: "\"I want to set revenue and expense goals and track against them.\"", fix: "A budget page under Finances." },
            { title: "Daily cash", tags: ["Finances"], text: "\"I want to see money coming in and going out every day.\"", fix: "A transactions table with in and out badges, leading to each transaction's details." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Principles",
      tone: "tint",
      heading: "Only show what the task needs.",
      blocks: [
        {
          type: "decisions",
          items: [
            { title: "Progressive disclosure", text: "Details appear when they're needed, not before." },
            { title: "Hierarchy without decoration", text: "Space and size do the grouping, not lines and colour." },
            { title: "A 4-point grid", text: "Spacing shrinks the deeper an element sits: a 16px container holds children 8px or 4px apart." },
            { title: "Built for dark mode", text: "Every element has a background and a border, so it holds up in both themes." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Final design",
      heading: "From purchase request to profit report.",
      blocks: [
        {
          type: "features",
          items: [
            { title: "Dashboard", text: "Profit over time, the day's transactions and quick actions, filterable by date range.", image: { src: F("alveum-dashboard.png"), alt: "Alveum dashboard" } },
            { title: "Purchase requests", text: "Every request with its supplier, price and status, filterable, with approve, decline and edit in place.", image: { src: F("alveum-decline-request.png"), alt: "Declining an employee's purchase request" } },
            { title: "Reviewing a purchase", text: "A review form shows supplier, product, quantity, price and delivery before anything is saved.", image: { src: F("alveum-review-purchase.png"), alt: "Purchase review form" } },
            { title: "Stock and suppliers", text: "Each product carries its price log, supplier details and purchase history, so price changes are never a surprise.", image: { src: F("alveum-stock-detail.png"), alt: "Product detail with price log and purchase history" } },
            { title: "Dynamic pricing", text: "Retail and bulk prices are set as a percentage over cost, with recommended prices to start from.", image: { src: F("alveum-pricing.png"), alt: "Pricing rules" } },
            { title: "Customers and promotions", text: "Promotions target items and customer ranks, with rules like \"a 5% discount for regulars who buy more than 5 cartons\".", image: { src: F("alveum-new-promotion.png"), alt: "Creating a new promotion" } },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("alveum-budget.png"), alt: "Budget page", caption: "Budgets against targets." },
            { src: F("alveum-analytics.png"), alt: "Inventory analytics", caption: "Profit over time in Analytics." },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("alveum-customer-profile.png"), alt: "Customer profile with purchase history", caption: "A customer's details, purchase history and buying trend." },
            { src: F("alveum-stock.png"), alt: "Stock list", caption: "The stock list." },
          ],
        },
      ],
    },
    {
      kind: "outcomes",
      label: "Outcomes",
      heading: "A back office engineers could build without guessing.",
      stats: [
        { value: "300+", text: "Variants in the design system" },
        { value: "10", text: "Areas of the back office, from dashboard to profile" },
        { value: "1", text: "System guide covering every component and pattern" },
      ],
    },
    {
      kind: "learnings",
      label: "Learnings",
      heading: "User stories keep a big product honest.",
      items: [
        { title: "Every screen needs a reason", text: "Writing the owner's sentence first made it easy to cut features nobody had asked for, and several reports were dropped that way." },
        { title: "Document as you go", text: "The system guide was written alongside the design, so handoff was a reference, not a meeting." },
      ],
    },
  ],
};
