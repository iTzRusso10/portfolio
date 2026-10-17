import { type CSSProperties, type ElementType, type PointerEvent, type ReactNode } from "react";

/**
 * Text that jumps into place, a letter (titles) or a word (paragraphs) at a
 * time, replaying whenever it re-enters the viewport, in step with the 3D
 * scene changing shape. Assistive tech reads the plain text from a visually
 * hidden copy; the animated glyphs are aria-hidden.
 */

type Unit = "char" | "word";

interface JumpTextProps {
  /** One entry per visual line. */
  lines: readonly string[];
  as?: ElementType;
  unit?: Unit;
  className?: string;
  lineClassName?: (index: number) => string;
  /** Milliseconds before the first glyph moves. */
  delay?: number;
  /** Milliseconds between consecutive glyphs. */
  stagger?: number;
  /** Rendered after the last glyph, animated as a bouncing ball (e.g. a full stop). */
  after?: ReactNode;
  /** Accessible text when it should differ from the visible lines. */
  srText?: string;
  /** Colours the last line with the violet → magenta gradient. */
  accentLast?: boolean;
  id?: string;
}

/** Hover hop on desktop: one letter jumps, then settles. */
function hop(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const glyph = (event.target as HTMLElement).closest<HTMLElement>(".jump-glyph");
  if (!glyph || glyph.classList.contains("is-hopping")) return;
  glyph.classList.add("is-hopping");
  glyph.addEventListener("animationend", () => glyph.classList.remove("is-hopping"), { once: true });
}

export function JumpText({
  lines,
  as: Tag = "h2",
  unit = "char",
  className = "",
  lineClassName,
  delay = 0,
  stagger = unit === "char" ? 26 : 22,
  after,
  srText,
  accentLast = false,
  id,
}: JumpTextProps) {
  let index = 0;
  const text = srText ?? lines.join(" ");

  return (
    <Tag
      id={id}
      className={className}
      data-reveal="jump"
      data-unit={unit}
      style={{ "--delay": `${delay}ms`, "--stagger": `${stagger}ms` } as CSSProperties}
      onPointerOver={unit === "char" ? hop : undefined}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {lines.map((line, l) => {
          const words = line.split(" ");
          const accent = accentLast && l === lines.length - 1;
          // Position of each unit along the line (0..1), used by the accent gradient.
          const units = unit === "word" ? words.length : line.replace(/ /g, "").length;
          let position = 0;
          const t = () => (units > 1 ? position++ / (units - 1) : 0);
          return (
            <span key={l} className={`jump-line ${accent ? "jump-accent" : ""} ${lineClassName?.(l) ?? ""}`}>
              {words.map((word, w) => (
                <span key={w}>
                  <span className="jump-word">
                    {unit === "word" ? (
                      <span className="jump-unit" style={{ "--i": index++, "--t": t() } as CSSProperties}>
                        {word}
                      </span>
                    ) : (
                      Array.from(word).map((char, c) => (
                        <span key={c} className="jump-unit" style={{ "--i": index++, "--t": t() } as CSSProperties}>
                          <span className="jump-glyph">{char}</span>
                        </span>
                      ))
                    )}
                  </span>
                  {w < words.length - 1 && " "}
                </span>
              ))}
              {l === lines.length - 1 && after && (
                <span className="jump-ball" style={{ "--i": index + 4 } as CSSProperties}>
                  {after}
                </span>
              )}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
