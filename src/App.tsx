import { useEffect } from "react";
import { startPointerTracking } from "./animation/pointer";
import { startScrollTracking } from "./animation/scroll";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Management } from "./components/sections/Management";
import { Process } from "./components/sections/Process";
import { Websites } from "./components/sections/Websites";
import { Cursor } from "./components/ui/Cursor";
import { ScrollDonut } from "./components/ui/ScrollDonut";
import { useFinePointer, useReducedMotion } from "./hooks/useMediaQuery";
import { useRevealObserver } from "./hooks/useRevealObserver";

export function App() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();

  useEffect(() => startScrollTracking(), []);
  useEffect(() => startPointerTracking(), []);
  // Sections are rendered by React, after the browser's own jump to the URL hash.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);
  useRevealObserver();

  return (
    <>
      <ScrollProgress />
      <Header />
      <div className="aurora" aria-hidden="true">
        <div className="grid-bg" />
      </div>
      {finePointer && !reducedMotion && <Cursor />}
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Websites />
        <Management />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ScrollDonut />
    </>
  );
}
