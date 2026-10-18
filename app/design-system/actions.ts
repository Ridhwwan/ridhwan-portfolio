"use server";

import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { updateTag } from "next/cache";
import { TOKEN_MAP, validate } from "@/lib/design-tokens";
import { getTokens, TOKENS_DB } from "@/lib/tokens";
import { notionHeaders } from "@/lib/playground";

/**
 * Editing is gated by DESIGN_PASSWORD. An unlock sets a signed cookie holding
 * a hash of the password; saves verify that cookie before touching Notion.
 * Anyone can preview changes locally in their own browser — only saving (which
 * changes the real site for everyone) needs the password.
 */

const COOKIE = "ds_edit";
const seg = () => createHash("sha256").update(`ds::${process.env.DESIGN_PASSWORD ?? ""}`).digest("hex");

export async function isUnlocked(): Promise<boolean> {
  if (!process.env.DESIGN_PASSWORD) return false;
  const c = await cookies();
  return c.get(COOKIE)?.value === seg();
}

export async function unlock(_prev: unknown, formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const password = String(formData.get("password") ?? "");
  if (!process.env.DESIGN_PASSWORD) return { ok: false, error: "Editing isn't set up yet (no password configured)." };
  if (password !== process.env.DESIGN_PASSWORD) return { ok: false, error: "That password doesn't match." };
  const c = await cookies();
  c.set(COOKIE, seg(), { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 60 * 60 * 8 });
  return { ok: true };
}

export async function lock(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
}

type SaveResult = { ok: boolean; error?: string; saved?: string[] };

/** Save one or more token changes to Notion, then refresh the live site. */
export async function saveTokens(changes: Record<string, string>): Promise<SaveResult> {
  if (!(await isUnlocked())) return { ok: false, error: "Unlock editing first." };
  if (!process.env.NOTION_TOKEN) return { ok: false, error: "Notion isn't connected, so changes can't be saved." };

  // Validate everything up front: nothing invalid reaches Notion or CSS.
  const clean: Record<string, string> = {};
  for (const [name, raw] of Object.entries(changes)) {
    const def = TOKEN_MAP.get(name);
    if (!def) return { ok: false, error: `Unknown token ${name}.` };
    const v = validate(def, raw);
    if (v === null) return { ok: false, error: `"${raw}" isn't a valid value for ${def.label}.` };
    clean[name] = v;
  }

  const { pageIds } = await getTokens();

  try {
    for (const [name, value] of Object.entries(clean)) {
      const body = JSON.stringify({ properties: { Value: { rich_text: [{ text: { content: value } }] } } });
      const pageId = pageIds[name];
      if (pageId) {
        const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, { method: "PATCH", headers: notionHeaders(), body });
        if (!res.ok) throw new Error(`Notion ${res.status} updating ${name}`);
      } else {
        // Row missing (e.g. a newly added token): create it.
        const def = TOKEN_MAP.get(name)!;
        const res = await fetch("https://api.notion.com/v1/pages", {
          method: "POST",
          headers: notionHeaders(),
          body: JSON.stringify({
            parent: { database_id: TOKENS_DB },
            properties: {
              Name: { title: [{ text: { content: name } }] },
              Value: { rich_text: [{ text: { content: value } }] },
              Label: { rich_text: [{ text: { content: def.label } }] },
              Group: { select: { name: def.group } },
            },
          }),
        });
        if (!res.ok) throw new Error(`Notion ${res.status} creating ${name}`);
      }
    }
  } catch (e) {
    console.error("Design tokens save failed.", e);
    return { ok: false, error: "Couldn't save to Notion. Your changes are still previewed locally." };
  }

  updateTag("tokens");
  return { ok: true, saved: Object.keys(clean) };
}
