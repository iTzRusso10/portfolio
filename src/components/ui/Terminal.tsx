import type { HTMLAttributes, ReactNode } from "react";
import { Panel3D } from "./Panel3D";

interface TerminalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  /** Right side of the title bar, e.g. a language or status. */
  meta?: ReactNode;
  bodyClassName?: string;
  children: ReactNode;
}

/** A glass terminal / editor window floating in 3D: the building block of every section. */
export function Terminal({ title, meta, bodyClassName = "p-5", children, ...rest }: TerminalProps) {
  return (
    <Panel3D {...rest}>
      <div className="term">
        <div className="term-bar" aria-hidden="true">
          <span className="term-dots">
            <span />
            <span />
            <span />
          </span>
          <span className="truncate">{title}</span>
          {meta && <span className="ml-auto shrink-0">{meta}</span>}
        </div>
        <div className={bodyClassName}>{children}</div>
      </div>
    </Panel3D>
  );
}
