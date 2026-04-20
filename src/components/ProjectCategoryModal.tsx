"use client";

import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import type { ProjectCard } from "@/types/site-content";

interface ProjectCategoryModalProps {
    category: ProjectCard | null;
    isOpen: boolean;
    closeModal: () => void;
}

export function ProjectCategoryModal({ category, isOpen, closeModal }: ProjectCategoryModalProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!category) {
        return null;
    }

    const gallery = category.gallery.length
        ? category.gallery
        : [
              {
                  id: `${category.id}-fallback`,
                  src: category.coverImage,
                  objectName: category.title
              }
          ];
    const activePhoto = gallery[Math.min(activeIndex, gallery.length - 1)];
    const hasMultiplePhotos = gallery.length > 1;

    const goPrev = () => setActiveIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
    const goNext = () => setActiveIndex((current) => (current === gallery.length - 1 ? 0 : current + 1));

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[110]" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-3 md:p-6">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-3 scale-95"
                            enterTo="opacity-100 translate-y-0 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 scale-100"
                            leaveTo="opacity-0 translate-y-3 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-[1180px] overflow-hidden rounded-[32px] border border-black/10 bg-delta-paper shadow-2xl">
                                <div className="flex items-center justify-between border-b border-black/8 px-5 py-4 md:px-8 md:py-5">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-delta-blue/70">
                                            {category.badge}
                                        </p>
                                        <Dialog.Title className="mt-2 font-[var(--font-raleway)] text-2xl font-semibold text-delta-ink md:text-[34px]">
                                            {category.title}
                                        </Dialog.Title>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04] text-xl text-black/45 transition hover:text-black"
                                    >
                                        x
                                    </button>
                                </div>

                                <div className="p-4 md:p-6">
                                    <div className="grid gap-0">
                                        <div className="relative overflow-hidden rounded-[28px] bg-black/5">
                                            <div className="relative aspect-[16/9] md:aspect-[21/9]">
                                                <Image
                                                    src={activePhoto.src}
                                                    alt={activePhoto.objectName}
                                                    fill
                                                    priority
                                                    sizes="(max-width: 1180px) 100vw, 1180px"
                                                    className="object-cover"
                                                />
                                            </div>

                                            {hasMultiplePhotos ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={goPrev}
                                                        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-delta-ink shadow-lg transition hover:scale-105 hover:bg-white"
                                                    >
                                                        {"<"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={goNext}
                                                        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-delta-ink shadow-lg transition hover:scale-105 hover:bg-white"
                                                    >
                                                        {">"}
                                                    </button>
                                                </>
                                            ) : null}
                                        </div>

                                        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
                                                    Объект на фото
                                                </p>
                                                <p className="mt-2 text-[20px] font-medium leading-tight text-delta-ink md:text-[28px]">
                                                    {activePhoto.objectName}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
                                                    О направлении
                                                </p>
                                                <p className="mt-2 text-sm leading-relaxed text-black/60">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-10 border-t border-black/5 pt-8">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
                                                Все реализованные объекты
                                            </p>
                                            {category.objectNames.length ? (
                                                <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
                                                    {category.objectNames.map((name, index) => (
                                                        <li key={`${name}-${index}`} className="flex items-start text-[14px] leading-snug text-black/80">
                                                            <span className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-delta-blue/40" />
                                                            {name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="mt-4 text-sm leading-relaxed text-black/50">
                                                    Список объектов для этого раздела пока не заполнен.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
