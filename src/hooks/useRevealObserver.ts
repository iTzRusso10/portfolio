import { useEffect } from "react";
import { revealStep } from "../animation/reveal";

const FONT_TIMEOUT_MS = 900;

interface RevealGroup {
  items: HTMLElement[];
  /** Keep the delays written in the markup instead of sequencing (hero). */
  authored?: boolean;
  /** performance.now() at which the next item may start. */
  nextStart: number;
}

/**
 * Reveals [data-reveal] elements in reading order, once.
 *
 * Elements are grouped by section. When an element enters the viewport, every
 * earlier element of its section is revealed first: those already scrolled
 * past appear instantly (no half-built sections when coming from below or
 * from an anchor), the visible ones animate one after another, each waiting
 * for the previous one to be mostly done. The hero keeps its hand-tuned delays.
 */
export function useRevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js-motion")) return;

    let observer: IntersectionObserver | undefined;
    let cancelled = false;
    const groups = new Map<Element, RevealGroup>();
    const groupOf = new Map<HTMLElement, RevealGroup>();

    const revealInstantly = (el: HTMLElement) => {
      el.classList.add("is-instant", "is-revealed");
      observer?.unobserve(el);
    };

    const animate = (el: HTMLElement, group: RevealGroup, now: number) => {
      if (group.authored) {
        el.classList.add("is-revealed");
        observer?.unobserve(el);
        return;
      }
      const start = Math.max(now, group.nextStart);
      el.style.setProperty("--delay", `${Math.round(start - now)}ms`);
      el.classList.add("is-revealed");
      observer?.unobserve(el);
      group.nextStart = start + revealStep(el);
    };

    const reveal = (target: HTMLElement) => {
      const group = groupOf.get(target);
      if (!group) return;
      const now = performance.now();
      for (const el of group.items) {
        if (el.classList.contains("is-revealed")) {
          if (el === target) break;
          continue;
        }
        if (el.getBoundingClientRect().bottom < 0) revealInstantly(el);
        else animate(el, group, now);
        if (el === target) break;
      }
    };

    const fontsReady = Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT_MS)),
    ]);

    void fontsReady.then(() => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          // Process in document order so a batch of entries keeps reading order.
          entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) => entry.target as HTMLElement)
            .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
            .forEach(reveal);
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
      );

      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const section = el.closest("section") ?? document.body;
        if (section.id === "intro") {
          // Hand-tuned entrance: reveal on sight with the authored delays.
          const solo: RevealGroup = { items: [el], nextStart: 0, authored: true };
          groupOf.set(el, solo);
          observer?.observe(el);
          return;
        }
        let group = groups.get(section);
        if (!group) {
          group = { items: [], nextStart: 0 };
          groups.set(section, group);
        }
        group.items.push(el);
        groupOf.set(el, group);
        observer?.observe(el);
      });

      // Sections jumped over (anchor link, restored scroll) are shown complete.
      for (const group of groups.values()) {
        for (const el of group.items) if (el.getBoundingClientRect().bottom < 0) revealInstantly(el);
      }
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);
}
