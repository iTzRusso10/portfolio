# Giuseppe Russo — Portfolio

Portfolio built with React, TypeScript, Three.js / React Three Fiber and Tailwind CSS.

Dark violet "AI terminal" style. The 3D centrepiece is a torus knot rendered **live as ASCII**:
the shape is drawn into a tiny render target (one texel per character cell), then a full-screen
shader turns each cell into a glyph from a canvas-generated atlas — luminance picks the density,
travelling "data bands" become cyan `0`/`1`, a sparse field of dim characters flickers behind.
It follows the cursor, glitches on click/tap and every few seconds on its own. Sections are
terminal and editor windows (skills as `.ts` files, a real build log, a live agent trace);
a vim-style status line sits at the bottom on desktop.

More ASCII objects appear while scrolling, one per section (`src/three/ascii/shapes.ts`): stacked
layers (Approccio), a faceted core with orbiting modules (Competenze), an orchestrator with five
agents (Agenti), the React atom (Lavori). Each one materialises top-down when it enters the screen
(again on every return), spins faster and flickers while the page is being scrolled, then settles.
Each canvas renders only while visible.

## Scripts

```bash
npm run dev        # dev server at http://localhost:5173/
npm run build      # type check + production build in docs/ (deployed on Vercel)
npm run typecheck
npm run lint
npm test           # Vitest: section timeline and agent trace timing
```

## Editing content

All text and data live in `src/content/`, separate from the components:

| File          | Contents                                                     |
| ------------- | ------------------------------------------------------------ |
| `site.ts`     | name, email, social links, hero, services and section copy   |
| `experience.ts` | work history (from LinkedIn), shown as a `git log`         |
| `projects.ts` | AI case studies (problem, contribution, stack, links)        |
| `skills.ts`   | stack groups, each skill linked to a project or role          |
| `agents.ts`   | Agenti chapter: copy, principles, agent names, trace lines   |
| `sections.ts` | chapter order (one 3D state per chapter)                     |

Project screenshots are in `src/assets/projects/` (WebP, ~1440px wide).
`public/og-image.jpg` is the social sharing preview and `public/favicon.svg` the favicon;
both are referenced from `index.html`, together with the canonical URL.

## Structure

```
src/
  animation/   scroll → timeline mapping, pointer and UI → scene signals
  components/  layout (header, scene layer, progress), sections, ui primitives
  content/     editable data
  hooks/       media queries, reveal observer, magnetic hover, active section
  three/       ASCII renderer: glyph atlas, object + screen shaders (GLSL), quality tiers
  styles/      design tokens and global CSS
```

The WebGL bundle is lazy-loaded after first paint and each canvas renders only while on screen.
Without WebGL (or if it fails) the section simply shows no scene. With `prefers-reduced-motion`
reveals, typing and glitches are disabled and the knot stays still.

## Deploy

Hosted on Vercel at https://giusepperussodev.it (see `vercel.json`: build `npm run build`, output `docs/`).
The domain's DNS is managed on OVH and points to Vercel.
