import { progressBetween } from "../utils/math";

export interface SectionMetrics {
  /** Document-relative top of each section, in px. */
  tops: number[];
  heights: number[];
}

export interface TimelineFrame {
  /**
   * Continuous scene position: integer k means "fully in state k",
   * k + f means "f of the way from state k to state k + 1".
   */
  value: number;
  /** Per-section visibility progress: 0 when its top enters the viewport bottom, 1 when its bottom leaves the top. */
  progress: number[];
}

/**
 * A transition runs while the next section's top travels from TRANSITION_START
 * to TRANSITION_END (fractions of the viewport height, from the top).
 */
export const TRANSITION_START = 0.85;
export const TRANSITION_END = 0.15;

/**
 * Pure mapping from scroll position to scene timeline. Being a function of
 * scrollY alone, the result is identical when scrolling forwards, backwards
 * or jumping to an anchor.
 */
export function computeTimeline(
  scrollY: number,
  viewportHeight: number,
  maxScroll: number,
  metrics: SectionMetrics,
  out: TimelineFrame = { value: 0, progress: [] },
): TimelineFrame {
  const { tops, heights } = metrics;
  const count = tops.length;
  let value = 0;
  let previousEnd = 0;

  for (let k = 1; k < count; k++) {
    const top = tops[k] ?? 0;
    const start = Math.max(previousEnd, Math.min(top - viewportHeight * TRANSITION_START, maxScroll));
    const end = Math.max(start, Math.min(top - viewportHeight * TRANSITION_END, maxScroll));
    previousEnd = end;
    if (scrollY >= end) {
      value = k;
      continue;
    }
    value = k - 1 + progressBetween(scrollY, start, end);
    break;
  }

  out.value = value;
  out.progress.length = count;
  for (let k = 0; k < count; k++) {
    const top = tops[k] ?? 0;
    const height = heights[k] ?? 0;
    out.progress[k] = progressBetween(scrollY, top - viewportHeight, top + height);
  }
  return out;
}
