"use client";

import Image from "next/image";
import { useModalActions } from "@/components/ModalProvider";

export const Header = () => {
    const { openContactModal } = useModalActions();

    return (
        <header className="fixed inset-x-0 top-0 z-50 transition duration-300">
            <div className="mx-auto mt-4 w-full max-w-[860px] px-4 md:px-6">
                <div className="rounded-full border border-white/14 bg-[rgba(14,19,40,0.72)] shadow-[0_18px_44px_rgba(8,12,28,0.28)] backdrop-blur-xl">
                    <div className="flex h-[62px] items-center justify-between gap-3 px-4 md:h-[74px] md:justify-center md:gap-12 md:px-10">
                        <button
                            type="button"
                            onClick={openContactModal}
                            className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-white px-4 text-[13px] font-semibold text-delta-blue shadow-lg shadow-black/10 transition hover:bg-delta-fog active:scale-[0.98] md:hidden"
                        >
                            Обсудить проект‚
                        </button>

                        <nav className="hidden items-center justify-center gap-6 text-[15px] font-medium text-white/74 md:flex lg:gap-8 lg:text-[17px]">
                            <a href="#about" className="navbar transition hover:text-white">О компании</a>
                            <a href="#projects" className="navbar transition hover:text-white">Мы проектируем</a>
                            <a href="#partners" className="navbar transition hover:text-white">Партнеры</a>
                            <a href="#footer" className="navbar transition hover:text-white">Контакты</a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
