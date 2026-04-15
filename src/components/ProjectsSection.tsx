"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { containerClass, projectCategories } from "@/constants/content";
import { BrandOrbitCluster } from "@/components/BrandDecor";
import { useModalActions } from "@/components/ModalProvider";

export const ProjectsSection = () => {
    const { openCategoryModal } = useModalActions();

    return (
        <section id="projects" className="scroll-mt-24 relative overflow-hidden border-b border-black/10 bg-[rgba(38,38,116,0.03)] md:overflow-visible">
            <div className="absolute inset-0 blueprint-grid" />
            <div className="absolute inset-0 bg-white/72" />

            <div className={`${containerClass} relative py-20 md:py-24`}>
                <div className="delta-aurora absolute inset-0 opacity-70" />
                <BrandOrbitCluster className="pointer-events-none absolute -right-14 -top-10 hidden h-[240px] w-[300px] opacity-[0.42] md:block md:-right-24 md:-top-16 md:h-[320px] md:w-[400px]" />
                <div className="relative max-w-full">
                    <h2 className="font-[var(--font-raleway)] text-4xl font-semibold md:text-[58px]">
                        Мы проектируем
                    </h2>
                    <p className="mt-4 text-base text-black/62 md:text-[22px]">
                        Театры, учебные пространства и спортивные объекты. Откройте карточку, чтобы посмотреть фото реализованных площадок и список объектов по направлению.
                    </p>
                </div>
                <div className="relative mt-10 md:mt-12">
                    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
                        {projectCategories.map((item, idx) => (
                            <motion.button
                                key={item.id}
                                type="button"
                                onClick={() => openCategoryModal(item)}
                                variants={rise}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                custom={0.1 + idx * 0.08}
                                className="group min-w-[85%] snap-start overflow-hidden rounded-[28px] border border-black/8 bg-white text-left shadow-[0_16px_36px_rgba(17,24,39,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(17,24,39,0.12)] md:min-w-0"
                            >
                                <div className="relative h-[280px] md:h-[340px]">
                                    <Image
                                        src={item.coverImage}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 86vw, 30vw"
                                        className="object-cover transition duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/22 to-transparent" />

                                    <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-delta-blue md:text-xs">
                                        {item.badge}
                                    </div>

                                    <div className="absolute inset-x-4 bottom-5 text-white">
                                        <h3 className="text-[24px] font-semibold leading-[1.05] md:text-[34px]">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-5 md:px-5 md:py-5">
                                    <p className="text-[15px] leading-relaxed text-black/65 md:text-[16px]">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
