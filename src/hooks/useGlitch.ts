import { useEffect, type RefObject } from "react";

/** Adds `.is-glitching` to the element for a split second every few seconds. */
export function useGlitch(ref: RefObject<HTMLElement>, minMs = 3500, maxMs = 7500) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let clear = 0;
    const schedule = () => {
      timer = window.setTimeout(
        () => {
          el.classList.add("is-glitching");
          clear = window.setTimeout(() => {
            el.classList.remove("is-glitching");
            schedule();
          }, 380);
        },
        minMs + Math.random() * (maxMs - minMs),
      );
    };
    schedule();
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(clear);
      el.classList.remove("is-glitching");
    };
  }, [ref, minMs, maxMs]);
}
