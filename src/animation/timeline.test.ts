import { describe, expect, it } from "vitest";
import { TRANSITION_END, TRANSITION_START, computeTimeline } from "./timeline";

const vh = 1000;
const metrics = { tops: [0, 1000, 2400, 3600, 6000], heights: [1000, 1400, 1200, 2400, 1000] };
const maxScroll = 6000 + 1000 - vh;

describe("computeTimeline", () => {
  it("starts in the first state", () => {
    expect(computeTimeline(0, vh, maxScroll, metrics).value).toBe(0);
  });

  it("reaches each state when its section top crosses the transition line", () => {
    for (let k = 1; k < metrics.tops.length; k++) {
      const top = metrics.tops[k] ?? 0;
      const y = Math.min(top - vh * TRANSITION_END, maxScroll);
      expect(computeTimeline(y, vh, maxScroll, metrics).value).toBeCloseTo(k, 6);
    }
  });

  it("holds a state while its section is being read", () => {
    const a = computeTimeline(2400 - vh * TRANSITION_END + 50, vh, maxScroll, metrics).value;
    const b = computeTimeline(3600 - vh * TRANSITION_START - 10, vh, maxScroll, metrics).value;
    expect(a).toBe(2);
    expect(b).toBe(2);
  });

  it("is monotonic and continuous over the whole page", () => {
    let previous = -1;
    for (let y = 0; y <= maxScroll; y += 5) {
      const { value } = computeTimeline(y, vh, maxScroll, metrics);
      expect(value).toBeGreaterThanOrEqual(previous);
      if (previous >= 0) expect(value - previous).toBeLessThan(0.02);
      previous = value;
    }
    expect(previous).toBe(metrics.tops.length - 1);
  });

  it("depends only on the scroll position, not on history", () => {
    const direct = computeTimeline(3100, vh, maxScroll, metrics).value;
    computeTimeline(maxScroll, vh, maxScroll, metrics);
    computeTimeline(0, vh, maxScroll, metrics);
    expect(computeTimeline(3100, vh, maxScroll, metrics).value).toBe(direct);
  });

  it("reports section progress from entry to exit", () => {
    const frame = computeTimeline(3600 - vh, vh, maxScroll, metrics);
    expect(frame.progress[3]).toBe(0);
    expect(computeTimeline(3600 + 2400, vh, maxScroll, metrics).progress[3]).toBe(1);
  });

  it("clamps the last transition to the end of the page", () => {
    const shortMax = 6000 - 500;
    expect(computeTimeline(shortMax, vh, shortMax, metrics).value).toBe(4);
  });
});
