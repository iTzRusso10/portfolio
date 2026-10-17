import { contactCopy, site } from "../../content/site";
import { ArrowUp } from "../ui/Icons";

export function Footer() {
  return (
    <footer className="relative lg:pb-7">
      <div className="shell above-scene">
        <div className="hairline" />
        <div className="label flex flex-col gap-4 py-8 text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="normal-case tracking-normal">{contactCopy.credits}</p>
          <a href="#intro" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
            Torna su <ArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
