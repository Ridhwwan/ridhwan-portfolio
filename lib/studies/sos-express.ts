// SOS Express case study (/work/sos-express).
// Layout follows the "Support Application" study on amandesign.in (approved).
// Content: the original Framer case study (ridhwan.framer.website/sos-express,
// every section and image restored) plus the resume (Oct 2026). Nothing was
// measured after handoff, so the numbers are scale, not outcomes.
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
      { label: "My contributions", text: "Research and usability testing with all three user types, site and journey mapping, the high-fidelity prototype, documentation, and the brand." },
      { label: "Timeline", text: "8 months, January to August 2025, on contract." },
      { label: "Role", text: "Product designer and brand designer." },
    ],
    links: [
      { label: "Live website", href: "https://sosexpressltd.com/" },
      { label: "Design file and prototypes", href: "https://www.figma.com/design/mE2kO8rvdFJb7etuBeSc2M/SOS-Express?node-id=2214-59039&t=CNqHQTeVQAFaiHG0-1" },
    ],
    image: { src: F("MQ8E3kGVYFWWlz4cvRrpnkNwk.png"), alt: "SOS Express courier delivery view on a laptop" },
  },
  sections: [
    {
      kind: "tldr",
      label: "TL;DR",
      heading: "A quick overview of the entire project.",
      intro: "SOS Express went from delivering for someone else to a tech-enabled logistics platform ready to grow, with one system and one brand behind every delivery.",
      cards: [
        { icon: "challenge", title: "The challenge", text: "Going independent meant customers and couriers had to talk to each other in real time, without a partner's tools." },
        { icon: "approach", title: "Approach", text: "Research and usability testing with all three user types, a competitive analysis, and a feature table for each portal." },
        { icon: "solution", title: "Solution", text: "A brand, a responsive website and three progressive web apps: one for customers, one for couriers and one for the owner." },
        { icon: "impact", title: "Impact", text: "Reusable components for faster handoff, order tracking customers can trust, and finance and courier dashboards for the owner." },
      ],
    },
    {
      kind: "blocks",
      label: "Context & problem",
      heading: "After years as a distribution partner, SOS Express needed to stand on its own.",
      intro:
        "SOS Express is a Nigerian logistics company that delivered for SpeedAF, a large international courier, before going independent. To compete, it needed its own way for customers, couriers and the business to stay in step.",
      blocks: [
        {
          type: "beforeAfter",
          before: { title: "Delivering for SpeedAF", steps: ["Scan packages in a third-party app that alerts SpeedAF", "Collect cash on delivery, then SpeedAF takes its share", "Keep a paper and a digital list for every batch", "Track the day on a board in the office"] },
          after: { title: "A platform of its own", steps: ["Scan packages in the courier app as they move", "Payments land in the company account, linked to the owner's dashboard", "Every delivery named to the courier who made it", "Customers, couriers and the owner see the same live status"] },
        },
        {
          type: "problem",
          label: "Watching couriers work",
          heading: "The old tools made couriers do the work twice.",
          items: [
            "Couriers scanned packages after work, not as they delivered.",
            "Their names weren't linked to the delivery table in the owner's portal.",
            "The third-party portal had poor contrast, unclear icons and hard-to-follow navigation.",
          ],
        },
        {
          type: "images",
          images: [
            { src: F("Y712fLZc4U4f4NpdHHk6jfQvyR4.jpg"), alt: "Whiteboard of daily delivery records in the SOS office", caption: "The daily delivery board in the office." },
            { src: F("vXRr8mfSJs7fXOidDCqlLUq8wE.jpg"), alt: "Printed delivery list for a batch", caption: "A printed delivery list for one batch." },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("CsWUVfSIlpR3Nw4M468GRuOx7mU.png"), alt: "The third-party app's collection screen", caption: "The third-party app couriers used to log collections." },
            { src: F("SI1zNL38eEjjU3sqJ2yf7MZHZA.jpg"), alt: "The partner's logistics app", caption: "The partner's app, with readability and contrast problems." },
          ],
        },
        { type: "images", images: [{ src: F("sUaf3UQDGRtqXh7JpToamcE2UtU.png"), alt: "Breakdown of the existing delivery system", caption: "Breaking down how the existing system worked." }] },
      ],
    },
    {
      kind: "discovery",
      label: "Discovery",
      heading: "The problem wasn't moving packages. It was proving what happened to them.",
      intro: "Couriers from competing companies described three things they do when nobody is home to receive a package. None of them was good.",
      pains: [
        { title: "Leave it unsupervised", text: "The package is left at the door, which isn't safe." },
        { title: "Hand it to someone else", text: "A neighbour or colleague collects it, which weakens security." },
        { title: "Postpone the delivery", text: "The courier comes back another day, wasting time and fuel." },
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
        { tag: "02", title: "Couriers", text: "Scan packages, see drop-off locations, update status live, chat with the customer and follow optimised multi-stop routes from the Google Maps API." },
        { tag: "03", title: "Business owner", text: "Courier activity and feedback in one place. Deliveries are assigned by location automatically, with the option to assign by hand." },
      ],
      research: {
        heading: "From competitors to a feature table",
        text: "Competitors' strengths and weaknesses were compared with the client's goals. Every function was then tabled by user type in Notion, and that table became the feature list and user flows for each portal.",
        images: [
          { src: F("H0RQQ0G9elER3iZRzqaDfs3qEE.png"), alt: "Competitive analysis notes", caption: "Competitive analysis notes." },
          { src: F("lA2AYLQ9hxSq7QuDYg6t5SehZY.png"), alt: "Feature comparison across competitors", caption: "Common features across competitors." },
        ],
      },
    },
    {
      kind: "blocks",
      label: "Research to structure",
      heading: "The feature table became the map of every portal.",
      blocks: [
        {
          type: "images",
          images: [
            { src: F("iN4ZA2Ibbmls8nUMHBnOl1PNr1A.png"), alt: "Functionality table for courier and owner scanning tasks", caption: "Scanning tasks for the courier and the owner." },
            { src: F("46qBjYx8CETL4ee2M42LwRMEbo.png"), alt: "Detailed system functions and user interactions", caption: "How each function affects every user type." },
          ],
        },
        { type: "images", images: [{ src: F("gk2PvUhdtWFhpD38SqXui395A.png"), alt: "User flows for all three portals", caption: "User flows for all three portals." }] },
      ],
    },
    {
      kind: "blocks",
      label: "Foundations",
      tone: "tint",
      heading: "A system small enough to learn and strong enough to scale.",
      intro: "The design system had to carry three portals across phone, tablet and desktop, and hand off cleanly to engineering.",
      blocks: [
        {
          type: "decisions",
          items: [
            { title: "Lucide icons", text: "Business-appropriate, with rounded line endings that feel friendlier and animate well later." },
            { title: "An 8-point grid", text: "One spacing and sizing scale for every component, which keeps things consistent as the system grows." },
            { title: "Semantic variables", text: "Base numbers and colours feed semantic variables, so every component instance is linked to the same values on every screen." },
            { title: "500+ variants", text: "One component library covers customer, courier and owner apps on mobile, tablet and desktop." },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("oK7Ny8il8Ppz1TdmdoEWnEUlbkI.png"), alt: "Lucide icon selection", caption: "The Lucide icons in use." },
            { src: F("q58HpsmRDKhhAz6QktOhgTZnDmo.png"), alt: "Spacing and sizing on an 8-point grid", caption: "Spacing and sizing on the 8-point grid." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Design decisions",
      heading: "Fewer choices on every screen, and proof inside every delivery.",
      blocks: [
        {
          type: "features",
          items: [
            { title: "Navigation without repetition", text: "Chat got its own page, still reachable from the order details. The order page lost its clutter, and every user type has fewer, clearer choices.", image: { src: F("OewULOFRU6aiKBRVtdGbVII62w.png"), alt: "Final version of the orders navigation" } },
            { title: "Decluttering the order page", text: "The order page shows only active deliveries and a few recent completed ones. Filter tabs and a history icon were both tested to reach the rest.", image: { src: F("5f4mxsoa3iaZp9STYK2nnXi6KI.png"), alt: "Version A and version B of the orders list, with test notes" } },
            { title: "Remote sign-off and chat", text: "A sign-off component on the order and chat pages lets customers sign remotely, leaving a record of their delivery instructions next to a geotagged photo. Third-party recipients sign too, and a courier can reschedule in the chat if nobody is home.", image: { src: F("EITATngERU36IJ9kVc2zJNy1Y.png"), alt: "Two test versions of the signing page" } },
            { title: "Testing the signing page", text: "Couriers and customers both use this page, so it had to be obvious where to sign. One group preferred a bordered area, the other a colour treatment, so the final page uses both.", image: { src: F("nvehG02L20d3oEU6MqO9AB8Sqb4.png"), alt: "Unsigned and signed versions of the final signing page" } },
            { title: "Order status, simplified", text: "Custom illustrations for delivery states were dropped: the illustration pack had no documentation and didn't show the states clearly. Status icons replaced them.", image: { src: F("qTc3ZecPjTqaeLmGzJ1NDi15r0Q.png"), alt: "Old order component, with a status icon, and the final pattern" } },
            { title: "Order updates that read at a glance", text: "The notification component went through several versions until each update named its stage, its time and what happens next.", image: { src: F("hWagCOIp0RFvbBOI1ekCWJrBj8.png"), alt: "Evolution of the order update notification component" } },
          ],
        },
        { type: "images", images: [{ src: F("M7MZq2AFEpTQeD4QlVUBUozxTzw.png"), alt: "Version C of the navigation, with notes", caption: "Version C of the navigation, before the final one." }] },
      ],
    },
    {
      kind: "final",
      label: "Final design",
      heading: "A delivery anyone can follow, from booking to signature.",
      intro: "The finished portals follow a package from the customer's order through the courier's route to the doorstep, with the owner watching over all of it. Each portal is a progressive web app, so nobody has to install anything from an app store.",
      steps: [
        { tab: "Customer tracking", src: F("Ky3Oz1y77MUx0VBa6N7wphYNMi8.png"), caption: "Customers track a package from the website or follow every order in the app." },
        { tab: "Onboarding", src: F("uZWi2cB2zh69Q3v5piZzODamqc.png"), caption: "Onboarding was built around what users said they wanted most from the app, over several iterations." },
        { tab: "Courier app", src: F("VfDW1HEPtZrLUaUBfntgxi8uJ8.png"), caption: "Couriers scan each package, follow the route and see every delivery assigned to them." },
        { tab: "Proof of delivery", src: F("nvehG02L20d3oEU6MqO9AB8Sqb4.png"), caption: "A clearly marked signing area, a retry option and a confirm button." },
        { tab: "Every screen size", src: F("byu0y6mfoP2pnG9R4uDKuuAjNsU.png"), caption: "Larger screens get their own navigation, sometimes merging two pages into one." },
      ],
    },
    {
      kind: "blocks",
      label: "Motion",
      heading: "A splash screen and transitions that feel like one brand.",
      intro: "The founder made a moodboard for the splash screen. The logo animation was built in Phase as a GIF, because animating multiple Figma screens couldn't be exported and needed more computing power.",
      blocks: [
        {
          type: "images",
          images: [
            { src: F("6bVBIJH3YVldGoqc7K73eDaZHs.gif"), alt: "Animated SOS Express splash screen", caption: "The splash screen animation." },
            { src: F("b2I44wNBXvhIulCVUR7SBCjrI.png"), alt: "Splash and welcome screens", caption: "Splash and welcome screens." },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("0C1U5qN8pXI25QojlUeVlvzDA.png"), alt: "Splash screen iterations", caption: "Splash screen iterations." },
            { src: F("qQz921OJNB15F0ZnEWl8bHLfAw.png"), alt: "Figma interaction settings for custom page transitions", caption: "Custom page transitions." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "The business owner",
      tone: "tint",
      heading: "The owner needed the most pages, because the owner settles everything.",
      intro: "Monitoring transactions and couriers, analysing user data, assigning roles and handling complaints needed a dashboard and more pages than any other user type.",
      blocks: [
        {
          type: "features",
          items: [
            { title: "One dashboard", text: "Revenue, completed and ongoing deliveries up front, with packages, employees and finances a tap away.", image: { src: F("qTnGytHa1SnrdCAyvc1kugWk8w.png"), alt: "Business owner dashboard on a phone" } },
            { title: "Task visibility", text: "The third-party software had readability, contrast, icon and usability problems. Clearer text, consistent icons and simpler navigation fixed them.", image: { src: F("ISKYIKopAepEOHOZmAqxn90SDVY.png"), alt: "Task visibility screens" } },
            { title: "Assigning roles", text: "Owners create, read, update and delete employee records, and can read courier chats to review complaints.", image: { src: F("rpzorslCUdYUGDXDbPN0NM59ak.png"), alt: "Role assignment screens" } },
            { title: "Finance management", text: "Every payment lands in the company account, linked to the dashboard, with its transaction, package and courier details. Owners can reverse a transaction when needed.", image: { src: F("1cuYyQjrun5V6lkCq1SiTVXsEY.png"), alt: "Finance management table" } },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("40m9ZkyM51tsFhH7SfXwmFo.png"), alt: "Owner dashboard on a laptop", caption: "The owner's dashboard on desktop." },
            { src: F("FJ7fakVQWvIy0Ywue7BMrt5KA.png"), alt: "Owner dashboard on laptop and phone", caption: "The same dashboard on laptop and phone." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "The brand",
      heading: "An identity that works on a van, a t-shirt and a screen.",
      intro: "The goal was an authentic, attractive identity that reflected the company's values, drew customers in and kept them.",
      blocks: [
        {
          type: "decisions",
          label: "Brand foundation",
          items: [
            { title: "Mission", text: "Premium logistics services." },
            { title: "Vision", text: "Global logistics services." },
            { title: "Values", text: "Fast delivery and great customer service." },
            { title: "Positioning", text: "For tech-savvy people aged about 25 to 45. Competitors in Abuja, Ilorin and Lagos rely on third-party tools; SOS has 5+ years of logistics experience and its own software." },
          ],
        },
        { type: "callout", label: "Word map", text: ["Fast · easy to use · good customer service · simple yet sophisticated. Every visual choice came back to these words from conversations with the founder."] },
        {
          type: "images",
          images: [
            { src: F("KdlUiXiqnaWUmQIUk90T8vjfIXo.png"), alt: "Brand moodboard", caption: "The moodboard, made after meetings with the founder." },
            { src: F("zfADuTRuk0HnyNEvCFFEZAdPxo.png"), alt: "DM Sans type specimen", caption: "DM Sans: circular forms and sharp, flat edges. Free, and it works in the Google Slides and Docs the team uses." },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("Jsxus0dPyzkvcdl9rEaZVUftU6Y.png"), alt: "Colour palette", caption: "A small palette of primary, secondary and supporting colours." },
            { src: F("q0bYVfBDpseUzIhggHoOonXMtk.png"), alt: "Logo variants", caption: "Logo variants." },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("8NOJgNBF2snHU7Hq54MriaBtg4.png"), alt: "Website mockup", caption: "The brand on the website." },
            { src: F("PIvVl7PZnbBIfpVGkceLet9kAM.png"), alt: "Social media mockups", caption: "The brand on social media." },
          ],
        },
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
