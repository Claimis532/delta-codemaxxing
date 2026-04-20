import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CtaSection } from "@/components/CtaSection";
import { LifecycleSection } from "@/components/LifecycleSection";
import { PartnersSection } from "@/components/PartnersSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { Footer } from "@/components/Footer";
import { ModalProvider } from "@/components/ModalProvider";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function Home() {
    const siteContent = await getSiteContent();

    return (
        <main className="bg-delta-paper text-delta-ink">
            <ModalProvider>
                <Header />

                <AboutSection hero={siteContent.hero} />

                <ProjectsSection projects={siteContent.projects} />

                <LifecycleSection />

                <AdvantagesSection />

                <PartnersSection />

                <section className="relative overflow-hidden bg-delta-cta">
                    <CtaSection />
                    <Footer footer={siteContent.footer} />
                </section>
            </ModalProvider>
        </main>
    );
}
