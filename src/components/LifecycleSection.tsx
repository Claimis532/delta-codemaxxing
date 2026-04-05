"use client";

import { motion } from "framer-motion";
import { roadmapDot, roadmapPath, roadmapStage, rise } from "@/lib/animation";
import { containerClass, lifecycleSteps } from "@/constants/content";
import { BrandSpark, BrandWavePattern } from "@/components/BrandDecor";

const desktopSteps = lifecycleSteps.map((step, index) => ({
    ...step,
    side: index % 2 === 0 ? "left" : "right"
}));

function ProcessIcon({ kind }: { kind: string }) {
    switch (kind) {
        case "collect":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            );
        case "contract":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                </svg>
            );
        case "design":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l5 5" />
                    <path d="M9.5 14.5L16 18" />
                </svg>
            );
        case "expertise":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            );
        case "docs":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            );
        case "supervise":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            );
        default:
            return null;
    }
}

function TimelineCard({
    id,
    title,
    icon,
    showNumber = true,
    showStageLabel = false
}: {
    id: number;
    title: string;
    icon: string;
    showNumber?: boolean;
    showStageLabel?: boolean;
}) {
    return (
        <article className="rounded-[30px] border border-black/10 bg-white p-5 shadow-[0_22px_60px_rgba(29,28,33,0.10)] md:p-6">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(38,38,116,0.06)] text-delta-ink">
                    <ProcessIcon kind={icon} />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-center gap-3">
                        {showNumber ? (
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-delta-charcoal text-sm font-bold text-white">
                                {id}
                            </span>
                        ) : (
                            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[rgba(38,38,116,0.56)]">
                                Этап {String(id).padStart(2, "0")}
                            </span>
                        )}
                        <span className="h-px flex-1 bg-black/10" />
                    </div>
                    {showStageLabel && (
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(38,38,116,0.58)]">
                            Этап {String(id).padStart(2, "0")}
                        </p>
                    )}
                    <p className="text-base font-semibold leading-snug text-black md:text-[26px] md:leading-[1.15]">
                        {title}
                    </p>
                </div>
            </div>
        </article>
    );
}

export const LifecycleSection = () => {
    return (
        <section className="border-b border-black/10 bg-delta-paper py-20 md:py-24">
            <div className={containerClass}>
                <h2 className="text-center font-[var(--font-raleway)] text-5xl font-semibold leading-none md:text-[72px]">
                    Жизненный цикл проекта
                </h2>

                <div className="mt-10 space-y-4 md:hidden">
                    {lifecycleSteps.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            variants={rise}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            custom={0.1 + idx * 0.06}
                        >
                            <TimelineCard id={step.id} title={step.title} icon={step.icon} showStageLabel />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="relative mt-12 hidden overflow-visible rounded-[34px] border border-black/10 bg-[#f7f7f7] px-10 py-12 md:block lg:px-14"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(36,120,196,0.10),transparent_34%),linear-gradient(rgba(38,38,116,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(38,38,116,0.045)_1px,transparent_1px)] bg-[length:100%_100%,46px_46px,46px_46px]" />
                    <BrandWavePattern className="pointer-events-none absolute -left-18 bottom-2 h-[250px] w-[280px] opacity-[0.34]" />
                    <BrandSpark className="pointer-events-none absolute right-6 top-6 h-[170px] w-[170px] opacity-[0.34]" />

                    <div className="pointer-events-none absolute bottom-10 left-1/2 top-10 w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(38,38,116,0.14),rgba(38,38,116,0.45)_14%,rgba(38,38,116,0.45)_86%,rgba(38,38,116,0.14))]" />

                    <div className="relative z-10 space-y-8">
                        {desktopSteps.map((step, idx) => {
                            const isLeft = step.side === "left";

                            return (
                                <div
                                    key={step.id}
                                    className="grid min-h-[188px] grid-cols-[minmax(0,1fr)_92px_56px_92px_minmax(0,1fr)] items-center"
                                >
                                    {isLeft && (
                                        <>
                                            <motion.div variants={roadmapStage} custom={idx} className="col-start-1">
                                                <TimelineCard id={step.id} title={step.title} icon={step.icon} showNumber={false} />
                                            </motion.div>
                                            <motion.div
                                                variants={roadmapPath}
                                                className="col-start-2 h-px rounded-full bg-[linear-gradient(to_right,rgba(38,38,116,0.06),rgba(38,38,116,0.34))]"
                                            />
                                        </>
                                    )}

                                    <motion.div
                                        variants={roadmapDot}
                                        custom={idx}
                                        className="col-start-3 row-start-1 flex justify-center"
                                    >
                                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-delta-charcoal text-base font-bold text-white shadow-[0_18px_36px_rgba(29,28,33,0.18)]">
                                            {step.id}
                                        </span>
                                    </motion.div>

                                    {!isLeft && (
                                        <>
                                            <motion.div
                                                variants={roadmapPath}
                                                className="col-start-4 h-px rounded-full bg-[linear-gradient(to_right,rgba(38,38,116,0.34),rgba(38,38,116,0.06))]"
                                            />
                                            <motion.div variants={roadmapStage} custom={idx} className="col-start-5">
                                                <TimelineCard id={step.id} title={step.title} icon={step.icon} showNumber={false} />
                                            </motion.div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
