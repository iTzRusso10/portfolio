import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Mesh, NearestFilter, PlaneGeometry, Quaternion, Scene, Vector3, WebGLRenderTarget, type Texture } from "three";
import { scrollState } from "../../animation/scroll";
import { clamp, damp } from "../../utils/math";
import type { CoreInput } from "../coreInput";
import type { Quality } from "../quality";
import { createGlyphAtlas } from "./glyphs";
import { createAsciiMaterial, createObjectMaterial } from "./materials";
import { buildShape, type AsciiShape } from "./shapes";

export type { AsciiShape };
/**
 * "hero"/"contact": full-section canvas, shape beside the text on desktop.
 * "box": shape centred in its own box.
 * "scroll": centred, and its rotation is driven by the scroll position itself.
 */
export type AsciiPlacement = "hero" | "contact" | "box" | "scroll";

const CAMERA_DISTANCE = 7;
const CAMERA_FOV = 35;
const INTRO_SECONDS = 1.3;

const pointerDir = new Vector3();
const inverse = new Quaternion();

interface RendererProps {
  atlas: Texture;
  quality: Quality;
  input: CoreInput;
  shape: AsciiShape;
  placement: AsciiPlacement;
  reducedMotion: boolean;
  running: boolean;
  onReady: () => void;
}

/** Renders the shape into a one-texel-per-cell target, then draws that target as glyphs. */
function AsciiRenderer({ atlas, quality, input, shape, placement, reducedMotion, running, onReady }: RendererProps) {
  const camera = useThree((s) => s.camera);
  const resources = useMemo(() => {
    const objectMaterial = createObjectMaterial();
    const shapeRig = buildShape(shape, objectMaterial, quality);
    const target = new WebGLRenderTarget(1, 1, { minFilter: NearestFilter, magFilter: NearestFilter });
    const asciiMaterial = createAsciiMaterial(atlas, target.texture);
    const quadGeometry = new PlaneGeometry(2, 2);

    const objectScene = new Scene();
    const group = shapeRig.group;
    objectScene.add(group);
    const screenScene = new Scene();
    const quad = new Mesh(quadGeometry, asciiMaterial);
    quad.frustumCulled = false;
    screenScene.add(quad);
    return { shapeRig, objectMaterial, target, asciiMaterial, quadGeometry, objectScene, screenScene, group };
  }, [atlas, quality, shape]);

  useEffect(
    () => () => {
      resources.shapeRig.dispose();
      resources.objectMaterial.dispose();
      resources.target.dispose();
      resources.asciiMaterial.dispose();
      resources.quadGeometry.dispose();
    },
    [resources],
  );

  const motion = useRef({
    start: -1,
    frames: 0,
    tiltX: 0,
    tiltY: 0,
    strength: 0,
    lastPulse: input.pulseAt,
    pulseStart: -100,
    glitch: 0,
    nextGlitch: 5,
    spin: 0,
    agitation: 0,
    scrollAngle: 0,
  });

  // Every time the canvas comes back on screen, the shape materialises again.
  useEffect(() => {
    if (running) motion.current.start = -1;
  }, [running]);

  useFrame((state, delta) => {
    const { gl, size } = state;
    const m = motion.current;
    const dt = Math.min(delta, 0.1);
    const elapsed = state.clock.elapsedTime;
    const time = reducedMotion ? 0 : elapsed;
    if (m.start < 0) m.start = elapsed;

    // One render-target texel per character cell; the small windows use a denser grid.
    const density = placement === "scroll" ? 0.62 : placement === "box" ? 0.78 : 1;
    const cols = Math.max(1, Math.ceil(size.width / (quality.cell.width * density)));
    const rows = Math.max(1, Math.ceil(size.height / (quality.cell.height * density)));
    if (resources.target.width !== cols || resources.target.height !== rows) resources.target.setSize(cols, rows);

    // Placement: right of the text on wide screens, above it on narrow ones.
    const halfH = Math.tan(((CAMERA_FOV / 2) * Math.PI) / 180) * CAMERA_DISTANCE;
    const aspect = size.width / Math.max(1, size.height);
    const halfW = halfH * aspect;
    const compact = placement === "box" || placement === "scroll" || size.width < 1024 || aspect < 0.9;
    const g = resources.group;
    const { extent, spin, tilt, update } = resources.shapeRig;
    if (compact) {
      // The canvas is its own box: centre and fit.
      g.position.set(0, 0, 0);
      g.scale.setScalar((Math.min(halfW, halfH) * 0.82) / extent);
    } else {
      g.position.set(halfW * (placement === "hero" ? 0.47 : 0.5), 0, 0);
      g.scale.setScalar(Math.min(halfW * 0.38, halfH * 0.72) / extent);
    }
    const intro = reducedMotion ? 1 : clamp((elapsed - m.start) / INTRO_SECONDS);

    // Scrolling stirs the shapes: they spin faster and flicker, then settle when the page stops.
    const sinceScroll = performance.now() - scrollState.velocityAt;
    const speed = sinceScroll < 150 ? Math.min(Math.abs(scrollState.velocity) / 2500, 1) : 0;
    m.agitation = reducedMotion ? 0 : damp(m.agitation, speed, speed > m.agitation ? 8 : 2.5, dt);
    m.spin += dt * (0.2 + m.agitation * 2.4) * (reducedMotion ? 0 : 1);

    m.tiltX = damp(m.tiltX, input.active ? -input.y * 0.5 : 0, 3, dt);
    m.tiltY = damp(m.tiltY, input.active ? input.x * 0.7 : 0, 3, dt);
    const wobbleX = Math.sin(time * 0.35) * 0.3;
    const wobbleY = Math.sin(time * 0.27) * 0.4;
    if (placement === "scroll") {
      // Rotation follows the page: scroll down and it turns forward, scroll up and it turns back.
      const target = scrollState.scrollY * 0.0032;
      m.scrollAngle = reducedMotion ? target : damp(m.scrollAngle, target, 9, dt);
      g.rotation.set(0.6 + m.scrollAngle * 0.55, m.scrollAngle, 0.25 + m.tiltY * 0.3);
    } else if (spin === "z") g.rotation.set(tilt[0] + wobbleX + m.tiltX, tilt[1] + wobbleY + m.tiltY, m.spin);
    else g.rotation.set(tilt[0] + wobbleX * 0.5 + m.tiltX, m.spin * 1.4 + m.tiltY, tilt[1] + wobbleY * 0.3);
    update?.(time);
    g.updateMatrixWorld();

    // Pointer direction in the knot's own space, so the bulge follows the cursor.
    pointerDir.set(input.x * 1.2, input.y * 1.2, 0.9).normalize();
    pointerDir.applyQuaternion(inverse.copy(g.quaternion).invert());
    m.strength = damp(m.strength, input.active && !reducedMotion ? 1 : 0, 4, dt);

    if (input.pulseAt !== m.lastPulse) {
      m.lastPulse = input.pulseAt;
      m.pulseStart = elapsed;
      m.glitch = 1;
    }
    // Now and then the terminal hiccups on its own.
    if (!reducedMotion && elapsed > m.nextGlitch) {
      m.glitch = Math.max(m.glitch, 0.45);
      m.nextGlitch = elapsed + 4 + Math.random() * 5;
    }
    m.glitch = reducedMotion ? 0 : Math.max(Math.max(0, m.glitch - dt * 3.2), m.agitation * 0.22);

    const object = resources.objectMaterial.uniforms;
    object.uTime!.value = time;
    (object.uPointer!.value as Vector3).copy(pointerDir);
    object.uPointerStrength!.value = m.strength;
    object.uDeform!.value = resources.shapeRig.deform;
    object.uPulseAge!.value = elapsed - m.pulseStart;
    (object.uLight!.value as Vector3).set(-0.4 + input.x * 0.5, 0.6 + input.y * 0.4, 0.7);

    const ascii = resources.asciiMaterial.uniforms;
    (ascii.uCells!.value as { set: (x: number, y: number) => void }).set(cols, rows);
    ascii.uTime!.value = reducedMotion ? 0 : elapsed;
    ascii.uIntro!.value = intro;
    ascii.uGlitch!.value = m.glitch;

    gl.setClearColor(0x000000, 0);
    gl.setRenderTarget(resources.target);
    gl.clear();
    gl.render(resources.objectScene, camera);
    gl.setRenderTarget(null);
    gl.clear();
    gl.render(resources.screenScene, camera);

    m.frames += 1;
    if (m.frames === 2) onReady();
  }, 1);

  return null;
}

export interface AsciiSceneProps {
  quality: Quality;
  input: CoreInput;
  shape: AsciiShape;
  placement: AsciiPlacement;
  reducedMotion: boolean;
  /** False while the canvas is off screen: the render loop stops entirely. */
  running: boolean;
  onReady: () => void;
  onContextLost: () => void;
}

export default function AsciiScene({ quality, running, reducedMotion, onContextLost, ...props }: AsciiSceneProps) {
  const [atlas, setAtlas] = useState<Texture | null>(null);
  useEffect(() => {
    let texture: Texture | null = null;
    let cancelled = false;
    void createGlyphAtlas().then((t) => {
      if (cancelled) t.dispose();
      else setAtlas((texture = t));
    });
    return () => {
      cancelled = true;
      texture?.dispose();
    };
  }, []);

  return (
    <Canvas
      dpr={[quality.dpr[0], Math.min(window.devicePixelRatio || 1, quality.dpr[1])]}
      frameloop={reducedMotion ? "demand" : running ? "always" : "never"}
      camera={{ fov: CAMERA_FOV, position: [0, 0, CAMERA_DISTANCE], near: 0.1, far: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      events={() => ({ enabled: false, priority: 0 })}
      onCreated={({ gl }) => {
        gl.autoClear = false;
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onContextLost();
        });
      }}
      aria-hidden="true"
    >
      {atlas && (
        <AsciiRenderer atlas={atlas} quality={quality} reducedMotion={reducedMotion} running={running} {...props} />
      )}
    </Canvas>
  );
}
