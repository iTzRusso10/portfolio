import { useEffect, useRef, useState } from "react";
import { contactCopy, site } from "../../content/site";
import { AsciiCanvas } from "../ui/AsciiCanvas";
import { Terminal } from "../ui/Terminal";
import { ArrowUpRight, CopyIcon } from "../ui/Icons";
import { ExternalLink } from "../ui/ExternalLink";
import { JumpText } from "../ui/JumpText";
import { SectionLabel } from "../ui/SectionLabel";

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className="label inline-flex items-center gap-2 text-mute transition-colors hover:text-ink">
      <CopyIcon />
      <span aria-live="polite">{copied ? contactCopy.copiedLabel : contactCopy.copyLabel}</span>
    </button>
  );
}

export function Contact() {
  const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <section id="contatti" aria-labelledby="contatti-title" className="relative min-h-[100svh]">
      <div className="relative mt-[var(--header-h)] h-[36svh] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
        <AsciiCanvas shape="cinquefoil" placement="contact" className="absolute inset-0" />
      </div>
      <div className="shell above-scene pointer-events-none flex flex-col pb-16 pt-6 lg:min-h-[100svh] lg:justify-center lg:pb-24 lg:pt-[16vh] [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_h2]:pointer-events-auto [&_p]:pointer-events-auto">
        <div className="lg:max-w-[52%]">
          <SectionLabel section="contatti" />
          <JumpText
            accentLast
            id="contatti-title"
            lines={contactCopy.title}
            className="type-display mt-8 text-[clamp(3rem,12vw,6.5rem)]"
          />
          <JumpText
            as="p"
            unit="word"
            lines={[contactCopy.intro]}
            delay={600}
            stagger={30}
            className="mt-6 max-w-[30rem] text-[1.05rem] leading-relaxed text-ink/75"
          />

          <Terminal
            title="~/contatti — zsh"
            meta="online"
            className="pointer-events-auto mt-10"
            bodyClassName="space-y-4 p-5 font-mono text-[0.82rem] sm:text-sm"
          >
            {site.email && (
              <div data-reveal>
                <p className="text-mute">
                  <span className="prompt" />
                  mail --to
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="group mt-1 inline-flex max-w-full items-center gap-2 break-all text-[clamp(1rem,2.6vw,1.6rem)] font-semibold text-ink"
                >
                  <span className="link-draw">{site.email}</span>
                  <ArrowUpRight className="shrink-0 text-[rgb(var(--c-cyan))] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
                <div className="mt-2">
                  <CopyEmail email={site.email} />
                </div>
              </div>
            )}
            {site.socials.map((social) => (
              <div key={social.label} data-reveal>
                <p className="text-mute">
                  <span className="prompt" />
                  open <span className="tok-com">{`# ${social.label}`}</span>
                </p>
                <ExternalLink href={social.href} className="group mt-1 inline-flex items-center gap-1.5 text-ink">
                  <span className="link-draw">{host(social.href)}</span>
                  <ArrowUpRight className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </ExternalLink>
              </div>
            ))}
          </Terminal>
        </div>
      </div>
    </section>
  );
}
