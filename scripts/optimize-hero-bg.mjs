/**
 * Convertit la photo de fond du Hero « constellation » en WebP.
 *
 * Source (non publiée) : assets/hero-bg/circuit.jpg
 * Sortie                : public/images/hero-circuit.webp
 *
 * Usage : node scripts/optimize-hero-bg.mjs
 */
import { stat } from "node:fs/promises";
import sharp from "sharp";

const SRC = "assets/hero-bg/circuit.jpg";
const OUT = "public/images/hero-circuit.webp";
const TARGET_WIDTH = 1920;

await sharp(SRC)
  .resize({ width: TARGET_WIDTH })
  .webp({ quality: 78 })
  .toFile(OUT);

const { size } = await stat(OUT);
console.log(`✓ ${OUT} (largeur ${TARGET_WIDTH}px, ${Math.round(size / 1024)} Ko)`);
