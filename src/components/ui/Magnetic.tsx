import { useRef, type ReactNode } from "react";
import { useMagnetic } from "../../hooks/useMagnetic";

/** Wraps an interactive element so the pull does not interfere with its own transitions. */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMagnetic(ref);
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
