import { useEffect, type RefObject } from "react";

/**
 * Subtle magnetic pull toward the pointer. Mouse only, capped at a few
 * pixels so the hit area never drifts away from the cursor.
 */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T>, strength = 0.18, max = 8) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clampPx = (v: number) => Math.max(-max, Math.min(max, v));
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const dx = clampPx((e.clientX - (rect.left + rect.width / 2)) * strength);
      const dy = clampPx((e.clientY - (rect.top + rect.height / 2)) * strength);
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [ref, strength, max]);
}
