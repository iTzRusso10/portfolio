import { clamp, damp } from "../utils/math";
import { scrollState, subscribeScroll } from "./scroll";

/**
 * One manager for every 3D panel. Panels lean in perspective as they cross
 * the viewport (flat at the centre) and, with a mouse, tilt toward the
 * pointer with a moving glare. A single rAF loop runs only while something
 * is still moving; all layout reads happen before all style writes.
 */

/** Pure mapping from a panel's position to its scroll tilt, for tests and the loop. */
export function scrollTilt(centerY: number, viewportHeight: number, strength = 1) {
  const t = clamp((centerY - viewportHeight / 2) / (viewportHeight * 0.65), -1, 1);
  return { rx: t * 18 * strength, tz: -Math.abs(t) * 70 * strength };
}

/** Panels away from the horizontal centre turn toward it, like a curved wall of screens. */
export function wallTurn(centerX: number, viewportWidth: number, strength = 1) {
  const u = clamp((centerX - viewportWidth / 2) / (viewportWidth / 2), -1, 1);
  return -u * 9 * strength;
}

interface Panel {
  el: HTMLElement;
  visible: boolean;
  /** Just came back on screen: take the target pose at once instead of easing from flat. */
  snap: boolean;
  hover: boolean;
  px: number;
  py: number;
  rx: number;
  ry: number;
  tz: number;
}

const panels = new Set<Panel>();
let frame = 0;
let last = 0;
let started = false;
let enabled = true;
let strength = 1;
let observer: IntersectionObserver | null = null;
const pointer = { x: -1, y: -1, mouse: false };

function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.1) || 1 / 60;
  last = now;
  const vh = scrollState.viewportHeight || window.innerHeight;
  let moving = false;

  // Reads first…
  const targets: [Panel, number, number, number, number, number][] = [];
  for (const p of panels) {
    if (!p.visible) continue;
    const rect = p.el.getBoundingClientRect();
    const { rx, tz } = scrollTilt(rect.top + rect.height / 2, vh, strength);
    let targetRx = rx;
    let targetRy = wallTurn(rect.left + rect.width / 2, window.innerWidth, strength);
    let targetTz = tz;
    const inside =
      pointer.mouse &&
      pointer.x >= rect.left &&
      pointer.x <= rect.right &&
      pointer.y >= rect.top &&
      pointer.y <= rect.bottom;
    p.hover = inside;
    if (inside) {
      p.px = ((pointer.x - rect.left) / rect.width) * 2 - 1;
      p.py = ((pointer.y - rect.top) / rect.height) * 2 - 1;
      targetRx += -p.py * 7;
      targetRy += p.px * 9;
      targetTz += 14;
    }
    targets.push([p, targetRx, targetRy, targetTz, (p.px + 1) * 50, (p.py + 1) * 50]);
  }

  // …then writes.
  for (const [p, rx, ry, tz, mx, my] of targets) {
    const k = p.snap ? Infinity : 9;
    p.snap = false;
    p.rx = damp(p.rx, rx, k, dt);
    p.ry = damp(p.ry, ry, k, dt);
    p.tz = damp(p.tz, tz, k, dt);
    if (Math.abs(p.rx - rx) + Math.abs(p.ry - ry) + Math.abs(p.tz - tz) > 0.05) moving = true;
    const s = p.el.style;
    s.setProperty("--rx", `${p.rx.toFixed(2)}deg`);
    s.setProperty("--ry", `${p.ry.toFixed(2)}deg`);
    s.setProperty("--tz", `${p.tz.toFixed(1)}px`);
    s.setProperty("--mx", `${mx.toFixed(1)}%`);
    s.setProperty("--my", `${my.toFixed(1)}%`);
    p.el.dataset.hover = String(p.hover);
  }

  frame = moving ? requestAnimationFrame(tick) : 0;
}

/**
 * Off-screen panels go flat and drop their glass plates (data-idle), so they
 * don't keep GPU layers alive: twenty 3D panels add up on a phone.
 */
function setVisible(p: Panel, visible: boolean) {
  if (p.visible === visible) return;
  p.visible = visible;
  p.snap = visible;
  p.el.dataset.idle = String(!visible);
}

function wake() {
  if (!frame && enabled) {
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }
}

function start() {
  if (started) return;
  started = true;
  enabled = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  strength = window.matchMedia("(hover: hover) and (pointer: fine)").matches ? 1 : 0.6;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        for (const p of panels) if (p.el === entry.target) setVisible(p, entry.isIntersecting);
      }
      wake();
    },
    { rootMargin: "120px 0px" },
  );
  subscribeScroll(wake);
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.mouse = e.pointerType === "mouse";
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      wake();
    },
    { passive: true },
  );
  window.addEventListener("resize", wake);
}

/** Registers a panel stage (the element that receives the 3D transform). */
export function registerPanel(el: HTMLElement) {
  start();
  el.dataset.idle = "true";
  const panel: Panel = { el, visible: false, snap: false, hover: false, px: 0, py: -1, rx: 0, ry: 0, tz: 0 };
  panels.add(panel);
  observer?.observe(el);
  return () => {
    observer?.unobserve(el);
    panels.delete(panel);
  };
}
