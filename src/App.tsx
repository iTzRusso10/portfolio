import { useEffect } from "react";
import { startPointerTracking } from "./animation/pointer";
import { startScrollTracking } from "./animation/scroll";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { StatusBar } from "./components/layout/StatusBar";
import { Agents } from "./components/sections/Agents";
import { Contact } from "./components/sections/Contact";
import { Experience } from "./components/sections/Experience";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/sections/Marquee";
import { Projects } from "./components/sections/Projects";
import { Services } from "./components/sections/Services";
import { Skills } from "./components/sections/Skills";
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
        <div className="stars" />
      </div>
      <div className="grain" aria-hidden="true" />
      {finePointer && !reducedMotion && <Cursor />}
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <Agents />
        <Experience />
        <Skills />
        <Marquee />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <StatusBar />
      <ScrollDonut />
    </>
  );
}
