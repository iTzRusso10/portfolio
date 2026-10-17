import type { AsciiShape } from "../../three/ascii/shapes";
import { AsciiCanvas } from "./AsciiCanvas";
import { Terminal } from "./Terminal";

interface AsciiWindowProps {
  shape: AsciiShape;
  /** File name shown in the title bar, e.g. "strati.obj". */
  title: string;
  /** Height of the render area (Tailwind classes). */
  heightClassName?: string;
  className?: string;
}

/** A terminal window whose body is a live ASCII render of a 3D object. */
export function AsciiWindow({ shape, title, heightClassName = "h-72 lg:h-80", className = "" }: AsciiWindowProps) {
  return (
    <Terminal
      title={title}
      meta={<span className="text-[rgb(var(--c-cyan))]">● render ascii</span>}
      className={className}
      bodyClassName="relative"
      data-reveal
    >
      <AsciiCanvas shape={shape} placement="box" className={`relative ${heightClassName}`} />
    </Terminal>
  );
}
