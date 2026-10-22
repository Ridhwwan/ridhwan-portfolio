// Used by .github/workflows/capture.yml. Saves files and page screenshots that
// this repo can't reach from where it's edited (e.g. Figma exports, live sites).
// Input (env CAPTURE_JSON): { files: [{url, name}], shots: [{url, name, width?, height?, fullPage?}] }
// Everything lands in public/work/img/<name>.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const job = JSON.parse(process.env.CAPTURE_JSON || "{}");
const out = (n) => `public/work/img/${n}`;

for (const f of job.files ?? []) {
  const res = await fetch(f.url);
  if (!res.ok) { console.warn(`file ${f.name}: HTTP ${res.status}`); continue; }
  writeFileSync(out(f.name), Buffer.from(await res.arrayBuffer()));
  console.log(`file ${f.name}: saved`);
}

if (job.shots?.length) {
  const browser = await chromium.launch();
  for (const s of job.shots) {
    const page = await browser.newPage({ viewport: { width: s.width ?? 1440, height: s.height ?? 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
    try {
      await page.goto(s.url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: out(s.name), fullPage: !!s.fullPage, type: s.name.endsWith(".jpg") ? "jpeg" : "png", quality: s.name.endsWith(".jpg") ? 85 : undefined });
      console.log(`shot ${s.name}: saved`);
    } catch (e) { console.warn(`shot ${s.name}: ${e.message}`); }
    await page.close();
  }
  await browser.close();
}
