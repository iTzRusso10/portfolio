import { useEffect, useRef, type CSSProperties } from "react";
import { subscribeScroll, scrollState } from "../../animation/scroll";
import { heroCopy, site } from "../../content/site";
import { useGlitch } from "../../hooks/useGlitch";
import { plainText } from "../../utils/marks";
import { AsciiCanvas } from "../ui/AsciiCanvas";
import { ArrowRight, CheckIcon } from "../ui/Icons";
import { JumpText } from "../ui/JumpText";
import { Magnetic } from "../ui/Magnetic";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** If the visitor starts scrolling before the entrance is over, show the rest of the hero at once. */
function useSkipOnScroll() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const unsubscribe = subscribeScroll(() => {
      const el = ref.current;
      if (!el || scrollState.scrollY < 40) return;
      el.classList.add("hero-skip");
      el.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-revealed"));
      el.querySelectorAll(".jw").forEach((node) => node.classList.add("jw-on"));
      unsubscribe();
    });
    return unsubscribe;
  }, []);
  return ref;
}

export function Hero() {
  const title = useRef<HTMLDivElement>(null);
  const section = useSkipOnScroll();
  useGlitch(title);

  return (
    <section ref={section} id="intro" aria-labelledby="intro-title" className="relative min-h-[100svh]">
      {/* Phones: the knot has its own box above the text. Desktop: it fills the section, right of the text. */}
      <div className="relative mt-[var(--header-h)] h-[34svh] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
        <AsciiCanvas shape="trefoil" placement="hero" className="absolute inset-0" />
        <div className="above-scene pointer-events-none absolute inset-x-0 bottom-0 flex justify-center lg:bottom-12 lg:justify-end lg:px-[var(--gutter)]">
          <p className="text-[0.75rem] text-mute" aria-hidden="true" data-reveal style={delay(1500)}>
            <span className="lg:hidden">{heroCopy.coreHintTouch}</span>
            <span className="hidden lg:inline">{heroCopy.coreHint}</span>
          </p>
        </div>
      </div>

      {/* Text sits above the scene; only its interactive parts take the pointer, so clicks reach the knot. */}
      <div className="shell above-scene pointer-events-none flex flex-col pb-14 pt-6 lg:min-h-[100svh] lg:justify-center lg:pb-20 lg:pt-[calc(var(--header-h)+2rem)] [&_a]:pointer-events-auto [&_h1]:pointer-events-auto [&_p]:pointer-events-auto">
        <div className="max-w-[44rem] lg:max-w-[54%]">
          <div data-reveal style={delay(100)}>
            <a
              href="#siti"
              className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-bold text-inchiostro shadow-[0_10px_30px_-10px_rgb(212_255_63/0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {heroCopy.badge}
              <ArrowRight />
            </a>
          </div>

          <p className="mt-6 text-lg font-semibold text-viola-chiaro sm:text-xl" data-reveal style={delay(220)}>
            Ciao, sono {site.name}.
          </p>

          <div ref={title} className="mt-3">
            <JumpText
              as="h1"
              id="intro-title"
              lines={heroCopy.title}
              srText={`${plainText(heroCopy.title)}. ${site.name}, ${site.role.toLowerCase()}.`}
              delay={350}
              stagger={32}
              after={<span className="block h-[0.15em] w-[0.15em] rounded-full bg-lime" />}
              className="type-display text-[clamp(2.9rem,12.5vw,5.5rem)] lg:text-[clamp(4.2rem,6.6vw,7.4rem)]"
            />
          </div>

          <JumpText
            as="p"
            unit="word"
            lines={[heroCopy.intro]}
            delay={1000}
            stagger={10}
            className="mt-7 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink/85 lg:text-[1.15rem]"
          />

          <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal style={delay(1300)}>
            <Magnetic>
              <a href="#siti" className="btn btn-solid">
                {heroCopy.primaryCta}
                <ArrowRight className="btn-arrow" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contatti" className="btn btn-ghost">
                {heroCopy.secondaryCta}
              </a>
            </Magnetic>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink/80" data-reveal style={delay(1450)}>
            {heroCopy.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="tick !h-5 !w-5 text-[0.7rem]">
                  <CheckIcon />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
