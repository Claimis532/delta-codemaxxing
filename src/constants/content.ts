export const designDirections = [
    {
        title: "Театры и дворцы культуры",
        description: "Проектирование сценических, световых, звуковых и мультимедийных систем для учреждений культуры."
    },
    { title: "Школы", description: "Технологические решения для актовых залов, образовательных пространств и систем оповещения." },
    { title: "Спортивные объекты", description: "Оснащение арен и комплексов с учетом регламентов соревнований и эксплуатационных сценариев." }
];

export const lifecycleSteps = [
    { id: 1, title: "Сбор данных по объекту", icon: "collect", x: 26, y: 20 },
    { id: 2, title: "Расчет стоимости и заключение договора", icon: "contract", x: 71, y: 38 },
    { id: 3, title: "Проектирование", icon: "design", x: 28, y: 53 },
    { id: 4, title: "Сопровождение экспертизы", icon: "expertise", x: 69, y: 65 },
    { id: 5, title: "Выдача ПСД", icon: "docs", x: 28, y: 81 },
    { id: 6, title: "Авторский надзор", icon: "supervise", x: 68, y: 88 }
] as const;

export const materials = [
    {
        title: "Референс 2021-2025 гг. (СПОРТ)",
        type: "DOCX",
        description: "Референс-лист выполненных проектов ООО «Центр проектирования Дельта».",
        image: "./assets/project-mfus.png",
        href: "./docs/reference-2021-2025-sport.docx",
        cta: "Открыть референс"
    },
    {
        title: "Брендбук TVAYT",
        type: "PDF",
        description: "Фирменная айдентика: логотип, цвета, шрифты, паттерны и правила использования.",
        image: "./assets/cover-brandbook.png",
        href: "./docs/brandbook-tvayt.pdf",
        cta: "Открыть брендбук"
    },
    {
        title: "Портфолио 2025",
        type: "PDF",
        description: "Ключевые объекты, реализованные кейсы и визуальные примеры оснащения площадок.",
        image: "./assets/cover-portfolio.png",
        href: "./docs/portfolio-2025-web.pdf",
        cta: "Открыть портфолио"
    },
] as const;

export const benefits = [
    { title: "Опыт по всей России", icon: "map" },
    { title: "Сильная команда", icon: "like" },
    { title: "Качество", icon: "award" }
] as const;

export const containerClass = "mx-auto w-full max-w-[1120px] px-5 md:px-8";

export const processDots = [
    { id: 1, x: 44, y: 22 },
    { id: 2, x: 55, y: 34 },
    { id: 3, x: 46, y: 53 },
    { id: 4, x: 54, y: 68 },
    { id: 5, x: 42, y: 81 },
    { id: 6, x: 56, y: 88 }
];