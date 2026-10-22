import type { Metadata } from "next";
import Study from "@/components/study/Study";
import { about } from "@/lib/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ridhwan Salaudeen is a product designer and front-end engineer: designer, builder, teacher and student, based in Abuja, Nigeria.",
};

export default function About() {
  return <Study study={about} />;
}
