import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PlaygroundList from "@/components/playground/PlaygroundList";
import { getPlaygroundItems } from "@/lib/playground";

export const metadata: Metadata = {
  title: "Playground",
  description: "Side projects and experiments by Ridhwan Salaudeen: type design, small tools and things built for fun.",
};

export default async function Playground() {
  const items = await getPlaygroundItems();
  return (
    <div className="wrap">
      <PageHeader
        label="Side projects"
        title="Playground"
        subtitle="They may not be job worthy, but they end up stealing my time somehow 😒"
        lede="Design is my go-to, but bringing things to life is part of the process too."
      />
      <PlaygroundList items={items} />
    </div>
  );
}
