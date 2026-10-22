// Teams Ridhwan has designed for, shown in the scrolling logo row (components/ui/LogoMarquee.tsx).
// A client without a link shows its logo without one.
export type Client = { name: string; logo: string; href?: string };

export const CLIENTS: Client[] = [
  { name: "SOS Express", logo: "/logos/row-sos.webp", href: "https://sosexpressltd.com/" },
  { name: "Bento Development", logo: "/logos/row-bento.webp", href: "https://bentosms.com" },
  { name: "Alveum", logo: "/logos/row-alveum.webp" },
  { name: "Cendmate", logo: "/logos/row-cendmate.webp", href: "https://apps.apple.com/us/app/cendmate/id6748617937" },
  { name: "Monievend", logo: "/logos/row-monievend.webp", href: "https://www.linkedin.com/company/monievend/" },
  { name: "Cerebro Hive", logo: "/logos/row-cerebrohive.webp" },
  { name: "JJAIBOT", logo: "/logos/row-jjaibot.webp", href: "https://jjaibot.org/" },
];
