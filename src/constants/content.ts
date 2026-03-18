export const designDirections = [
    {
        title: "Театры и дворцы культуры",
        description: "Проектирование сценических, световых, звуковых и мультимедийных систем для учреждений культуры."
    },
    { title: "Школы", description: "Технологические решения для актовых залов, образовательных пространств и систем оповещения." },
    { title: "Спортивные объекты", description: "Оснащение арен и комплексов с учетом регламентов соревнований и эксплуатационных сценариев." }
];

export const lifecycleSteps = [
    { id: 1, title: "Сбор данных по объекту", icon: "collect", x: 39, y: 26 },
    { id: 2, title: "Расчет стоимости и заключение договора", icon: "contract", x: 72, y: 26 },
    { id: 3, title: "Проектирование", icon: "design", x: 28.5, y: 48.7 },
    { id: 4, title: "Сопровождение экспертизы", icon: "expertise", x: 56, y: 61 },
    { id: 5, title: "Выдача проектно-сметной документации", icon: "supervise", x: 37, y: 73.8 },
    { id: 6, title: "Сопровождение проекта (авторский надзор)", icon: "docs", x: 29.3, y: 90 },
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
    { id: 1, x: 46.5, y: 22.7 },
    { id: 2, x: 68.1, y: 29 },
    { id: 3, x: 47.3, y: 51.5 },
    { id: 4, x: 52, y: 63.5 },
    { id: 5, x: 56.5, y: 77 },
    { id: 6, x: 37, y: 86.5 },
];