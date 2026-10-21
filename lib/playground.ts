import { cacheLife } from "next/cache";

/**
 * Playground projects come from the "Playground" database in Notion
 * (ridhwansalaudeen.com → Playground). Edits there show up on the site
 * within about a minute.
 *
 * Needs NOTION_TOKEN (an internal integration secret with access to the
 * database). Without it, or if Notion is unreachable, the fallback list below
 * is shown so the page never breaks.
 */

export type PlaygroundItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  year: number | null;
  href: string | null;
  cover: string | null;
  /** Short clip or GIF that plays on hover. */
  preview: { src: string; kind: "video" | "image" } | null;
  /** What the "Try it" window loads. Null means no in-page window (unless `live` is set). */
  embed: string | null;
  /** A preview built into the site instead of an image or iframe. */
  live: "koreanfirst" | "design-system" | null;
  order: number | null;
};

/** Built-in live previews, keyed by the project's on-site link. */
const LIVE: Record<string, PlaygroundItem["live"]> = { "/playground/koreanfirst": "koreanfirst", "/design-system": "design-system" };

const DATABASE_ID = process.env.NOTION_PLAYGROUND_DB ?? "dbe395ab3ea346268bc3897c736fe27a";
const NOTION_VERSION = "2022-06-28";

const fallback: PlaygroundItem[] = [
  {
    id: "koreanfirst",
    title: "KoreanFirst",
    summary: "A variable typeface that writes Latin letters with Hangul-inspired shapes, weights 200 to 700.",
    category: "Type design",
    year: 2026,
    href: "/playground/koreanfirst",
    cover: null,
    preview: null,
    embed: null,
    live: "koreanfirst",
    order: 1,
  },
  {
    id: "sketch-converter",
    title: "Sketch converter",
    summary: "A small web tool built with Streamlit.",
    category: "Code",
    year: null,
    href: "https://sketch-converter.streamlit.app/",
    cover: null,
    preview: null,
    embed: "https://sketch-converter.streamlit.app/?embed=true",
    live: null,
    order: 2,
  },
  {
    id: "design-system",
    title: "Design system",
    summary: "The living design system behind this site. Change its colours, type and spacing and the whole site follows, just for you.",
    category: "Design system",
    year: 2026,
    href: "/design-system",
    cover: null,
    preview: null,
    embed: null,
    live: "design-system",
    order: 3,
  },
];

/** Manual Order first (lowest wins), then newest Year, then title. */
export function sortPlayground(items: PlaygroundItem[]) {
  return [...items].sort((a, b) => {
    if (a.order !== null || b.order !== null) {
      if (a.order === null) return 1;
      if (b.order === null) return -1;
      if (a.order !== b.order) return a.order - b.order;
    }
    if ((b.year ?? 0) !== (a.year ?? 0)) return (b.year ?? 0) - (a.year ?? 0);
    return a.title.localeCompare(b.title);
  });
}

export const notionHeaders = () => ({
  Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
  "Notion-Version": NOTION_VERSION,
  "Content-Type": "application/json",
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const text = (p: any) => (p?.title ?? p?.rich_text ?? []).map((t: any) => t.plain_text).join("").trim();

function toItem(page: any): PlaygroundItem {
  const p = page.properties ?? {};
  const files = p.Cover?.files ?? [];
  const clips = p.Preview?.files ?? [];
  const id = page.id.replace(/-/g, "");
  const href: string | null = p.Link?.url ?? null;
  return {
    id: page.id,
    title: text(p.Name) || "Untitled",
    summary: text(p.Summary),
    category: p.Category?.select?.name ?? "Other",
    year: p.Year?.number ?? null,
    href,
    // Notion's own file links expire, so files go through a route that fetches a fresh one.
    cover: files.length ? `/playground/cover/${id}` : null,
    preview: clips.length
      ? { src: `/playground/cover/${id}?f=preview`, kind: /\.(gif|png|jpe?g|webp|avif)(\?|$)/i.test(clips[0].name ?? "") ? "image" : "video" }
      : null,
    embed: safeEmbed(p.Embed?.url ?? null),
    live: href ? LIVE[href] ?? null : null,
    order: p.Order?.number ?? null,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Only https pages can be loaded in the Try it window. */
function safeEmbed(url: string | null) {
  if (!url) return null;
  try { return new URL(url).protocol === "https:" ? url : null; } catch { return null; }
}

export async function getPlaygroundItems(): Promise<PlaygroundItem[]> {
  "use cache";
  cacheLife("minutes");

  if (!process.env.NOTION_TOKEN) return sortPlayground(fallback);

  try {
    const items: PlaygroundItem[] = [];
    let cursor: string | undefined;
    do {
      const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
        method: "POST",
        headers: notionHeaders(),
        body: JSON.stringify({
          filter: { property: "Published", checkbox: { equals: true } },
          page_size: 100,
          start_cursor: cursor,
        }),
      });
      if (!res.ok) throw new Error(`Notion ${res.status}`);
      const data = await res.json();
      items.push(...data.results.map(toItem));
      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);
    return sortPlayground(items);
  } catch (e) {
    console.error("Playground: falling back to built-in list.", e);
    return sortPlayground(fallback);
  }
}
