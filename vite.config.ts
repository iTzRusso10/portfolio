import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served at the root of giusepperussodev.it (Vercel). Set BASE_PATH to build for a sub-path,
// e.g. BASE_PATH=/portfolio/ for GitHub Pages.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  build: {
    outDir: "docs",
    target: "es2020",
    assetsInlineLimit: 2048,
    // The three.js scene is a lazily loaded chunk requested after first paint.
    chunkSizeWarningLimit: 900,
  },
  plugins: [react()],
});
