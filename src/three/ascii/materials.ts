import { Color, ShaderMaterial, Vector2, Vector3, type Texture } from "three";
import { SIMPLEX_3D } from "../glsl/noise";
import { BINARY, GLYPH_RAMP } from "./glyphs";

/**
 * Object pass: renders the shape into a tiny render target, one texel per
 * character cell. R = luminance, G = "data band" highlight, A = coverage.
 */
export function createObjectMaterial() {
  return new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uLight: { value: new Vector3(-0.4, 0.6, 0.7) },
      uPointer: { value: new Vector3(0, 0, 1) },
      uPointerStrength: { value: 0 },
      uPulseAge: { value: 100 },
      uDeform: { value: 1 },
      // Per-mesh brightness, set from Mesh.onBeforeRender (see shapes.ts).
      uGain: { value: 1 },
    },
    vertexShader: /* glsl */ `
      ${SIMPLEX_3D}
      uniform float uDeform;
      uniform float uTime;
      uniform vec3 uPointer;
      uniform float uPointerStrength;
      uniform float uPulseAge;
      varying vec3 vNormalV;
      varying vec3 vPos;
      void main() {
        vec3 n = normalize(normal);
        float d = snoise(position * 0.9 + vec3(0.0, uTime * 0.3, 0.0)) * 0.06;
        // The surface swells toward the cursor / finger.
        d += pow(max(dot(normalize(position), uPointer), 0.0), 8.0) * 0.14 * uPointerStrength;
        // A tap makes the whole shape breathe out once.
        d += exp(-uPulseAge * 3.0) * 0.18 * sin(uPulseAge * 18.0);
        vec3 p = position + n * d * uDeform;
        vPos = p;
        vNormalV = normalize(normalMatrix * n);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uLight;
      uniform float uPulseAge;
      uniform float uGain;
      varying vec3 vNormalV;
      varying vec3 vPos;
      void main() {
        vec3 n = normalize(vNormalV);
        float diffuse = max(dot(n, normalize(uLight)), 0.0);
        float rim = pow(1.0 - max(n.z, 0.0), 2.0);
        float lum = clamp(0.06 + diffuse * 0.66 + rim * 0.32 + exp(-uPulseAge * 2.0) * 0.3, 0.0, 1.0) * uGain;
        // Bands of "data" travelling along the shape: shown as lime binary digits.
        float band = smoothstep(0.86, 1.0, sin(vPos.y * 3.2 + vPos.x * 1.4 - uTime * 1.6));
        gl_FragColor = vec4(lum, band, 0.0, 1.0);
      }
    `,
  });
}

/** Screen pass: turns each cell of the object pass into a glyph, plus a faint flickering field of characters. */
export function createAsciiMaterial(atlas: Texture, scene: Texture) {
  return new ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uScene: { value: scene },
      uAtlas: { value: atlas },
      uCells: { value: new Vector2(1, 1) },
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uGlitch: { value: 0 },
      uField: { value: 1 },
      // Palette: viola chiaro → lavanda on the shape, lime on the data bands, grigio viola behind.
      uBase: { value: new Color("#a78bfa").convertLinearToSRGB() },
      uHighlight: { value: new Color("#f3eeff").convertLinearToSRGB() },
      uBand: { value: new Color("#d4ff3f").convertLinearToSRGB() },
      uDim: { value: new Color("#6b5e86").convertLinearToSRGB() },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uScene;
      uniform sampler2D uAtlas;
      uniform vec2 uCells;
      uniform float uTime;
      uniform float uIntro;
      uniform float uGlitch;
      uniform float uField;
      uniform vec3 uBase;
      uniform vec3 uHighlight;
      uniform vec3 uBand;
      uniform vec3 uDim;
      varying vec2 vUv;

      const float RAMP = ${GLYPH_RAMP.length.toFixed(1)};
      const float TOTAL = ${(GLYPH_RAMP.length + BINARY.length).toFixed(1)};

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        vec2 grid = vUv * uCells;
        vec2 cell = floor(grid);
        vec2 local = fract(grid);

        // Glitch: whole rows slip sideways for a few frames.
        float tick = floor(uTime * 24.0);
        float rowNoise = hash(vec2(cell.y, tick));
        cell.x += floor((rowNoise - 0.5) * 18.0) * step(1.0 - uGlitch * 0.6, rowNoise) * step(0.01, uGlitch);

        vec4 s = texture2D(uScene, (cell + 0.5) / uCells);
        float lum = s.r;
        float band = s.g;
        float covered = step(0.5, s.a);

        // Every covered cell gets at least a faint glyph, so dark sides still read as solid.
        float index = floor(clamp(0.18 + lum * 0.82, 0.0, 0.999) * (RAMP - 1.0)) + 1.0;
        if (band > 0.5) index = RAMP + step(0.5, hash(cell + floor(uTime * 8.0)));
        // Boot: cells resolve from random glyphs into the shape.
        // Boot: a decoding front sweeps down; behind it each cell settles at a slightly random moment.
        float settle = step(hash(cell * 1.31) * 0.3 + (1.0 - vUv.y) * 0.7, uIntro * 1.05);
        if (settle < 0.5) index = floor(hash(cell + tick) * (TOTAL - 1.0)) + 1.0;
        if (uGlitch > 0.01 && hash(cell + tick * 1.7) < uGlitch * 0.15) index = floor(hash(cell * 2.3 + tick) * (TOTAL - 1.0)) + 1.0;

        // Background: a sparse field of dim characters, each changing at its own pace.
        float seed = hash(cell);
        float phase = floor(uTime * (0.25 + seed * 0.6) + seed * 13.0);
        float fieldOn = step(0.955, hash(cell + phase)) * uField;
        float fieldIndex = floor(hash(cell * 1.9 + phase) * (TOTAL - 1.0)) + 1.0;

        float glyphIndex = covered > 0.5 ? index : fieldIndex;
        vec2 atlasUv = vec2((glyphIndex + local.x) / TOTAL, 1.0 - local.y);
        float glyph = texture2D(uAtlas, atlasUv).r;

        vec3 color = mix(uBase, uHighlight, smoothstep(0.55, 1.0, lum));
        color = mix(color, uBand, step(0.5, band));
        float alpha = covered > 0.5 ? glyph * (0.7 + 0.3 * lum) : glyph * fieldOn * 0.22;
        color = covered > 0.5 ? color : uDim;
        gl_FragColor = vec4(color * alpha, alpha);
      }
    `,
  });
}
