import type { Config } from "tailwindcss";

/** Colours come from the CSS variables in src/styles/index.css (palette @giuseppewebdev). */
const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic, switch between dark and light sections.
        base: token("base"),
        ink: token("ink"),
        mute: token("mute"),
        line: token("line"),
        accent: token("accent"),
        // Fixed palette.
        inchiostro: token("inchiostro"),
        viola: token("viola"),
        lime: token("lime"),
        lavanda: token("lavanda"),
        "viola-chiaro": token("viola-chiaro"),
        "grigio-viola": token("grigio-viola"),
        bianco: token("bianco"),
      },
      fontFamily: {
        display: ['"Archivo Variable"', "Archivo", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      screens: {
        xs: "420px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
