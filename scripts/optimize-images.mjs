// Makes light WebP copies of every image in public/work/img at a few widths,
// so phones download a small picture and big screens a sharp one.
//
// Output: public/work/img/opt/<name>-<width>.webp, plus lib/image-manifest.json
// (each image's real size and which widths exist), read by components/ui/Img.tsx.
// Runs before each build after fetch-images; copies that already exist are
// skipped, so it only does work for new images. Run it yourself: npm run images
import { readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const dir = join(root, "public/work/img");
const out = join(dir, "opt");
const WIDTHS = [480, 960, 1600];
mkdirSync(out, { recursive: true });

const manifest = {};
let made = 0;
for (const file of readdirSync(dir).sort()) {
  if (!/\.(png|jpe?g|webp)$/i.test(file) || !statSync(join(dir, file)).isFile()) continue;
  const { name } = parse(file);
  const meta = await sharp(join(dir, file)).metadata();
  const w = meta.width, h = meta.height;
  // Every width below the original, plus the original width itself (capped at the largest).
  const widths = [...new Set([...WIDTHS.filter((x) => x < w), Math.min(w, WIDTHS.at(-1))])];
  for (const width of widths) {
    const dest = join(out, `${name}-${width}.webp`);
    if (existsSync(dest)) continue;
    await sharp(join(dir, file)).resize({ width }).webp({ quality: 80, effort: 6 }).toFile(dest);
    made++;
  }
  manifest[`/work/img/${file}`] = { w, h, widths, base: `/work/img/opt/${name}` };
}
writeFileSync(join(root, "lib/image-manifest.json"), JSON.stringify(manifest, null, 1) + "\n");
console.log(`images: ${Object.keys(manifest).length} optimised (${made} new copies)`);
