export interface ProjectGalleryItem {
    src: string;
    objectName: string;
}

export interface ProjectCategory {
    id: "culture" | "schools" | "sports";
    title: string;
    description: string;
    badge: string;
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
        coverImage: "/assets/photoOBJ/culture/дворец культуры ирбит.jpg",
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
                src: "/assets/photoOBJ/culture/дворец культуры ирбит.jpg",
                objectName: "Дворец Культуры им. В.К. Костевича, г. Ирбит"
            },
            {
                src: "/assets/photoOBJ/culture/синара центр.jpg",
                objectName: "Центр культуры и искусства ГО Рефтинский"
            },
            {
                src: "/assets/photoOBJ/culture/театр кукол.jpg",
                objectName: "Екатеринбургский театр кукол"
            },
            {
                src: "/assets/photoOBJ/culture/соц культурно досуговый центр.jpg",
                objectName: "Социально-культурно-досуговый центр «Современник», г. Лесной"
            },
            {
                src: "/assets/photoOBJ/culture/соц культурно досуговый центр2.jpg",
                objectName: "Социально-культурно-досуговый центр «Современник», г. Лесной"
            },
            {
                src: "/assets/photoOBJ/culture/челяб гос театр.jpg",
                objectName: "Челябинский государственный академический театр драмы имени Наума Орлова"
            },
            {
                src: "/assets/photoOBJ/culture/челяб госу академ2.jpg",
                objectName: "Челябинский государственный академический театр драмы имени Наума Орлова"
            }
        ]
    },
    {
        id: "schools",
        title: "Школы",
        description: "Технологические решения для актовых залов, образовательных пространств и систем оповещения.",
        badge: "Образование",
        coverImage: "/assets/photoOBJ/schools/glavnaya.jpg",
        objectNames: [
            "«Губернаторский лицей» г. Екатеринбург",
            "Лицей №88 г. Екатеринбург",
            "Гимназия №5 г. Екатеринбург",
            "Гимназия №35 г. Екатеринбург",
            "Гимназия №39 г. Екатеринбург",
            "Гимназия №104 г. Екатеринбург",
            "Гимназия №120 г. Екатеринбург",
            "Гимназия №155 г. Екатеринбург",
            "Школа №1 г. Екатеринбург",
            "Школа №16 г. Екатеринбург",
            "Школа №18 г. Екатеринбург",
            "Школа №19 г. Екатеринбург",
            "Школа №23 г. Екатеринбург",
            "Школа №31 г. Екатеринбург",
            "Школа №79 г. Екатеринбург",
            "Школа №80 г. Екатеринбург",
            "Школа №87 г. Екатеринбург",
            "Школа №123 г. Екатеринбург",
            "Школа №167 г. Екатеринбург",
            "Школа №173 г. Екатеринбург",
            "Школа №181 г. Екатеринбург",
            "Школа №184 г. Екатеринбург",
            "Школа №200 г. Екатеринбург",
            "Школа №215 г. Екатеринбург",
            "Школа №300 г. Екатеринбург",
            "Школа №314 г. Екатеринбург",
            "Школа №45 г. Березовский",
            "Школа №55 г. Березовский",
            "Школа №2 г. Кировград",
            "Школа №4 г. Арамиль",
            "Школа №6 г. Невьянск",
            "Школа №22 г. Верхняя Пышма",
            "Школа №25 г. Верхняя Пышма",
            "Школа №33 г. Верхняя Пышма",
            "Школа №100 г. Нижний Тагил",
            "Школа «Пышминская СОШ», п.г.т. Пышма"
        ],
        gallery: [
            { src: "/assets/photoOBJ/schools/glavnaya.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/001.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/003.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/007.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/008.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/011.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Лицей 173_3.jpeg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Лицей173_1.jpeg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/муз школа когалым.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/ш120_1.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш120_2.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш120_5.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш123_1.jpeg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш123_2.jpeg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш123_5.jpeg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш123_6.jpeg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш31_1.jpeg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш31_2.jpeg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш31_6.jpeg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш45_Береза3.1.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш45_Береза3.2.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш45_Береза9.jpg", objectName: "Школьный объект" },
            { src: "/assets/photoOBJ/schools/Ш55_Береза1.jpeg", objectName: "Школьный объект" }
        ]
    },
    {
        id: "sports",
        title: "Спортивные объекты",
        description: "Оснащение арен и комплексов с учетом регламентов соревнований и эксплуатационных сценариев.",
        badge: "Спорт",
        coverImage: "/assets/photoOBJ/sport/Дворец дзюдо.jpg",
        objectNames: [
            "Дворец дзюдо"
        ],
        gallery: [
            {
                src: "/assets/photoOBJ/sport/Дворец дзюдо.jpg",
                objectName: "Дворец дзюдо"
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

export const partnerBrands = [
    { name: "ADB", image: "/assets/partners/ADB.png" },
    { name: "Cinematic", image: "/assets/partners/cinematic.png" },
    { name: "Clay Paky", image: "/assets/partners/claypaky.png" },
    { name: "DSPA", image: "/assets/partners/dspa.png" },
    { name: "DTS", image: "/assets/partners/DTS.png" },
    { name: "ECO", image: "/assets/partners/eco.png" },
    { name: "Gonsin", image: "/assets/partners/gonsin.png" },
    { name: "HK Audio", image: "/assets/partners/hk audio.png" },
    { name: "Le Maitre", image: "/assets/partners/le maitre.png" },
    { name: "Madrix", image: "/assets/partners/madrix.png" },
    { name: "Marani", image: "/assets/partners/marani.png" },
    { name: "Masters", image: "/assets/partners/masters.png" },
    { name: "Meyer Sound", image: "/assets/partners/meyer sound.png" },
    { name: "MLB", image: "/assets/partners/mlb.png" },
    { name: "MR.LED", image: "/assets/partners/mr.led.png" },
    { name: "Musontek", image: "/assets/partners/musontek.png" },
    { name: "Neutrik", image: "/assets/partners/neutrik.png" },
    { name: "Nevod", image: "/assets/partners/nevod.png" },
    { name: "NG", image: "/assets/partners/NG.png" },
    { name: "Novacord", image: "/assets/partners/novacord.png" },
    { name: "Pequod", image: "/assets/partners/pequod.png" },
    { name: "Roxtone", image: "/assets/partners/roxtone.png" },
    { name: "Seetronic", image: "/assets/partners/seetronic.png" },
    { name: "SFAT", image: "/assets/partners/sfat.png" },
    { name: "Silver Star", image: "/assets/partners/SS.png" },
    { name: "Treme", image: "/assets/partners/treme.png" },
    { name: "Volta", image: "/assets/partners/volta.png" },
    { name: "Wharfedale Rio", image: "/assets/partners/wharfedale rio.png" },
    { name: "Вектор", image: "/assets/partners/вектор.png" }
] as const;

export const containerClass = "mx-auto w-full max-w-[1020px] px-5 md:px-8";
