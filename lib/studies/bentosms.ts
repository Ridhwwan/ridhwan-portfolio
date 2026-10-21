// BentoSMS case study draft (/work/bentosms). The card still opens bentosms.com,
// so this page stays out of search until it's linked. Facts from the resume.
import type { Study } from "@/components/study/types";

const F = (id: string) => `/work/img/${id}`;

export const bentosms: Study = {
  slug: "bentosms",
  accent: "#007A5E",
  hero: {
    mark: "B",
    markBg: "#004B3D",
    markImg: "/work/bentosms-logo.png",
    title: "Everything a school needs. Nothing it doesn't.",
    intro: "BentoSMS is a school management platform for Nigerian secondary schools, from JSS 1 to SSS 3, designed and built solo.",
    meta: [
      { label: "My contributions", text: "Product strategy, the design system, every portal, the engineering and school onboarding." },
      { label: "Timeline", text: "Built solo in 6 months." },
      { label: "Role", text: "Founder, product designer and developer." },
    ],
    image: { src: F("bentosms-cover.webp"), alt: "BentoSMS landing page and staff dashboard" },
  },
  sections: [
    {
      kind: "context",
      label: "Context",
      heading: "Schools run on Excel and WhatsApp groups. They deserve better.",
      intro: "Results, fees, attendance and timetables live in different places, kept by different people. BentoSMS brings them into one system, with a portal for each person in the school.",
    },
    {
      kind: "blocks",
      label: "The product",
      heading: "One platform, 12 modules, 7 kinds of user.",
      intro: "A multi-tenant, offline-capable platform built in Next.js, TypeScript and Supabase, with AI-assisted development.",
      blocks: [
        {
          type: "decisions",
          label: "Inside",
          items: [
            { title: "Records", text: "Staff and student records in one place." },
            { title: "Attendance", text: "Including biometric attendance." },
            { title: "Results", text: "Results and report cards." },
            { title: "Fees", text: "Paid through PixPay and Paystack." },
            { title: "Timetable import", text: "Image recognition turns a paper timetable into a live one in minutes." },
            { title: "Parents", text: "A parent portal and WhatsApp alerts." },
          ],
        },
      ],
    },
    {
      kind: "outcomes",
      label: "Launch",
      heading: "Live at Alpha Academy, Abuja.",
      intro: "A free 12-month pilot in exchange for a reference and product feedback. Setup takes a week, and every staff member gets an orientation.",
      stats: [
        { value: "~100", text: "Students" },
        { value: "25", text: "Staff onboarded" },
        { value: "77", text: "Subjects set up" },
      ],
    },
  ],
};
