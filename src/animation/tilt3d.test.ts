import { describe, expect, it } from "vitest";
import { scrollTilt, wallTurn } from "./tilt3d";

describe("panel scroll tilt", () => {
  it("is flat at the centre of the viewport", () => {
    expect(scrollTilt(400, 800)).toEqual({ rx: 0, tz: -0 });
  });

  it("leans back below the centre and forward above it, symmetrically", () => {
    const below = scrollTilt(700, 800);
    const above = scrollTilt(100, 800);
    expect(below.rx).toBeGreaterThan(0);
    expect(above.rx).toBeCloseTo(-below.rx, 6);
    expect(below.tz).toBeLessThan(0);
  });

  it("is capped far from the viewport", () => {
    expect(scrollTilt(10_000, 800).rx).toBe(18);
    expect(scrollTilt(10_000, 800, 0.5).rx).toBe(9);
  });
});

describe("curved wall", () => {
  it("turns side panels toward the centre", () => {
    expect(wallTurn(640, 1280)).toBeCloseTo(0, 6);
    expect(wallTurn(200, 1280)).toBeGreaterThan(0);
    expect(wallTurn(1080, 1280)).toBeLessThan(0);
  });
});
