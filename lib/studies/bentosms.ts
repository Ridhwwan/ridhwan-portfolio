// BentoSMS case study (/work/bentosms). Sources: the resume (Oct 2026), the
// 2023 research documentation in Notion, the Bento SMS 1 and 2 build chats,
// the bentosms.com marketing site (screenshots in public/work/img/bentosms-*),
// and the confirmed design decisions for bentosms.com.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const bentosms: Study = {
  slug: "bentosms",
  accent: "#0A8F3C",
  hero: {
    mark: "B",
    markBg: "#004B3D",
    markImg: "/work/bentosms-logo.png",
    logo: { src: "/logos/bentosms.webp", alt: "BentoSMS", height: 64 },
    title: "Everything a school needs. Nothing it doesn't.",
    intro:
      "BentoSMS is a school management platform for Nigerian secondary schools, from JSS 1 to SSS 3. I researched it, designed it, built it and sold it, as the founder of Bento Development.",
    meta: [
      { label: "My contributions", text: "Research, product strategy, the design system, every portal, the engineering, the marketing site and school onboarding." },
      { label: "Timeline", text: "Research from August 2023. The platform was built solo in 6 months and is live today." },
      { label: "Role", text: "Founder and CTO, product designer and engineer." },
    ],
    links: [
      { label: "bentosms.com", href: "https://bentosms.com" },
      { label: "Try the demo", href: "https://bentosms.com/demo" },
      { label: "2023 research prototype (Figma)", href: "https://www.figma.com/proto/dVPTiTBBxTBWlMVrDsWjNw/School-Management-System?node-id=2221-21497&node-type=canvas&viewport=699%2C478%2C0.03&t=7nzFuJtW0uVwJZ1E-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2221%3A21497&show-proto-sidebar=1" },
    ],
    image: { src: F("bentosms-cover.webp"), alt: "BentoSMS landing page and staff dashboard" },
  },
  sections: [
    {
      kind: "tldr",
      label: "TL;DR",
      heading: "A quick overview of the entire project.",
      cards: [
        { icon: "challenge", title: "The challenge", text: "Nigerian schools run results, fees, attendance and timetables on paper, Excel and WhatsApp groups, kept by different people." },
        { icon: "approach", title: "Approach", text: "Surveys and interviews with students, parents, teachers and administrators, a competitive analysis, then building with a real school." },
        { icon: "solution", title: "Solution", text: "One platform with 12 modules and a portal for each of 7 kinds of user, built in Next.js, TypeScript and Supabase." },
        { icon: "impact", title: "Impact", text: "Live at Alpha Academy, Abuja, with about 100 students, 25 staff and 77 subjects on the system." },
      ],
    },
    {
      kind: "blocks",
      label: "Context",
      heading: "Schools run on Excel and WhatsApp groups. They deserve better.",
      intro: "Results, fees, attendance and timetables live in different places, kept by different people. Parents only hear when something goes wrong.",
      blocks: [
        { type: "images", images: [{ src: F("bentosms-before-after.jpg"), alt: "Before and after: paper registers versus structured records, WhatsApp groups versus a parent portal", caption: "Before and after: paper registers and WhatsApp groups, replaced by structured records and real-time parent access." }] },
        {
          type: "rows",
          items: [
            { title: "The school owner", tags: ["Admin"], text: "Runs the school and signs off every report card.", pain: "Still in the office at 8pm in the last week of term, cross-checking exercise books against a broadsheet.", fix: "Results generated in one click; report cards out on time every term." },
            { title: "The class teacher", tags: ["Teacher"], text: "Takes attendance, records scores and answers for every student.", pain: "Marks attendance on a loose sheet that goes into a folder nobody opens again.", fix: "Attendance recorded once with one tap, and every student's pattern visible in seconds." },
            { title: "The parent", tags: ["Parent"], text: "Pays the fees and wants to know how their child is doing.", pain: "Calls the school three times a week to ask about results, attendance and payments.", fix: "A personal portal with real-time grades, attendance and fees, and online payment." },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Research",
      heading: "Schools didn't need a shinier system. They needed one that's simple to use.",
      intro: "In 2023 I surveyed students, parents and guardians, teachers and school administrators, interviewed users and studied four existing systems.",
      blocks: [
        {
          type: "decisions",
          label: "Competitive analysis",
          items: [
            { title: "SAFSIMS", text: "Easy onboarding and Paystack payments, but a long setup and no way to notify specific parents." },
            { title: "RosarioSIS", text: "Robust, customisable and open source, held back by an outdated interface." },
            { title: "Fedena", text: "Good customer service, but unclear functions and almost no navigation or onboarding." },
            { title: "PowerSchool", text: "An end-to-end ecosystem whose sheer number of categories overwhelms new users." },
          ],
        },
        {
          type: "problem",
          label: "What people told me",
          heading: "One place, fast, and honest about what's happening.",
          items: [
            "Portals crash when every student logs in at once.",
            "Parents want more insight into their child's performance and a way to reach teachers.",
            "Students want everything in one place, and would rather get updates online than on paper.",
            "Poor networks and expensive data make heavy portals hard to use.",
          ],
        },
        { type: "callout", label: "Takeaway", text: ["A short, skippable onboarding is a must, the structure has to be accountable, and the interface should be clean but not complicated. A plain interface that works beats a beautiful one that distracts."] },
      ],
    },
    {
      kind: "blocks",
      label: "The product",
      heading: "Twelve modules. One connected system.",
      intro: "Each module is positioned as a complete product inside the platform, and every one of them works with the rest. A school goes from enrolment to report day in one place.",
      blocks: [
        { type: "phases", items: ["Enrol", "Teach", "Assess", "Pay", "Report"], note: "The school year, as the product is organised." },
        {
          type: "decisions",
          label: "The 12 modules",
          items: [
            { title: "Students", text: "Records, profiles and documents." },
            { title: "Staff", text: "Onboarding by invitation, with role-based access." },
            { title: "Classes", text: "Class and section assignment." },
            { title: "Parents", text: "Linked to their children, with their own portal." },
            { title: "Admissions", text: "Online registration and admission." },
            { title: "Timetable", text: "Image recognition turns a paper timetable into a live one in minutes." },
            { title: "Finance", text: "Fee structures and payments through PixPay." },
            { title: "Biometrics", text: "Biometric attendance with ZKTeco devices." },
            { title: "Curriculum", text: "Subjects and courses for every grade level." },
            { title: "Reports", text: "Attendance, finance and academic analytics." },
            { title: "Report cards", text: "Generated from results in one click." },
            { title: "Promotions", text: "Moving students up at the end of the session." },
          ],
        },
        { type: "images", images: [{ src: F("bentosms-enroll.jpg"), alt: "Adding a new student", caption: "Enrol: register students, assign classes and onboard staff from one dashboard." }] },
      ],
    },
    {
      kind: "blocks",
      label: "Every role",
      tone: "tint",
      heading: "One platform, a portal for each of 7 kinds of user.",
      intro: "Super admin, school admin, form teacher, subject teacher, bursar, student and parent each see only what their job needs.",
      blocks: [
        {
          type: "features",
          items: [
            { title: "The admin's command centre", text: "Full visibility across the school: staff, students, fee structures, analytics, attendance, reports, modules, roles and permissions.", image: { src: F("bentosms-roles.jpg"), alt: "School administrator dashboard" } },
            { title: "Any device, even offline", text: "A progressive web app that works on desktop, tablet or phone, in any browser, and keeps working on a weak connection.", image: { src: F("bentosms-devices.jpg"), alt: "BentoSMS on a phone and a laptop" } },
            { title: "Fees without the chase", text: "Payments land with their student and reference, and the bursar sees who has paid at a glance.", image: { src: F("bentosms-fees-before-after.jpg"), alt: "Fee tracking in a spreadsheet versus automated fee collection" } },
          ],
        },
      ],
    },
    {
      kind: "blocks",
      label: "Engineering",
      heading: "Built like infrastructure, because a school's records are.",
      intro: "Multi-tenant, offline-capable and built solo in Next.js, TypeScript and Supabase on Vercel, with AI-assisted development (Claude, Cursor).",
      blocks: [
        {
          type: "decisions",
          items: [
            { title: "Row-level security", text: "Every query is scoped to the person asking." },
            { title: "Role-based access", text: "Distinct portal roles, each with its own permissions." },
            { title: "Encrypted and backed up", text: "TLS in transit, encryption at rest, audit logs for every action and point-in-time recovery." },
            { title: "Connected", text: "PixPay for school fees, WhatsApp and SMS alerts for parents, email delivery and biometric attendance." },
          ],
        },
        { type: "images", images: [{ src: F("bentosms-integrations.jpg"), alt: "Integrations and security features", caption: "Integrations and security, as shown on bentosms.com." }] },
      ],
    },
    {
      kind: "blocks",
      label: "The marketing site",
      heading: "A site for the person who signs the cheque.",
      intro: "bentosms.com sells to school directors and administrators, not to teachers or parents. It uses Geist throughout, a strict 60/30/10 colour split with green reserved for calls to action, and references from Klaxoon, Stripe, Notion and Linear.",
      blocks: [
        {
          type: "images",
          images: [
            { src: F("bentosms-home.png"), alt: "bentosms.com home page", caption: "The home page, with the headline swapping between what schools need." },
            { src: F("bentosms-pricing.png"), alt: "bentosms.com pricing page", caption: "One plan, everything included." },
          ],
        },
        {
          type: "images",
          images: [
            { src: F("bentosms-tutorials.png"), alt: "bentosms.com tutorials page", caption: "Step-by-step tutorials for every role." },
            { src: F("bentosms-about.png"), alt: "bentosms.com about page", caption: "The about page: built for three people we kept meeting." },
          ],
        },
      ],
    },
    {
      kind: "outcomes",
      label: "Launch",
      heading: "Live at Alpha Academy, Abuja.",
      intro: "A free 12-month pilot in exchange for a reference and product feedback. Setup takes a week and every staff member gets an orientation. A pipeline of 89 PixPay-partner schools came next.",
      stats: [
        { value: "~100", text: "Students on the system" },
        { value: "25", text: "Staff onboarded" },
        { value: "77", text: "Subjects set up" },
      ],
    },
    {
      kind: "learnings",
      label: "Learnings",
      heading: "Software for schools is adopted one person at a time.",
      items: [
        { title: "Set up before you hand over", text: "The admin sets up classes, subjects, staff and students first, so teachers walk into a system that's already full. Teachers start with three tasks: attendance, grades and their class list." },
        { title: "Sell modules as products", text: "Schools understand Finance or Attendance as a product they buy, not a feature they hunt for." },
        { title: "Let people try it without risk", text: "The demo runs on realistic data that resets on its own, so anyone can explore without breaking anything." },
      ],
    },
  ],
};
