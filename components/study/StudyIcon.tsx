import { CircleCheck, Lightbulb, Settings2, TriangleAlert } from "lucide-react";
import type { TldrIcon } from "./types";

const ICONS = { challenge: TriangleAlert, approach: Settings2, solution: Lightbulb, impact: CircleCheck };

/** Small line icon for the TL;DR cards. */
export default function StudyIcon({ name }: { name: TldrIcon }) {
  const I = ICONS[name];
  return <I aria-hidden size={18} strokeWidth={1.6} />;
}
