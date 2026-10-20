import type { CSSProperties } from "react";
import { contactCopy, websiteOffer } from "../../content/site";
import { Card3D } from "../ui/Card3D";
import { ArrowRight, CheckIcon } from "../ui/Icons";
import { JumpText } from "../ui/JumpText";
import { Scene3D } from "../ui/Scene3D";

export function Websites() {
  return (
    <section id="siti" aria-labelledby="siti-title" className="sheet py-16 sm:py-[12vh] lg:py-[14vh]">
      <div className="shell above-scene grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:gap-y-14">
        <div className="lg:col-span-6">
          <p className="kicker" data-reveal>
            {websiteOffer.kicker}
          </p>
          <JumpText id="siti-title" lines={websiteOffer.title} stagger={22} className="type-title mt-6" />
          <JumpText
            as="p"
            unit="word"
            lines={[websiteOffer.intro]}
            delay={300}
            stagger={12}
            className="mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-mute"
          />
          <div className="mt-7" data-reveal>
            <p className="label text-mute">Perfetto per</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {websiteOffer.idealFor.map((item) => (
                <li key={item} className="rounded-full border border-line/15 bg-bianco/5 px-3.5 py-1.5 text-sm font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Scene3D shape="screen" className="lg:col-span-6" heightClassName="h-72 sm:h-80 lg:h-[26rem]" />

        <Card3D tone="lime" className="lg:col-span-4" bodyClassName="flex h-full flex-col p-7 lg:p-8" data-reveal>
          <p className="label">Prezzo</p>
          <p className="mt-3 text-[clamp(4rem,9vw,6rem)] font-extrabold leading-none tracking-[-0.05em] [font-stretch:112%]">
            {websiteOffer.price}
          </p>
          <p className="mt-2 text-lg font-semibold">{websiteOffer.priceNote}</p>
          <a
            href="#contatti"
            data-topic={contactCopy.topics[0]}
            className="btn mt-8 bg-inchiostro text-bianco shadow-[0_4px_0_rgb(0_0_0/0.35)] lg:mt-auto"
          >
            {websiteOffer.cta}
            <ArrowRight className="btn-arrow" />
          </a>
        </Card3D>

        <Card3D className="lg:col-span-8" bodyClassName="p-7 lg:p-9" data-reveal>
          <h3 className="text-xl font-bold">Cosa comprende</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {websiteOffer.includes.map((item, i) => (
              <li key={item} className="flex items-start gap-3" style={{ "--i": i } as CSSProperties}>
                <span className="tick mt-0.5 text-[0.8rem]">
                  <CheckIcon />
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </Card3D>
      </div>
    </section>
  );
}
