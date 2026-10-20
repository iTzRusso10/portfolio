import { contactCopy, site } from "../../content/site";
import { ArrowUp } from "../ui/Icons";

export function Footer() {
  return (
    <footer className="relative">
      <div className="shell above-scene">
        <div className="h-px bg-line/15" />
        <div className="flex flex-col gap-4 py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.role}
          </p>
          <p>{contactCopy.credits}</p>
          <a href="#intro" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-ink">
            Torna su <ArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
