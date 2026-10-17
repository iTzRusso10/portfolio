import { useEffect, useRef, type CSSProperties } from "react";
import { traceCursorAt } from "../../../animation/trace";
import { AGENT_NAMES, agentTrace, agentsCopy, type TraceKind } from "../../../content/agents";
import { projectRef } from "../../../content/projects";
import { useReducedMotion } from "../../../hooks/useMediaQuery";

const ICONS: Record<TraceKind, string> = { goal: "›", plan: "◇", tool: "⚙", result: "✓" };

/**
 * Terminal-like trace that runs on its own, like an agent at work, when it
 * comes into view, and replays when it comes back. The full text is always
 * in the DOM (screen readers read it whole); only its visible width changes.
 * Updates bypass React: one attribute write per changed line.
 */
export function AgentTrace() {
  const reducedMotion = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const lines = useRef<(HTMLLIElement | null)[]>([]);
  const status = useRef<HTMLSpanElement>(null);
  const chips = useRef<(HTMLLIElement | null)[]>([]);
  const ref = projectRef(agentsCopy.traceProjectId);

  useEffect(() => {
    const render = (cursor: number) => {
      const current = Math.floor(cursor);
      lines.current.forEach((el, i) => {
        if (!el) return;
        const state = i < current ? "done" : i === current ? "current" : "pending";
        if (el.dataset.state !== state) el.dataset.state = state;
        const length = agentTrace[i]!.text.length;
        const chars = state === "done" ? length : state === "current" ? Math.round((cursor - current) * length) : 0;
        el.style.setProperty("--chars", String(chars));
      });
      const activeAgent = agentTrace[current]?.agent ?? -1;
      chips.current.forEach((el, k) => {
        if (el) el.dataset.active = String(k === activeAgent);
      });
      if (status.current) {
        status.current.textContent =
          cursor >= agentTrace.length ? "completato" : cursor <= 0 ? "in attesa" : "in esecuzione";
      }
    };

    if (reducedMotion) {
      render(agentTrace.length);
      return;
    }

    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      const cursor = traceCursorAt(now - start);
      render(cursor);
      if (cursor < agentTrace.length) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(frame);
        if (entry?.isIntersecting) {
          start = performance.now();
          frame = requestAnimationFrame(tick);
        } else {
          render(0);
        }
      },
      { threshold: 0.35 },
    );
    render(0);
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <figure ref={root} className="w-full">
      <div className="overflow-hidden rounded-2xl bg-[rgb(18_11_38/0.72)] ring-1 ring-ink/10 backdrop-blur-md text-ink shadow-[0_40px_120px_-40px_rgb(168_85_247/0.45)]">
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5">
          <span className="label text-ink/60">{agentsCopy.traceTitle}</span>
          <span className="label flex items-center gap-2 text-ink/60">
            <span aria-hidden="true" className="trace-dot h-1.5 w-1.5 rounded-full bg-signal" />
            <span ref={status}>in attesa</span>
          </span>
        </div>
        <ol className="space-y-2 px-4 py-4 font-mono sm:space-y-1 text-[0.75rem] leading-relaxed sm:text-[0.8rem]">
          {agentTrace.map((line, i) => (
            <li
              key={line.label}
              ref={(el) => (lines.current[i] = el)}
              data-state="pending"
              data-kind={line.kind}
              className="trace-line grid grid-cols-[1.75rem_1rem_minmax(0,1fr)_1rem] items-baseline gap-x-1.5 sm:grid-cols-[2rem_1rem_7.5rem_minmax(0,1fr)_1rem]"
              style={{ "--chars": 0 } as CSSProperties}
            >
              <span className="text-ink/35">{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden="true" className="trace-icon">
                {ICONS[line.kind]}
              </span>
              {/* Label and command stack on narrow screens, sit side by side from sm up. */}
              <span className="flex min-w-0 flex-col sm:contents">
                <span className="truncate text-ink/55">{line.label}</span>
                <span className="flex min-w-0 items-baseline">
                  <span className="trace-text">{line.text}</span>
                  <span aria-hidden="true" className="trace-caret" />
                </span>
              </span>
              <span aria-hidden="true" className="trace-check text-right">
                ✓
              </span>
            </li>
          ))}
        </ol>
        <ul className="flex flex-wrap gap-1.5 border-t border-ink/10 px-4 py-3" aria-label="Agenti">
          {AGENT_NAMES.map((name, k) => (
            <li
              key={name}
              ref={(el) => (chips.current[k] = el)}
              data-active="false"
              className="trace-chip label rounded-full border border-ink/20 px-2.5 py-1 text-[0.625rem] text-ink/60"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="label mt-3 text-mute">
        {agentsCopy.traceCaption}
        {ref && (
          <>
            {" — "}
            <a href={ref.href} className="link-draw text-ink">
              {ref.label}
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
