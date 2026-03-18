import { forwardRef } from "react";
import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { materials, containerClass } from "@/constants/content";

interface MaterialsProps {
    onScroll: (dir: "left" | "right") => void;
}

export const MaterialsSection = forwardRef<HTMLDivElement, MaterialsProps>(
    ({ onScroll }, ref) => (
        <section id="materials" className="scroll-mt-24 border-b border-black/10 bg-[rgba(38,38,116,0.03)]">
            <div className={`${containerClass} py-20 md:py-24`}>
                <div className="flex items-center justify-between gap-4">
                    <h2 className="font-[var(--font-raleway)] text-4xl font-semibold md:text-[58px]">
                        Референсы и портфолио
                    </h2>
                    <div className="hidden items-center gap-2 md:flex">
                        <button onClick={() => onScroll("left")} className="h-10 w-10 rounded-full border border-black/10 bg-white">←</button>
                        <button onClick={() => onScroll("right")} className="h-10 w-10 rounded-full border border-black/10 bg-white">→</button>
                    </div>
                </div>

                <div ref={ref} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
                    {materials.map((item, idx) => (
                        <motion.a
                            key={item.title}
                            href={item.href}
                            target="_blank"
                            variants={rise}
                            initial="hidden"
                            whileInView="show"
                            custom={0.1 + idx * 0.08}
                            className="group min-w-[86%] snap-start overflow-hidden rounded-[26px] border bg-white shadow-lg md:min-w-[420px]"
                        >
                            <div className="relative h-[220px]">
                                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-delta-blue/70 to-transparent" />
                                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-delta-blue">
                  {item.type}
                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                                <p className="mt-2 text-sm text-black/65">{item.description}</p>
                                <div className="mt-4 flex items-center justify-between border-t pt-3">
                                    <span className="text-sm font-semibold text-delta-blue">{item.cta}</span>
                                    <span className="transition group-hover:translate-x-1">↗</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
);

MaterialsSection.displayName = "MaterialsSection";