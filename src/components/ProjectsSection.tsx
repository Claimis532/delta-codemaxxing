"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { rise } from "@/lib/animation";
import { containerClass } from "@/constants/content";
import { BrandOrbitCluster } from "@/components/BrandDecor";
import { useModalActions } from "@/components/ModalProvider";
import type { ProjectsSectionContent } from "@/types/site-content";

function CarouselArrow({
    direction,
    onClick,
    hidden
}: {
    direction: "left" | "right";
    onClick: () => void;
    hidden?: boolean;
}) {
    const isLeft = direction === "left";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white text-delta-ink shadow-[0_14px_30px_rgba(17,24,39,0.12)] transition hover:-translate-y-0.5 hover:bg-white ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
            aria-label={isLeft ? "Прокрутить влево" : "Прокрутить вправо"}
            aria-hidden={hidden}
            tabIndex={hidden ? -1 : 0}
        >
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                    d={isLeft ? "M11 4L6 9L11 14" : "M7 4L12 9L7 14"}
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}

export const ProjectsSection = ({ projects }: { projects: ProjectsSectionContent }) => {
    const { openCategoryModal } = useModalActions();
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        const container = carouselRef.current;

        if (!container) {
            return;
        }

        const updateScrollState = () => {
            const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);

            setCanScrollLeft(container.scrollLeft > 8);
            setCanScrollRight(container.scrollLeft < maxScrollLeft - 8);
        };

        updateScrollState();
        container.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);

        return () => {
            container.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [projects.cards.length]);

    const scrollCarousel = (direction: "left" | "right") => {
        const container = carouselRef.current;

        if (!container) {
            return;
        }

        const firstCard = container.querySelector<HTMLElement>("[data-project-card='true']");
        const cardWidth = firstCard?.offsetWidth ?? 320;
        const gap = 16;
        const delta = cardWidth + gap;

        container.scrollBy({
            left: direction === "left" ? -delta : delta,
            behavior: "smooth"
        });
    };

    return (
        <section id="projects" className="scroll-mt-24 relative overflow-hidden border-b border-black/10 bg-[rgba(38,38,116,0.03)] md:overflow-visible">
            <div className="absolute inset-0 blueprint-grid" />
            <div className="absolute inset-0 bg-white/72" />

            <div className={`${containerClass} relative py-20 md:py-24`}>
                <div className="delta-aurora absolute inset-0 opacity-70" />
                <BrandOrbitCluster className="pointer-events-none absolute -right-14 -top-10 hidden h-[240px] w-[300px] opacity-[0.42] md:block md:-right-24 md:-top-16 md:h-[320px] md:w-[400px]" />
                <div className="relative max-w-full">
                    <h2 className="font-[var(--font-raleway)] text-4xl font-semibold md:text-[58px]">
                        {projects.title}
                    </h2>
                    <p className="mt-4 text-base text-black/62 md:text-[22px]">
                        {projects.description}
                    </p>
                </div>
                <div className="relative mt-10 md:mt-12">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden items-center md:flex">
                        <div className="pointer-events-auto translate-x-4">
                            <CarouselArrow direction="left" onClick={() => scrollCarousel("left")} hidden={!canScrollLeft} />
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden items-center md:flex">
                        <div className="pointer-events-auto -translate-x-4">
                            <CarouselArrow direction="right" onClick={() => scrollCarousel("right")} hidden={!canScrollRight} />
                        </div>
                    </div>
                    <div
                        ref={carouselRef}
                        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8"
                    >
                        {projects.cards.map((item, index) => (
                            <motion.button
                                key={item.id}
                                data-project-card="true"
                                type="button"
                                onClick={() => {
                                    if (!item.isPlaceholder) {
                                        openCategoryModal(item);
                                    }
                                }}
                                variants={rise}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                custom={0.1 + index * 0.08}
                                aria-disabled={item.isPlaceholder}
                                className={`group min-w-[85%] snap-start overflow-hidden rounded-[28px] border border-black/8 bg-white text-left shadow-[0_16px_36px_rgba(17,24,39,0.08)] transition md:min-w-[47%] lg:min-w-[31%] ${item.isPlaceholder ? "cursor-default" : "hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(17,24,39,0.12)]"}`}
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

                                <div className="relative p-5 pr-20 md:px-5 md:py-5 md:pr-20">
                                    <p className="text-[15px] leading-relaxed text-black/65 md:text-[16px]">
                                        {item.description}
                                    </p>

                                    {!item.isPlaceholder ? (
                                        <div className="absolute bottom-6 right-5 inline-flex items-center justify-center text-delta-blue drop-shadow-[0_10px_20px_rgba(255,255,255,0.85)]">
                                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                                <path d="M5 15L15 5M8 5H15V12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    ) : null}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
