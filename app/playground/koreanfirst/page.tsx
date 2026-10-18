import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import TypeTester from "@/components/type/TypeTester";
import BackLink from "@/components/ui/BackLink";

export const metadata: Metadata = {
  title: "KoreanFirst",
  description: "KoreanFirst, a variable typeface by Ridhwan Salaudeen. Try it live: size, weight and tracking.",
};

export default function KoreanFirst() {
  return (
    <div className="wrap">
      <BackLink href="/playground">Playground</BackLink>
      <PageHeader
        title="KoreanFirst"
        subtitle="A variable typeface that writes Latin letters with Hangul-inspired shapes."
        lede="Weights 200 to 700. Type anything below."
      />
      <TypeTester />
    </div>
  );
}
