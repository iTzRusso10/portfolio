import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [data-cursor]";

/**
 * Dot + trailing ring. Mounted only for fine pointers without reduced motion;
 * purely visual (pointer-events: none), the native hit-testing is untouched.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !dot.current || !ring.current) return;
    const dotEl = dot.current;
    const ringEl = ring.current;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const trail = { x: -100, y: -100 };
    const light = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glowEl = glow.current;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const k = 1 - Math.exp(-dt * 18);
      trail.x += (target.x - trail.x) * k;
      trail.y += (target.y - trail.y) * k;
      const kGlow = 1 - Math.exp(-dt * 4);
      light.x += (target.x - light.x) * kGlow;
      light.y += (target.y - light.y) * kGlow;
      if (glowEl) glowEl.style.transform = `translate3d(${light.x}px, ${light.y}px, 0)`;
      dotEl.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ringEl.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0)`;
      const moving = Math.abs(target.x - light.x) + Math.abs(target.y - light.y) > 0.5;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      el.dataset.hidden = "false";
      wake();
    };
    const onOver = (e: PointerEvent) => {
      const interactive = (e.target as Element | null)?.closest?.(INTERACTIVE);
      el.dataset.state = interactive ? "link" : "default";
    };
    const onLeave = () => {
      el.dataset.hidden = "true";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    html.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      html.removeEventListener("pointerleave", onLeave);
      html.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden="true" />
      <div ref={root} className="cursor" data-hidden="true" data-state="default" aria-hidden="true">
        <div ref={ring} className="cursor-ring" />
        <div ref={dot} className="cursor-dot" />
      </div>
    </>
  );
}
