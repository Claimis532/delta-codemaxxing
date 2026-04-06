"use client";

import { useEffect, useState } from "react";

export const Header = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 24);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
            }`}
        >
            <div className="mx-auto mt-4 w-full max-w-[860px] px-4 md:px-6">
                <div className="rounded-full border border-white/14 bg-[rgba(14,19,40,0.72)] shadow-[0_18px_44px_rgba(8,12,28,0.28)] backdrop-blur-xl">
                    <div className="flex h-[62px] items-center justify-center gap-8 px-6 md:h-[74px] md:gap-12 md:px-10">
                        <a href="#about" className="flex shrink-0 items-center">
                            <img src="./assets/logo-horizontal.png" alt="Логотип" className="h-[34px] w-auto object-contain brightness-0 invert md:h-[46px]" />
                        </a>

                        <nav className="hidden items-center justify-center gap-6 text-[15px] font-medium text-white/74 md:flex lg:gap-8 lg:text-[17px]">
                            <a href="#about" className="transition hover:text-white">О компании</a>
                            <a href="#projects" className="transition hover:text-white">Мы проектируем</a>
                            <a href="#partners" className="transition hover:text-white">Партнеры</a>
                            <a href="#footer" className="transition hover:text-white">Контакты</a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
