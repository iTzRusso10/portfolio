import type { HTMLAttributes, ReactNode } from "react";
import { Panel3D } from "./Panel3D";

export type CardTone = "glass" | "white" | "screen" | "lime";

interface Card3DProps extends HTMLAttributes<HTMLDivElement> {
  /** glass: on dark sections · white: on light sections · screen: holds a 3D object · lime: the price. */
  tone?: CardTone;
  bodyClassName?: string;
  children: ReactNode;
}

/** A card floating in 3D: the building block of every section. */
export function Card3D({ tone = "glass", bodyClassName = "p-6", children, ...rest }: Card3DProps) {
  return (
    <Panel3D {...rest}>
      <div className={`card card-${tone} ${tone === "screen" ? "theme-dark" : ""}`}>
        <div className={`relative h-full ${bodyClassName}`}>{children}</div>
      </div>
    </Panel3D>
  );
}
