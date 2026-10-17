import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { registerPanel } from "../../animation/tilt3d";

interface Panel3DProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Floats its child in 3D: leans with the scroll and toward the pointer, with
 * two glass plates behind it for depth. Layout and reveal attributes go on
 * the outer element; the child should fill the stage (e.g. a `.term`).
 */
export function Panel3D({ className = "", children, ...rest }: Panel3DProps) {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => (stage.current ? registerPanel(stage.current) : undefined), []);

  return (
    <div className={`term-3d ${className}`} {...rest}>
      <div ref={stage} className="term-stage">
        <span aria-hidden="true" className="term-plate" />
        <span aria-hidden="true" className="term-plate term-plate-far" />
        {children}
      </div>
    </div>
  );
}
