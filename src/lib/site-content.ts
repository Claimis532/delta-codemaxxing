import "server-only";

import path from "path";
import { existsSync, readFileSync } from "fs";
import type { DatabaseSync } from "node:sqlite";
import { unstable_noStore as noStore } from "next/cache";
import { projectCategories } from "@/constants/content";
import { siteConfig } from "@/config/site";
import { getDatabase, withTransaction } from "@/lib/sqlite";
import type {
    FooterSection,
    HeroPhoto,
    HeroSection,
    ProjectCard,
    ProjectGalleryItem,
    ProjectsSectionContent,
    SiteContent
} from "@/types/site-content";

const LEGACY_CONTENT_FILE_PATH = path.join(process.cwd(), "data", "site-content.json");

function createId(prefix: string, index: number) {
    return `${prefix}-${index + 1}`;
}

const defaultHeroPhotos: HeroPhoto[] = [
    {
        id: "hero-photo-1",
        src: "/assets/photoOBJ/withPepople/челяб госу академ.jpg",
        alt: "Реализованный культурный объект"
    },
    {
        id: "hero-photo-2",
        src: "/assets/photoOBJ/withPepople/центр культуры и искусства.jpg",
        alt: "Сцена и зрительный зал"
    },
    {
        id: "hero-photo-3",
        src: "/assets/photoOBJ/withPepople/центр худож и эстет.jpg",
        alt: "Пространство для выступлений"
    },
    {
        id: "hero-photo-4",
        src: "/assets/photoOBJ/withPepople/гор дворец детского и юнош творч.jpg",
        alt: "Объект с реализованным сценическим решением"
    }
];

const defaultProjectCards: ProjectCard[] = projectCategories.map((category, index) => ({
    id: createId(category.id, index),
    title: category.title,
    description: category.description,
    badge: category.badge,
    coverImage: category.coverImage,
    objectNames: [...category.objectNames],
    gallery: category.gallery.map((item, galleryIndex) => ({
        id: createId(`${category.id}-${index + 1}-gallery`, galleryIndex),
        src: item.src,
        objectName: item.objectName
    })),
    isPlaceholder: Boolean(category.isPlaceholder)
}));

export const defaultSiteContent: SiteContent = {
    hero: {
        eyebrow: "ЦП Дельта",
        headline: "Проектируем\nпространства, которые оживают",
        description:
            "Мы создаём проектную, рабочую и сметную документацию для театров, спортивных комплексов, учебных пространств и культурных объектов.",
        photos: defaultHeroPhotos
    },
    footer: {
        companyName: siteConfig.companyName,
        introText:
            "Контактные данные, реквизиты и режим работы редактируются из админ-панели без правки кода.",
        phone: siteConfig.companyPhone,
        phoneHref: siteConfig.companyPhoneHref,
        email: siteConfig.companyEmail,
        addressLine1: siteConfig.addressLine1,
        addressLine2: siteConfig.addressLine2,
        companyLegalName: siteConfig.companyLegalName,
        legalDetails: siteConfig.legalDetails,
        workHours: siteConfig.workHours,
        privacyPolicyUrl: siteConfig.privacyPolicyUrl,
        privacyPolicyLabel: "Политика конфиденциальности",
        copyrightLabel: siteConfig.copyrightLabel
    },
    projects: {
        title: "Мы проектируем",
        description:
            "Театры, учебные пространства и спортивные объекты. Откройте карточку, чтобы посмотреть фото реализованных площадок и список объектов по направлению.",
        cards: defaultProjectCards
    }
};

function asString(value: unknown, fallback: string) {
    return typeof value === "string" ? value.trim() : fallback;
}

function normalizeHeroPhoto(value: unknown, fallback: HeroPhoto, index: number): HeroPhoto | null {
    if (!value || typeof value !== "object") {
        return fallback;
    }

    const candidate = value as Partial<HeroPhoto>;
    const src = asString(candidate.src, fallback.src);

    if (!src) {
        return null;
    }

    return {
        id: asString(candidate.id, fallback.id || createId("hero-photo", index)),
        src,
        alt: asString(candidate.alt, fallback.alt || `Фото ${index + 1}`)
    };
}

function normalizeHero(value: unknown): HeroSection {
    const fallback = defaultSiteContent.hero;

    if (!value || typeof value !== "object") {
        return fallback;
    }

    const candidate = value as Partial<HeroSection>;
    const rawPhotos = Array.isArray(candidate.photos) ? candidate.photos : fallback.photos;
    const photos = rawPhotos
        .map((photo, index) => normalizeHeroPhoto(photo, fallback.photos[index] ?? fallback.photos[0], index))
        .filter((photo): photo is HeroPhoto => Boolean(photo));

    return {
        eyebrow: asString(candidate.eyebrow, fallback.eyebrow),
        headline: asString(candidate.headline, fallback.headline),
        description: asString(candidate.description, fallback.description),
        photos: photos.length ? photos : fallback.photos
    };
}

function normalizeFooter(value: unknown): FooterSection {
    const fallback = defaultSiteContent.footer;

    if (!value || typeof value !== "object") {
        return fallback;
    }

    const candidate = value as Partial<FooterSection>;

    return {
        companyName: asString(candidate.companyName, fallback.companyName),
        introText: asString(candidate.introText, fallback.introText),
        phone: asString(candidate.phone, fallback.phone),
        phoneHref: asString(candidate.phoneHref, fallback.phoneHref),
        email: asString(candidate.email, fallback.email),
        addressLine1: asString(candidate.addressLine1, fallback.addressLine1),
        addressLine2: asString(candidate.addressLine2, fallback.addressLine2),
        companyLegalName: asString(candidate.companyLegalName, fallback.companyLegalName),
        legalDetails: asString(candidate.legalDetails, fallback.legalDetails),
        workHours: asString(candidate.workHours, fallback.workHours),
        privacyPolicyUrl: asString(candidate.privacyPolicyUrl, fallback.privacyPolicyUrl),
        privacyPolicyLabel: asString(candidate.privacyPolicyLabel, fallback.privacyPolicyLabel),
        copyrightLabel: asString(candidate.copyrightLabel, fallback.copyrightLabel)
    };
}

function normalizeGalleryItem(
    value: unknown,
    fallback: ProjectGalleryItem,
    index: number,
    cardId: string
): ProjectGalleryItem | null {
    if (!value || typeof value !== "object") {
        return fallback;
    }

    const candidate = value as Partial<ProjectGalleryItem>;
    const src = asString(candidate.src, fallback.src);

    if (!src) {
        return null;
    }

    return {
        id: asString(candidate.id, fallback.id || createId(`${cardId}-gallery`, index)),
        src,
        objectName: asString(candidate.objectName, fallback.objectName || `Фото ${index + 1}`)
    };
}

function normalizeProjectCard(value: unknown, fallback: ProjectCard, index: number): ProjectCard | null {
    if (!value || typeof value !== "object") {
        return fallback;
    }

    const candidate = value as Partial<ProjectCard>;
    const cardId = asString(candidate.id, fallback.id || createId("project-card", index));
    const rawGallery = Array.isArray(candidate.gallery) ? candidate.gallery : fallback.gallery;
    const gallery = rawGallery
        .map((item, galleryIndex) => {
            const galleryFallback = fallback.gallery[galleryIndex] ?? {
                id: createId(`${cardId}-gallery`, galleryIndex),
                src: fallback.coverImage,
                objectName: fallback.title
            };

            return normalizeGalleryItem(item, galleryFallback, galleryIndex, cardId);
        })
        .filter((item): item is ProjectGalleryItem => Boolean(item));

    const coverImage = asString(candidate.coverImage, fallback.coverImage || gallery[0]?.src || "");

    if (!coverImage) {
        return null;
    }

    return {
        id: cardId,
        title: asString(candidate.title, fallback.title),
        description: asString(candidate.description, fallback.description),
        badge: asString(candidate.badge, fallback.badge),
        coverImage,
        objectNames: Array.isArray(candidate.objectNames)
            ? candidate.objectNames.map((item) => asString(item, "")).filter(Boolean)
            : fallback.objectNames,
        gallery: gallery.length ? gallery : fallback.gallery,
        isPlaceholder: Boolean(candidate.isPlaceholder)
    };
}

function normalizeProjects(value: unknown): ProjectsSectionContent {
    const fallback = defaultSiteContent.projects;

    if (!value || typeof value !== "object") {
        return fallback;
    }

    const candidate = value as Partial<ProjectsSectionContent>;
    const rawCards = Array.isArray(candidate.cards) ? candidate.cards : fallback.cards;
    const cards = rawCards
        .map((card, index) => normalizeProjectCard(card, fallback.cards[index] ?? fallback.cards[0], index))
        .filter((card): card is ProjectCard => Boolean(card));

    return {
        title: asString(candidate.title, fallback.title),
        description: asString(candidate.description, fallback.description),
        cards: cards.length ? cards : fallback.cards
    };
}

export function normalizeSiteContent(value: unknown): SiteContent {
    if (!value || typeof value !== "object") {
        return defaultSiteContent;
    }

    const candidate = value as Partial<SiteContent>;

    return {
        hero: normalizeHero(candidate.hero),
        footer: normalizeFooter(candidate.footer),
        projects: normalizeProjects(candidate.projects)
    };
}

function readLegacySiteContent() {
    if (!existsSync(LEGACY_CONTENT_FILE_PATH)) {
        return null;
    }

    try {
        return normalizeSiteContent(JSON.parse(readFileSync(LEGACY_CONTENT_FILE_PATH, "utf8")));
    } catch {
        return null;
    }
}

function hasSeededSiteContent(db: DatabaseSync) {
    const row = db.prepare("SELECT 1 AS value FROM hero_settings WHERE id = 1").get() as unknown as
        | { value: number }
        | undefined;

    return Boolean(row?.value);
}

function writeSiteContent(db: DatabaseSync, content: SiteContent) {
    const normalized = normalizeSiteContent(content);

    db.prepare(`
        INSERT INTO hero_settings (id, eyebrow, headline, description)
        VALUES (1, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            eyebrow = excluded.eyebrow,
            headline = excluded.headline,
            description = excluded.description
    `).run(
        normalized.hero.eyebrow,
        normalized.hero.headline,
        normalized.hero.description
    );

    db.prepare("DELETE FROM hero_photos").run();
    const insertHeroPhoto = db.prepare(`
        INSERT INTO hero_photos (id, sort_order, src, alt)
        VALUES (?, ?, ?, ?)
    `);

    normalized.hero.photos.forEach((photo, index) => {
        insertHeroPhoto.run(photo.id, index, photo.src, photo.alt);
    });

    db.prepare(`
        INSERT INTO footer_settings (
            id,
            company_name,
            intro_text,
            phone,
            phone_href,
            email,
            address_line1,
            address_line2,
            company_legal_name,
            legal_details,
            work_hours,
            privacy_policy_url,
            privacy_policy_label,
            copyright_label
        )
        VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            company_name = excluded.company_name,
            intro_text = excluded.intro_text,
            phone = excluded.phone,
            phone_href = excluded.phone_href,
            email = excluded.email,
            address_line1 = excluded.address_line1,
            address_line2 = excluded.address_line2,
            company_legal_name = excluded.company_legal_name,
            legal_details = excluded.legal_details,
            work_hours = excluded.work_hours,
            privacy_policy_url = excluded.privacy_policy_url,
            privacy_policy_label = excluded.privacy_policy_label,
            copyright_label = excluded.copyright_label
    `).run(
        normalized.footer.companyName,
        normalized.footer.introText,
        normalized.footer.phone,
        normalized.footer.phoneHref,
        normalized.footer.email,
        normalized.footer.addressLine1,
        normalized.footer.addressLine2,
        normalized.footer.companyLegalName,
        normalized.footer.legalDetails,
        normalized.footer.workHours,
        normalized.footer.privacyPolicyUrl,
        normalized.footer.privacyPolicyLabel,
        normalized.footer.copyrightLabel
    );

    db.prepare(`
        INSERT INTO projects_section (id, title, description)
        VALUES (1, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            description = excluded.description
    `).run(
        normalized.projects.title,
        normalized.projects.description
    );

    db.prepare("DELETE FROM project_cards").run();

    const insertProjectCard = db.prepare(`
        INSERT INTO project_cards (
            id,
            sort_order,
            title,
            description,
            badge,
            cover_image,
            is_placeholder
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const insertProjectObject = db.prepare(`
        INSERT INTO project_object_names (card_id, sort_order, name)
        VALUES (?, ?, ?)
    `);
    const insertProjectGalleryItem = db.prepare(`
        INSERT INTO project_gallery_items (id, card_id, sort_order, src, object_name)
        VALUES (?, ?, ?, ?, ?)
    `);

    normalized.projects.cards.forEach((card, cardIndex) => {
        insertProjectCard.run(
            card.id,
            cardIndex,
            card.title,
            card.description,
            card.badge,
            card.coverImage,
            card.isPlaceholder ? 1 : 0
        );

        card.objectNames.forEach((name, nameIndex) => {
            insertProjectObject.run(card.id, nameIndex, name);
        });

        card.gallery.forEach((item, itemIndex) => {
            insertProjectGalleryItem.run(
                item.id,
                card.id,
                itemIndex,
                item.src,
                item.objectName
            );
        });
    });

    return normalized;
}

function ensureSiteContentSeeded(db: DatabaseSync) {
    if (hasSeededSiteContent(db)) {
        return;
    }

    const seedData = readLegacySiteContent() ?? defaultSiteContent;

    withTransaction(db, () => {
        if (hasSeededSiteContent(db)) {
            return;
        }

        writeSiteContent(db, seedData);
    });
}

function readSiteContentFromDatabase(db: DatabaseSync) {
    ensureSiteContentSeeded(db);

    const heroSettings = db.prepare(`
        SELECT eyebrow, headline, description
        FROM hero_settings
        WHERE id = 1
    `).get() as unknown as
        | {
            eyebrow: string;
            headline: string;
            description: string;
        }
        | undefined;

    const heroPhotos = db.prepare(`
        SELECT id, src, alt
        FROM hero_photos
        ORDER BY sort_order ASC
    `).all() as unknown as HeroPhoto[];

    const footer = db.prepare(`
        SELECT
            company_name AS companyName,
            intro_text AS introText,
            phone,
            phone_href AS phoneHref,
            email,
            address_line1 AS addressLine1,
            address_line2 AS addressLine2,
            company_legal_name AS companyLegalName,
            legal_details AS legalDetails,
            work_hours AS workHours,
            privacy_policy_url AS privacyPolicyUrl,
            privacy_policy_label AS privacyPolicyLabel,
            copyright_label AS copyrightLabel
        FROM footer_settings
        WHERE id = 1
    `).get() as unknown as FooterSection | undefined;


    const projectsSection = db.prepare(`
        SELECT title, description
        FROM projects_section
        WHERE id = 1
    `).get() as unknown as
        | {
            title: string;
            description: string;
        }
        | undefined;

    const cards = db.prepare(`
        SELECT
            id,
            title,
            description,
            badge,
            cover_image AS coverImage,
            is_placeholder AS isPlaceholder
        FROM project_cards
        ORDER BY sort_order ASC
    `).all() as unknown as Array<{
        id: string;
        title: string;
        description: string;
        badge: string;
        coverImage: string;
        isPlaceholder: number;
    }>;

    const objectNames = db.prepare(`
        SELECT card_id AS cardId, name
        FROM project_object_names
        ORDER BY card_id ASC, sort_order ASC
    `).all() as unknown as Array<{
        cardId: string;
        name: string;
    }>;

    const galleryItems = db.prepare(`
        SELECT
            id,
            card_id AS cardId,
            src,
            object_name AS objectName
        FROM project_gallery_items
        ORDER BY card_id ASC, sort_order ASC
    `).all() as unknown as Array<{
        id: string;
        cardId: string;
        src: string;
        objectName: string;
    }>;

    const objectNamesByCard = new Map<string, string[]>();
    objectNames.forEach((item) => {
        const current = objectNamesByCard.get(item.cardId) ?? [];
        current.push(item.name);
        objectNamesByCard.set(item.cardId, current);
    });

    const galleryByCard = new Map<string, ProjectGalleryItem[]>();
    galleryItems.forEach((item) => {
        const current = galleryByCard.get(item.cardId) ?? [];
        current.push({
            id: item.id,
            src: item.src,
            objectName: item.objectName
        });
        galleryByCard.set(item.cardId, current);
    });

    return normalizeSiteContent({
        hero: {
            eyebrow: heroSettings?.eyebrow ?? defaultSiteContent.hero.eyebrow,
            headline: heroSettings?.headline ?? defaultSiteContent.hero.headline,
            description: heroSettings?.description ?? defaultSiteContent.hero.description,
            photos: heroPhotos
        },
        footer: footer ?? defaultSiteContent.footer,
        projects: {
            title: projectsSection?.title ?? defaultSiteContent.projects.title,
            description: projectsSection?.description ?? defaultSiteContent.projects.description,
            cards: cards.map((card) => ({
                id: card.id,
                title: card.title,
                description: card.description,
                badge: card.badge,
                coverImage: card.coverImage,
                objectNames: objectNamesByCard.get(card.id) ?? [],
                gallery: galleryByCard.get(card.id) ?? [],
                isPlaceholder: Boolean(card.isPlaceholder)
            }))
        }
    });
}

export async function getSiteContent() {
    noStore();
    return readSiteContentFromDatabase(getDatabase());
}

export async function saveSiteContent(content: SiteContent) {
    const db = getDatabase();

    return withTransaction(db, () => writeSiteContent(db, content));
}
