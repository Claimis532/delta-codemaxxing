import { containerClass } from "@/constants/content";

interface HeaderProps {
    onPortfolioClick: () => void;
}

export const Header = ({ onPortfolioClick }: HeaderProps) => (
    <>
        {/* Плавающая кнопка */}
        <button
            type="button"
            onClick={onPortfolioClick}
            className="fixed right-3 top-3 z-[80] flex items-center gap-2 rounded-full border border-[rgba(38,38,116,0.20)] bg-[linear-gradient(135deg,var(--delta-blue),var(--delta-violet))] px-3 py-2 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(38,38,116,0.24)] transition hover:translate-y-[-1px] md:right-6 md:top-4 md:px-4 md:py-2.5"
        >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/80" />
            <span>Портфолио</span>
        </button>

        {/* Основной Header */}
        <header className="sticky top-0 z-50 border-b border-black/10 bg-[rgba(241,241,241,0.9)] backdrop-blur">
            <div className={`${containerClass} flex h-16 items-center justify-between pr-20 md:h-20 md:pr-40`}>
                <a href="#about" className="flex items-center">
                    <img src="./assets/logo-horizontal.png" alt="Логотип" className="h-9 w-auto object-contain md:h-11" />
                </a>
                <nav className="hidden items-center gap-5 text-sm font-medium text-black/70 md:flex">
                    <a href="#about" className="transition hover:text-black">О компании</a>
                    <a href="#projects" className="transition hover:text-black">Мы проектируем</a>
                    <a href="#materials" className="transition hover:text-black">Материалы</a>
                    <a href="#partners" className="transition hover:text-black">Партнеры</a>
                </nav>
            </div>
        </header>
    </>
);