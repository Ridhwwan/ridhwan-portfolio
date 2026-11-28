import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CadGrid from "@/components/cad/CadGrid";

export const metadata: Metadata = {
  title: "CAD",
  description: "CAD models designed by Ridhwan Salaudeen in Onshape. Mechanical parts, everyday objects and design exercises.",
};

export default function CadPage() {
  return (
    <div className="wrap">
      <PageHeader
        label="3D modelling"
        title="CAD"
        subtitle="Mechanical parts and everyday objects, modelled in Onshape"
        lede="Learning CAD by designing things I can hold. Click any model to open it in Onshape."
      />
      <CadGrid />
    </div>
  );
}
