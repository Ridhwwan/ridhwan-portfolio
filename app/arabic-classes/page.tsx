import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { amiri } from "../fonts";
import LessonPlayer from "./LessonPlayer";

export const metadata: Metadata = {
  title: "Arabic classes",
  description: "Daily five-minute spoken Fusha Arabic lessons, read aloud in Arabic and English.",
};

export default function ArabicClasses() {
  return (
    <div className={`wrap ${amiri.variable}`}>
      <PageHeader
        label="Learning in public"
        title="Arabic classes"
        lede="Five minutes of spoken Fuṣḥā every morning. Tap any line to hear it in Arabic, then English."
      />
      <LessonPlayer />
    </div>
  );
}
