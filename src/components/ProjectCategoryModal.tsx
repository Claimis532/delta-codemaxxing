"use client";

import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { type ProjectCategory } from "@/constants/content";

interface ProjectCategoryModalProps {
    category: ProjectCategory | null;
    isOpen: boolean;
    closeModal: () => void;
}

export function ProjectCategoryModal({ category, isOpen, closeModal }: ProjectCategoryModalProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveIndex(0);
    }, [category?.id, isOpen]);

    if (!category) {
        return null;
    }

    const activePhoto = category.gallery[activeIndex];
    const hasMultiplePhotos = category.gallery.length > 1;

    const goPrev = () => setActiveIndex((current) => (current === 0 ? category.gallery.length - 1 : current - 1));
    const goNext = () => setActiveIndex((current) => (current === category.gallery.length - 1 ? 0 : current + 1));

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
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
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
                                        ×
                                    </button>
                                </div>

                                <div className="p-4 md:p-6">
                                    <div className="grid gap-0">
                                        <div className="relative overflow-hidden rounded-[28px] bg-black/5">
                                            <div className="relative aspect-[4/3]">
                                                <Image
                                                    src={activePhoto.src}
                                                    alt={activePhoto.objectName}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 65vw"
                                                    className="object-cover"
                                                />
                                            </div>

                                            {hasMultiplePhotos && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={goPrev}
                                                        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-delta-ink shadow-lg transition hover:scale-105 hover:bg-white"
                                                    >
                                                        ←
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={goNext}
                                                        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-delta-ink shadow-lg transition hover:scale-105 hover:bg-white"
                                                    >
                                                        →
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
                                                    Объект
                                                </p>
                                                <p className="mt-2 max-w-[820px] text-[24px] font-semibold leading-tight text-delta-ink md:text-[36px]">
                                                    {activePhoto.objectName}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
                                                    Описание категории
                                                </p>
                                                <p className="mt-3 text-sm leading-relaxed text-black/62 md:text-base">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
                                                Объекты категории
                                            </p>
                                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                                {category.objectNames.map((name) => (
                                                    <div key={name} className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm text-black/78">
                                                        {name}
                                                    </div>
                                                ))}
                                            </div>
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
