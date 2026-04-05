import { containerClass } from "@/constants/content";

interface HeaderProps {
    onPortfolioClick: () => void;
}

export const Header = ({ onPortfolioClick }: HeaderProps) => (
    <>
        <button
            type="button"
            onClick={onPortfolioClick}
            className="fixed right-3 top-4 z-[80] flex items-center gap-2 rounded-full border border-[rgba(38,38,116,0.20)] bg-[linear-gradient(135deg,var(--delta-blue),var(--delta-violet))] px-3.5 py-2 text-[14px] font-semibold text-white shadow-[0_16px_32px_rgba(38,38,116,0.24)] transition hover:translate-y-[-1px] md:right-7 md:top-5 md:px-6 md:py-3.5 md:text-[18px]"
        >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/80" />
            <span>Портфолио</span>
        </button>

        <header className="sticky top-0 z-50 border-b border-black/10 bg-[rgba(243,243,245,0.94)] backdrop-blur-md">
            <div className={`${containerClass} flex h-[82px] items-center justify-between pr-24 md:h-[108px] md:pr-44`}>
                <a href="#about" className="flex items-center">
                    <img src="./assets/logo-horizontal.png" alt="Логотип" className="h-[48px] w-auto object-contain md:h-[76px]" />
                </a>
                <nav className="hidden items-center gap-8 text-[17px] font-medium text-black/70 md:flex lg:gap-10 lg:text-[19px]">
                    <a href="#about" className="transition hover:text-black">О компании</a>
                    <a href="#projects" className="transition hover:text-black">Мы проектируем</a>
                    <a href="#materials" className="transition hover:text-black">Материалы</a>
                    <a href="#partners" className="transition hover:text-black">Партнеры</a>
                </nav>
            </div>
        </header>
    </>
);
