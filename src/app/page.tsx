"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CtaSection } from "@/components/CtaSection";
import { LifecycleSection } from "@/components/LifecycleSection";
import { MaterialsSection } from "@/components/MaterialsSection";
import { ContactModal } from "@/components/ContactModal";
import { PartnersSection } from "@/components/PartnersSection";

export default function Home() {
    // Состояние модального окна
    const [isModalOpen, setIsModalOpen] = useState(false);
    const materialsTrackRef = useRef<HTMLDivElement | null>(null);

    // Функции управления
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

            {/* Передаем функцию открытия в секцию призыва к действию */}
            <CtaSection onOpenContact={openModal} />

            <LifecycleSection />

            <MaterialsSection ref={materialsTrackRef} onScroll={scrollMaterials} />

            <PartnersSection />

            {/* Модалка рендерится один раз на всю страницу */}
            <ContactModal isOpen={isModalOpen} closeModal={closeModal} />
        </main>
    );
}