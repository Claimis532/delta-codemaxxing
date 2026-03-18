"use client";

import { motion } from "framer-motion";
import { roadmapPath, roadmapDot, roadmapStage } from "@/lib/animation";
import { lifecycleSteps, processDots, containerClass } from "@/constants/content";

function ProcessIcon({ kind }: { kind: string }) {
    switch (kind) {
        case "collect":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            );
        case "contract":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" />
                </svg>
            );
        case "design":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l5 5" /><path d="M9.5 14.5L16 18" />
                </svg>
            );
        case "expertise":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            );
        case "docs":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
            );
        case "supervise":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
                </svg>
            );
        default:
            return null;
    }
}

export const LifecycleSection = () => {
    return (
        <section className="border-b border-black/10 bg-delta-paper py-20 md:py-24">
            <div className={containerClass}>
                <h2 className="text-center font-[var(--font-raleway)] text-4xl font-semibold md:text-[58px]">
                    Жизненный цикл проекта
                </h2>

                <div className="relative mt-12 hidden md:block">
                    {/* Обертка с фиксированной высотой.
                      ВАЖНО: overflow-visible, чтобы тени карточек не обрезались
                    */}
                    <motion.div
                        className="relative h-[1860px] w-full overflow-visible rounded-[30px] border border-black/10 bg-[#f7f7f7]"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* SVG Линия */}
                        <svg
                            viewBox="0 0 1100 760"
                            className="absolute inset-0 h-full w-full pointer-events-none"
                            preserveAspectRatio="none"
                        >
                            <motion.path
                                variants={roadmapPath}
                                d="M180 150 C 320 50, 430 230, 600 170 C 760 120, 820 260, 700 300 C 560 350, 490 380, 560 460 C 640 550, 680 620, 560 650 C 430 680, 360 670, 250 620"
                                fill="none"
                                stroke="rgba(38,38,116,0.86)"
                                strokeWidth="4"
                                strokeDasharray="15 17"
                            />
                        </svg>

                        {processDots.map((dot, idx) => (
                            <motion.div
                                key={dot.id}
                                variants={roadmapDot}
                                custom={idx}
                                className="absolute z-30"
                                style={{
                                    left: `${dot.x}%`,
                                    top: `${dot.y}%`,
                                    transform: 'translate(-50%, -50%)' // Ручное центрирование
                                }}
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-delta-charcoal text-white font-bold">
                                    {dot.id}
                                </span>
                            </motion.div>
                        ))}

                        {/* КАРТОЧКИ */}
                        {lifecycleSteps.map((step, idx) => (
                            <motion.article
                                key={step.id}
                                variants={roadmapStage}
                                custom={idx}
                                className="absolute z-20 w-[320px] rounded-3xl border border-black/10 bg-white p-6 shadow-xl"
                                style={{
                                    left: `${step.x}%`,
                                    top: `${step.y}%`,
                                    transform: 'translate(-50%, -50%)' // Ручное центрирование
                                }}
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                                        <ProcessIcon kind={step.icon} />
                                    </div>
                                    <p className="text-lg font-semibold leading-tight text-black">
                                        {step.title}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};