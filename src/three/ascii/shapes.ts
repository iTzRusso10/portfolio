import {
  Curve,
  Group,
  TubeGeometry,
  Vector3,
  IcosahedronGeometry,
  OctahedronGeometry,
  Mesh,
  SphereGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  type BufferGeometry,
  type Material,
} from "three";
import type { Quality } from "../quality";

export type AsciiShape = "trefoil" | "cinquefoil" | "layers" | "geodesic" | "agents" | "atom" | "donut";

export interface ShapeRig {
  group: Group;
  /** Approximate outer radius, used to fit the shape in its canvas. */
  extent: number;
  /** Axis of the slow continuous spin: "z" keeps flat shapes readable, "y" shows depth. */
  spin: "y" | "z";
  /** Base tilt so the shape reads well from the front. */
  tilt: [number, number];
  /** How much the surface ripples and bulges toward the pointer (1 = liquid knot, ~0 = rigid solids). */
  deform: number;
  /** Per-frame animation of the parts, `time` in seconds. */
  update?: (time: number) => void;
  dispose: () => void;
}

function rig(
  parts: { geometry: BufferGeometry; mesh: Mesh }[],
  extent: number,
  spin: "y" | "z",
  tilt: [number, number],
  update?: (time: number) => void,
  deform = 0.15,
): ShapeRig {
  const group = new Group();
  parts.forEach((p) => group.add(p.mesh));
  const geometries = new Set(parts.map((p) => p.geometry));
  return { group, extent, spin, tilt, deform, update, dispose: () => geometries.forEach((g) => g.dispose()) };
}

/** Closed ellipse in the XY plane, as a path for a tube of even thickness. */
class Ellipse extends Curve<Vector3> {
  constructor(
    private readonly rx: number,
    private readonly ry: number,
  ) {
    super();
  }
  override getPoint(t: number, target = new Vector3()) {
    const a = t * Math.PI * 2;
    return target.set(Math.cos(a) * this.rx, Math.sin(a) * this.ry, 0);
  }
}

const part = (geometry: BufferGeometry, material: Material) => ({ geometry, mesh: new Mesh(geometry, material) });

/** Builds one of the ASCII scene's objects. All parts share the luminance material. */
export function buildShape(shape: AsciiShape, material: Material, quality: Quality): ShapeRig {
  const [tubular, radial] = quality.segments;

  switch (shape) {
    case "donut": {
      // A nod to donut.c, the classic spinning ASCII torus.
      return rig([part(new TorusGeometry(1, 0.48, 28, 72), material)], 1.5, "y", [0.6, 0], undefined, 0.05);
    }
    case "layers": {
      // Four stacked rings, like the layers of an interface; they drift apart and back as they turn.
      const geometry = new TorusGeometry(1.1, 0.12, 12, 96);
      const rings = Array.from({ length: 4 }, () => part(geometry, material));
      return rig(rings, 1.7, "y", [0.55, 0], (time) => {
        const spread = 0.62 + Math.sin(time * 0.7) * 0.14;
        rings.forEach(({ mesh }, i) => {
          mesh.position.y = (i - 1.5) * spread;
          mesh.rotation.set(Math.PI / 2 + Math.sin(time * 0.8 + i * 0.9) * 0.12, 0, 0);
          mesh.scale.setScalar(1 - Math.abs(i - 1.5) * 0.08);
        });
      });
    }
    case "geodesic": {
      // A faceted core with modules in orbit around it: a system of parts.
      const core = part(new IcosahedronGeometry(1.05, 0), material);
      const moduleGeometry = new OctahedronGeometry(0.2, 0);
      const modules = Array.from({ length: 8 }, () => part(moduleGeometry, material));
      return rig(
        [core, ...modules],
        1.55,
        "y",
        [0.35, 0],
        (time) => {
          core.mesh.rotation.set(time * 0.4, -time * 0.6, 0);
          modules.forEach(({ mesh }, i) => {
            const a = -time * 0.7 + (i / modules.length) * Math.PI * 2;
            mesh.position.set(Math.cos(a) * 1.55, Math.sin(a * 2 + time) * 0.18, Math.sin(a) * 1.55);
            mesh.rotation.set(time * 1.5 + i, time + i, 0);
          });
        },
        0.2,
      );
    }
    case "agents": {
      // An orchestrator with five agents in orbit, and the orbit itself.
      const sphere = new SphereGeometry(1, 32, 24);
      const hub = part(sphere, material);
      hub.mesh.scale.setScalar(0.55);
      const ring = part(new TorusGeometry(1.3, 0.07, 10, 140), material);
      ring.mesh.rotation.x = Math.PI / 2;
      const agents = Array.from({ length: 5 }, () => part(sphere, material));
      return rig([hub, ring, ...agents], 1.6, "y", [0.42, 0], (time) => {
        hub.mesh.scale.setScalar(0.55 + Math.sin(time * 2.2) * 0.025);
        agents.forEach(({ mesh }, i) => {
          const a = time * 0.55 + (i / agents.length) * Math.PI * 2;
          mesh.position.set(Math.cos(a) * 1.3, Math.sin(time * 1.4 + i) * 0.06, Math.sin(a) * 1.3);
          mesh.scale.setScalar(0.27 + Math.sin(time * 2 + i * 1.7) * 0.025);
        });
      });
    }
    case "atom": {
      // The React atom: three orbits, a nucleus, an electron on each orbit.
      const nucleus = part(new SphereGeometry(0.36, 32, 24), material);
      const orbitGeometry = new TubeGeometry(new Ellipse(1.4, 0.55), 160, 0.1, 10, true);
      const electronGeometry = new SphereGeometry(0.17, 16, 12);
      const orbits = [0, 1, 2].map((i) => {
        const pivot = new Group();
        pivot.rotation.z = (i * Math.PI) / 3;
        const orbit = new Mesh(orbitGeometry, material);
        const electron = new Mesh(electronGeometry, material);
        pivot.add(orbit, electron);
        return { pivot, electron };
      });
      const r = rig([nucleus], 1.45, "z", [0.15, 0], (time) => {
        orbits.forEach(({ electron }, i) => {
          const a = time * (1.1 + i * 0.25) + i * 2;
          electron.position.set(Math.cos(a) * 1.4, Math.sin(a) * 0.55, 0);
        });
      });
      orbits.forEach(({ pivot }) => r.group.add(pivot));
      const dispose = r.dispose;
      r.dispose = () => {
        dispose();
        orbitGeometry.dispose();
        electronGeometry.dispose();
      };
      return r;
    }
    default: {
      const [p, q] = shape === "trefoil" ? [2, 3] : [2, 5];
      return rig([part(new TorusKnotGeometry(1, 0.22, tubular, radial, p, q), material)], 1.5, "z", [0, 0], undefined, 1);
    }
  }
}
