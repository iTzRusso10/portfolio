export interface Quality {
  tier: "high" | "low";
  /** Size of one character cell, in CSS pixels. */
  cell: { width: number; height: number };
  /** Segments of the knot geometry. */
  segments: [number, number];
  dpr: [number, number];
}

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

/** Coarse device classification. The ASCII pass is cheap, so tiers differ mostly in density. */
export function detectQuality(): Quality {
  const nav = navigator as NavigatorWithMemory;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  const low = coarse || narrow || cores <= 4 || memory <= 4;

  return low
    ? { tier: "low", cell: { width: 7, height: 11 }, segments: [160, 20], dpr: [1, 2] }
    : { tier: "high", cell: { width: 8, height: 13 }, segments: [260, 28], dpr: [1, 2] };
}

export function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
