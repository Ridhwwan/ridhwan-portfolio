// SOS Express case study (/work/sos-express).
// Layout follows the "Support Application" study on amandesign.in.
// Facts come from the existing SOS Express case study and Ridhwan's resume
// (Oct 2026). Nothing here is measured after handoff, so there are no
// before/after percentages: the numbers are scale, not outcomes.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const sosExpress: Study = {
  slug: "sos-express",
  accent: "#2F5BFF",
  hero: {
    mark: "SOS",
    markBg: "#0F1B4C",
    markImg: F("hH41V4PWww2OPafAc7bQRYOuio.png"),
    title: "Giving a courier business a platform of its own.",
    intro:
      "Designing the brand, website and three connected portals that let SOS Express run deliveries for customers, couriers and the business owner in real time, after years of delivering for a larger courier.",
    meta: [
      { label: "My contributions", text: "Led research and usability testing with all three user types, and designed the brand, the website and every portal." },
      { label: "Timeline", text: "8 months, January to August 2025, on contract." },
      { label: "Role", text: "Product designer and brand designer." },
    ],
    image: { src: F("MQ8E3kGVYFWWlz4cvRrpnkNwk.png"), alt: "SOS Express courier delivery view on a laptop" },
  },
  sections: [
    {
      kind: "tldr",
      label: "TL;DR",
      heading: "A quick overview of the entire project.",
      intro: "SOS Express went from delivering for someone else to running its own platform, with one system and one brand behind every delivery.",
      cards: [
        { icon: "challenge", title: "The challenge", text: "Going independent meant customers and couriers had to talk to each other in real time, without a partner's tools." },
        { icon: "approach", title: "Approach", text: "Research and usability testing with all three user types, a competitive analysis, and a feature table for each portal." },
        { icon: "solution", title: "Solution", text: "A mobile-first brand, website and three progressive web apps: one for customers, one for couriers and one for the owner." },
        { icon: "impact", title: "Impact", text: "One component library across every device, and e-signature proof on every delivery." },
      ],
    },
    {
      kind: "context",
      label: "Context & problem",
      heading: "After years as a distribution partner, SOS Express needed to stand on its own.",
      intro:
        "SOS Express is a Nigerian logistics company that spent years delivering for a larger courier before going independent. To compete, it needed its own way for customers, couriers and the business to stay in step.",
      pair: [
        { label: "Before", text: "Deliveries ran on a larger courier's tools, with SOS as its distribution partner." },
        { label: "After", text: "Its own brand, its own website and three portals, built around how SOS actually works." },
      ],
      legacy: {
        heading: "The old way of working",
        text: "Before the courier portal, the day's work lived on a paper board in the office and a third-party portal.",
        problems: [
          "Couriers scanned packages after work, not as they delivered.",
          "Couriers weren't named on the delivery table.",
          "The third-party portal was hard to read.",
        ],
      },
    },
    {
      kind: "discovery",
      label: "Discovery",
      heading: "The problem wasn't moving packages. It was proving what happened to them.",
      intro: "Couriers were reporting unsafe drop-offs, third-party pickups and failed deliveries, with nothing to show what had actually happened at the door.",
      pains: [
        { title: "No proof of delivery", text: "Unsafe drop-offs, third-party pickups and failed deliveries came down to one person's word against another's." },
        { title: "Work done twice", text: "Scanning after hours and an unnamed delivery table meant couriers re-entered work they had already done." },
        { title: "Customers out of the loop", text: "Without a live link to the courier, customers couldn't see where their package was or reach the person carrying it." },
      ],
      hmw: "Give customers, couriers and the owner one live picture of every delivery, with proof at the doorstep?",
    },
    {
      kind: "users",
      label: "Users & research",
      heading: "One platform had to serve three people with very different days.",
      intro: "Research and usability testing covered all three user types. A competitive analysis then compared common logistics features with what SOS actually needed.",
      map: { top: [{ name: "Customers", icon: "customer" }, { name: "Couriers", icon: "courier" }], hub: "SOS Express", bottom: [{ name: "Business owner", icon: "owner" }] },
      roles: [
        { tag: "01", title: "Customers", text: "Push notifications on every status change, and a public page to track a package by waybill number." },
        { tag: "02", title: "Couriers", text: "Scan packages, see drop-off locations, update status live, chat with the customer and follow optimised routes." },
        { tag: "03", title: "Business owner", text: "Courier activity and feedback in one place, with the option to assign packages by hand." },
      ],
      research: {
        heading: "From competitors to a feature table",
        text: "Every function was tabled by user type in Notion, and that table became the feature list for each portal.",
        images: [
          { src: F("iN4ZA2Ibbmls8nUMHBnOl1PNr1A.png"), alt: "Competitive analysis" },
          { src: F("46qBjYx8CETL4ee2M42LwRMEbo.png"), alt: "Functionality table by user type" },
        ],
      },
    },
    {
      kind: "ideation",
      label: "Feature ideation",
      heading: "Each portal got exactly what its user needed, and nothing they'd have to work around.",
      intro: "The full delivery lifecycle was designed end to end: returns, refunds, rescheduling, courier reassignment and in-app chat with e-signature proof of delivery.",
      columns: [
        { title: "Customer portal", sub: "Know where it is", items: ["Notifications on every status change", "Public tracking by waybill number", "Chat with the courier", "Returns, refunds and rescheduling"] },
        { title: "Courier portal", sub: "Do it once, on the road", items: ["Scan packages as they move", "Drop-off locations and optimised routes", "Live status updates", "Remote sign-off with a geotagged photo"] },
        { title: "Owner portal", sub: "See and settle everything", items: ["Transaction and courier performance dashboards", "Manual assignment and courier reassignment", "Role assignment for staff", "Chat access for disputes, finance and reversals"] },
      ],
      test: {
        heading: "Testing the orders list",
        text: "Two versions of the orders list went in front of users. Filter tabs let people choose what they wanted to see, while an order-history icon was easy to miss without already knowing what it meant.",
        image: { src: F("5f4mxsoa3iaZp9STYK2nnXi6KI.png"), alt: "Version A and version B of the orders list, with test notes" },
      },
    },
    {
      kind: "final",
      label: "Final design",
      heading: "A delivery anyone can follow, from booking to signature.",
      intro: "The finished portals follow a package from the customer's order through the courier's route to the doorstep, with the owner watching over all of it. Each portal is a progressive web app, so nobody has to install anything from an app store.",
      steps: [
        { tab: "Customer tracking", src: F("Ky3Oz1y77MUx0VBa6N7wphYNMi8.png"), caption: "Customers track a package from the website or follow every order in the app." },
        { tab: "Courier app", src: F("VfDW1HEPtZrLUaUBfntgxi8uJ8.png"), caption: "Couriers scan each package, follow the route and see every delivery assigned to them." },
        { tab: "Proof of delivery", src: F("nvehG02L20d3oEU6MqO9AB8Sqb4.png"), caption: "Testers weren't sure where to sign, so the signing area gets both an outline and colour, plus a retry and a confirm button." },
        { tab: "Owner dashboard", src: F("qTnGytHa1SnrdCAyvc1kugWk8w.png"), caption: "Revenue, completed and ongoing deliveries up front, with packages, employees and finances a tap away." },
        { tab: "The brand", src: F("PIvVl7PZnbBIfpVGkceLet9kAM.png"), caption: "Built with the founder from a word map (fast, easy to use, good service, simple yet sophisticated) and carried onto social media." },
      ],
    },
    {
      kind: "outcomes",
      label: "Key outcomes",
      heading: "One system and one brand behind every delivery.",
      intro: "What SOS Express had in hand when the contract ended.",
      stats: [
        { value: "500+", text: "Component variants across mobile, tablet and desktop" },
        { value: "~100", text: "Deliveries a day on the platform" },
        { value: "7", text: "Brand touchpoints: app, website, social, vehicles, t-shirts, stamps and banners" },
      ],
    },
    {
      kind: "learnings",
      label: "Learnings",
      heading: "Business goals and user needs have to be designed together.",
      items: [
        { title: "Proof matters as much as speed", text: "The hardest problems weren't about getting packages moving. They were about settling what happened at the door, which is why sign-off and evidence sit inside the delivery itself." },
        { title: "When testers split, look for a design that serves both", text: "Half the testers wanted an outline around the signing area and half wanted colour. Using both removed the doubt for everyone." },
        { title: "A brand has to work in the tools the team already uses", text: "DM Sans carries the identity because it's free and works in Google Slides and Docs, which the team uses every day." },
      ],
    },
  ],
};
