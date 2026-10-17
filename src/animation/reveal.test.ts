import { describe, expect, it } from "vitest";
import { MIN_STEP_MS, stepFor } from "./reveal";

describe("reveal sequencing", () => {
  it("lets titles land before the next element starts", () => {
    const title = stepFor("jump-char", 20, 26);
    expect(title).toBeGreaterThan(stepFor("block"));
    expect(title).toBeGreaterThanOrEqual(20 * 26 * 0.75);
  });

  it("never stalls a section for long", () => {
    expect(stepFor("jump-char", 500, 60)).toBeLessThanOrEqual(1100);
    expect(stepFor("jump-word", 500, 30)).toBeLessThanOrEqual(700);
  });

  it("keeps a minimum gap so blocks never pop in together", () => {
    expect(stepFor("block")).toBe(MIN_STEP_MS);
    expect(stepFor("jump-word", 1, 1)).toBeGreaterThan(MIN_STEP_MS);
  });
});
