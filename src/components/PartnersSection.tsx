"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { BrandSpark } from "@/components/BrandDecor";
import { containerClass, partnerBrands } from "@/constants/content";

const MARQUEE_REPEATS = 4;
const marqueeBrands = Array.from({ length: MARQUEE_REPEATS }, () => partnerBrands).flat();

function BrandTile({ name, image }: { name: string; image: string }) {
    return (
        <div className="mx-2 flex h-[84px] min-w-[156px] items-center justify-center rounded-[24px] border border-black/[0.06] bg-white px-5 shadow-[0_16px_34px_rgba(17,24,39,0.08)] md:mx-4 md:h-[108px] md:min-w-[220px] md:px-8">
            <img
                src={image}
                alt={name}
                className="max-h-[40px] w-auto max-w-full object-contain mix-blend-multiply md:max-h-[60px]"
            />
        </div>
    );
}

export function PartnersSection() {
    return (
        <section id="partners" className="scroll-mt-24 relative overflow-hidden border-b border-black/10 bg-delta-paper py-20 md:overflow-visible md:py-24">
            <div className={`${containerClass} relative`}>
                <BrandSpark className="pointer-events-none absolute -right-6 -top-12 hidden h-[120px] w-[120px] opacity-[0.2] md:block" />

                <motion.h2
                    className="text-center font-[var(--font-raleway)] text-[42px] font-semibold leading-[0.96] tracking-[-0.02em] md:text-[58px] md:leading-none"
                    variants={rise}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    Бренды, с которыми работаем
                </motion.h2>

                <motion.p
                    variants={rise}
                    initial="hidden"
                    whileInView="show"
                    custom={0.12}
                    className="mx-auto mt-5 max-w-[340px] text-center text-sm font-medium leading-relaxed text-black/50 md:max-w-3xl md:text-lg"
                >
                    Подбираем решения под задачу и сотрудничаем с ведущими производителями сценического, звукового, медиа- и коммутационного оборудования.
                </motion.p>
            </div>

            <motion.div
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={0.18}
                className="relative mt-12 overflow-hidden pb-10 md:pb-14"
            >
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-delta-paper to-transparent md:w-32" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-delta-paper to-transparent md:w-32" />

                <div
                    className="partner-marquee flex w-max items-center py-4"
                    style={{ "--partner-marquee-shift": `-${100 / MARQUEE_REPEATS}%` } as CSSProperties}
                >
                    {marqueeBrands.map((brand, index) => (
                        <BrandTile key={`${brand.name}-${index}`} name={brand.name} image={brand.image} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
