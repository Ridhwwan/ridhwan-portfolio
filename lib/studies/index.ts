// Every case study, keyed by project slug. Rendered by app/work/[slug]/page.tsx
// with components/study/Study.tsx. To add one: write lib/studies/<slug>.ts and list it here.
import type { Study } from "@/components/study/types";
import { sosExpress } from "./sos-express";
import { bentosms } from "./bentosms";
import { cendmate } from "./cendmate";
import { miog1 } from "./miog1";
import { aiQuery } from "./ai-query";
import { monievend } from "./monievend";
import { presetSaver } from "./preset-saver";

export const STUDIES: Record<string, Study> = Object.fromEntries(
  [sosExpress, bentosms, cendmate, miog1, aiQuery, monievend, presetSaver].map((s) => [s.slug, s]),
);
