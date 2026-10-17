import type { CSSProperties } from "react";
import { experienceCopy, roles } from "../../content/experience";
import { JumpText } from "../ui/JumpText";
import { SectionLabel } from "../ui/SectionLabel";
import { Terminal } from "../ui/Terminal";

/** Work history rendered as a `git log --graph`: the most recent role is HEAD. */
export function Experience() {
  return (
    <section id="esperienza" aria-labelledby="esperienza-title" className="relative py-[16vh] lg:py-[20vh]">
      <div className="shell above-scene grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <SectionLabel section="esperienza" />
          <JumpText
            accentLast
            id="esperienza-title"
            lines={experienceCopy.title}
            className="type-title mt-8 lg:text-[clamp(2.6rem,4.4vw,4.4rem)]"
          />
          <JumpText
            as="p"
            unit="word"
            lines={[experienceCopy.intro]}
            delay={400}
            stagger={14}
            className="mt-8 max-w-[30rem] leading-relaxed text-ink/75"
          />
        </div>

        <Terminal
          title="~/carriera — git log --graph"
          meta="main"
          className="lg:col-span-7"
          bodyClassName="p-5 font-mono text-[0.8rem] sm:p-6 sm:text-sm"
          data-reveal
        >
          <p className="text-mute">
            <span className="prompt" />
            git log --graph --oneline
          </p>
          <ol className="mt-5">
            {roles.map((role, i) => (
              <li
                key={role.id}
                className="relative grid grid-cols-[1.5rem_1fr] gap-x-3 pb-8 last:pb-0"
                data-reveal
                style={{ "--delay": `${i * 120}ms` } as CSSProperties}
              >
                {/* Graph rail: a commit dot and the line to the next one. */}
                <span aria-hidden="true" className="relative flex justify-center">
                  <span
                    className={`relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full ${role.current ? "bg-[rgb(var(--c-cyan))] shadow-[0_0_12px_rgb(var(--c-cyan))]" : "bg-signal"}`}
                  />
                  {i < roles.length - 1 && <span className="absolute bottom-0 top-3 w-px bg-ink/20" />}
                </span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[rgb(var(--c-glow))]">{role.hash}</span>
                    {role.current && (
                      <span className="text-[rgb(var(--c-cyan))]">
                        (HEAD → <span className="text-[rgb(190_242_100)]">oggi</span>)
                      </span>
                    )}
                  </p>
                  <h3 className="mt-1 font-display text-[1.25rem] font-bold leading-tight text-ink [font-stretch:110%] sm:text-[1.45rem]">
                    {role.title} <span className="text-mute">@</span> {role.company}
                  </h3>
                  <p className="mt-1 text-mute">
                    {role.period} · {role.place}
                  </p>
                  <p className="mt-3 font-display text-[0.98rem] leading-relaxed text-ink/80">{role.summary}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {role.tags.map((tag) => (
                      <li key={tag} className="rounded border border-ink/15 px-2 py-0.5 text-[0.7rem] text-ink/70">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Terminal>
      </div>
    </section>
  );
}
