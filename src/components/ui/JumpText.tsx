import { type CSSProperties, type ElementType, type PointerEvent, type ReactNode } from "react";
import { parseMarks, plainText } from "../../utils/marks";

/**
 * Text that jumps into place, a letter (titles) or a word (paragraphs) at a
 * time, when it first enters the viewport. Words wrapped in *asterisks* are
 * the keyword of the line: lime on dark sections, a lime highlighter on light
 * ones. Assistive tech reads the plain text from a visually hidden copy; the
 * animated glyphs are aria-hidden.
 */

type Unit = "char" | "word";

interface JumpTextProps {
  /** One entry per visual line. `*word*` marks the highlighted keyword. */
  lines: readonly string[];
  as?: ElementType;
  unit?: Unit;
  className?: string;
  /** Milliseconds before the first glyph moves. */
  delay?: number;
  /** Milliseconds between consecutive glyphs. */
  stagger?: number;
  /** Rendered after the last glyph, animated as a bouncing ball (e.g. a full stop). */
  after?: ReactNode;
  /** Accessible text when it should differ from the visible lines. */
  srText?: string;
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
  delay = 0,
  stagger = unit === "char" ? 26 : 22,
  after,
  srText,
  id,
}: JumpTextProps) {
  let index = 0;

  return (
    <Tag
      id={id}
      className={className}
      data-reveal="jump"
      data-unit={unit}
      style={{ "--delay": `${delay}ms`, "--stagger": `${stagger}ms` } as CSSProperties}
      onPointerOver={unit === "char" ? hop : undefined}
    >
      <span className="sr-only">{srText ?? plainText(lines)}</span>
      <span aria-hidden="true">
        {lines.map((line, l) => {
          const words = parseMarks(line);
          return (
            <span key={l} className="jump-line">
              {words.map((word, w) => (
                <span key={w}>
                  <span className={`jump-word ${word.mark ? "mark-word" : ""}`}>
                    {unit === "word" ? (
                      <span className={`jump-unit ${word.mark ? "mark-unit" : ""}`} style={{ "--i": index++ } as CSSProperties}>
                        {word.chars.map((c) => c.char).join("")}
                      </span>
                    ) : (
                      word.chars.map(({ char, mark }, c) => (
                        <span key={c} className={`jump-unit ${mark ? "mark-unit" : ""}`} style={{ "--i": index++ } as CSSProperties}>
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
