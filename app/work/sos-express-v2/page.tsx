import type { Metadata } from "next";
import Study from "@/components/study/Study";
import { sosExpressV2 } from "@/lib/studies/sos-express-v2";

// Hidden draft: reachable by link only, kept out of search engines and the work grid.
export const metadata: Metadata = {
  title: "SOS Express (new layout)",
  description: sosExpressV2.hero.intro,
  robots: { index: false, follow: false },
};

export default function SosExpressV2() {
  return <Study study={sosExpressV2} />;
}
