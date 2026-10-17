import type { CSSProperties } from "react";
import { skillsCopy } from "../../content/site";
import { evidenceFor, skillGroups, type SkillGroup } from "../../content/skills";
import { JumpText } from "../ui/JumpText";
import { SectionLabel } from "../ui/SectionLabel";
import { AsciiWindow } from "../ui/AsciiWindow";
import { Terminal } from "../ui/Terminal";

/** One skill group as a tiny TypeScript file; the comments link to the projects using each skill. */
function SkillFile({ group }: { group: SkillGroup }) {
  const lines = group.skills.length + 2;
  return (
    <Terminal title={`${group.id}.ts`} meta="TS" className="h-full" bodyClassName="py-4 pr-4">
      <h3 className="sr-only">{group.name}</h3>
      <div className="grid grid-cols-[2.25rem_1fr] font-mono text-[0.78rem] leading-[1.9] sm:text-[0.82rem]">
        <ol aria-hidden="true" className="select-none pr-3 text-right text-mute/50">
          {Array.from({ length: lines }, (_, i) => (
            <li key={i}>{i + 1}</li>
          ))}
        </ol>
        <div className="min-w-0">
          <p className="truncate">
            <span className="tok-kw">export const </span>
            <span className="tok-fn">{group.id}</span>
            <span className="text-ink/70"> = [</span>
            <span className="tok-com">{` // ${group.name}`}</span>
          </p>
          <ul>
            {group.skills.map((skill) => (
              <li key={skill.name} className="flex flex-wrap items-baseline gap-x-2 pl-4">
                <span>
                  <span className="tok-str">{`"${skill.name}"`}</span>
                  <span className="text-ink/50">,</span>
                </span>
                <span className="tok-com">
                  {"// "}
                  {evidenceFor(skill).map((ref) => (
                    <a
                      key={ref.label}
                      href={ref.href}
                      className="mr-1.5 not-italic transition-colors hover:text-[rgb(var(--c-cyan))]"
                      aria-label={`${skill.name}: ${ref.label}`}
                    >
                      {ref.label}
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-ink/70">];</p>
        </div>
      </div>
    </Terminal>
  );
}

/** Checks this very site passes; shown as a build log next to the skill files. */
const BUILD_STEPS = [
  ["npm run lint", "0 warning"],
  ["npm run typecheck", "strict, 0 errori"],
  ["npm test", "vitest ok"],
  ["npm run build", "vite → docs/"],
] as const;

function BuildLog() {
  return (
    <Terminal title="portfolio — build.log" meta="zsh" className="h-full" bodyClassName="space-y-2 p-5 font-mono text-[0.78rem] sm:text-[0.82rem]">
      <p className="tok-com">{"// questo sito, verificato a ogni modifica"}</p>
      {BUILD_STEPS.map(([command, result]) => (
        <p key={command} className="flex flex-wrap items-baseline gap-x-3">
          <span>
            <span className="prompt" />
            {command}
          </span>
          <span className="text-[rgb(190_242_100)]">✓ {result}</span>
        </p>
      ))}
      <p className="pt-1 text-mute">
        <span className="prompt" />
        <span aria-hidden="true" className="caret" />
      </p>
    </Terminal>
  );
}

export function Skills() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative py-14 sm:py-[12vh] lg:py-[18vh]">
      <div className="shell above-scene">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <div className="lg:col-span-7">
            <SectionLabel section="stack" />
            <JumpText accentLast id="stack-title" lines={skillsCopy.title} className="type-title mt-8" />
            <JumpText
              as="p"
              unit="word"
              lines={[skillsCopy.intro]}
              delay={450}
              stagger={14}
              className="mt-8 max-w-[34rem] leading-relaxed text-ink/75"
            />
          </div>
          <AsciiWindow shape="geodesic" title="sistema.obj" className="lg:col-span-5" />
        </header>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20">
          {skillGroups.map((group, g) => (
            <li key={group.id} data-reveal style={{ "--delay": `${(g % 2) * 90}ms` } as CSSProperties}>
              <SkillFile group={group} />
            </li>
          ))}
          <li className="sm:col-span-2" data-reveal>
            <BuildLog />
          </li>
        </ul>
      </div>
    </section>
  );
}
