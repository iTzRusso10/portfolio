import type { CSSProperties } from "react";
import { contactCopy, managementOffer } from "../../content/site";
import { Card3D } from "../ui/Card3D";
import { ArrowRight } from "../ui/Icons";
import { JumpText } from "../ui/JumpText";
import { Magnetic } from "../ui/Magnetic";
import { Scene3D } from "../ui/Scene3D";

export function Management() {
  return (
    <section id="gestionali" aria-labelledby="gestionali-title" className="relative py-16 sm:py-[12vh] lg:py-[16vh]">
      <div className="shell above-scene grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:gap-y-14">
        <Scene3D shape="gears" className="order-2 lg:order-none lg:col-span-5" heightClassName="h-72 sm:h-80 lg:h-[26rem]" />

        <div className="lg:col-span-7">
          <p className="kicker" data-reveal>
            {managementOffer.kicker}
          </p>
          <JumpText id="gestionali-title" lines={managementOffer.title} stagger={20} className="type-title mt-6" />
          <JumpText
            as="p"
            unit="word"
            lines={[managementOffer.intro]}
            delay={300}
            stagger={12}
            className="mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-mute"
          />
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal>
            <Magnetic>
              <a href="#contatti" data-topic={contactCopy.topics[1]} className="btn btn-solid">
                {managementOffer.cta}
                <ArrowRight className="btn-arrow" />
              </a>
            </Magnetic>
            <p className="max-w-[20rem] text-sm text-mute">{managementOffer.priceNote}</p>
          </div>
        </div>

        <ul className="order-3 grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
          {managementOffer.features.map((feature, i) => (
            <li key={feature.name} data-reveal style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
              <Card3D className="h-full" bodyClassName="p-6">
                <p className="text-sm font-bold text-viola-chiaro">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-bold">{feature.name}</h3>
                <p className="mt-3 leading-relaxed text-mute">{feature.text}</p>
              </Card3D>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
