import { notionHeaders } from "@/lib/playground";

/**
 * Redirects to a fresh link for a Playground project's cover image.
 * Notion's file links expire after an hour, so the page never embeds them directly.
 */
export async function GET(_req: Request, { params }: RouteContext<"/playground/cover/[id]">) {
  const { id } = await params;
  if (!/^[0-9a-f]{32}$/.test(id) || !process.env.NOTION_TOKEN) {
    return new Response("Not found", { status: 404 });
  }

  const res = await fetch(`https://api.notion.com/v1/pages/${id}`, { headers: notionHeaders() });
  if (!res.ok) return new Response("Not found", { status: 404 });

  const page = await res.json();
  const file = page.properties?.Cover?.files?.[0];
  const url: string | undefined = file?.file?.url ?? file?.external?.url;
  if (!url) return new Response("Not found", { status: 404 });

  return new Response(null, {
    status: 302,
    // Shorter than Notion's one-hour link lifetime.
    headers: { Location: url, "Cache-Control": "public, max-age=1800" },
  });
}
