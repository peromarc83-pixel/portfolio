/**
 * Génère l'image de partage (Open Graph / Twitter Card) à partir d'un SVG,
 * aux couleurs de la charte du site (cf. public/cv-marc.html).
 *
 * Sortie : public/og-image.png (1200x630)
 *
 * Usage : node scripts/generate-og-image.mjs
 */
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b2135" />
      <stop offset="28%" stop-color="#174161" />
      <stop offset="50%" stop-color="#1f5c86" />
      <stop offset="72%" stop-color="#174161" />
      <stop offset="100%" stop-color="#0b2135" />
    </linearGradient>
    <radialGradient id="halo1" cx="22%" cy="18%" r="55%">
      <stop offset="0%" stop-color="#3f94c7" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#3f94c7" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="halo2" cx="82%" cy="82%" r="55%">
      <stop offset="0%" stop-color="#2d7dab" stop-opacity="0.28" />
      <stop offset="100%" stop-color="#2d7dab" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#halo1)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#halo2)" />

  <!-- cadre décoratif -->
  <g stroke="#5fb0dd" stroke-width="2" opacity="0.55">
    <path d="M 64 100 L 64 64 L 100 64" fill="none" />
    <path d="M ${WIDTH - 100} 64 L ${WIDTH - 64} 64 L ${WIDTH - 64} 100" fill="none" />
    <path d="M 64 ${HEIGHT - 100} L 64 ${HEIGHT - 64} L 100 ${HEIGHT - 64}" fill="none" />
    <path d="M ${WIDTH - 100} ${HEIGHT - 64} L ${WIDTH - 64} ${HEIGHT - 64} L ${WIDTH - 64} ${HEIGHT - 100}" fill="none" />
  </g>

  <text x="96" y="300" font-family="Arial, sans-serif" font-weight="800" font-size="92" fill="#ffffff" letter-spacing="-1">
    Marc Pero
  </text>

  <text x="96" y="372" font-family="Arial, sans-serif" font-weight="600" font-size="38" fill="#5fb0dd">
    Développeur front-end React, en formation full-stack
  </text>

  <text x="96" y="424" font-family="Arial, sans-serif" font-weight="400" font-size="23" fill="#a6c1d6">
    Des interfaces claires, accessibles et performantes, du prototype au déploiement.
  </text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");

console.log("✓ public/og-image.png (1200x630)");
