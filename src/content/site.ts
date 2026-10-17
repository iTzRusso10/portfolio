/**
 * Personal data and copy. Everything visible on the site that is not a
 * project or a skill lives here, so it can be edited without touching
 * components.
 */

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}

export const site = {
  name: "Giuseppe Russo",
  firstName: "Giuseppe",
  lastName: "Russo",
  role: "AI Developer",
  /** Public URL of the deployed portfolio. */
  url: "https://giusepperussodev.it/",
  /** Public contact address, as published on giuseppe-portfolio-drab.vercel.app. Set to null to hide it. */
  email: "russo.giuseppe.dev@gmail.com" as string | null,
  location: "Calabria, Italia · remoto e ibrido",
  socials: [
    {
      label: "LinkedIn",
      handle: "giuseppe-russo",
      href: "https://www.linkedin.com/in/giuseppe-russo-792900264/",
    },
    {
      label: "GitHub",
      handle: "iTzRusso10",
      href: "https://github.com/iTzRusso10",
    },
  ] satisfies SocialLink[],
} as const;

export const heroCopy = {
  prompt: "giuseppe@portfolio",
  command: "whoami",
  role: "AI Developer · LLM & AI Agents",
  kicker: "applicazioni basate su LLM e agenti AI, dentro prodotti veri",
  intro:
    "Progetto e realizzo applicazioni basate su modelli linguistici e agenti AI, integrate in prodotti web moderni con Next.js, TypeScript e Node.js. Background full stack: so portare un modello dal prototipo all'interfaccia che usa il cliente.",
  primaryCta: "Vedi cosa faccio",
  secondaryCta: "Contattami",
  /** Small key/value readout under the hero (desktop). */
  readout: [
    ["ruolo", "Sviluppatore AI @ G-Brain"],
    ["focus", "LLM · agenti AI · prompt engineering"],
    ["stack", "next.js · typescript · node.js · python"],
  ] as const,
  coreHint: "muovi il mouse · clicca il nodo",
  coreHintTouch: "tocca il nodo",
};

export interface Service {
  name: string;
  text: string;
}

export const servicesCopy = {
  statement: ["Un'applicazione AI è fatta di strati.", "Io li costruisco tutti."],
  /** From the LinkedIn "Informazioni" section. */
  bio: "Sono uno sviluppatore AI con un background da sviluppatore full stack. Mi piace trasformare problemi complessi in soluzioni concrete ed efficienti: dal modello e dagli strumenti che usa, fino all'interfaccia e al rilascio. Lavoro in metodologia Agile Scrum.",
  services: [
    {
      name: "Agenti AI",
      text: "Agenti che pianificano, chiamano strumenti e API e completano compiti in più passi, con controlli sui risultati intermedi.",
    },
    {
      name: "Integrazione LLM",
      text: "Modelli linguistici dentro prodotti esistenti: prompt progettati e versionati, output strutturati, costi e latenze sotto controllo.",
    },
    {
      name: "Prodotti AI full-stack",
      text: "Dall'idea al rilascio: backend, pipeline asincrone, interfacce in Next.js che mostrano cosa sta facendo l'AI.",
    },
    {
      name: "Consulenza",
      text: "Capire dove l'AI porta valore e dove no, scegliere modelli e architettura, prototipare in fretta per decidere con i dati.",
    },
  ] satisfies Service[],
};

export const skillsCopy = {
  title: ["Lo stack", "che uso davvero."],
  intro:
    "Niente percentuali inventate: accanto a ogni voce c'è dove l'ho usata — in G-Brain o nei progetti qui sotto.",
};

export const projectsCopy = {
  title: ["Progetti", "AI"],
  intro: "Casi studio raccontati per intero: il problema, l'architettura, cosa ho costruito io.",
};

export const contactCopy = {
  title: ["Portiamo l'AI", "nel tuo", "prodotto."],
  intro:
    "Aziende che cercano uno sviluppatore AI, clienti con un processo da automatizzare o un prodotto da rendere intelligente: parliamone.",
  copyLabel: "Copia indirizzo",
  copiedLabel: "Copiato",
  credits: "Progettato e sviluppato da me: React, TypeScript, Three.js → ASCII in tempo reale.",
};
