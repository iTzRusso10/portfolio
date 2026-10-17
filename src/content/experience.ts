/**
 * Work history, from the LinkedIn profile (linkedin.com/in/giuseppe-russo-792900264).
 * Descriptions are kept to what the profile states; add details here.
 */

export interface Role {
  id: string;
  title: string;
  company: string;
  period: string;
  /** Short git-like hash shown in the log, purely decorative. */
  hash: string;
  current?: boolean;
  place: string;
  summary: string;
  tags: string[];
}

export const roles: Role[] = [
  {
    id: "gbrain-ai",
    title: "Sviluppatore AI",
    company: "G-Brain",
    period: "gen 2025 — oggi",
    hash: "a1f9c3e",
    current: true,
    place: "Caserta · ibrido",
    summary:
      "Progetto e sviluppo applicazioni basate su modelli linguistici (LLM) e agenti AI, integrate in prodotti web moderni.",
    tags: ["LLM", "Agenti AI", "Prompt engineering", "Intelligenza artificiale"],
  },
  {
    id: "gbrain-fullstack",
    title: "Sviluppatore Full Stack",
    company: "G-Brain",
    period: "mag 2022 — dic 2024",
    hash: "7d20b4a",
    place: "Caserta · ibrido",
    summary: "Sviluppo di applicazioni web full stack: front-end in React e Next.js, API, query e rilascio su Vercel.",
    tags: ["React", "Next.js", "API", "Vercel", "Query"],
  },
  {
    id: "develhope",
    title: "Certificazione Full-Stack",
    company: "Develhope",
    period: "set 2022 — apr 2023",
    hash: "3c81e0f",
    place: "online",
    summary: "Percorso full-stack con certificazione Front-End Developer, metodologia Agile Scrum.",
    tags: ["Full-stack", "Agile Scrum"],
  },
];

export const experienceCopy = {
  title: ["Quasi cinque anni", "in produzione."],
  intro:
    "Dal full stack all'AI nella stessa azienda: prima prodotti web completi, oggi applicazioni basate su LLM e agenti.",
};
