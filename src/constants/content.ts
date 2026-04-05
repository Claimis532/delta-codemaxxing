export const designDirections = [
    {
        title: "Театры и дворцы культуры",
        description: "Проектирование сценических, световых, звуковых и мультимедийных систем для учреждений культуры."
    },
    { title: "Школы", description: "Технологические решения для актовых залов, образовательных пространств и систем оповещения." },
    { title: "Спортивные объекты", description: "Оснащение арен и комплексов с учетом регламентов соревнований и эксплуатационных сценариев." }
];

export const lifecycleSteps = [
    { id: 1, title: "Сбор данных по объекту", icon: "collect" },
    { id: 2, title: "Расчет стоимости и заключение договора", icon: "contract" },
    { id: 3, title: "Проектирование", icon: "design" },
    { id: 4, title: "Сопровождение экспертизы", icon: "expertise" },
    { id: 5, title: "Выдача ПСД", icon: "docs" },
    { id: 6, title: "Авторский надзор", icon: "supervise" }
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

export const partnerBrands = [
    { name: "ADB", image: "./assets/partners/ADB.png" },
    { name: "Clay Paky", image: "./assets/partners/claypaky.png" },
    { name: "DTS", image: "./assets/partners/DTS.png" },
    { name: "NG", image: "./assets/partners/NG.png" },
    { name: "Silver Star", image: "./assets/partners/SS.png" }
] as const;

export const containerClass = "mx-auto w-full max-w-[1120px] px-5 md:px-8";
