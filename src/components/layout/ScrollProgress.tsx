import { useEffect, useRef } from "react";
import { scrollState, subscribeScroll } from "../../animation/scroll";

/** Page progress bar and chapter ticks. Purely visual: the header nav carries the same information accessibly. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      subscribeScroll(() => {
        if (bar.current) bar.current.style.transform = `scaleX(${scrollState.pageProgress})`;
      }),
    [],
  );

  return (
    <div aria-hidden="true">
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px]">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-signal via-[rgb(var(--c-glow))] to-[rgb(var(--c-cyan))]" />
      </div>
    </div>
  );
}
