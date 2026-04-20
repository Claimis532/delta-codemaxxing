"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { getMailSettings } from "@/lib/mail-settings";

const NAME_MAX_LENGTH = 120;
const CONTACT_MAX_LENGTH = 160;
const MESSAGE_MAX_LENGTH = 4000;
const MIN_SUBMIT_TIME_MS = 3000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type FormState = {
    success: boolean;
    error?: string;
};

type RequestBucket = {
    count: number;
    resetAt: number;
};

declare global {
    var __contactRequestBuckets__: Map<string, RequestBucket> | undefined;
}

const requestBuckets = globalThis.__contactRequestBuckets__ ?? new Map<string, RequestBucket>();

if (!globalThis.__contactRequestBuckets__) {
    globalThis.__contactRequestBuckets__ = requestBuckets;
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function getClientIp(forwardedFor: string | null) {
    if (!forwardedFor) {
        return "unknown";
    }

    return forwardedFor.split(",")[0]?.trim() || "unknown";
}

function assertRateLimit(bucketKey: string) {
    const now = Date.now();
    const current = requestBuckets.get(bucketKey);

    if (!current || current.resetAt <= now) {
        requestBuckets.set(bucketKey, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS
        });
        return;
    }

    if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
        throw new Error("RATE_LIMIT");
    }

    current.count += 1;
    requestBuckets.set(bucketKey, current);
}

function validateFormData(formData: FormData) {
    const name = String(formData.get("name") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const startedAt = Number(formData.get("startedAt"));

    if (company) {
        throw new Error("SPAM_DETECTED");
    }

    if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_SUBMIT_TIME_MS) {
        throw new Error("SUBMIT_TOO_FAST");
    }

    if (!name || !contact || !message) {
        throw new Error("EMPTY_FIELDS");
    }

    if (name.length > NAME_MAX_LENGTH) {
        throw new Error("NAME_TOO_LONG");
    }

    if (contact.length > CONTACT_MAX_LENGTH) {
        throw new Error("CONTACT_TOO_LONG");
    }

    if (message.length > MESSAGE_MAX_LENGTH) {
        throw new Error("MESSAGE_TOO_LONG");
    }

    const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const hasPhone = /^[+\d()\-\s]{6,25}$/.test(contact);

    if (!hasEmail && !hasPhone) {
        throw new Error("INVALID_CONTACT");
    }

    return { name, contact, message };
}

async function getMailerConfig() {
    const settings = await getMailSettings();

    if (!settings.host || !settings.user || !settings.pass || !settings.mailFrom || !settings.mailTo) {
        throw new Error("MAIL_CONFIG_MISSING");
    }

    if (!Number.isFinite(settings.port)) {
        throw new Error("MAIL_CONFIG_INVALID");
    }

    return {
        ...settings,
        recipients: settings.mailTo
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
    };
}

function getErrorMessage(error: unknown) {
    if (!(error instanceof Error)) {
        return "Не удалось отправить заявку. Попробуйте еще раз чуть позже.";
    }

    switch (error.message) {
        case "SPAM_DETECTED":
            return "Заявка отклонена системой защиты. Если это ошибка, повторите попытку чуть позже.";
        case "SUBMIT_TOO_FAST":
            return "Форма отправлена слишком быстро. Проверьте данные и попробуйте снова.";
        case "EMPTY_FIELDS":
            return "Заполните имя, контакт и описание задачи.";
        case "NAME_TOO_LONG":
            return "Имя слишком длинное. Допустимо до 120 символов.";
        case "CONTACT_TOO_LONG":
            return "Контакт слишком длинный. Допустимо до 160 символов.";
        case "MESSAGE_TOO_LONG":
            return "Описание проекта слишком длинное. Сократите текст до 4000 символов.";
        case "INVALID_CONTACT":
            return "Укажите корректный email или телефон для связи.";
        case "RATE_LIMIT":
            return "Слишком много попыток отправки. Попробуйте еще раз через несколько минут.";
        case "MAIL_CONFIG_MISSING":
        case "MAIL_CONFIG_INVALID":
            return "Почтовые настройки не заполнены. Проверьте SMTP в админ-панели.";
        default:
            return "Не удалось отправить заявку. Попробуйте еще раз чуть позже.";
    }
}

export async function sendProjectRequest(formData: FormData): Promise<FormState> {
    try {
        const headerStore = await headers();
        const bucketKey = getClientIp(headerStore.get("x-forwarded-for"));
        assertRateLimit(bucketKey);

        const { name, contact, message } = validateFormData(formData);
        const mailConfig = await getMailerConfig();

        if (!mailConfig.recipients.length) {
            throw new Error("MAIL_CONFIG_MISSING");
        }

        const transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: mailConfig.secure,
            auth: {
                user: mailConfig.user,
                pass: mailConfig.pass
            }
        });
        const safeName = escapeHtml(name);
        const safeContact = escapeHtml(contact);
        const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

        await transporter.sendMail({
            from: mailConfig.mailFrom,
            to: mailConfig.recipients,
            replyTo: contact.includes("@") ? contact : undefined,
            subject: `Новая заявка с сайта от ${name}`,
            text: [
                "Новая заявка с сайта",
                `Имя: ${name}`,
                `Контакт: ${contact}`,
                "",
                "Описание задачи:",
                message
            ].join("\n"),
            html: `
                <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px; color: #111827;">
                    <h2 style="margin: 0 0 20px; color: #1d4ed8;">Новая заявка с сайта</h2>
                    <p style="margin: 0 0 12px;"><strong>Имя:</strong> ${safeName}</p>
                    <p style="margin: 0 0 12px;"><strong>Контакт:</strong> ${safeContact}</p>
                    <div style="margin-top: 20px;">
                        <p style="margin: 0 0 8px;"><strong>Описание задачи:</strong></p>
                        <div style="background: #f8fafc; border-radius: 12px; padding: 16px; line-height: 1.6;">
                            ${safeMessage}
                        </div>
                    </div>
                </div>
            `
        });

        return { success: true };
    } catch (error) {
        console.error("Mail send error:", error);
        return {
            success: false,
            error: getErrorMessage(error)
        };
    }
}
