import { Fragment, type CSSProperties } from "react";

interface TokenStreamProps {
  text: string;
  className?: string;
  delay?: number;
}

/** Paragraph whose words appear one by one, like tokens streamed by a language model, ending on a caret. */
export function TokenStream({ text, className = "", delay = 0 }: TokenStreamProps) {
  const tokens = text.split(" ");
  return (
    <p className={className} data-reveal="tokens" style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {tokens.map((token, i) => (
        <Fragment key={i}>
          <span className="token" style={{ "--i": i } as CSSProperties}>
            {token}
          </span>
          {i < tokens.length - 1 && " "}
        </Fragment>
      ))}
      <span aria-hidden="true" className="token token-caret" style={{ "--i": tokens.length } as CSSProperties} />
    </p>
  );
}
