import type { CSSProperties } from "react";
import { agentsCopy } from "../../content/agents";
import { JumpText } from "../ui/JumpText";
import { SectionLabel } from "../ui/SectionLabel";
import { AsciiWindow } from "../ui/AsciiWindow";
import { Terminal } from "../ui/Terminal";
import { AgentTrace } from "./agents/AgentTrace";

export function Agents() {
  return (
    <section id="agenti" aria-labelledby="agenti-title" className="relative py-14 sm:py-[12vh] lg:py-[18vh]">
      <div className="shell above-scene grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-12">
        <div className="lg:col-span-5">
          <SectionLabel section="agenti" />
          <JumpText
            accentLast
            id="agenti-title"
            lines={agentsCopy.title}
            className="mt-6 text-[clamp(2.4rem,4.6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.035em] [font-stretch:112%]"
          />
          <JumpText
            as="p"
            unit="word"
            lines={[agentsCopy.intro]}
            delay={500}
            stagger={12}
            className="mt-6 max-w-[34rem] leading-relaxed text-ink/75"
          />
          <AsciiWindow shape="atom" title="orchestratore.obj" className="mt-8" heightClassName="h-72 lg:h-80" />
        </div>
        <div className="lg:col-span-7" data-reveal>
          <AgentTrace />
        </div>

        <ol className="grid gap-4 lg:col-span-12 lg:grid-cols-3">
          {agentsCopy.principles.map((principle, i) => (
            <li key={principle.name} data-reveal style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
              <Terminal title={`principio_${String(i + 1).padStart(2, "0")}.md`} className="h-full" bodyClassName="p-6">
                <h3 className="font-mono text-sm text-[rgb(var(--c-glow))]">
                  <span className="text-mute">## </span>
                  {principle.name}
                </h3>
                <p className="mt-4 leading-relaxed text-ink/75">{principle.text}</p>
              </Terminal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
