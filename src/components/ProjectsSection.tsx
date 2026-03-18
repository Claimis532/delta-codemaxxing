import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { designDirections, containerClass } from "@/constants/content";

export const ProjectsSection = () => (
    <section id="projects" className="scroll-mt-24 relative border-b border-black/10">
        <div className="absolute inset-0 blueprint-grid" />
        <div className="absolute inset-0 bg-white/70" />
        <div className={`${containerClass} relative py-20 md:py-24`}>
            <motion.h2
                className="text-center font-[var(--font-raleway)] text-4xl font-semibold md:text-[58px]"
                variants={rise} initial="hidden" whileInView="show"
            >
                Мы проектируем
            </motion.h2>
            <div className="mt-12 space-y-5 md:mt-16 md:space-y-8">
                {designDirections.map((item, idx) => (
                    <motion.article
                        key={item.title}
                        variants={rise} initial="hidden" whileInView="show"
                        custom={0.12 + idx * 0.08}
                        className="grid items-center gap-4 rounded-2xl border border-black/10 bg-white/[0.65] px-5 py-4 md:grid-cols-[1fr_auto]"
                    >
                        <div>
                            <p className="text-[17px] font-semibold md:text-[31px]">{item.title}</p>
                            <p className="mt-2 text-black/[0.62] md:text-[22px]">{item.description}</p>
                        </div>
                        <button className="h-12 w-32 rounded-full bg-delta-blue text-white md:h-16 md:w-40">подробнее</button>
                    </motion.article>
                ))}
            </div>
        </div>
    </section>
);