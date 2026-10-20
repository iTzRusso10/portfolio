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
      className="scroll-donut pointer-events-none fixed bottom-3 right-3 z-40 w-[4.5rem] sm:w-28 lg:bottom-6 lg:right-6 lg:w-32"
    >
      <div className="card card-screen !rounded-full">
        <AsciiCanvas shape="donut" placement="scroll" className="relative aspect-square w-full" />
        <span ref={percent} className="absolute inset-x-0 bottom-[14%] text-center text-[0.6rem] font-bold text-lime sm:text-xs">
          0%
        </span>
      </div>
    </div>
  );
}
