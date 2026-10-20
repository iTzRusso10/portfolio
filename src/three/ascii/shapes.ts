import {
  BoxGeometry,
  ExtrudeGeometry,
  Group,
  Mesh,
  Path,
  Shape,
  type ShaderMaterial,
  TorusGeometry,
  TorusKnotGeometry,
  type BufferGeometry,
  type Material,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { clamp } from "../../utils/math";
import type { Quality } from "../quality";

export type AsciiShape = "trefoil" | "cinquefoil" | "screen" | "gears" | "donut";

export interface ShapeRig {
  group: Group;
  /** Approximate outer radius, used to fit the shape in its canvas. */
  extent: number;
  /**
   * Axis of the slow continuous spin: "z" keeps flat shapes readable, "y" shows depth,
   * "none" keeps the front facing the viewer (the parts move on their own).
   */
  spin: "y" | "z" | "none";
  /** Base tilt so the shape reads well from the front. */
  tilt: [number, number];
  /** How much the surface ripples and bulges toward the pointer (1 = liquid knot, ~0 = rigid solids). */
  deform: number;
  /**
   * Per-frame animation of the parts. `time` in seconds; `spin` is the accumulated
   * spin angle, which runs faster while the page is being scrolled.
   */
  update?: (time: number, spin: number) => void;
  dispose: () => void;
}

function rig(
  parts: { geometry: BufferGeometry; mesh: Mesh }[],
  extent: number,
  spin: ShapeRig["spin"],
  tilt: [number, number],
  update?: ShapeRig["update"],
  deform = 0.15,
): ShapeRig {
  const group = new Group();
  parts.forEach((p) => group.add(p.mesh));
  const geometries = new Set(parts.map((p) => p.geometry));
  return { group, extent, spin, tilt, deform, update, dispose: () => geometries.forEach((g) => g.dispose()) };
}

/**
 * One mesh of a shape. `gain` scales its brightness: every mesh sets it on the
 * shared material right before it is drawn, so parts of one object can differ
 * (a dim screen with bright blocks on it).
 */
function part(geometry: BufferGeometry, material: Material, gain = 1) {
  const mesh = new Mesh(geometry, material);
  mesh.onBeforeRender = () => {
    const shader = material as ShaderMaterial;
    const uniform = shader.uniforms?.uGain;
    if (!uniform || uniform.value === gain) return;
    uniform.value = gain;
    shader.uniformsNeedUpdate = true;
  };
  return { geometry, mesh };
}

/** Overshoots a little and settles: blocks pop into place. */
const popIn = (t: number) => {
  const x = clamp(t) - 1;
  return 1 + 2.4 * x * x * x + 1.4 * x * x;
};

/** A spur gear in the XY plane, centred on the origin, extruded along Z. */
function gearGeometry(teeth: number, pitch: number, depth: number, holes: number) {
  const module = (2 * pitch) / teeth;
  const outer = pitch + module * 0.9;
  const root = pitch - module * 1.1;
  const step = (Math.PI * 2) / teeth;
  const shape = new Shape();
  const at = (r: number, a: number) => [Math.cos(a) * r, Math.sin(a) * r] as const;
  shape.moveTo(...at(root, 0));
  for (let k = 0; k < teeth; k++) {
    const a = k * step;
    shape.lineTo(...at(root, a + step * 0.15));
    shape.lineTo(...at(outer, a + step * 0.3));
    shape.lineTo(...at(outer, a + step * 0.6));
    shape.lineTo(...at(root, a + step * 0.75));
    shape.lineTo(...at(root, a + step));
  }
  const axle = new Path();
  axle.absarc(0, 0, pitch * 0.22, 0, Math.PI * 2, true);
  shape.holes.push(axle);
  for (let i = 0; i < holes; i++) {
    const a = (i / holes) * Math.PI * 2;
    const hole = new Path();
    hole.absarc(Math.cos(a) * pitch * 0.5, Math.sin(a) * pitch * 0.5, pitch * 0.17, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 2,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

/** Builds one of the ASCII scene's objects. All parts share the luminance material. */
export function buildShape(shape: AsciiShape, material: Material, quality: Quality): ShapeRig {
  const [tubular, radial] = quality.segments;

  switch (shape) {
    case "donut": {
      // A nod to donut.c, the classic spinning ASCII torus.
      return rig([part(new TorusGeometry(1, 0.48, 28, 72), material)], 1.5, "y", [0.6, 0], undefined, 0.05);
    }
    case "screen": {
      // A monitor on its stand; the blocks of a web page pop up on it one after another, then start over.
      const body = part(new RoundedBoxGeometry(2.7, 1.7, 0.16, 3, 0.08), material, 0.28);
      const neck = part(new BoxGeometry(0.22, 0.44, 0.12), material, 0.75);
      neck.mesh.position.set(0, -1.06, -0.04);
      const foot = part(new RoundedBoxGeometry(1.05, 0.08, 0.5, 2, 0.03), material, 0.75);
      foot.mesh.position.set(0, -1.3, 0);
      // [width, height, x, y] of each block of the page, in reading order.
      const layout: [number, number, number, number][] = [
        [2.3, 0.16, 0, 0.6],
        [1.25, 0.3, -0.5, 0.22],
        [0.5, 0.16, -0.87, -0.12],
        [0.78, 0.62, 0.72, 0.06],
        [0.68, 0.32, -0.76, -0.52],
        [0.68, 0.32, 0, -0.52],
        [0.68, 0.32, 0.76, -0.52],
      ];
      const blockGeometry = new BoxGeometry(1, 1, 1);
      const blocks = layout.map(([w, h, x, y]) => {
        const block = part(blockGeometry, material);
        block.mesh.position.set(x, y, 0.16);
        return { ...block, w, h };
      });
      const CYCLE = 9;
      return rig([body, neck, foot, ...blocks], 1.5, "none", [0.12, -0.2], (time) => {
        const t = time % CYCLE;
        // Everything shrinks away together at the end of the cycle.
        const out = 1 - clamp((t - (CYCLE - 0.6)) / 0.5);
        blocks.forEach(({ mesh, w, h }, i) => {
          const s = Math.max(0.001, popIn((t - 0.4 - i * 0.45) / 0.5) * out);
          mesh.scale.set(w * s, h * s, 0.18 * s);
        });
      });
    }
    case "gears": {
      // Two meshing gears: the work that runs on its own. They turn faster while the page scrolls.
      const big = { teeth: 10, pitch: 0.92 };
      const small = { teeth: 6, pitch: 0.92 * (6 / 10) };
      const a = part(gearGeometry(big.teeth, big.pitch, 0.34, 4), material);
      const b = part(gearGeometry(small.teeth, small.pitch, 0.34, 0), material, 0.55);
      const contact = -0.45;
      const distance = big.pitch + small.pitch;
      a.mesh.position.set(-0.5, 0.18, 0);
      b.mesh.position.set(-0.5 + Math.cos(contact) * distance, 0.18 + Math.sin(contact) * distance, 0);
      // Phase so that a tooth of the big gear always sits in a gap of the small one along the contact line.
      const stepA = (Math.PI * 2) / big.teeth;
      const stepB = (Math.PI * 2) / small.teeth;
      const ratio = big.teeth / small.teeth;
      const thetaAtContact = contact - 0.45 * stepA;
      const phase = contact + Math.PI - 0.95 * stepB + ratio * thetaAtContact;
      return rig(
        [a, b],
        1.6,
        "none",
        [0.12, -0.14],
        (_time, spin) => {
          const theta = spin * 1.6;
          a.mesh.rotation.z = theta;
          b.mesh.rotation.z = -ratio * theta + phase;
        },
        0.04,
      );
    }
    default: {
      const [p, q] = shape === "trefoil" ? [2, 3] : [2, 5];
      return rig([part(new TorusKnotGeometry(1, 0.22, tubular, radial, p, q), material)], 1.5, "z", [0, 0], undefined, 1);
    }
  }
}
