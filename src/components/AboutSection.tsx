import Image from "next/image";
import { motion } from "framer-motion";
import { rise } from "@/lib/animation";
import { containerClass } from "@/constants/content";

const collagePhotos = [
    {
        src: "/assets/photoOBJ/withPepople/центр культуры и искусства.jpg",
        alt: "Выступление в культурном центре"
    },
    {
        src: "/assets/photoOBJ/withPepople/дворец культуры ирбит.jpg",
        alt: "Выступление во дворце культуры"
    },
    {
        src: "/assets/photoOBJ/withPepople/гор дворец детского и юнош творч.jpg",
        alt: "Выступление на сцене детского дворца творчества"
    },
    {
        src: "/assets/photoOBJ/withPepople/центр худож и эстет.jpg",
        alt: "Сцена с артистами и зрительным залом"
    }
] as const;

export const AboutSection = () => (
    <section id="about" className="scroll-mt-28 relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            {collagePhotos.map((photo) => (
                <div key={photo.src} className="relative min-h-[240px] overflow-hidden md:min-h-[50svh]">
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="50vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/28" />
                </div>
            ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.46)_62%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,14,0.28)_0%,rgba(6,8,14,0.12)_24%,rgba(6,8,14,0.16)_62%,rgba(6,8,14,0.34)_100%)]" />

        <div className={`${containerClass} relative flex min-h-[105svh] items-center justify-center py-20 md:min-h-[112svh] md:py-24`}>
            <motion.div
                className="mx-auto max-w-[840px] text-center text-white"
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                custom={0.08}
            >
                <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-white/72 md:text-[18px]">
                    ЦП Дельта
                </p>
                <h2 className="mx-auto mt-5 max-w-[860px] font-[var(--font-raleway)] text-[42px] font-semibold leading-[0.96] tracking-[-0.03em] md:text-[82px]">
                    Проектируем
                    <span className="block">пространства, которые оживают</span>
                </h2>
                <div className="mx-auto mt-8 max-w-[780px] space-y-4 text-[18px] leading-[1.45] text-white/86 md:text-[30px]">
                    <p>
                        Мы создаем проектную, рабочую и сметную документацию для театров, спортивных комплексов, учебных
                        пространств и культурных объектов.
                    </p>
                </div>
            </motion.div>
        </div>
    </section>
);
