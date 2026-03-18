import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { containerClass } from "@/constants/content";

export const AboutSection = () => (
    <section id="about" className="scroll-mt-24 border-b border-black/10">
        <div className={`${containerClass} py-20 md:py-24`}>
            <motion.div
                className="grid gap-12 md:grid-cols-[1fr_1.35fr] md:gap-16"
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