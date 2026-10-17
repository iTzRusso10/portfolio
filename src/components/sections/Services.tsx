import type { CSSProperties } from "react";
import { servicesCopy } from "../../content/site";
import { JumpText } from "../ui/JumpText";
import { SectionLabel } from "../ui/SectionLabel";
import { AsciiWindow } from "../ui/AsciiWindow";
import { Terminal } from "../ui/Terminal";

const fileName = (index: number, name: string) =>
  `${String(index + 1).padStart(2, "0")}_${name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.md`;

export function Services() {
  return (
    <section id="servizi" aria-labelledby="servizi-title" className="relative py-[16vh] lg:py-[20vh]">
      <div className="shell above-scene grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <SectionLabel section="servizi" />
          <JumpText
            accentLast
            id="servizi-title"
            lines={servicesCopy.statement}
            unit="word"
            stagger={55}
            className="type-statement mt-8 max-w-[22ch] lg:text-[clamp(2.6rem,4.6vw,4.6rem)]"
          />
        </div>
        <AsciiWindow shape="layers" title="strati.obj" className="lg:col-span-5 lg:row-span-2" heightClassName="h-72 lg:h-full lg:min-h-[26rem]" />
        <Terminal title="~/chi_sono.md" meta="markdown" className="lg:col-span-7" data-reveal>
          <p className="font-mono text-xs text-mute">
            <span className="prompt" />
            cat chi_sono.md
          </p>
          <JumpText
            as="p"
            unit="word"
            lines={[servicesCopy.bio]}
            delay={300}
            stagger={12}
            className="mt-3 leading-relaxed text-ink/80"
          />
        </Terminal>

        <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
          {servicesCopy.services.map((layer, i) => (
            <li key={layer.name} data-reveal style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
              <Terminal title={fileName(i, layer.name)} className="h-full" bodyClassName="p-5 lg:p-6">
                <h3 className="font-mono text-sm text-[rgb(var(--c-glow))]">
                  <span className="text-mute">## </span>
                  {layer.name}
                </h3>
                <p className="mt-4 leading-relaxed text-ink/75">{layer.text}</p>
              </Terminal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
