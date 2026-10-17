import { useRef, type CSSProperties } from "react";
import { heroCopy, site } from "../../content/site";
import { useGlitch } from "../../hooks/useGlitch";
import { AsciiCanvas } from "../ui/AsciiCanvas";
import { ArrowDown } from "../ui/Icons";
import { JumpText } from "../ui/JumpText";
import { Magnetic } from "../ui/Magnetic";
import { Typed } from "../ui/Typed";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const title = useRef<HTMLDivElement>(null);
  useGlitch(title);

  return (
    <section id="intro" aria-labelledby="intro-title" className="relative min-h-[100svh]">
      {/* Phones: the knot has its own box above the text. Desktop: it fills the section, right of the text. */}
      <div className="relative mt-[var(--header-h)] h-[42svh] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
        <AsciiCanvas shape="trefoil" placement="hero" className="absolute inset-0" />
        <div className="above-scene pointer-events-none absolute inset-x-0 bottom-0 flex justify-center lg:bottom-12 lg:justify-end lg:px-[var(--gutter)]">
          <p className="font-mono text-[0.7rem] text-mute" aria-hidden="true" data-reveal style={delay(3200)}>
            [ <span className="lg:hidden">{heroCopy.coreHintTouch}</span>
            <span className="hidden lg:inline">{heroCopy.coreHint}</span> ]
          </p>
        </div>
      </div>

      {/* Text sits above the scene; only its interactive parts take the pointer, so clicks reach the knot. */}
      <div className="shell above-scene pointer-events-none flex flex-col pb-12 pt-6 lg:min-h-[100svh] lg:justify-center lg:pb-20 lg:pt-[calc(var(--header-h)+2rem)] [&_a]:pointer-events-auto [&_h1]:pointer-events-auto [&_p]:pointer-events-auto">
        <div className="max-w-[46rem] lg:max-w-[52%]">
          <p className="font-mono text-[0.8rem] text-mute sm:text-sm">
            <span className="text-[rgb(var(--c-cyan))]">{heroCopy.prompt}</span>
            <span className="text-ink/60">:~$ </span>
            <Typed text={heroCopy.command} delay={300} speed={70} className="text-ink" />
          </p>

          <div ref={title} className="mt-4">
            <JumpText
              accentLast
              as="h1"
              id="intro-title"
              lines={[site.firstName, site.lastName]}
              srText={`${site.name}, ${site.role}`}
              delay={800}
              stagger={40}
              after={<span className="block h-[0.14em] w-[0.14em] rounded-full bg-signal" />}
              className="type-display text-[clamp(3.2rem,15vw,6.5rem)] lg:text-[clamp(5rem,8.2vw,9.5rem)]"
            />
          </div>

          <p className="mt-5 font-mono text-[0.95rem] text-ink sm:text-lg">
            <span className="prompt" />
            <Typed text={heroCopy.role} delay={1500} speed={38} />
            <span aria-hidden="true" className="caret" />
          </p>
          <p className="mt-1 font-mono text-[0.8rem] text-mute sm:text-sm" data-reveal style={delay(2300)}>
            <span className="tok-com">{`// ${heroCopy.kicker}`}</span>
          </p>

          <JumpText
            as="p"
            unit="word"
            lines={[heroCopy.intro]}
            delay={2400}
            stagger={14}
            className="mt-7 max-w-[32rem] text-[0.98rem] leading-relaxed text-ink/80 lg:text-[1.05rem]"
          />

          <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal style={delay(2800)}>
            <Magnetic>
              <a href="#servizi" className="btn btn-solid font-mono text-sm">
                <span aria-hidden="true">❯</span>
                {heroCopy.primaryCta}
                <ArrowDown className="btn-arrow" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contatti" className="btn btn-ghost font-mono text-sm">
                {heroCopy.secondaryCta}
              </a>
            </Magnetic>
          </div>

          <dl className="mt-10 hidden gap-1 font-mono text-xs text-mute lg:grid" data-reveal style={delay(3000)}>
            {heroCopy.readout.map(([key, value]) => (
              <div key={key} className="flex gap-3">
                <dt className="w-14 text-[rgb(var(--c-glow))]">{key}</dt>
                <dd className="text-ink/70">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </section>
  );
}
