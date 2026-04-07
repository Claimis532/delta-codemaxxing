"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CtaSection } from "@/components/CtaSection";
import { LifecycleSection } from "@/components/LifecycleSection";
import { ContactModal } from "@/components/ContactModal";
import { PartnersSection } from "@/components/PartnersSection";
import { ProjectCategoryModal } from "@/components/ProjectCategoryModal";
import { Footer } from "@/components/Footer";
import { type ProjectCategory } from "@/constants/content";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openCategoryModal = (category: ProjectCategory) => setActiveCategory(category);
    const closeCategoryModal = () => setActiveCategory(null);

    return (
        <main className="bg-delta-paper text-delta-ink">
            <Header />

            <AboutSection />

            <ProjectsSection onOpenCategory={openCategoryModal} />

            <LifecycleSection />

            <PartnersSection />

            <section className="relative overflow-hidden bg-delta-cta">
                <CtaSection onOpenContact={openModal} />
                <Footer />
            </section>

            <ContactModal isOpen={isModalOpen} closeModal={closeModal} />
            <ProjectCategoryModal isOpen={activeCategory !== null} category={activeCategory} closeModal={closeCategoryModal} />
        </main>
    );
}
