import { containerClass } from "@/constants/content";
import type { AdvantagesSectionContent } from "@/types/site-content";

export const AdvantagesSection = ({ advantages }: { advantages: AdvantagesSectionContent }) => {
    return (
        <section
            id="advantages"
            className="scroll-mt-24 border-b border-black/10 bg-[linear-gradient(180deg,rgba(243,243,245,0.96)_0%,rgba(255,255,255,0.94)_100%)] py-12 md:py-16"
        >
            <div className={containerClass}>
                <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[rgba(38,38,116,0.5)]">
                        {advantages.eyebrow}
                    </span>
                    <h2 className="mt-3 font-[var(--font-raleway)] text-[42px] font-semibold leading-[0.92] tracking-[-0.04em] text-delta-ink md:text-[64px]">
                        {advantages.title}
                    </h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-black/62 md:text-[20px]">
                        {advantages.description}
                    </p>
                </div>

                <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-3 md:gap-6">
                    {advantages.items.map((item, index) => (
                        <article key={item.id} className="relative min-w-0 pt-10 md:pt-12">
                            <span className="pointer-events-none absolute left-0 top-0 font-[var(--font-raleway)] text-[72px] font-semibold leading-none tracking-[-0.08em] text-black/[0.05] md:text-[112px]">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <div className="relative">
                                <h3 className="font-[var(--font-raleway)] text-[24px] font-semibold leading-[0.98] tracking-[-0.03em] text-delta-ink md:text-[30px]">
                                    {item.title}
                                </h3>
                                <p className="mt-4 text-[15px] leading-[1.7] text-black/68 md:text-[16px]">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
