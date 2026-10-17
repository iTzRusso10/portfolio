import { useEffect, useRef } from "react";
import { scrollState, subscribeScroll } from "../../animation/scroll";
import { AsciiCanvas } from "./AsciiCanvas";

/**
 * Small fixed widget whose ASCII donut turns with the scroll position.
 * Shown between the hero and the contact section; purely decorative and click-through.
 */
export function ScrollDonut() {
  const root = useRef<HTMLDivElement>(null);
  const percent = useRef<HTMLSpanElement>(null);

  useEffect(
    () =>
      subscribeScroll(() => {
        const el = root.current;
        if (!el) return;
        // Visible between the hero and the contact section, where the page has its own 3D.
        const contactTop = document.getElementById("contatti")?.getBoundingClientRect().top ?? Infinity;
        const shown =
          scrollState.scrollY > scrollState.viewportHeight * 0.6 && contactTop > scrollState.viewportHeight * 0.55;
        if (el.dataset.shown !== String(shown)) el.dataset.shown = String(shown);
        if (percent.current) percent.current.textContent = `${Math.round(scrollState.pageProgress * 100)}%`;
      }),
    [],
  );

  return (
    <div
      ref={root}
      data-shown="false"
      aria-hidden="true"
      className="scroll-donut pointer-events-none fixed bottom-3 right-3 z-40 w-[5rem] sm:w-32 lg:bottom-11 lg:right-6 lg:w-40"
    >
      <div className="term">
      <div className="term-bar !gap-2 !px-2.5 !py-1.5 !text-[0.6rem]">
        <span className="term-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="hidden sm:inline">donut.c</span>
        <span ref={percent} className="ml-auto text-[rgb(var(--c-cyan))]">
          0%
        </span>
      </div>
      <AsciiCanvas shape="donut" placement="scroll" className="relative aspect-square w-full" />
      </div>
    </div>
  );
}
