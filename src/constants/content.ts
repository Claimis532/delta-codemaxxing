export const designDirections = [
    {
        title: "Театры и дворцы культуры",
        description: "Проектирование сценических, световых, звуковых и мультимедийных систем для учреждений культуры."
    },
    { title: "Школы", description: "Технологические решения для актовых залов, образовательных пространств и систем оповещения." },
    { title: "Спортивные объекты", description: "Оснащение арен и комплексов с учетом регламентов соревнований и эксплуатационных сценариев." }
];

export const lifecycleSteps = [
    { id: 1, title: "Сбор данных по объекту", icon: "collect", x: 14, y: 17 },
    { id: 2, title: "Расчет стоимости и заключение договора", icon: "contract", x: 72, y: 26 },
    { id: 3, title: "Проектирование", icon: "design", x: 24, y: 45 },
    { id: 4, title: "Сопровождение экспертизы", icon: "expertise", x: 57, y: 61 },
    { id: 5, title: "Выдача проектно-сметной документации", icon: "supervise", x: 33, y: 74 },
    { id: 6, title: "Сопровождение проекта (авторский надзор)", icon: "docs", x: 26, y: 90 },
] as const;

export const materials = [
    { title: "Референс 2021-2025", type: "DOCX", description: "...", image: "./assets/project-mfus.png", href: "#", cta: "Открыть" },
] as const;

export const benefits = [
    { title: "Опыт по всей России", icon: "map" },
    { title: "Сильная команда", icon: "like" },
    { title: "Качество", icon: "award" }
] as const;

export const containerClass = "mx-auto w-full max-w-[1120px] px-5 md:px-8";

export const processDots = [
    { id: 1, x: 37, y: 20 },
    { id: 2, x: 68, y: 29 },
    { id: 3, x: 48, y: 48 },
    { id: 4, x: 52, y: 64 },
    { id: 5, x: 56, y: 77 },
    { id: 6, x: 35, y: 86 },
];