import { CanvasTexture, LinearFilter } from "three";

/** Density ramp, darkest to brightest, followed by the binary digits used on highlighted bands. */
export const GLYPH_RAMP = " .:-=+*<>{}#%@";
export const BINARY = "01";
export const GLYPHS = GLYPH_RAMP + BINARY;

const CELL_W = 30;
const CELL_H = 48;

/** One row of white glyphs on black, sampled by the ASCII pass. */
export async function createGlyphAtlas() {
  const font = `600 40px "JetBrains Mono", ui-monospace, monospace`;
  try {
    await document.fonts.load(font);
  } catch {
    // The generic monospace fallback is fine.
  }
  const canvas = document.createElement("canvas");
  canvas.width = CELL_W * GLYPHS.length;
  canvas.height = CELL_H;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    Array.from(GLYPHS).forEach((glyph, i) => ctx.fillText(glyph, i * CELL_W + CELL_W / 2, CELL_H / 2 + 2));
  }
  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}
