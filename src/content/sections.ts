/** Page chapters, in scroll order. */
export const sections = [
  { id: "intro", label: "Intro", index: "00" },
  { id: "servizi", label: "Servizi", index: "01" },
  { id: "agenti", label: "Agenti", index: "02" },
  { id: "esperienza", label: "Esperienza", index: "03" },
  { id: "stack", label: "Stack", index: "04" },
  { id: "progetti", label: "Progetti", index: "05" },
  { id: "contatti", label: "Contatti", index: "06" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const sectionIds: readonly SectionId[] = sections.map((s) => s.id);

export const sectionIndex = (id: SectionId) => sectionIds.indexOf(id);

export const sectionById = (id: SectionId) => sections[sectionIndex(id)]!;
