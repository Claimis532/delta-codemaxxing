"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { containerClass } from "@/constants/content";
import type { HeroSection } from "@/types/site-content";

function splitText(value: string) {
    return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
}

export const AboutSection = ({ hero }: { hero: HeroSection }) => {
    const headlineLines = splitText(hero.headline);
    const descriptionLines = splitText(hero.description);
    const rowCount = Math.max(Math.ceil(hero.photos.length / 2), 2);

    return (
        <section id="about" className="scroll-mt-28 relative overflow-hidden">
            <div
                className="absolute inset-0 grid grid-cols-2"
                style={{ gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))` }}
            >
                {hero.photos.map((photo) => (
                    <div key={photo.id} className="relative min-h-[240px] overflow-hidden md:min-h-[50svh]">
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="50vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/28" />
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.46)_62%,rgba(0,0,0,0.7)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,14,0.28)_0%,rgba(6,8,14,0.12)_24%,rgba(6,8,14,0.16)_62%,rgba(6,8,14,0.34)_100%)]" />

            <div className={`${containerClass} relative flex min-h-[105svh] items-center justify-center py-20 md:min-h-[100svh] md:py-24`}>
                <motion.div
                    className="mx-auto max-w-[840px] text-center text-white"
                    variants={rise}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    custom={0.08}
                >
                    <Image
                        src="/assets/logo-horizontal.png"
                        alt="Логотип"
                        width={300}
                        height={105}
                        className="mx-auto block h-[90px] w-auto max-w-[260px] object-contain brightness-0 invert md:h-[105px] md:max-w-none"
                    />
                    <p className="mt-4 text-[14px] font-medium uppercase tracking-[0.28em] text-white/72 md:text-[18px]">
                        {hero.eyebrow}
                    </p>
                    <h2 className="mx-auto mt-8 max-w-[860px] font-[var(--font-raleway)] text-[42px] font-semibold leading-[0.96] tracking-[-0.03em] md:mt-12 md:text-[82px]">
                        {headlineLines.map((line, index) => (
                            <span key={`${line}-${index}`} className={index === 0 ? undefined : "block"}>
                                {line}
                            </span>
                        ))}
                    </h2>
                    <div className="mx-auto mt-8 max-w-[780px] space-y-4 text-[18px] leading-[1.45] text-white/86 md:text-[30px]">
                        {descriptionLines.map((line, index) => (
                            <p key={`${line}-${index}`}>{line}</p>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
