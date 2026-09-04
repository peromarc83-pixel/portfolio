/**
 * Reprend les captures d'écran des sites de projets (Edge headless, déjà installé
 * sous Windows), puis lance la conversion WebP.
 *
 * Sortie : assets/project-shots/<nom>.png  ->  public/images/<nom>.webp
 *
 * Usage : node scripts/capture-shots.mjs
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { setTimeout as sleep } from "node:timers/promises";
import { resolve } from "node:path";

const run = promisify(execFile);

const EDGE =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT_DIR = resolve("assets/project-shots");

const SITES = {
  cordees: "https://lescordees.pro",
  argentbank: "https://argentbank-frontend.netlify.app/",
  "nina-carducci": "https://ninacarducci-portfolio.netlify.app/",
};

for (const [name, url] of Object.entries(SITES)) {
  const file = `${OUT_DIR}\\${name}.png`;
  await run(EDGE, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1600,1200",
    // laisse le JS + les images du hero se charger avant la capture
    "--virtual-time-budget=15000",
    "--timeout=30000",
    `--screenshot=${file}`,
    url,
  ]);
  // Edge rend la main avant d'avoir écrit le fichier : on laisse le temps au flush.
  await sleep(15000);
  console.log(`✓ ${name}.png`);
}

console.log("→ conversion WebP…");
await run(process.execPath, ["scripts/optimize-images.mjs"], { stdio: "inherit" }).then(
  ({ stdout }) => stdout && process.stdout.write(stdout),
);
