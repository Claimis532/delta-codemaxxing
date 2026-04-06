export interface ProjectGalleryItem {
    src: string;
    objectName: string;
}

export interface ProjectCategory {
    id: "culture" | "schools" | "sports";
    title: string;
    description: string;
    badge: string;
    cta: string;
    coverImage: string;
    objectNames: string[];
    gallery: ProjectGalleryItem[];
}

export const projectCategories: ProjectCategory[] = [
    {
        id: "culture",
        title: "Театры и дворцы культуры",
        description: "Проектирование сценических, световых, звуковых и мультимедийных систем для учреждений культуры.",
        badge: "Культура",
        cta: "Подробнее",
        coverImage: "/assets/photoOBJ/withPepople/центр культуры и искусства.jpg",
        objectNames: [
            "Ачитский районный дом культуры, г. Ачит",
            "Городской Дворец детского и юношеского творчества, г. Нижний Тагил",
            "Дворец «Заря», Екатеринбург",
            "Дворец Культуры им. В.К. Костевича, г. Ирбит",
            "Дворец Культуры Ровесник, г. Заречный, Малый зал",
            "Екатеринбургский театр кукол",
            "Социально-культурно-досуговый центр «Современник», г. Лесной, Свердловская область",
            "Центр культуры и искусства ГО Рефтинский",
            "Челябинский государственный академический театр драмы имени Наума Орлова"
        ],
        gallery: [
            {
                src: "/assets/photoOBJ/withPepople/центр культуры и искусства.jpg",
                objectName: "Центр культуры и искусства ГО Рефтинский"
            },
            {
                src: "/assets/photoOBJ/withPepople/дворец культуры ирбит.jpg",
                objectName: "Дворец Культуры им. В.К. Костевича, г. Ирбит"
            },
            {
                src: "/assets/photoOBJ/scene/театр кукол.jpg",
                objectName: "Екатеринбургский театр кукол"
            },
            {
                src: "/assets/photoOBJ/scene/соц культурно досуговый центр.jpg",
                objectName: "Социально-культурно-досуговый центр «Современник», г. Лесной"
            },
            {
                src: "/assets/photoOBJ/scene/соц культурно досуговый центр2.jpg",
                objectName: "Социально-культурно-досуговый центр «Современник», г. Лесной"
            },
            {
                src: "/assets/photoOBJ/withPepople/челяб госу академ.jpg",
                objectName: "Челябинский государственный академический театр драмы имени Наума Орлова"
            },
            {
                src: "/assets/photoOBJ/scene/челяб госу академ2.jpg",
                objectName: "Челябинский государственный академический театр драмы имени Наума Орлова"
            }
        ]
    },
    {
        id: "schools",
        title: "Школы",
        description: "Технологические решения для актовых залов, образовательных пространств и систем оповещения.",
        badge: "Образование",
        cta: "Подробнее",
        coverImage: "/assets/photoOBJ/scene/урал губер лицей.jpg",
        objectNames: [
            "Музыкальная школа г. Когалым",
            "Уральский губернаторский лицей, г. Екатеринбург",
            "Центр художественной и эстетической гимнастики, Екатеринбург"
        ],
        gallery: [
            {
                src: "/assets/photoOBJ/scene/урал губер лицей.jpg",
                objectName: "Уральский губернаторский лицей, г. Екатеринбург"
            },
            {
                src: "/assets/photoOBJ/withPepople/центр худож и эстет.jpg",
                objectName: "Центр художественной и эстетической гимнастики, Екатеринбург"
            }
        ]
    },
    {
        id: "sports",
        title: "Спортивные объекты",
        description: "Оснащение арен и комплексов с учетом регламентов соревнований и эксплуатационных сценариев.",
        badge: "Спорт",
        cta: "Подробнее",
        coverImage: "/assets/photoOBJ/withPepople/гор дворец детского и юнош творч.jpg",
        objectNames: [
            "Синара Центр, г. Екатеринбург",
            "Академический районный суд, г. Екатеринбург",
            "бар Секта, г. Екатеринбург"
        ],
        gallery: [
            {
                src: "/assets/photoOBJ/withPepople/гор дворец детского и юнош творч.jpg",
                objectName: "Многофункциональная площадка с массовыми мероприятиями"
            },
            {
                src: "/assets/photoOBJ/withPepople/центр культуры и искусства.jpg",
                objectName: "Пример сцены для событийных и спортивных площадок"
            }
        ]
    }
] as const;

export const lifecycleSteps = [
    { id: 1, title: "Сбор данных по объекту", icon: "collect" },
    { id: 2, title: "Расчет стоимости и заключение договора", icon: "contract" },
    { id: 3, title: "Проектирование", icon: "design" },
    { id: 4, title: "Сопровождение экспертизы", icon: "expertise" },
    { id: 5, title: "Выдача ПСД", icon: "docs" },
    { id: 6, title: "Авторский надзор", icon: "supervise" }
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

export const containerClass = "mx-auto w-full max-w-[1020px] px-5 md:px-8";
