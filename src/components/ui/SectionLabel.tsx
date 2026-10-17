import { sectionById, type SectionId } from "../../content/sections";
import { ScrambleText } from "./ScrambleText";

interface SectionLabelProps {
  section: SectionId;
  className?: string;
}

export function SectionLabel({ section, className = "" }: SectionLabelProps) {
  const { index, label } = sectionById(section);
  return (
    <p className={`label flex items-center gap-3 text-mute ${className}`} data-reveal>
      <span className="text-[rgb(var(--c-line))]">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      <ScrambleText text={label} />
    </p>
  );
}
