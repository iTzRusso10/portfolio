import { useEffect } from "react";

const FONT_TIMEOUT_MS = 900;

/**
 * Reveals every [data-reveal] element once it enters the viewport. Waits for
 * the webfonts first, so the hero title never animates in a fallback font.
 * Jumping text ([data-reveal="jump"]) is reset once it is completely off
 * screen, so it jumps again whenever its chapter comes back, in step with the
 * 3D scene changing shape.
 */
export function useRevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js-motion")) return;

    const observers: IntersectionObserver[] = [];
    let cancelled = false;
    const fontsReady = Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT_MS)),
    ]);

    void fontsReady.then(() => {
      if (cancelled) return;
      const reveal = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-revealed");
            if ((entry.target as HTMLElement).dataset.reveal !== "jump") reveal.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -4% 0px", threshold: 0.01 },
      );
      const reset = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) entry.target.classList.remove("is-revealed");
        }
      });
      document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
      document.querySelectorAll('[data-reveal="jump"]').forEach((el) => reset.observe(el));
      observers.push(reveal, reset);
    });

    return () => {
      cancelled = true;
      observers.forEach((o) => o.disconnect());
    };
  }, []);
}
