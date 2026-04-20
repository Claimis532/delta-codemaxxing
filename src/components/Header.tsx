"use client";

import Image from "next/image";
import { useState } from "react";
import { useModalActions } from "@/components/ModalProvider";

const navigationItems = [
    { href: "#about", label: "О компании", type: "link" },
    { href: "#projects", label: "Мы проектируем", type: "link" },
    { href: "#advantages", label: "Преимущества", type: "link" },
    { href: "#footer", label: "Контакты", type: "link" },
    { href: "#contact", label: "Обсудить проект", type: "action" }
] as const;

export const Header = () => {
    const { openContactModal } = useModalActions();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleOpenContactModal = () => {
        setIsMenuOpen(false);
        openContactModal();
    };

    const handleToggleMenu = () => {
        setIsMenuOpen((currentState) => !currentState);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[linear-gradient(180deg,rgba(9,12,22,0.9)_0%,rgba(9,12,22,0.76)_100%)] backdrop-blur-md transition duration-300">
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="flex h-[72px] items-center justify-between gap-4 md:h-[78px] md:justify-center md:gap-10">
                    <a
                        href="#about"
                        className="flex items-center md:absolute md:left-8"
                        aria-label="На первый экран"
                        onClick={handleCloseMenu}
                    >
                        <Image
                            src="/assets/logo-horizontal.png"
                            alt="Логотип"
                            width={160}
                            height={56}
                            className="h-[46px] w-auto object-contain brightness-0 invert md:h-[44px]"
                            priority
                        />
                    </a>

                    <nav className="hidden items-center justify-center gap-2 text-[15px] font-semibold text-white md:flex lg:text-[17px]">
                        {navigationItems.map((item) => (
                            item.type === "action" ? (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={handleOpenContactModal}
                                    className="header-link navbar px-4 py-2 text-white"
                                >
                                    {item.label}
                                </button>
                            ) : (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="header-link navbar px-4 py-2 text-white"
                                >
                                    {item.label}
                                </a>
                            )
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            type="button"
                            onClick={handleToggleMenu}
                            className="header-link inline-flex h-11 w-11 items-center justify-center text-white"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-navigation"
                            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                        >
                            <span className="flex w-5 flex-col gap-1.5">
                                <span className={`block h-[1.5px] w-full rounded-full bg-white transition ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                                <span className={`block h-[1.5px] w-full rounded-full bg-white transition ${isMenuOpen ? "opacity-0" : ""}`} />
                                <span className={`block h-[1.5px] w-full rounded-full bg-white transition ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                            </span>
                        </button>
                    </div>
                </div>

                <div
                    id="mobile-navigation"
                    className={`overflow-hidden transition-all duration-300 md:hidden ${isMenuOpen ? "max-h-[360px] pb-4 opacity-100" : "max-h-0 opacity-0"}`}
                >
                    <div className="px-0 pt-1">
                        <nav className="flex flex-col gap-1">
                            {navigationItems.map((item) => (
                                item.type === "action" ? (
                                    <button
                                        key={item.label}
                                        type="button"
                                        onClick={handleOpenContactModal}
                                        className="header-link px-4 py-3 text-left text-[15px] font-medium text-white"
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={handleCloseMenu}
                                        className="header-link px-4 py-3 text-[15px] font-medium text-white"
                                    >
                                        {item.label}
                                    </a>
                                )
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
