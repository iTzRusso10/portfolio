import { projectRef } from "./projects";

/**
 * Stack grouped by area. Each entry points to where it is used: a project
 * (P01…) or a role in the work history (G-Brain). No self-assessed levels.
 */

export interface Skill {
  name: string;
  usedIn: string[];
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    name: "AI e agenti",
    skills: [
      { name: "Large Language Models", usedIn: ["gbrain-ai", "ai-shorts"] },
      { name: "Agenti AI", usedIn: ["gbrain-ai", "ai-shorts"] },
      { name: "Prompt engineering", usedIn: ["gbrain-ai", "ai-shorts"] },
      { name: "Gemini API", usedIn: ["ai-shorts"] },
    ],
  },
  {
    id: "pipeline",
    name: "Pipeline e backend",
    skills: [
      { name: "Python", usedIn: ["ai-shorts"] },
      { name: "FastAPI", usedIn: ["ai-shorts"] },
      { name: "Node.js", usedIn: ["gbrain-fullstack"] },
      { name: "API e integrazioni", usedIn: ["gbrain-fullstack", "ai-shorts"] },
    ],
  },
  {
    id: "prodotto",
    name: "Prodotto",
    skills: [
      { name: "TypeScript", usedIn: ["gbrain-fullstack", "ai-shorts"] },
      { name: "Next.js", usedIn: ["gbrain-fullstack", "ai-shorts"] },
      { name: "React", usedIn: ["gbrain-fullstack"] },
      { name: "Three.js", usedIn: ["portfolio"] },
    ],
  },
  {
    id: "delivery",
    name: "Dati e rilascio",
    skills: [
      { name: "Query e database", usedIn: ["gbrain-fullstack"] },
      { name: "Vercel", usedIn: ["gbrain-fullstack"] },
      { name: "FFmpeg", usedIn: ["ai-shorts"] },
      { name: "Agile Scrum", usedIn: ["gbrain-fullstack", "develhope"] },
    ],
  },
];

const ROLE_REFS: Record<string, { label: string; href: string }> = {
  "gbrain-ai": { label: "G-Brain", href: "#esperienza" },
  "gbrain-fullstack": { label: "G-Brain", href: "#esperienza" },
  develhope: { label: "Develhope", href: "#esperienza" },
  portfolio: { label: "questo sito", href: "#intro" },
};

/** Where a skill is used, de-duplicated, projects first. */
export function evidenceFor(skill: Skill) {
  const refs = skill.usedIn.map((id) => projectRef(id) ?? ROLE_REFS[id]).filter((r): r is { label: string; href: string } => Boolean(r));
  const seen = new Set<string>();
  return refs
    .filter((r) => (seen.has(r.label) ? false : (seen.add(r.label), true)))
    .sort((a, b) => Number(b.label.startsWith("P")) - Number(a.label.startsWith("P")));
}
