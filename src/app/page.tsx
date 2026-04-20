import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CtaSection } from "@/components/CtaSection";
import { LifecycleSection } from "@/components/LifecycleSection";
import { PartnersSection } from "@/components/PartnersSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { Footer } from "@/components/Footer";
import { ModalProvider } from "@/components/ModalProvider";

export default function Home() {
    return (
        <main className="bg-delta-paper text-delta-ink">
            <ModalProvider>
                <Header />

                <AboutSection />

                <ProjectsSection />

                <LifecycleSection />

                <AdvantagesSection />

                <PartnersSection />

                <section className="relative overflow-hidden bg-delta-cta">
                    <CtaSection />
                    <Footer />
                </section>
            </ModalProvider>
        </main>
    );
}
