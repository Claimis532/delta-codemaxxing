"use client";

import { motion, Variants } from "framer-motion";

// Константы стилей (можно импортировать из @/constants/content, если они там)
const containerClass = "mx-auto w-full max-w-[1120px] px-5 md:px-8";

// Исправленная типизация для Framer Motion
const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.72,
            delay: delay,
            ease: easeCurve
        }
    })
};

export function PartnersSection() {
    return (
        <section id="partners" className="scroll-mt-24 border-b border-black/10 bg-delta-paper">
            <div className={`${containerClass} py-20 md:py-24`}>
                <motion.h2
                    className="text-center font-[var(--font-raleway)] text-4xl font-semibold tracking-[-0.01em] md:text-[58px]"
                    variants={rise}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    Наши партнеры по проектированию:
                </motion.h2>

                <motion.div
                    variants={rise}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={0.12}
                    className="group mt-12 overflow-hidden rounded-[28px] border border-black/10 bg-white p-3 shadow-[0_16px_36px_rgba(0,0,0,0.08)] md:mt-16 md:p-5"
                >
                    <div className="relative overflow-hidden rounded-2xl">
                        <img
                            src="./assets/partners-wall.png"
                            alt="Логотипы партнеров компании"
                            className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]"
                        />
                        {/* Декоративная рамка */}
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                    </div>
                </motion.div>

                <motion.p
                    variants={rise}
                    initial="hidden"
                    whileInView="show"
                    custom={0.2}
                    className="mt-8 text-center text-sm font-medium text-black/40 md:text-base"
                >
                    Сотрудничаем с лидерами индустрии и государственными заказчиками
                </motion.p>
            </div>
        </section>
    );
}