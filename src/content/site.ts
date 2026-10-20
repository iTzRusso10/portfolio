/**
 * Personal data and copy. Everything visible on the site lives here, so it
 * can be edited without touching components. Written for clients, not for
 * developers: no jargon.
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
  role: "Siti web e gestionali",
  /** Public URL of the deployed site. */
  url: "https://giusepperussodev.it/",
  /** Public contact address. Set to null to hide it. */
  email: "russo.giuseppe.dev@gmail.com" as string | null,
  /**
   * WhatsApp number in international format, digits only (e.g. "393331234567").
   * When set, the contact section shows a "Scrivimi su WhatsApp" button.
   */
  whatsapp: null as string | null,
  location: "Calabria · lavoro con clienti in tutta Italia",
  socials: [
    {
      label: "Instagram",
      handle: "@giuseppewebdev",
      href: "https://www.instagram.com/giuseppewebdev/",
    },
    {
      label: "LinkedIn",
      handle: "giuseppe-russo",
      href: "https://www.linkedin.com/in/giuseppe-russo-792900264/",
    },
  ] satisfies SocialLink[],
} as const;

export const heroCopy = {
  badge: "Siti web da 250 €",
  /** The highlighted word of each line is wrapped in *asterisks*. */
  title: ["Il tuo sito.", "Il tuo *gestionale*"],
  intro:
    "Creo siti web che fanno trovare la tua attività e gestionali che ti fanno risparmiare tempo. Parli sempre con me, dalla prima idea fino a quando è tutto online.",
  primaryCta: "Scopri il sito da 250 €",
  secondaryCta: "Contattami",
  points: ["Prezzi chiari", "Si vede bene da telefono", "Assistenza diretta"],
  coreHint: "muovi il mouse · clicca la forma",
  coreHintTouch: "tocca la forma",
};

export const websiteOffer = {
  kicker: "Siti web",
  title: ["Un sito che lavora", "per te, a *250\u00a0€*."],
  intro:
    "Il tuo biglietto da visita online: chi sei, cosa fai, dove trovarti e come contattarti. Pensato per chi ha un'attività e vuole farsi trovare, senza spendere una fortuna.",
  price: "250 €",
  priceNote: "sito vetrina completo",
  cta: "Voglio il mio sito",
  /** What the 250 € website includes. */
  includes: [
    "Design moderno, fatto su misura per la tua attività",
    "Perfetto su telefono, tablet e computer",
    "Pulsanti per chiamarti, scriverti o trovarti su Google Maps",
    "Pagina contatti e collegamento ai tuoi social",
    "Pronto per comparire su Google",
    "Messa online e assistenza dopo la consegna",
  ],
  idealFor: ["Negozi", "Ristoranti e bar", "Studi professionali", "Artigiani", "Centri estetici", "Palestre"],
};

export interface Feature {
  name: string;
  text: string;
}

export const managementOffer = {
  kicker: "Gestionali",
  title: ["Basta fogli e quaderni:", "*tutto in un posto*."],
  intro:
    "Un gestionale è un programma fatto apposta per il tuo lavoro. Clienti, appuntamenti, ordini e magazzino sempre in ordine, da computer e da telefono. Lo costruisco intorno a come lavori tu, non il contrario.",
  cta: "Raccontami cosa ti serve",
  priceNote: "Prezzo in base a cosa ti serve: ne parliamo e ti preparo un preventivo.",
  features: [
    { name: "Clienti", text: "Tutti i contatti e lo storico di ogni cliente, sempre a portata di mano." },
    { name: "Appuntamenti", text: "Un'agenda condivisa con promemoria, niente più doppie prenotazioni." },
    { name: "Ordini e magazzino", text: "Sai sempre cosa hai, cosa manca e cosa è stato venduto." },
    { name: "Preventivi e documenti", text: "Preventivi e ricevute pronti in pochi clic, senza riscrivere tutto." },
  ] satisfies Feature[],
};

export interface Step {
  name: string;
  text: string;
}

export const processCopy = {
  kicker: "Come lavoro",
  title: ["Semplice,", "in *tre passi*."],
  steps: [
    { name: "Ci sentiamo", text: "Mi racconti la tua attività e cosa ti serve. Una chiacchierata, senza impegno." },
    { name: "Ti mostro la bozza", text: "Preparo una prima versione e la sistemiamo insieme finché non ti piace." },
    { name: "Va online", text: "Pubblico tutto e ti spiego come funziona. Per qualsiasi cosa, mi scrivi." },
  ] satisfies Step[],
};

export const contactCopy = {
  kicker: "Contatti",
  title: ["Parliamo del", "tuo *progetto*."],
  intro: "Scrivimi cosa ti serve: ti rispondo io, personalmente.",
  formTitle: "Scrivimi qui",
  formNote: "Si apre la tua app di posta con il messaggio già pronto.",
  topics: ["Sito web da 250 €", "Gestionale", "Altro"] as const,
  submitLabel: "Invia il messaggio",
  copyLabel: "Copia indirizzo",
  copiedLabel: "Copiato",
  whatsappLabel: "Scrivimi su WhatsApp",
  credits: "Sito progettato e realizzato da Giuseppe Russo.",
};
