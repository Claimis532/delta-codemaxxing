import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { containerClass } from "@/constants/content";

export const CtaSection = () => (
    <section className="border-b border-black/10 bg-delta-cta">
        <div className={`${containerClass} py-24`}>
            <motion.div
                variants={rise}
                initial="hidden"
                whileInView="show"
                className="mx-auto max-w-4xl text-center"
            >
                <h2 className="text-4xl font-semibold text-white md:text-[58px] leading-[1.15] md:leading-[1.1]">
                    Проектируем системы, которые работают годами
                </h2>
                <button className="mt-12 min-h-[76px] min-w-[320px] rounded-lg bg-white text-delta-blue font-semibold text-xl transition hover:bg-delta-fog">
                    Обсудить проект
                </button>
            </motion.div>
        </div>
    </section>
);