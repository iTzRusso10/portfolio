import { useEffect, useRef } from "react";
import { scrollState, subscribeScroll } from "../../animation/scroll";
import { sections } from "../../content/sections";
import { useActiveSection } from "../../hooks/useActiveSection";

/** Editor-style status line pinned to the bottom (desktop). Decorative; the header carries navigation. */
export function StatusBar() {
  const active = useActiveSection();
  const percent = useRef<HTMLSpanElement>(null);
  const section = sections[active] ?? sections[0];

  useEffect(
    () =>
      subscribeScroll(() => {
        if (percent.current) percent.current.textContent = `${Math.round(scrollState.pageProgress * 100)}%`;
      }),
    [],
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 z-40 hidden h-7 items-stretch border-t border-ink/10 bg-night/80 font-mono text-[0.6875rem] text-mute backdrop-blur-md lg:flex"
    >
      <span className="flex items-center bg-signal px-3 font-semibold tracking-wider text-white">NORMAL</span>
      <span className="flex items-center gap-2 px-3">
        <span className="text-[rgb(var(--c-cyan))]">⎇</span> main
      </span>
      <span className="flex items-center px-3 text-ink/80">~/portfolio/{section.id}.tsx</span>
      <span className="ml-auto flex items-center gap-5 px-3">
        <span>react · typescript · three.js</span>
        <span>utf-8</span>
        <span>
          {section.index}/{sections[sections.length - 1]!.index}
        </span>
        <span ref={percent} className="w-9 text-right text-ink/80">
          0%
        </span>
      </span>
    </div>
  );
}
