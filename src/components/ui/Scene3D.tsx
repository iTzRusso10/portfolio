import type { ReactNode } from "react";
import type { AsciiShape } from "../../three/ascii/shapes";
import { AsciiCanvas } from "./AsciiCanvas";
import { Card3D } from "./Card3D";

interface Scene3DProps {
  shape: AsciiShape;
  /** Height of the render area (Tailwind classes). */
  heightClassName?: string;
  className?: string;
  /** Overlaid at the bottom of the screen, e.g. a short caption. */
  children?: ReactNode;
}

/** A dark screen whose body is a live ASCII render of a 3D object. */
export function Scene3D({ shape, heightClassName = "h-72 lg:h-80", className = "", children }: Scene3DProps) {
  return (
    <Card3D tone="screen" className={className} bodyClassName="relative" data-reveal>
      <AsciiCanvas shape={shape} placement="box" className={`relative ${heightClassName}`} />
      {children && <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">{children}</div>}
    </Card3D>
  );
}
