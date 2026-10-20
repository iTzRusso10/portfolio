import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactCopy, site } from "../../content/site";
import { AsciiCanvas } from "../ui/AsciiCanvas";
import { Card3D } from "../ui/Card3D";
import { ExternalLink } from "../ui/ExternalLink";
import { ArrowRight, ArrowUpRight, ChatIcon, CopyIcon, InstagramIcon, LinkedInIcon, MailIcon } from "../ui/Icons";
import { JumpText } from "../ui/JumpText";

const SOCIAL_ICONS: Record<string, typeof InstagramIcon> = { Instagram: InstagramIcon, LinkedIn: LinkedInIcon };

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
    <button type="button" onClick={copy} className="inline-flex items-center gap-2 text-sm font-semibold text-mute transition-colors hover:text-ink">
      <CopyIcon />
      <span aria-live="polite">{copied ? contactCopy.copiedLabel : contactCopy.copyLabel}</span>
    </button>
  );
}

/** Links carrying data-topic (e.g. "Voglio il mio sito") preselect the subject of the form. */
function useTopicLinks(setTopic: (topic: string) => void) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLElement>("[data-topic]");
      if (link?.dataset.topic) setTopic(link.dataset.topic);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [setTopic]);
}

/** No backend: the form opens the visitor's mail app with the message already written. */
function ContactForm({ email }: { email: string }) {
  const [topic, setTopic] = useState<string>(contactCopy.topics[0]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  useTopicLinks(setTopic);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const subject = `${topic} — ${name.trim() || "richiesta dal sito"}`;
    const body = `Ciao Giuseppe,\n\n${message.trim()}\n\n${name.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={submit} className="space-y-5" data-no-jump>
      <fieldset>
        <legend className="text-sm font-semibold">Di cosa hai bisogno?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {contactCopy.topics.map((t) => (
            <label key={t}>
              <input
                type="radio"
                name="topic"
                value={t}
                checked={topic === t}
                onChange={() => setTopic(t)}
                className="peer sr-only"
              />
              <span className="chip">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="text-sm font-semibold">Come ti chiami?</span>
        <input
          className="field mt-2"
          name="name"
          autoComplete="name"
          placeholder="Nome e attività"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Raccontami in breve</span>
        <textarea
          className="field mt-2 min-h-[7.5rem] resize-y"
          name="message"
          required
          placeholder="Es. ho un negozio di abbigliamento e vorrei un sito con le foto dei prodotti e i contatti."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button type="submit" className="btn btn-solid">
          {contactCopy.submitLabel}
          <ArrowRight className="btn-arrow" />
        </button>
        <p className="text-xs text-mute">{contactCopy.formNote}</p>
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contatti" aria-labelledby="contatti-title" className="relative py-16 sm:py-[12vh] lg:py-[14vh]">
      <div className="shell above-scene grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6 lg:self-center">
          <p className="kicker" data-reveal>
            {contactCopy.kicker}
          </p>
          <JumpText id="contatti-title" lines={contactCopy.title} stagger={24} className="type-title mt-6" />
          <JumpText
            as="p"
            unit="word"
            lines={[contactCopy.intro]}
            delay={300}
            stagger={18}
            className="mt-6 max-w-[28rem] text-[1.05rem] leading-relaxed text-mute"
          />
        </div>
        <AsciiCanvas shape="cinquefoil" placement="box" className="relative -my-4 h-56 sm:h-72 lg:col-span-6 lg:my-0 lg:h-[24rem]" />

        <ul className="space-y-5 lg:col-span-5 lg:pt-4" data-reveal>
          {site.whatsapp && (
            <li>
              <ExternalLink
                href={`https://wa.me/${site.whatsapp}`}
                className="btn bg-[#25D366] text-inchiostro shadow-[0_4px_0_rgb(18_140_67)]"
              >
                <ChatIcon />
                {contactCopy.whatsappLabel}
              </ExternalLink>
            </li>
          )}
          {site.email && (
            <li>
              <a href={`mailto:${site.email}`} className="group inline-flex max-w-full items-center gap-3 break-all text-lg font-bold sm:text-xl">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-viola text-lg text-bianco">
                  <MailIcon />
                </span>
                <span className="link-draw">{site.email}</span>
              </a>
              <div className="ml-14 mt-1">
                <CopyEmail email={site.email} />
              </div>
            </li>
          )}
          {site.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.label] ?? ArrowUpRight;
            return (
              <li key={social.label}>
                <ExternalLink href={social.href} className="group inline-flex items-center gap-3 text-lg font-bold">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line/20 text-lg text-viola-chiaro transition-colors group-hover:border-viola-chiaro">
                    <Icon />
                  </span>
                  <span>
                    <span className="link-draw">{social.handle}</span>
                    <span className="ml-2 text-sm font-normal text-mute">{social.label}</span>
                  </span>
                </ExternalLink>
              </li>
            );
          })}
          <li className="pt-2 text-sm text-mute">{site.location}</li>
        </ul>

        {site.email && (
          <Card3D className="lg:col-span-7" bodyClassName="p-6 sm:p-8 lg:p-10" data-reveal>
            <h3 className="text-2xl font-bold">{contactCopy.formTitle}</h3>
            <div className="mt-6">
              <ContactForm email={site.email} />
            </div>
          </Card3D>
        )}
      </div>
    </section>
  );
}
