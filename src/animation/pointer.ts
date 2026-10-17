/** Normalised pointer position (-1..1, y up), written by a single window listener. */
export const pointerState = { x: 0, y: 0, active: false };

export function startPointerTracking() {
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1);
    pointerState.active = true;
  };
  const onLeave = () => {
    pointerState.active = false;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  return () => {
    window.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeave);
  };
}
