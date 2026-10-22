import localFont from "next/font/local";

// Headline serif, self-hosted (Latin only) so Next preloads it with the page and
// sizes the fallback to match: headlines appear sooner and don't shift when it lands.
export const plexSerif = localFont({
  src: [
    { path: "./fonts/ibm-plex-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-serif-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-serif",
  display: "swap",
  // Headlines are Geist now; the serif stays available to the design-system editor without slowing every page.
  preload: false,
  fallback: ["Georgia", "serif"],
});
