// Single source of truth for every project on the site.
// Layer 1 (universal skeleton): every case study is a "book" of pages, paired into spreads.
// Layer 2 (per-project theme): each project carries its own palette, type and decoration.

// Images live on this domain. scripts/fetch-images.mjs copies any missing ones
// from the old Framer site into public/work/img before every build.
const F = (id: string) => `/work/img/${id}`;

export type Decoration =
  | "route"
  | "chat"
  | "tiles"
  | "query"
  | "lcd"
  | "viewfinder"
  | "bubbles"
  | "none";

export type Theme = {
  stage: string; // backdrop around the book
  paper: string; // page colour
  ink: string;
  muted: string;
  accent: string; // pages with tone "accent"
  accentInk: string; // text on accent pages
  display: string; // CSS font-family for headings
  body: string; // CSS font-family for text
  displayWeight: number;
  radius: string; // radius used inside pages (images, chips)
  fonts?: string; // Google Fonts css2 URL
  decoration: Decoration;
};

export type Tone = "paper" | "accent" | "stage";

export type Page =
  | { kind: "cover" }
  | { kind: "meta" }
  | { kind: "text"; heading: string; body: string[]; tone?: Tone }
  | { kind: "statement"; text: string; tone?: Tone }
  | { kind: "list"; heading: string; items: string[]; tone?: Tone }
  | { kind: "image"; src: string; caption?: string; fit?: "cover" | "contain"; tone?: Tone }
  | { kind: "images"; srcs: string[]; caption?: string; tone?: Tone }
  | { kind: "end" };

export type Project = {
  slug: string;
  title: string;
  short: string; // card title
  years: string;
  summary: string;
  featured?: boolean;
  external?: string; // card links out instead of to a book (a book may still exist as an unlinked draft)
  cover?: string;
  role?: string;
  team?: string[];
  tools?: string[];
  contributions?: string[];
  theme: Theme;
  pages: Page[];
};

export const projects: Project[] = [
  {
    slug: "sos-express",
    title: "SOS Express",
    short: "SOS Express",
    years: "2025",
    featured: true,
    summary:
      "A three-way logistics platform connecting customers, couriers and the business owner in real time.",
    cover: F("MQ8E3kGVYFWWlz4cvRrpnkNwk.png"),
    role: "Product owner, product designer and brand designer",
    tools: ["Figma", "Notion", "Google Maps API", "Lucide"],
    contributions: [
      "High-fidelity prototype",
      "User research",
      "Site and journey mapping",
      "User testing",
      "Brand identity",
      "Documentation",
    ],
    theme: {
      stage: "#0F1B4C",
      paper: "#F6F7FB",
      ink: "#0F1B4C",
      muted: "#5B6383",
      accent: "#2F5BFF",
      accentInk: "#FFFFFF",
      display: "'DM Sans', system-ui, sans-serif",
      body: "'DM Sans', system-ui, sans-serif",
      displayWeight: 700,
      radius: "6px",
      fonts: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap",
      decoration: "route",
    },
    pages: [
      { kind: "cover" },
      { kind: "meta" },
      {
        kind: "text",
        heading: "From distribution partner to a platform of its own",
        body: [
          "SOS Express is a Nigerian logistics company that spent years delivering for a larger courier before going independent. To compete, it needed customers and riders talking to each other in real time.",
          "I designed the brand identity, a responsive website and three web portals: one for customers, one for couriers and one for the business owner.",
        ],
      },
      { kind: "image", src: F("Ky3Oz1y77MUx0VBa6N7wphYNMi8.png"), caption: "The three portals at a glance." },
      {
        kind: "list",
        heading: "Who it serves",
        items: [
          "Customers get push notifications on every status change, plus a public page to track a package by waybill number.",
          "Couriers scan packages, see drop-off locations, update status live, chat with the customer and follow optimised routes.",
          "The business owner sees courier activity and feedback, and can assign packages by hand when needed.",
        ],
        tone: "accent",
      },
      { kind: "image", src: F("VfDW1HEPtZrLUaUBfntgxi8uJ8.png"), caption: "Customer and courier views." },
      {
        kind: "text",
        heading: "Research",
        body: [
          "A competitive analysis compared the features common to logistics apps against what SOS actually needed.",
          "Every function was then tabled by user type in Notion, which became the feature list for each portal.",
        ],
      },
      { kind: "images", srcs: [F("iN4ZA2Ibbmls8nUMHBnOl1PNr1A.png"), F("46qBjYx8CETL4ee2M42LwRMEbo.png")], caption: "Competitive analysis and the functionality table." },
      {
        kind: "statement",
        text: "Couriers were reporting unsafe drop-offs, third-party pickups and failed deliveries.",
        tone: "stage",
      },
      {
        kind: "text",
        heading: "The delivery challenge",
        body: [
          "The fix was a remote sign-off built into the order and chat pages, with a geotagged photo of every delivery kept as evidence.",
          "Testers weren't sure where to sign. One group preferred a bordered outline, the other a colour treatment, so the final signing page uses both.",
        ],
      },
      { kind: "image", src: F("5f4mxsoa3iaZp9STYK2nnXi6KI.png"), caption: "Remote sign-off inside the order flow." },
      { kind: "image", src: F("nvehG02L20d3oEU6MqO9AB8Sqb4.png"), caption: "Testing the signature page." },
      {
        kind: "text",
        heading: "Digitising the delivery board",
        body: [
          "Couriers scanned packages after work, weren't named on the delivery table, and fought a third-party portal that was hard to read.",
          "The courier portal moved the paper board from the office into the app, using the same colour language as the customer portal.",
        ],
      },
      { kind: "image", src: F("qQz921OJNB15F0ZnEWl8bHLfAw.png"), caption: "Courier records board." },
      {
        kind: "list",
        heading: "The business owner's portal",
        items: [
          "Dashboards for transactions and courier performance",
          "Role assignment for staff",
          "Read access to chats for dispute review",
          "Finance management, including transaction reversals",
        ],
      },
      { kind: "image", src: F("qTnGytHa1SnrdCAyvc1kugWk8w.png"), caption: "Business owner dashboard." },
      {
        kind: "text",
        heading: "The brand",
        body: [
          "Built with the founder from a word map: fast, easy to use, good customer service, simple yet sophisticated.",
          "DM Sans carries the identity. It has clean geometry, it's free, and it works in Google Slides and Docs, which the team uses every day.",
        ],
        tone: "accent",
      },
      { kind: "images", srcs: [F("PIvVl7PZnbBIfpVGkceLet9kAM.png"), F("hH41V4PWww2OPafAc7bQRYOuio.png")], caption: "Colour palette and mockups." },
      {
        kind: "statement",
        text: "The project reinforced one thing: business goals and user needs have to be designed together.",
      },
      { kind: "end" },
    ],
  },
  {
    slug: "bentosms",
    title: "Bento School Management System",
    short: "BentoSMS",
    years: "2024 – present",
    featured: true,
    summary: "A multi-portal school management system for Nigerian secondary schools.",
    // The book below is a draft, kept for review. Until then the card opens the live product.
    external: "https://bentosms.com",
    role: "Founder, product designer and developer",
    tools: ["Figma", "Next.js", "Supabase", "Vercel"],
    contributions: ["Product strategy", "Design system", "Every portal", "Engineering", "School onboarding"],
    theme: {
      stage: "#E6EFE9",
      paper: "#F5F7F5",
      ink: "#0F2A24",
      muted: "#56665F",
      accent: "#004B3D",
      accentInk: "#D4FB84",
      display: "'Fredoka', system-ui, sans-serif",
      body: "'Fredoka', system-ui, sans-serif",
      displayWeight: 600,
      radius: "28px",
      fonts: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap",
      decoration: "bubbles",
    },
    pages: [
      { kind: "cover" },
      { kind: "meta" },
      { kind: "statement", text: "Schools run on Excel and WhatsApp groups.", tone: "accent" },
      { kind: "statement", text: "They deserve better." },
      {
        kind: "text",
        heading: "One system for the whole school",
        body: [
          "BentoSMS is built for JSS 1 to SSS 3. Admins, teachers, students and parents each get a portal made for what they do.",
        ],
      },
      {
        kind: "list",
        heading: "What's inside",
        items: [
          "Staff and student records",
          "Attendance, including biometric",
          "Results and report cards",
          "Fees through PixPay",
          "AI timetable import",
          "Parent portal and WhatsApp alerts",
        ],
        tone: "accent",
      },
      { kind: "statement", text: "24 staff onboarded." },
      { kind: "statement", text: "77 subjects set up.", tone: "accent" },
      {
        kind: "text",
        heading: "Piloting at Alpha Academy, Abuja",
        body: [
          "Six grade levels run on BentoSMS. Setup takes a week and every staff member gets an orientation.",
        ],
      },
      { kind: "statement", text: "Everything your school needs. Nothing it doesn't.", tone: "accent" },
      { kind: "end" },
    ],
  },
  {
    slug: "cendmate",
    title: "Cendmate",
    short: "Cendmate",
    years: "2023",
    summary:
      "Text-message-simple transfers between Nigeria, Canada and parts of East Africa.",
    cover: F("ciBgi0f1zWpAwOpPzeOlCmT80o.png"),
    role: "UI/UX designer",
    team: ["Daniel Bello, CEO", "Jazz Grewal, developer", "Ridhwan Salaudeen, UI/UX designer"],
    tools: ["Figma", "Notion", "Maze", "Google Forms"],
    contributions: ["Low-fidelity prototype", "High-fidelity design", "Design documentation"],
    theme: {
      stage: "#0D3B35",
      paper: "#F3F8F5",
      ink: "#0D3B35",
      muted: "#527069",
      accent: "#3DDC97",
      accentInk: "#0D3B35",
      display: "'Manrope', system-ui, sans-serif",
      body: "'Manrope', system-ui, sans-serif",
      displayWeight: 800,
      radius: "18px",
      fonts: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;800&display=swap",
      decoration: "chat",
    },
    pages: [
      { kind: "cover" },
      { kind: "meta" },
      {
        kind: "text",
        heading: "Two kinds of account, one transfer",
        body: [
          "Cendmate is a Canadian fintech moving money between Nigeria, Tanzania and Canada. Some banks identify you by account number, others by email.",
          "The challenge was a mobile web flow that handles both with as little effort from the user as possible.",
        ],
      },
      { kind: "image", src: F("JRnklZy5JjM4ee46ncyuOdRC6r8.png") },
      {
        kind: "list",
        heading: "What research told us",
        items: [
          "Bad bank apps make people reluctant to try new ones.",
          "People keep separate accounts for separate jobs, like foreign currency and stipends.",
          "Digital accounts win on international payments.",
          "Local payments stay with traditional banks because they match local account norms.",
        ],
        tone: "accent",
      },
      { kind: "image", src: F("6SUXuMd14c9STHNMlX4eR9LiHI.png"), caption: "Rejected iterations of the currency page and nav bar." },
      { kind: "statement", text: "Not every page needs a navigation bar." },
      {
        kind: "text",
        heading: "Findings from testing",
        body: [
          "Moderated, screen-recorded sessions showed the bottom nav blocking parts of top-level pages without helping anyone, so it was removed there.",
          "Copy mattered just as much. The navigation labels were rewritten until they were short and clear for every market.",
        ],
      },
      { kind: "image", src: F("xSm9SSAeCPiXmha4J8XBEJBmKX4.png"), caption: "Input components from the design system." },
      { kind: "image", src: F("ShxebgBfY26HxXpGeLqpv5Kf0.png"), caption: "Onboarding." },
      { kind: "image", src: F("oA2h9vxHayjXzLXibcFwPtrrLGE.png"), caption: "The deposit flow." },
      { kind: "image", src: F("vAnXpgiyC5Sr08XL6zMPoj9A68.png"), caption: "Convert, with live rates kept out of the way." },
      {
        kind: "statement",
        text: "In a crowded fintech market, merging account types was the differentiator.",
        tone: "stage",
      },
      { kind: "end" },
    ],
  },
  {
    slug: "miog1",
    title: "MIO-G1 swimming goggles",
    short: "MIO-G1",
    years: "2024",
    summary: "Swim goggles that let visually impaired people keep their prescription glasses on in the water.",
    cover: F("dRx9NfOEZ4RcVDJ6WILZq2aTwI.png"),
    role: "Product designer",
    tools: ["Figma", "Notion", "Google Forms", "Sketching"],
    contributions: ["Research", "Focus group", "Product requirements", "Sketches and orthographics"],
    theme: {
      stage: "#0B4F6C",
      paper: "#EAF7FA",
      ink: "#06324A",
      muted: "#3F6B7E",
      accent: "#00A6C8",
      accentInk: "#FFFFFF",
      display: "'Space Grotesk', system-ui, sans-serif",
      body: "'Space Grotesk', system-ui, sans-serif",
      displayWeight: 600,
      radius: "2px",
      fonts: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap",
      decoration: "tiles",
    },
    pages: [
      { kind: "cover" },
      { kind: "meta" },
      {
        kind: "statement",
        text: "A boy stood in shallow water, waving at lifeguards. He couldn't tell which way the beach was.",
        tone: "stage",
      },
      {
        kind: "text",
        heading: "So I looked into it",
        body: [
          "Prescription swim goggles exist, but they're niche and hard to get. Glasses aren't built for water: frames fail, metal rusts, and they don't stay on.",
          "Contacts were the obvious answer. A focus group could only bear them in water for about ten minutes before pain and redness set in.",
        ],
      },
      {
        kind: "list",
        heading: "Criteria",
        items: ["No special lens preparation", "Easy for the public to get", "Simple enough for a child"],
        tone: "accent",
      },
      { kind: "images", srcs: [F("TGNFZKjQu5NKMFVvjyMqzG0.png"), F("RaLKNmTm2M8qvZKZIU5ZNoSg88.png")], caption: "Research into the eye and eyewear." },
      {
        kind: "list",
        heading: "What swimmers with glasses told me",
        items: [
          "Frames aren't made for swimming.",
          "Contacts dry the eyes within ten minutes.",
          "Weight on the face matters.",
          "Looking through two lenses might distort the prescription.",
          "They want their eyes fully shielded from water.",
        ],
      },
      { kind: "image", src: F("FtEKcSH8JiMaxGWMLRgAAgTTW4Q.png"), caption: "First iteration." },
      {
        kind: "text",
        heading: "Parts",
        body: [
          "A distortion-free view frame, a corner seal, an over-ear strap with an entry slot and temple housing, a rear buckle and a silicone hinge strap.",
          "The frame leaves about 20mm between lens and cornea so glasses fit inside. The curve at the hinge was thickened after asking which part of a pair of glasses breaks first.",
        ],
      },
      { kind: "image", src: F("Y2PcVUJ6GrSzuNh1BpxgQ1CqW4Q.png"), caption: "Parts and functions." },
      { kind: "images", srcs: [F("Umk7CWHqjCtnDSVRL44HdZ1GYY.png"), F("B3d56ZiUDeYehH8WjY1F2klfnc.png")], caption: "Orthographic front and back." },
      {
        kind: "text",
        heading: "What's next",
        body: [
          "Proper 3D renders, printed prototypes in the hands of swimmers, and iteration until it's right. Physical products are slower to fix than screens, so every part has to work before release.",
        ],
        tone: "accent",
      },
      { kind: "end" },
    ],
  },
  {
    slug: "ai-query",
    title: "File search with large language models",
    short: "AI Query",
    years: "2024",
    summary: "Find images and documents on your phone just by describing them.",
    cover: F("NaJhIOx6sqaPjDNOtFdzmAiQ8.png"),
    role: "Product designer",
    team: ["Ridhwan Salaudeen, product designer", "Dr. Habeeb Salaudeen, AI expert"],
    tools: ["Figma", "Notion", "Google Forms"],
    contributions: ["Low-fidelity prototype", "High-fidelity design", "Research and documentation"],
    theme: {
      stage: "#160F29",
      paper: "#1F1638",
      ink: "#EDE7FF",
      muted: "#A99BD6",
      accent: "#B69CFF",
      accentInk: "#160F29",
      display: "'IBM Plex Sans', system-ui, sans-serif",
      body: "'IBM Plex Sans', system-ui, sans-serif",
      displayWeight: 600,
      radius: "12px",
      fonts: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap",
      decoration: "query",
    },
    pages: [
      { kind: "cover" },
      { kind: "meta" },
      { kind: "statement", text: "Tens of thousands of screenshots. No way to find the one I needed." },
      {
        kind: "text",
        heading: "The idea",
        body: [
          "Describe an image or document, or show a similar one, and the phone finds it. Everything runs on the device, so it works offline, costs nothing per search and keeps files private.",
        ],
      },
      { kind: "image", src: F("hHkGjZjqWrRcRHhsz5HSKz6TQk.png") },
      {
        kind: "text",
        heading: "Can a mid-range phone do this?",
        body: [
          "With Dr. Habeeb Salaudeen, I researched phone hardware, search algorithms, caching and indexing to see what would run smoothly on an ordinary device.",
        ],
        tone: "accent",
      },
      { kind: "images", srcs: [F("TMDedS97cJWKA0OfuE48dE0BPc.png"), F("b8C6kkmdCNWE3VpuJx6mWGhud4.png")], caption: "What it takes to run a model on mobile." },
      { kind: "images", srcs: [F("a50BgD5QXgi0rPs9qmhILngr7k.png"), F("5OWB6MFWL6sKQCrZu8CZNwz8s.png")], caption: "Personas and journey maps." },
      {
        kind: "text",
        heading: "Testing",
        body: [
          "A/B tests settled behaviour and edge cases. Site maps, user flows and a mid-fidelity prototype went through usability testing before the high-fidelity design on a 4/8px grid.",
          "The hardest part wasn't the model. It was onboarding people to a way of searching they'd never used.",
        ],
      },
      { kind: "image", src: F("BwyRHx8kA5WHGBMgXMNccnyhuU.png"), caption: "Iterative testing and findings." },
      { kind: "end" },
    ],
  },
  {
    slug: "monievend",
    title: "Monievend",
    short: "Monievend",
    years: "2022 – 2023",
    summary: "Bill payments, transfers and airtime for Nigerian businesses, with or without internet.",
    cover: F("YH2r9yLnE8X0AtS8ZjHDzho5krM.png"),
    role: "UI/UX designer",
    team: ["Buhari Abdulhakeem, CEO", "Pitwa Isaac, CTO", "Ridhwan Salaudeen, UI/UX designer", "Buhari Amina, front-end developer"],
    tools: ["Figma", "Maze", "Google Forms", "Paper questionnaires"],
    contributions: ["Research", "Site architecture", "Low-fidelity prototype", "High-fidelity website", "Documentation"],
    theme: {
      stage: "#2B3A1F",
      paper: "#C9D4AE",
      ink: "#1F2A14",
      muted: "#4A5735",
      accent: "#1F2A14",
      accentInk: "#C9D4AE",
      display: "'Silkscreen', ui-monospace, monospace",
      body: "'Work Sans', system-ui, sans-serif",
      displayWeight: 400,
      radius: "0px",
      fonts: "https://fonts.googleapis.com/css2?family=Silkscreen&family=Work+Sans:wght@400;500&display=swap",
      decoration: "lcd",
    },
    pages: [
      { kind: "cover" },
      { kind: "meta" },
      {
        kind: "text",
        heading: "No internet, no problem",
        body: [
          "Outside major cities, Nigerian internet is unstable and ISP coverage is thin. Monievend set out to make USSD payments more useful for small businesses and solo traders.",
        ],
      },
      { kind: "image", src: F("sWfkgd9vUjwveQRaXGK0Bjvhswc.png"), caption: "Network coverage across Nigeria." },
      {
        kind: "text",
        heading: "Talking to people",
        body: [
          "Google Forms, paper questionnaires and one-on-one interviews. People were sceptical of tech, so recruiting took persistence, incentives and word of mouth.",
          "Three users emerged: merchants, customers and portal users.",
        ],
        tone: "accent",
      },
      {
        kind: "list",
        heading: "What we learned",
        items: [
          "Avoid jargon.",
          "Trust travels by word of mouth.",
          "Most users don't have an email address.",
        ],
      },
      { kind: "statement", text: "So sign-up accepts a phone number or an email." },
      { kind: "image", src: F("uWFNAzturRDLRqO4mjfFn75cQ.png"), caption: "Site architecture." },
      { kind: "image", src: F("PpE0Xo3EbrLCEUrJJxZs2SxJWoc.png"), caption: "Persona: Sarah, the business woman." },
      { kind: "image", src: F("80OiuaxtXQaWhtXMsmHyJ46nXM8.png"), caption: "Input components." },
      { kind: "image", src: F("JdxwqHkpxOghILSJfELqMQLxQzE.png"), caption: "High-fidelity website." },
      { kind: "statement", text: "Small details like copy decide whether someone signs up.", tone: "accent" },
      { kind: "end" },
    ],
  },
  {
    slug: "preset-saver",
    title: "Preset saver",
    short: "Preset saver",
    years: "2023",
    summary: "Save camera settings as reusable presets, and share them inside the photos you send.",
    cover: F("1CPs6b655OWZGUCDtKP3BEmb9BY.png"),
    role: "Product designer and UX researcher",
    tools: ["Figma", "Maze", "Google Forms", "Screen recorder"],
    contributions: ["User interviews", "User and task flows", "Low- and high-fidelity design", "Design insights"],
    theme: {
      stage: "#141414",
      paper: "#222222",
      ink: "#F2F2F2",
      muted: "#A3A3A3",
      accent: "#FFB000",
      accentInk: "#141414",
      display: "'Barlow Condensed', system-ui, sans-serif",
      body: "'Barlow', system-ui, sans-serif",
      displayWeight: 600,
      radius: "4px",
      fonts: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Barlow:wght@400;500&display=swap",
      decoration: "viewfinder",
    },
    pages: [
      { kind: "cover" },
      { kind: "meta" },
      {
        kind: "text",
        heading: "Same shot, every time",
        body: [
          "Creators struggle to get consistent photos and video. Preset saver is a native camera feature that stores a full camera setup so you can recall it in any environment.",
        ],
      },
      { kind: "images", srcs: [F("smHhuR2DUJPsN5AxRBjazdPFXIw.png"), F("cVyYqONeFAGRlxAbaJcsl2SWQ64.png")], caption: "Default and Pro mode layouts." },
      {
        kind: "list",
        heading: "How might we",
        items: [
          "Improve image quality with what the phone already has?",
          "Cut reliance on external editing apps?",
          "Work across very different phone hardware?",
        ],
        tone: "accent",
      },
      { kind: "image", src: F("dGxdtGupvNSODCUG0EwvxzZkVhg.png"), caption: "Feature architecture." },
      {
        kind: "text",
        heading: "Testing",
        body: [
          "Alpha users tested with screen sharing and recording. Onboarding decided adoption, people wanted familiar patterns, and they wanted to share presets with each other.",
        ],
      },
      { kind: "image", src: F("6RvlRMZY1FbGYJTu3FdYx5UBvM.png"), caption: "Entry points, colour-coded." },
      { kind: "image", src: F("FK7XE92GRYxLAjrAJGf25w5H9qw.png"), caption: "Onboarding." },
      { kind: "image", src: F("j7PGO6smEPg8HvISFM6bYD44xg.png"), caption: "Access points for high-end and mid-range cameras." },
      { kind: "statement", text: "Send a photo, and the preset travels with it.", tone: "accent" },
      { kind: "image", src: F("amTwC9TGHQqVHjy7zso7wy4UA.png"), caption: "Preset sharing." },
      { kind: "end" },
    ],
  },
  {
    slug: "warehouse",
    title: "Warehouse management system",
    short: "Warehouse management",
    years: "2024 – 2025",
    summary: "Admin portal, design system and architecture for a warehouse management system.",
    external:
      "https://www.figma.com/proto/PVo6t4Wtpn4KRwPDOGMfsv/Warehouse-Management-System--Copy-?node-id=2701-37387&t=Fka9RTuVAsLJMjHa-1",
    theme: {
      stage: "#2A2A2E", paper: "#EDEDEF", ink: "#2A2A2E", muted: "#6A6A72", accent: "#F2C14E", accentInk: "#2A2A2E",
      display: "inherit", body: "inherit", displayWeight: 700, radius: "4px", decoration: "none",
    },
    pages: [],
  },
  {
    slug: "jjaibot",
    title: "JJAIBOT",
    short: "JJAIBOT",
    years: "2019 – 2020",
    summary: "Technology for social services, including wildlife and disaster management software.",
    external: "https://jjaibot.org/",
    theme: {
      stage: "#24402F", paper: "#EEF2EC", ink: "#24402F", muted: "#5D7264", accent: "#9BC53D", accentInk: "#24402F",
      display: "inherit", body: "inherit", displayWeight: 700, radius: "4px", decoration: "none",
    },
    pages: [],
  },
];

/** Every project that has a book, including unlinked drafts. */
export const caseStudies = projects.filter((p) => p.pages.length > 0);
/** Books linked from the site. */
export const publishedStudies = caseStudies.filter((p) => !p.external);
export const getProject = (slug: string) => caseStudies.find((p) => p.slug === slug);
