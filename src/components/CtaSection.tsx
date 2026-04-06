"use client";

import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { containerClass } from "@/constants/content";
import { BrandOrbitCluster, BrandSpark, BrandWavePattern } from "@/components/BrandDecor";

interface CtaSectionProps {
    onOpenContact: () => void;
}

export const CtaSection = ({ onOpenContact }: CtaSectionProps) => (
    <section className="relative overflow-hidden bg-delta-cta md:overflow-visible">
        <div className={`${containerClass} relative pb-4 pt-24 md:pb-3 md:pt-24`}>
            <BrandWavePattern className="pointer-events-none absolute -left-28 top-[-20px] hidden h-[320px] w-[360px] opacity-[0.28] md:block" />
            <BrandOrbitCluster className="pointer-events-none absolute -right-14 bottom-[-32px] hidden h-[260px] w-[320px] opacity-[0.32] md:block" />
            <BrandSpark className="pointer-events-none absolute right-[22%] top-6 hidden h-[132px] w-[132px] opacity-[0.34] md:block" />
            <motion.div
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative mx-auto max-w-4xl text-center"
            >
                <h2 className="text-4xl font-semibold text-white md:text-[58px] leading-[1.15] md:leading-[1.1] font-[var(--font-raleway)]">
                    Проектируем системы, которые работают годами
                </h2>

                <button
                    onClick={onOpenContact}
                    className="mt-12 min-h-[76px] w-full max-w-[320px] rounded-lg bg-white px-6 text-delta-blue font-semibold text-xl transition hover:bg-delta-fog active:scale-95 shadow-xl shadow-black/10"
                >
                    Обсудить проект
                </button>
            </motion.div>
        </div>
    </section>
);
