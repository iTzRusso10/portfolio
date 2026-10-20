/** Page chapters, in scroll order. */
export const sections = [
  { id: "intro", label: "Intro" },
  { id: "siti", label: "Siti web" },
  { id: "gestionali", label: "Gestionali" },
  { id: "metodo", label: "Come lavoro" },
  { id: "contatti", label: "Contatti" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const sectionIds: readonly SectionId[] = sections.map((s) => s.id);

export const sectionIndex = (id: SectionId) => sectionIds.indexOf(id);

export const sectionById = (id: SectionId) => sections[sectionIndex(id)]!;
