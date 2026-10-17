const WORDS = ["LLM", "AI Agents", "Prompt Engineering", "Next.js", "TypeScript", "Python", "Node.js", "Gemini API"];

function Row({ outline }: { outline: boolean }) {
  // Three identical copies: the row slides by one copy and loops seamlessly.
  return (
    <>
      {[0, 1, 2].map((copy) => (
        <span key={copy} className="flex shrink-0 items-center">
          {WORDS.map((word) => (
            <span key={word} className="flex items-center">
              <span className={outline ? "marquee-outline" : "marquee-fill"}>{word}</span>
              <span className="mx-[0.35em] text-[0.4em] text-signal">✦</span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

/**
 * Two giant bands of technologies drifting slowly in opposite directions,
 * slightly tilted. Time-based, not tied to the scroll; still with reduced
 * motion. Decorative: the same list is in the skills section.
 */
export function Marquee() {
  return (
    <div aria-hidden="true" className="above-scene relative overflow-hidden py-6 lg:py-[10vh]">
      <div className="-rotate-[4deg] type-display select-none text-[clamp(3.5rem,13vw,12rem)] leading-[1.02]">
        <div className="marquee-row">
          <Row outline />
        </div>
        <div className="marquee-row is-reverse">
          <Row outline={false} />
        </div>
      </div>
    </div>
  );
}
