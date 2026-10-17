import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useMediaQuery";
import type { AsciiPlacement, AsciiShape } from "../../three/ascii/AsciiScene";
import { createCoreInput } from "../../three/coreInput";
import { detectQuality, supportsWebGL, type Quality } from "../../three/quality";

const AsciiScene = lazy(() => import("../../three/ascii/AsciiScene"));

type Status = "loading" | "ready" | "off";

/** If the 3D bundle or the GL context fails, the section simply shows no scene. */
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

interface AsciiCanvasProps {
  shape: AsciiShape;
  placement: AsciiPlacement;
  className?: string;
}

/**
 * A 3D knot rendered live as terminal characters. Lazy-loads three.js after
 * first paint, renders only while on screen, follows the mouse and reacts to
 * taps with a glitch. Vertical swipes still scroll the page.
 */
export function AsciiCanvas({ shape, placement, className = "" }: AsciiCanvasProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const input = useRef(createCoreInput()).current;
  const reducedMotion = useReducedMotion();
  const [quality, setQuality] = useState<Quality | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) {
      setStatus("off");
      return;
    }
    const start = () => setQuality(detectQuality());
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 120);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), {
      rootMargin: "100px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The knot leans toward the cursor wherever it is on the page.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      input.x = (e.clientX / window.innerWidth) * 2 - 1;
      input.y = -((e.clientY / window.innerHeight) * 2 - 1);
      input.active = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [input]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest("a, button")) return;
    input.x = (e.clientX / window.innerWidth) * 2 - 1;
    input.y = -((e.clientY / window.innerHeight) * 2 - 1);
    input.active = true;
    input.pulseAt = performance.now();
    if (e.pointerType !== "mouse") window.setTimeout(() => (input.active = false), 1200);
  };

  const disable = useCallback(() => setStatus("off"), []);
  const ready = useCallback(() => setStatus("ready"), []);

  return (
    <div
      ref={wrapper}
      className={`ascii-canvas ${className}`}
      data-status={status}
      onPointerDown={onPointerDown}
      aria-hidden="true"
    >
      {quality && status !== "off" && (
        <SceneBoundary onError={disable}>
          <Suspense fallback={null}>
            <AsciiScene
              quality={quality}
              input={input}
              shape={shape}
              placement={placement}
              reducedMotion={reducedMotion}
              running={visible}
              onReady={ready}
              onContextLost={disable}
            />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
