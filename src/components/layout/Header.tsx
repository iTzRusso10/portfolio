import { useEffect, useRef, useState } from "react";
import { scrollState, subscribeScroll } from "../../animation/scroll";
import { sections } from "../../content/sections";
import { site } from "../../content/site";
import { useActiveSection } from "../../hooks/useActiveSection";

const chapters = sections.slice(1);

export function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);

  useEffect(
    () =>
      subscribeScroll(() => {
        if (header.current) header.current.dataset.scrolled = scrollState.scrollY > 24 ? "true" : "false";
      }),
    [],
  );

  useEffect(() => {
    if (!open) return;
    firstMenuLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={header}
      data-scrolled="false"
      data-open={open}
      className="group/header fixed inset-x-0 top-0 z-50 text-ink transition-colors duration-500 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-night/75 before:opacity-0 before:backdrop-blur-md before:transition-opacity before:duration-500 data-[scrolled=true]:before:opacity-100 data-[open=true]:before:opacity-0"
    >
      <a
        href="#main"
        className="label absolute left-4 top-3 -translate-y-24 rounded-full bg-ink px-4 py-2 text-night focus:translate-y-0"
      >
        Salta al contenuto
      </a>
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#intro" className="relative z-10 flex items-center gap-3" aria-label={`${site.name} — torna all'inizio`}>
          <span
            aria-hidden="true"
            className="grid h-9 place-items-center rounded-md border border-ink/20 bg-night/60 px-2 font-mono text-[0.75rem] font-semibold"
          >
            <span>
              <span className="text-[rgb(var(--c-glow))]">&lt;</span>GR<span className="text-[rgb(var(--c-glow))]">/&gt;</span>
            </span>
          </span>
          <span className="hidden font-mono text-[0.8rem] xs:block">
            <span className="text-mute">~/</span>
            {site.name.toLowerCase().replace(" ", ".")}
          </span>
        </a>

        <nav aria-label="Sezioni" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {chapters.map((s, i) => {
              const isActive = active === i + 1;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className="group flex items-center gap-2 rounded-md px-3 py-2 font-mono text-[0.8rem] transition-[opacity,background-color] hover:bg-ink/5 hover:opacity-100 aria-[current]:bg-ink/[0.07] aria-[current]:opacity-100 [&:not([aria-current])]:opacity-60"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full bg-signal transition-transform duration-500 ease-out ${isActive ? "scale-100" : "scale-0"}`}
                    />
                    <span className="text-mute">{s.index}</span>
                    <span>{s.label.toLowerCase()}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="label relative z-10 flex items-center gap-3 rounded-full border border-current px-4 py-2.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? "Chiudi" : "Menu"}</span>
          <span aria-hidden="true" className="relative block h-2 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 bg-night px-[var(--gutter)] pb-10 pt-[calc(var(--header-h)+2rem)] text-ink md:hidden"
      >
        <nav aria-label="Menu principale" className="flex h-full flex-col justify-between">
          <ol className="space-y-2">
            {chapters.map((s, i) => (
              <li key={s.id}>
                <a
                  ref={i === 0 ? firstMenuLink : undefined}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-1"
                >
                  <span className="label text-mute">{s.index}</span>
                  <span className="type-display text-[clamp(2.75rem,13vw,4.5rem)]">{s.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <ul className="flex gap-6">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="label link-draw">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
