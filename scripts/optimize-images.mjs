/**
 * Convertit les captures de projets en WebP, toutes recadrées au même format
 * (mêmes dimensions de sortie => les 3 cards ont exactement la même taille).
 *
 * Sources (non publiées) : assets/project-shots/<nom>.(png|jpg)
 * Sortie                  : public/images/<nom>.webp
 *
 * Usage : node scripts/optimize-images.mjs
 */
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const SRC_DIR = "assets/project-shots";
const OUT_DIR = "public/images";
const TARGET = { width: 1600, height: 667 }; // ratio 12/5 (cf. ProjectCard.css)

const files = await readdir(SRC_DIR);
const sources = files.filter((f) => /\.(png|jpe?g)$/i.test(f));

if (sources.length === 0) {
  console.warn(`! aucune source dans ${SRC_DIR}`);
}

for (const file of sources) {
  const name = parse(file).name;
  const out = join(OUT_DIR, `${name}.webp`);

  await sharp(join(SRC_DIR, file))
    .resize({ ...TARGET, fit: "cover", position: "top" })
    .webp({ quality: 82 })
    .toFile(out);

  const { size } = await stat(out);
  console.log(`✓ ${out}  (${TARGET.width}x${TARGET.height}, ${Math.round(size / 1024)} Ko)`);
}
