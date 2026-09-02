"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HoneycombMap } from "./HoneycombMap";
import { AboutSection } from "./AboutSection";
import { ContactSection, Footer } from "./ContactSection";

export function Landing() {
  const [dapil, setDapil] = useState<number | null>(null);

  return (
    <>
      <Header />
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
