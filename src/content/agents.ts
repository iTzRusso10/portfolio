/**
 * The "Agenti" chapter. The trace is an illustration of the real pipeline of
 * AI Shorts Generator (see its README): one orchestrator, one step per agent.
 * Durations, costs or results are deliberately not shown.
 */

export const AGENT_NAMES = ["Script", "Voce", "Immagini", "Sottotitoli", "Montaggio"] as const;

export type TraceKind = "goal" | "plan" | "tool" | "result";

export interface TraceLine {
  kind: TraceKind;
  label: string;
  text: string;
  /** Index in AGENT_NAMES for tool steps. */
  agent?: number;
}

export const agentsCopy = {
  title: ["Agenti che", "lavorano davvero."],
  intro:
    "Un agente non è un prompt: è un modello che pianifica, chiama strumenti, controlla i risultati intermedi e consegna qualcosa di verificabile. Qui sotto, come lavora una delle pipeline che ho costruito.",
  traceTitle: "agent.trace",
  traceCaption: "Traccia illustrativa della pipeline di AI Shorts Generator",
  traceProjectId: "ai-shorts",
  principles: [
    {
      name: "Orchestrazione",
      text: "Un compito grande diventa una sequenza di passi piccoli e verificabili: piano, chiamate a strumenti, controllo del risultato.",
    },
    {
      name: "Trasparenza",
      text: "Avanzamento, stato e risultati intermedi visibili: chi usa l'app deve capire cosa sta facendo l'agente e quando.",
    },
    {
      name: "Affidabilità",
      text: "Output strutturati e validati, errori gestiti, lavori lunghi eseguiti in modo asincrono senza bloccare l'interfaccia.",
    },
  ],
};

export const agentTrace: TraceLine[] = [
  { kind: "goal", label: "obiettivo", text: "un video short da un argomento" },
  { kind: "plan", label: "piano", text: "5 passi, un agente per ogni passo" },
  { kind: "tool", label: "script", text: "gemini.generate(script)", agent: 0 },
  { kind: "tool", label: "voce", text: "tts.synthesize(voiceover)", agent: 1 },
  { kind: "tool", label: "immagini", text: "gemini.images(scene)", agent: 2 },
  { kind: "tool", label: "sottotitoli", text: "subtitles.burn(video)", agent: 3 },
  { kind: "tool", label: "montaggio", text: "ffmpeg.compose(9:16)", agent: 4 },
  { kind: "result", label: "risultato", text: "video verticale pronto da pubblicare" },
];
