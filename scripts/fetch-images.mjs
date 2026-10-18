// Copies every image/video the site references from the old Framer site into
// public/work/img, so the portfolio serves them from its own domain.
//
// Runs automatically before each build (see "prebuild" in package.json).
// Files already present are skipped, so once they're committed this does nothing.
// Run it yourself with: npm run images
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath gives a correct path on Windows too (no leading slash before the drive letter).
const root = fileURLToPath(new URL("..", import.meta.url));
const out = join(root, "public/work/img");
const sources = ["lib/projects.ts", "app/about/page.tsx"];

const ids = new Set();
for (const file of sources) {
  const text = readFileSync(join(root, file), "utf8");
  for (const m of text.matchAll(/["'`/]([A-Za-z0-9]{16,40}\.(?:png|jpe?g|gif|webp|mp4))["'`]/g)) ids.add(m[1]);
}

mkdirSync(out, { recursive: true });
let fetched = 0, kept = 0;
const failed = [];

await Promise.all(
  [...ids].map(async (id) => {
    const dest = join(out, id);
    if (existsSync(dest)) { kept++; return; }
    const url = id.endsWith(".mp4")
      ? `https://framerusercontent.com/assets/${id}`
      : `https://framerusercontent.com/images/${id}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      fetched++;
    } catch (e) {
      failed.push(`${id} (${e.message})`);
    }
  }),
);

console.log(`images: ${ids.size} referenced, ${kept} already here, ${fetched} downloaded`);
if (failed.length) {
  // Never fail the build over an image; the page still renders.
  console.warn(`images: could not download ${failed.length}:\n  ${failed.join("\n  ")}`);
}
