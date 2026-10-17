import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/index.css";

const root = document.documentElement;
root.classList.add("js");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) root.classList.add("js-motion");

const container = document.getElementById("root");
if (!container) throw new Error("Missing #root element");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
