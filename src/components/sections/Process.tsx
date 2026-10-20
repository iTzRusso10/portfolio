import type { CSSProperties } from "react";
import { processCopy } from "../../content/site";
import { Card3D } from "../ui/Card3D";
import { JumpText } from "../ui/JumpText";

export function Process() {
  return (
    <section id="metodo" aria-labelledby="metodo-title" className="theme-light sheet py-16 sm:py-[12vh] lg:py-[14vh]">
      <div className="shell above-scene">
        <div className="max-w-[40rem]">
          <p className="kicker" data-reveal>
            {processCopy.kicker}
          </p>
          <JumpText id="metodo-title" lines={processCopy.title} stagger={24} className="type-title mt-6" />
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {processCopy.steps.map((step, i) => (
            <li key={step.name} data-reveal style={{ "--delay": `${i * 110}ms` } as CSSProperties}>
              <Card3D tone="white" className="h-full" bodyClassName="p-7 lg:p-8">
                <p className="step-number text-[4.5rem]" aria-hidden="true">
                  {i + 1}
                </p>
                <h3 className="mt-6 text-2xl font-bold">{step.name}</h3>
                <p className="mt-3 leading-relaxed text-mute">{step.text}</p>
              </Card3D>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
