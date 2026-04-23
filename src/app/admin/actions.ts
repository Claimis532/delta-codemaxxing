"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
    clearAdminSession,
    isAdminAuthConfigured,
    isAdminAuthenticated,
    setAdminSession,
    verifyAdminCredentials
} from "@/lib/admin-auth";
import { saveUploadedImage } from "@/lib/file-storage";
import { getMailSettings, saveMailSettings } from "@/lib/mail-settings";
import { getSiteContent, saveSiteContent } from "@/lib/site-content";
import type {
    AdminActionResult,
    FooterSection,
    HeroSection,
    MailSettingsForAdmin,
    ProjectCard,
    ProjectGalleryItem,
    ProjectsSectionContent
} from "@/types/site-content";

function asString(value: FormDataEntryValue | null) {
    return typeof value === "string" ? value.trim() : "";
}

function normalizeId(value: string, fallback: string) {
    const normalized = value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return normalized || fallback;
}

function normalizePhoneHref(phone: string, phoneHref: string) {
    if (phoneHref.trim()) {
        return phoneHref.trim();
    }

    const normalized = phone.replace(/[^\d+]/g, "");
    return normalized || phoneHref.trim();
}

function normalizeImageSrc(value: string) {
    const candidate = value.trim();

    if (!candidate) {
        return "";
    }

    if (candidate.startsWith("/")) {
        return candidate;
    }

    try {
        const url = new URL(candidate);
        return url.protocol === "http:" || url.protocol === "https:" ? candidate : "";
    } catch {
        return "";
    }
}

function parseJsonField<T>(formData: FormData, key: string): T | null {
    const raw = formData.get(key);

    if (typeof raw !== "string" || !raw.trim()) {
        return null;
    }

    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

function getFileEntry(formData: FormData, key: string) {
    const value = formData.get(key);
    return value instanceof File && value.size > 0 ? value : null;
}

function getActionErrorMessage(error: unknown) {
    if (!(error instanceof Error)) {
        return "Не удалось сохранить настройки. Повторите попытку.";
    }

    switch (error.message) {
        case "INVALID_IMAGE_TYPE":
            return "Можно загружать только изображения.";
        case "IMAGE_TOO_LARGE":
            return "Изображение слишком большое. Максимум 10 МБ.";
        default:
            return "Не удалось сохранить настройки. Повторите попытку.";
    }
}

function refreshAdminPages() {
    revalidatePath("/");
    revalidatePath("/admin");
}

async function ensureAdminAccess() {
    if (!isAdminAuthConfigured()) {
        return true;
    }

    return isAdminAuthenticated();
}

export async function loginAdminAction(formData: FormData): Promise<AdminActionResult<null>> {
    const username = asString(formData.get("username"));
    const password = asString(formData.get("password"));

    if (!verifyAdminCredentials(username, password)) {
        return {
            success: false,
            message: "Неверный логин или пароль."
        };
    }

    await setAdminSession();

    return {
        success: true,
        message: "Вход выполнен."
    };
}

export async function logoutAdminAction() {
    await clearAdminSession();
    redirect("/admin");
}

export async function saveFooterSettingsAction(formData: FormData): Promise<AdminActionResult<FooterSection>> {
    try {
        if (!(await ensureAdminAccess())) {
            return {
                success: false,
                message: "Сессия администратора истекла. Войдите заново."
            };
        }

        const currentContent = await getSiteContent();
        const footer: FooterSection = {
            companyName: asString(formData.get("companyName")),
            introText: asString(formData.get("introText")),
            phone: asString(formData.get("phone")),
            phoneHref: normalizePhoneHref(
                asString(formData.get("phone")),
                asString(formData.get("phoneHref"))
            ),
            email: asString(formData.get("email")),
            addressLine1: asString(formData.get("addressLine1")),
            addressLine2: asString(formData.get("addressLine2")),
            companyLegalName: asString(formData.get("companyLegalName")),
            legalDetails: asString(formData.get("legalDetails")),
            workHours: asString(formData.get("workHours")),
            privacyPolicyUrl: asString(formData.get("privacyPolicyUrl")),
            privacyPolicyLabel: asString(formData.get("privacyPolicyLabel")),
            copyrightLabel: asString(formData.get("copyrightLabel"))
        };

        const updatedContent = await saveSiteContent({
            ...currentContent,
            footer
        });

        refreshAdminPages();

        return {
            success: true,
            message: "Настройки футера сохранены.",
            data: updatedContent.footer
        };
    } catch (error) {
        return {
            success: false,
            message: getActionErrorMessage(error)
        };
    }
}

export async function saveHeroSettingsAction(formData: FormData): Promise<AdminActionResult<HeroSection>> {
    try {
        if (!(await ensureAdminAccess())) {
            return {
                success: false,
                message: "Сессия администратора истекла. Войдите заново."
            };
        }

        const payload = parseJsonField<HeroSection>(formData, "hero");

        if (!payload) {
            return {
                success: false,
                message: "Не удалось прочитать данные главного экрана."
            };
        }

        const currentContent = await getSiteContent();
        const currentPhotos = new Map(currentContent.hero.photos.map((photo) => [photo.id, photo]));

        const photos = (
            await Promise.all(
                (payload.photos || []).map(async (photo, index) => {
                    const photoId = normalizeId(photo.id || `hero-photo-${index + 1}`, `hero-photo-${index + 1}`);
                    const currentPhoto = currentPhotos.get(photoId);
                    const file = getFileEntry(formData, `hero-file:${photo.id}`);
                    const uploadedPath = file ? await saveUploadedImage(file, "hero") : "";
                    const src = uploadedPath || normalizeImageSrc(photo.src || "") || currentPhoto?.src || "";

                    if (!src) {
                        return null;
                    }

                    return {
                        id: photoId,
                        src,
                        alt: photo.alt?.trim() || currentPhoto?.alt || `Фото ${index + 1}`
                    };
                })
            )
        ).filter((photo): photo is HeroSection["photos"][number] => Boolean(photo));

        if (!photos.length) {
            return {
                success: false,
                message: "Добавьте хотя бы одно изображение для главного экрана."
            };
        }

        const updatedContent = await saveSiteContent({
            ...currentContent,
            hero: {
                eyebrow: payload.eyebrow?.trim() ?? "",
                headline: payload.headline?.trim() ?? "",
                description: payload.description?.trim() ?? "",
                photos
            }
        });

        refreshAdminPages();

        return {
            success: true,
            message: "Главный экран сохранён.",
            data: updatedContent.hero
        };
    } catch (error) {
        return {
            success: false,
            message: getActionErrorMessage(error)
        };
    }
}

export async function saveProjectsSettingsAction(
    formData: FormData
): Promise<AdminActionResult<ProjectsSectionContent>> {
    try {
        if (!(await ensureAdminAccess())) {
            return {
                success: false,
                message: "Сессия администратора истекла. Войдите заново."
            };
        }

        const payload = parseJsonField<ProjectsSectionContent>(formData, "projects");

        if (!payload) {
            return {
                success: false,
                message: "Не удалось прочитать данные карусели."
            };
        }

        const currentContent = await getSiteContent();
        const currentCards = new Map(currentContent.projects.cards.map((card) => [card.id, card]));

        const cards = (
            await Promise.all(
                (payload.cards || []).map(async (card, cardIndex) => {
                    const cardId = normalizeId(card.id || `project-card-${cardIndex + 1}`, `project-card-${cardIndex + 1}`);
                    const currentCard = currentCards.get(cardId);
                    const currentGallery = new Map((currentCard?.gallery || []).map((item) => [item.id, item]));

                    const gallery = (
                        await Promise.all(
                            (card.gallery || []).map(async (item, galleryIndex) => {
                                const galleryId = normalizeId(
                                    item.id || `${cardId}-gallery-${galleryIndex + 1}`,
                                    `${cardId}-gallery-${galleryIndex + 1}`
                                );
                                const currentItem = currentGallery.get(galleryId);
                                const file = getFileEntry(formData, `project-gallery:${card.id}:${item.id}`);
                                const uploadedPath = file ? await saveUploadedImage(file, "projects") : "";
                                const src = uploadedPath || normalizeImageSrc(item.src || "") || currentItem?.src || "";

                                if (!src) {
                                    return null;
                                }

                                return {
                                    id: galleryId,
                                    src,
                                    objectName:
                                        item.objectName?.trim() ||
                                        currentItem?.objectName ||
                                        `Фото ${galleryIndex + 1}`
                                };
                            })
                        )
                    ).filter((item): item is ProjectGalleryItem => Boolean(item));

                    const coverFile = getFileEntry(formData, `project-cover:${card.id}`);
                    const uploadedCover = coverFile ? await saveUploadedImage(coverFile, "projects") : "";
                    const objectNames = Array.isArray(card.objectNames)
                        ? card.objectNames.map((item) => item.trim()).filter(Boolean)
                        : currentCard?.objectNames || [];
                    const title = card.title?.trim() || currentCard?.title || "";
                    const coverImage =
                        uploadedCover ||
                        gallery[0]?.src ||
                        normalizeImageSrc(card.coverImage || "") ||
                        normalizeImageSrc(currentCard?.coverImage || "") ||
                        currentCard?.gallery[0]?.src ||
                        "";

                    if (!title || !coverImage) {
                        return null;
                    }

                    return {
                        id: cardId,
                        title,
                        description: card.description?.trim() || currentCard?.description || "",
                        badge: card.badge?.trim() || currentCard?.badge || "Раздел",
                        coverImage,
                        objectNames,
                        gallery,
                        isPlaceholder: Boolean(card.isPlaceholder)
                    } satisfies ProjectCard;
                })
            )
        ).filter((card): card is NonNullable<typeof card> => Boolean(card));

        if (!cards.length) {
            return {
                success: false,
                message: "Добавьте хотя бы одну карточку в карусель."
            };
        }

        const updatedContent = await saveSiteContent({
            ...currentContent,
            projects: {
                title: payload.title?.trim() ?? "",
                description: payload.description?.trim() ?? "",
                cards
            }
        });

        refreshAdminPages();

        return {
            success: true,
            message: "Карусель сохранена.",
            data: updatedContent.projects
        };
    } catch (error) {
        return {
            success: false,
            message: getActionErrorMessage(error)
        };
    }
}

export async function saveMailSettingsAction(
    formData: FormData
): Promise<AdminActionResult<MailSettingsForAdmin>> {
    try {
        if (!(await ensureAdminAccess())) {
            return {
                success: false,
                message: "Сессия администратора истекла. Войдите заново."
            };
        }

        const currentSettings = await getMailSettings();
        const password = asString(formData.get("pass"));

        const saved = await saveMailSettings({
            host: asString(formData.get("host")),
            port: Number(asString(formData.get("port"))) || currentSettings.port,
            secure: formData.get("secure") === "true",
            user: asString(formData.get("user")),
            pass: password || currentSettings.pass,
            mailFrom: asString(formData.get("mailFrom")),
            mailTo: asString(formData.get("mailTo"))
        });

        refreshAdminPages();

        return {
            success: true,
            message: "SMTP-настройки сохранены.",
            data: {
                host: saved.host,
                port: saved.port,
                secure: saved.secure,
                user: saved.user,
                mailFrom: saved.mailFrom,
                mailTo: saved.mailTo,
                hasPassword: Boolean(saved.pass)
            }
        };
    } catch (error) {
        return {
            success: false,
            message: getActionErrorMessage(error)
        };
    }
}
