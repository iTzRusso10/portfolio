# Giuseppe Russo — Portfolio

Site for clients: websites at 250 € and custom management software (gestionali), plus contacts.
Built with React, TypeScript, Three.js / React Three Fiber and Tailwind CSS.

Palette @giuseppewebdev: Inchiostro `#170B2E`, Viola `#7C3AED`, Lime `#D4FF3F`, Lavanda `#F3EEFF`,
Viola chiaro `#A78BFA`, Grigio viola `#6B5E86`, Bianco `#FFFFFF` (tokens in `src/styles/index.css`).
Inchiostro is the main colour: every section is dark, the offer sections on slightly lighter rounded
sheets; the keyword of each title is lime. Cards float in 3D, leaning with the scroll and toward the pointer.

The 3D objects are rendered **live as ASCII**: each shape is drawn into a tiny render target (one
texel per character cell), then a full-screen shader turns each cell into a glyph. Shapes
(`src/three/ascii/shapes.ts`): a torus knot in the hero, a monitor on which the blocks of a web page
pop up (Siti web), two meshing gears that spin faster while scrolling (Gestionali), a knot in Contatti
and a donut that turns with the scroll. Each canvas renders only while visible.

The contact form has no backend: it writes the message, then the visitor opens it in their mail app
or copies it (nothing navigates on its own, so blocked mail links never blank the page).
Set `site.whatsapp` in `src/content/site.ts` to also show a WhatsApp button.

## Scripts

```bash
npm run dev        # dev server at http://localhost:5173/
npm run build      # type check + production build in docs/ (deployed on Vercel)
npm run typecheck
npm run lint
npm test           # Vitest: section timeline, reveal timing, 3D tilt, title highlights
```

## Editing content

All text lives in `src/content/site.ts` (hero, 250 € offer and what it includes, gestionali,
steps, contacts); `sections.ts` holds the chapter order. Wrap a word of a title in `*asterisks*`
to highlight it.

`public/og-image.jpg` is the social sharing preview and `public/favicon.svg` the favicon;
both are referenced from `index.html`, together with the canonical URL and structured data.

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
reveals and glitches are disabled and the knot stays still.

## Deploy

Hosted on Vercel at https://giusepperussodev.it (see `vercel.json`: build `npm run build`, output `docs/`).
The domain's DNS is managed on OVH and points to Vercel.
