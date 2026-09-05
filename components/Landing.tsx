"use client";

import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HoneycombMap } from "./HoneycombMap";
import { AboutSection } from "./AboutSection";
import { ContactSection, Footer } from "./ContactSection";

export function Landing() {
  const [dapil, setDapil] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <HoneycombMap dapil={dapil} onDapilChange={setDapil} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
