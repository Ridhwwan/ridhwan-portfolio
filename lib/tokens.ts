import { cacheLife, cacheTag } from "next/cache";
import { TOKENS, TOKEN_MAP, defaults, validate } from "./design-tokens";
import { notionHeaders } from "./playground";

/**
 * Live token values: registry defaults, overridden by the Notion
 * "Design tokens" table (ridhwansalaudeen.com → Design tokens).
 * Saving on /design-system refreshes this immediately via updateTag("tokens").
 */
export const TOKENS_DB = process.env.NOTION_TOKENS_DB ?? "5b40895b005741f98c6810f3cc7954b4";

export type TokenState = { values: Record<string, string>; pageIds: Record<string, string> };

/* eslint-disable @typescript-eslint/no-explicit-any */
const plain = (p: any) => (p?.title ?? p?.rich_text ?? []).map((t: any) => t.plain_text).join("").trim();
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getTokens(): Promise<TokenState> {
  "use cache";
  cacheTag("tokens");
  cacheLife("minutes");

  const state: TokenState = { values: defaults(), pageIds: {} };
  if (!process.env.NOTION_TOKEN) return state;

  try {
    let cursor: string | undefined;
    do {
      const res = await fetch(`https://api.notion.com/v1/databases/${TOKENS_DB}/query`, {
        method: "POST",
        headers: notionHeaders(),
        body: JSON.stringify({ page_size: 100, start_cursor: cursor }),
      });
      if (!res.ok) throw new Error(`Notion ${res.status}`);
      const data = await res.json();
      for (const page of data.results) {
        const name = plain(page.properties?.Name);
        const def = TOKEN_MAP.get(name);
        if (!def) continue;
        state.pageIds[name] = page.id;
        const v = validate(def, plain(page.properties?.Value));
        if (v !== null) state.values[name] = v;
      }
      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);
  } catch (e) {
    console.error("Design tokens: using defaults.", e);
  }
  return state;
}

export const tokenCount = TOKENS.length;
