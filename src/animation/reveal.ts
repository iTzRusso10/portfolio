export type RevealKind = "jump-char" | "jump-word" | "tokens" | "lines" | "block";

/** Gap between consecutive reveals in the same section, in ms. */
export const MIN_STEP_MS = 110;

/**
 * How long to wait after an element starts before the next one in reading
 * order may start: long enough that the eye has followed it, short enough
 * that the section never feels slow.
 */
export function stepFor(kind: RevealKind, units = 0, staggerMs = 0): number {
  switch (kind) {
    case "jump-char":
      // Titles: wait for most letters to have landed.
      return Math.min(Math.max(units * staggerMs * 0.75 + 320, 380), 1100);
    case "jump-word":
    case "tokens":
      return Math.min(Math.max(units * staggerMs * 0.45 + 160, 220), 700);
    default:
      return MIN_STEP_MS;
  }
}

/** Reads the kind of an element from its markup and returns its step. */
export function revealStep(el: HTMLElement): number {
  const mode = el.dataset.reveal;
  if (mode === "jump") {
    const units = el.querySelectorAll(".jump-unit").length;
    const stagger = parseFloat(el.style.getPropertyValue("--stagger")) || 26;
    return stepFor(el.dataset.unit === "word" ? "jump-word" : "jump-char", units, stagger);
  }
  if (mode === "tokens") return stepFor("tokens", el.querySelectorAll(".token").length, 80);
  const words = el.querySelectorAll(":scope .jw").length;
  return words > 0 ? stepFor("jump-word", Math.min(words, 36), 14) : stepFor("block");
}
