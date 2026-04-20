"use client";

import { containerClass, lifecycleSteps } from "@/constants/content";

function ProcessIcon({ kind }: { kind: string }) {
    switch (kind) {
        case "collect":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            );
        case "contract":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                </svg>
            );
        case "design":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l5 5" />
                    <path d="M9.5 14.5L16 18" />
                </svg>
            );
        case "expertise":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            );
        case "docs":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            );
        case "supervise":
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            );
        default:
            return null;
    }
}

export const LifecycleSection = () => {
    return (
        <section className="border-b border-black/10 bg-delta-paper py-12 md:py-14">
            <div className={containerClass}>
                <div className="rounded-[34px] border border-black/10 bg-white px-5 py-7 shadow-[0_20px_52px_rgba(29,28,33,0.06)] md:px-8 md:py-9">
                    <div className="max-w-[720px]">
                        <h2 className="font-[var(--font-raleway)] text-[38px] font-semibold leading-[0.96] tracking-[-0.03em] text-delta-ink md:text-[60px]">
                            Жизненный цикл проекта
                        </h2>
                        <p className="mt-4 max-w-[620px] text-[17px] leading-relaxed text-[rgba(29,28,33,0.7)] md:text-[22px]">
                            От первого брифа до выпуска документации.
                        </p>
                    </div>

                    <div className="mt-8 hidden md:block">
                        <div className="relative">
                            <div className="absolute left-[44px] right-[44px] top-[28px] h-px bg-[linear-gradient(90deg,rgba(38,38,116,0.16),rgba(36,120,196,0.34),rgba(141,52,188,0.24),rgba(38,38,116,0.16))]" />
                            <div className="grid grid-cols-6 gap-3">
                                {lifecycleSteps.map((step) => (
                                    <article className="group relative flex flex-col items-center text-center" key={step.id}>
                                        <div className="absolute -inset-x-3 -top-2 h-20 rounded-full bg-[radial-gradient(circle,rgba(36,120,196,0.42)_0%,rgba(141,52,188,0.34)_42%,rgba(141,52,188,0.10)_62%,rgba(141,52,188,0)_80%)] opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />
                                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-delta-charcoal text-white shadow-[0_12px_24px_rgba(29,28,33,0.12)] transition duration-300 group-hover:bg-[linear-gradient(135deg,var(--delta-blue),var(--delta-violet))]">
                                            <ProcessIcon kind={step.icon} />
                                        </div>
                                        <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[rgba(38,38,116,0.52)] transition duration-300 group-hover:text-[var(--delta-violet)]">
                                            Этап {String(step.id).padStart(2, "0")}
                                        </span>
                                        <p className="mt-2 max-w-[150px] text-[15px] font-semibold leading-[1.25] text-delta-ink">
                                            {step.title}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 space-y-0 md:hidden">
                        {lifecycleSteps.map((step, index) => {
                            const isLast = index === lifecycleSteps.length - 1;

                            return (
                                <article className="group relative grid grid-cols-[44px_minmax(0,1fr)] gap-4 pb-5" key={step.id}>
                                    {!isLast && (
                                        <div className="absolute left-[21px] top-11 h-[calc(100%-2rem)] w-px bg-[linear-gradient(180deg,rgba(38,38,116,0.18),rgba(36,120,196,0.26),rgba(141,52,188,0.14))]" />
                                    )}

                                    <div className="absolute -left-2 right-0 top-0 h-16 rounded-full bg-[radial-gradient(circle,rgba(36,120,196,0.42)_0%,rgba(141,52,188,0.28)_46%,rgba(141,52,188,0.08)_62%,rgba(141,52,188,0)_80%)] opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />

                                    <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-delta-charcoal text-white shadow-[0_10px_20px_rgba(29,28,33,0.1)] transition duration-300 group-hover:bg-[linear-gradient(135deg,var(--delta-blue),var(--delta-violet))]">
                                        <ProcessIcon kind={step.icon} />
                                    </div>

                                    <div className="pt-1">
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[rgba(38,38,116,0.52)] transition duration-300 group-hover:text-[var(--delta-violet)]">
                                            Этап {String(step.id).padStart(2, "0")}
                                        </span>
                                        <p className="mt-2 text-[18px] font-semibold leading-[1.22] text-delta-ink">
                                            {step.title}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
