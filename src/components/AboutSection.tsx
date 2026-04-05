import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { containerClass } from "@/constants/content";
import { BrandOrbitCluster, BrandWavePattern } from "@/components/BrandDecor";

export const AboutSection = () => (
    <section id="about" className="scroll-mt-28 relative overflow-hidden border-b border-black/10 md:overflow-visible">
        <div className={`${containerClass} relative py-20 md:py-24`}>
            <div className="delta-aurora absolute inset-0 opacity-90" />
            <BrandWavePattern className="pointer-events-none absolute -left-28 top-0 hidden h-[260px] w-[340px] opacity-[0.34] md:block md:-left-36 md:top-[-8px] md:h-[340px] md:w-[420px]" />
            <BrandOrbitCluster className="pointer-events-none absolute -right-16 bottom-[-44px] hidden h-[220px] w-[280px] opacity-[0.62] md:block md:-right-24 md:bottom-[-76px] md:h-[320px] md:w-[380px]" />
            <motion.div
                className="relative grid gap-12 md:grid-cols-[1fr_1.35fr] md:gap-16"
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                custom={0.08}
            >
                <div>
                    <h2 className="font-[var(--font-raleway)] text-[46px] font-semibold leading-[0.98] tracking-[-0.02em] md:text-[64px]">
                        О компании
                    </h2>
                    <p className="mt-10 text-[15px] font-medium leading-tight text-black/[0.45] md:text-[22px]">Ключевые слова</p>
                </div>
                <div className="max-w-[620px] space-y-6 text-[18px] leading-[1.44] text-black/[0.82] md:text-[29px]">
                    <p>Краткая история и важные моменты, связанные с ЦП Дельта.</p>
                    <p>Мы создаем проектную, рабочую и сметную документацию для театров, спортивных комплексов, учебных
                        пространств и культурных объектов.</p>
                </div>
            </motion.div>
        </div>
    </section>
);
