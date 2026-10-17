import { sectionIds } from "../content/sections";
import { computeTimeline, type SectionMetrics, type TimelineFrame } from "./timeline";

/**
 * Mutable scroll state shared by the DOM effects and the WebGL render loop.
 * Updated outside React so per-frame consumers never trigger re-renders.
 */
export const scrollState: TimelineFrame & {
  scrollY: number;
  pageProgress: number;
  viewportHeight: number;
  /** Last measured scroll speed in px/s (signed), and when it was measured (performance.now()). */
  velocity: number;
  velocityAt: number;
} = {
  value: 0,
  progress: sectionIds.map(() => 0),
  scrollY: 0,
  pageProgress: 0,
  viewportHeight: 1,
  velocity: 0,
  velocityAt: 0,
};

const metrics: SectionMetrics = { tops: [], heights: [] };
type Listener = () => void;
const listeners = new Set<Listener>();

function measure() {
  metrics.tops.length = 0;
  metrics.heights.length = 0;
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    const rect = el?.getBoundingClientRect();
    metrics.tops.push(rect ? rect.top + window.scrollY : 0);
    metrics.heights.push(rect ? rect.height : 0);
  }
}

function update() {
  const vh = window.innerHeight;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
  const y = Math.min(Math.max(window.scrollY, 0), maxScroll);
  const now = performance.now();
  const dt = Math.max(1, now - scrollState.velocityAt);
  scrollState.velocity = dt < 200 ? ((y - scrollState.scrollY) / dt) * 1000 : 0;
  scrollState.velocityAt = now;
  computeTimeline(y, vh, maxScroll, metrics, scrollState);
  scrollState.scrollY = y;
  scrollState.viewportHeight = vh;
  scrollState.pageProgress = y / maxScroll;
  listeners.forEach((fn) => fn());
}

export function subscribeScroll(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Starts tracking. Returns a cleanup function; call once from the app root. */
export function startScrollTracking() {
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      update();
    });
  };
  const remeasure = () => {
    measure();
    schedule();
  };

  remeasure();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", remeasure);
  const observer = new ResizeObserver(remeasure);
  observer.observe(document.body);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", remeasure);
    observer.disconnect();
  };
}
