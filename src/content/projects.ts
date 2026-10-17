/**
 * Case studies. Facts come from public repositories of iTzRusso10.
 * To add a project, append an entry: the layout adapts automatically.
 */

export type ProjectMedia =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  /** No public demo: rendered as a composition of the pipeline instead of a screenshot. */
  | { kind: "vertical-video" };

export interface ProjectLinks {
  demo?: string;
  repo?: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  problem: string;
  contribution: string;
  stack: string[];
  links: ProjectLinks;
  media: ProjectMedia;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "ai-shorts",
    title: "AI Shorts Generator",
    year: "2026",
    category: "Pipeline multi-agente · Full-stack",
    summary:
      "Da un argomento a un video short verticale 9:16, in automatico: script AI, voiceover, immagini AI e sottotitoli impressi nel video.",
    problem:
      "Coordinare passaggi lenti e dipendenti tra loro — testo, voce, immagini, montaggio — in un flusso unico, mostrando l'avanzamento senza bloccare l'interfaccia.",
    contribution:
      "Pipeline Python FastAPI con Google Gemini per script e immagini, sintesi vocale, composizione con FFmpeg; frontend Next.js 15 con stato dei job e API route di collegamento.",
    stack: ["Gemini API", "FastAPI", "Python", "Next.js", "TypeScript", "FFmpeg"],
    links: {
      repo: "https://github.com/iTzRusso10/shorts-ai-new",
    },
    media: { kind: "vertical-video" },
  },
];

/** Short reference shown next to skills, e.g. "P01". */
export function projectRef(id: string): { label: string; href: string } | null {
  const featured = featuredProjects.findIndex((p) => p.id === id);
  if (featured >= 0) return { label: `P${String(featured + 1).padStart(2, "0")}`, href: `#progetto-${id}` };
  return null;
}
