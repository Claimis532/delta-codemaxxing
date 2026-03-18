"use client";

import { useRef } from "react";
import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CtaSection } from "@/components/CtaSection";
import { LifecycleSection } from "@/components/LifecycleSection";
import { MaterialsSection } from "@/components/MaterialsSection";

export default function Home() {
  const materialsTrackRef = useRef<HTMLDivElement | null>(null);

  const scrollMaterials = (direction: "left" | "right") => {
    const offset = direction === "right" ? 430 : -430;
    materialsTrackRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const scrollToMaterials = () => {
    document.getElementById("materials")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
      <main className="bg-delta-paper text-delta-ink">
        <Header onPortfolioClick={scrollToMaterials} />
        <AboutSection />
        <ProjectsSection />
        <CtaSection />
        <LifecycleSection />
        <MaterialsSection ref={materialsTrackRef} onScroll={scrollMaterials} />
      </main>
  );
}