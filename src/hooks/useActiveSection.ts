import { useEffect, useState } from "react";
import { scrollState, subscribeScroll } from "../animation/scroll";

/** Index of the chapter currently dominating the viewport. Re-renders only when it changes. */
export function useActiveSection() {
  const [active, setActive] = useState(0);
  useEffect(
    () =>
      subscribeScroll(() => {
        const next = Math.round(scrollState.value);
        setActive((current) => (current === next ? current : next));
      }),
    [],
  );
  return active;
}
