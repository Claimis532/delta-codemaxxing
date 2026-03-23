"use client";

import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { containerClass } from "@/constants/content";

interface CtaSectionProps {
    onOpenContact: () => void;
}

export const CtaSection = ({ onOpenContact }: CtaSectionProps) => (
    <section className="border-b border-black/10 bg-delta-cta">
        <div className={`${containerClass} py-24`}>
            <motion.div
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mx-auto max-w-4xl text-center"
            >
                <h2 className="text-4xl font-semibold text-white md:text-[58px] leading-[1.15] md:leading-[1.1] font-[var(--font-raleway)]">
                    Проектируем системы, которые работают годами
                </h2>

                <button
                    onClick={onOpenContact}
                    className="mt-12 min-h-[76px] min-w-[320px] rounded-lg bg-white text-delta-blue font-semibold text-xl transition hover:bg-delta-fog active:scale-95 shadow-xl shadow-black/10"
                >
                    Обсудить проект
                </button>
            </motion.div>
        </div>
    </section>
);