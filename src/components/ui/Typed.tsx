import type { CSSProperties } from "react";

interface TypedProps {
  text: string;
  /** Milliseconds before typing starts. */
  delay?: number;
  /** Milliseconds per character. */
  speed?: number;
  className?: string;
}

/** A command typed character by character (CSS only). The full text is always in the DOM. */
export function Typed({ text, delay = 0, speed = 45, className = "" }: TypedProps) {
  return (
    <span
      className={`typed ${className}`}
      style={
        {
          "--chars": text.length,
          "--delay": `${delay}ms`,
          "--dur": `${text.length * speed}ms`,
        } as CSSProperties
      }
    >
      {text}
    </span>
  );
}
