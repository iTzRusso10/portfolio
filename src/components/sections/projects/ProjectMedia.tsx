import { useRef, type PointerEvent } from "react";
import type { FeaturedProject } from "../../../content/projects";
import { useFinePointer, useReducedMotion } from "../../../hooks/useMediaQuery";

const host = (url: string) => new URL(url).host;

/** Perspective tilt that follows the pointer. Desktop only; resets on leave. */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!enabled || !el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateZ(0)`;
  };
  const onPointerLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return { ref, onPointerMove, onPointerLeave };
}

const pipeline = ["Script", "Voce", "Immagini", "Sottotitoli", "Montaggio"];

/** Typographic stand-in for projects without a public demo: the 9:16 output and its generation steps. */
function VerticalVideoComposition() {
  return (
    <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-[rgb(22_14_46)]">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(237_233_254/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(237_233_254/0.06)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]" />
      <div className="relative flex h-[82%] items-center gap-[6%]">
        <div className="relative flex aspect-[9/16] h-full flex-col justify-end overflow-hidden rounded-[1.1rem] bg-[#05030b] p-[7%] text-ink shadow-[0_30px_80px_-20px_rgb(168_85_247/0.6)] ring-1 ring-ink/15">
          <div className="absolute inset-x-[7%] top-[7%] flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-[3px] flex-1 rounded-full bg-ink/30">
                {i === 0 && <span className="block h-full w-2/3 rounded-full bg-ink" />}
              </span>
            ))}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgb(168_85_247/0.7),transparent_55%)]" />
          <p className="relative text-center text-[clamp(0.6rem,1vw,0.85rem)] font-semibold leading-tight">
            <span className="bg-signal px-1 text-night">Sottotitoli</span> impressi
            <br />
            nel video
          </p>
          <span className="label relative mt-3 text-center text-[0.55rem] text-ink/60">9:16</span>
        </div>
        <ol className="hidden flex-col gap-2.5 sm:flex">
          {pipeline.map((step, i) => (
            <li key={step} className="label flex items-center gap-2.5 text-ink/70">
              <span
                className={`grid h-5 w-5 place-items-center rounded-full border text-[0.55rem] ${i < 3 ? "border-signal bg-signal text-night" : "border-ink/30"}`}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function ProjectMedia({ project }: { project: FeaturedProject }) {
  const tilt = useTilt();
  const { media, links, title } = project;

  const frame = (
    <div
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="media-frame overflow-hidden rounded-2xl bg-[rgb(18_11_38/0.72)] ring-1 ring-ink/10 backdrop-blur-md shadow-[0_40px_120px_-40px_rgb(168_85_247/0.45)]"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-ink/60">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-ink/25" />
          <span className="h-2 w-2 rounded-full bg-ink/25" />
          <span className="h-2 w-2 rounded-full bg-ink/25" />
        </span>
        <span className="label truncate text-[0.625rem]">
          {links.demo ? host(links.demo) : links.repo ? `github.com/${new URL(links.repo).pathname.slice(1)}` : title}
        </span>
        <span className="label text-[0.625rem]">{links.demo ? "Live" : "Repo"}</span>
      </div>
      {media.kind === "image" ? (
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      ) : (
        <VerticalVideoComposition />
      )}
    </div>
  );

  if (!links.demo) return frame;
  // Larger pointer target for the demo; keyboard users reach the same URL through the "Demo" link.
  return (
    <a href={links.demo} target="_blank" rel="noopener noreferrer" tabIndex={-1} className="block">
      {frame}
    </a>
  );
}
