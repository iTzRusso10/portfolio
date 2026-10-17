/** Pointer/touch state of one core canvas, written by the DOM wrapper and read by the render loop. */
export interface CoreInput {
  /** Position in the canvas, normalised to -1..1 (y up). */
  x: number;
  y: number;
  active: boolean;
  /** performance.now() of the last tap/click, in ms. */
  pulseAt: number;
}

export const createCoreInput = (): CoreInput => ({ x: 0, y: 0, active: false, pulseAt: -1e9 });
