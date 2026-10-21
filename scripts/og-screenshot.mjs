// Takes a screenshot of the live home page and uses it as the link preview
// (the picture WhatsApp, X, Slack, LinkedIn show when someone shares the site).
//
// Run by .github/workflows/link-preview.yml after every production deploy.
// It only replaces app/opengraph-image.png and app/twitter-image.png when the
// page actually looks different, so an unchanged site never triggers a commit.
//
// Usage: node scripts/og-screenshot.mjs [url]   (default https://ridhwansalaudeen.com)
import { chromium } from "playwright";
import sharp from "sharp";
import { existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const url = process.argv[2] || "https://ridhwansalaudeen.com";
const root = fileURLToPath(new URL("..", import.meta.url));
const targets = ["app/opengraph-image.png", "app/twitter-image.png"].map((f) => join(root, f));
const W = 1200, H = 630; // the size every network expects
const VIEW = { width: 1440, height: 756 }; // desktop layout, same shape, scaled down

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: VIEW, deviceScaleFactor: 2, reducedMotion: "reduce" });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  await document.fonts.ready;
  // Make sure every image on screen has fully loaded before the shot.
  await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; })));
});
await page.waitForTimeout(800);
const shot = await page.screenshot({ type: "png" });
await browser.close();

const next = await sharp(shot).resize(W, H).png({ compressionLevel: 9 }).toBuffer();

// Compare with the current preview; tiny differences (anti-aliasing) don't count.
let changed = true;
if (existsSync(targets[0])) {
  const raw = async (b) => sharp(b).resize(W, H).removeAlpha().raw().toBuffer();
  const [a, b] = await Promise.all([raw(next), raw(targets[0])]);
  let diff = 0;
  for (let i = 0; i < a.length; i += 3) {
    if (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]) > 40) diff++;
  }
  const share = diff / (W * H);
  console.log(`link preview: ${(share * 100).toFixed(2)}% of pixels changed`);
  changed = share > 0.003;
}
if (changed) {
  for (const t of targets) writeFileSync(t, next);
  console.log("link preview: updated");
} else {
  console.log("link preview: unchanged");
}
