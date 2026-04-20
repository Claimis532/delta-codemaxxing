import "server-only";

import path from "path";
import { existsSync, readFileSync } from "fs";
import { unstable_noStore as noStore } from "next/cache";
import { getDatabase, withTransaction } from "@/lib/sqlite";
import type { MailSettings, MailSettingsForAdmin } from "@/types/site-content";

const LEGACY_MAIL_SETTINGS_FILE_PATH = path.join(process.cwd(), "data", "mail-settings.json");

function getEnvValue(name: string) {
    return process.env[name]?.trim() || "";
}

function normalizePort(value: unknown, fallback: number) {
    const port = Number(value);
    return Number.isFinite(port) && port > 0 ? port : fallback;
}

function asString(value: unknown, fallback = "") {
    return typeof value === "string" ? value.trim() : fallback;
}

function getDefaultMailSettings(): MailSettings {
    const port = normalizePort(getEnvValue("SMTP_PORT"), 465);

    return {
        host: getEnvValue("SMTP_HOST"),
        port,
        secure: getEnvValue("SMTP_SECURE") ? getEnvValue("SMTP_SECURE") === "true" : port === 465,
        user: getEnvValue("SMTP_USER"),
        pass: getEnvValue("SMTP_PASS"),
        mailFrom: getEnvValue("MAIL_FROM"),
        mailTo: getEnvValue("MAIL_TO")
    };
}

function normalizeMailSettings(value: unknown, fallback: MailSettings): MailSettings {
    if (!value || typeof value !== "object") {
        return fallback;
    }

    const candidate = value as Partial<MailSettings>;
    const port = normalizePort(candidate.port, fallback.port);

    return {
        host: asString(candidate.host, fallback.host),
        port,
        secure: typeof candidate.secure === "boolean" ? candidate.secure : fallback.secure ?? port === 465,
        user: asString(candidate.user, fallback.user),
        pass: asString(candidate.pass, fallback.pass),
        mailFrom: asString(candidate.mailFrom, fallback.mailFrom),
        mailTo: asString(candidate.mailTo, fallback.mailTo)
    };
}

function readLegacyMailSettings() {
    if (!existsSync(LEGACY_MAIL_SETTINGS_FILE_PATH)) {
        return null;
    }

    try {
        return normalizeMailSettings(JSON.parse(readFileSync(LEGACY_MAIL_SETTINGS_FILE_PATH, "utf8")), getDefaultMailSettings());
    } catch {
        return null;
    }
}

function hasSeededMailSettings() {
    const db = getDatabase();
    const row = db.prepare("SELECT 1 AS value FROM mail_settings WHERE id = 1").get() as unknown as
        | { value: number }
        | undefined;

    return Boolean(row?.value);
}

function writeMailSettings(settings: MailSettings) {
    const db = getDatabase();
    const normalized = normalizeMailSettings(settings, getDefaultMailSettings());

    db.prepare(`
        INSERT INTO mail_settings (id, host, port, secure, user, pass, mail_from, mail_to)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            host = excluded.host,
            port = excluded.port,
            secure = excluded.secure,
            user = excluded.user,
            pass = excluded.pass,
            mail_from = excluded.mail_from,
            mail_to = excluded.mail_to
    `).run(
        normalized.host,
        normalized.port,
        normalized.secure ? 1 : 0,
        normalized.user,
        normalized.pass,
        normalized.mailFrom,
        normalized.mailTo
    );

    return normalized;
}

function ensureMailSettingsSeeded() {
    if (hasSeededMailSettings()) {
        return;
    }

    const seedData = readLegacyMailSettings() ?? getDefaultMailSettings();

    withTransaction(getDatabase(), () => {
        if (hasSeededMailSettings()) {
            return;
        }

        writeMailSettings(seedData);
    });
}

export async function getMailSettings() {
    noStore();
    ensureMailSettingsSeeded();

    const row = getDatabase().prepare(`
        SELECT
            host,
            port,
            secure,
            user,
            pass,
            mail_from AS mailFrom,
            mail_to AS mailTo
        FROM mail_settings
        WHERE id = 1
    `).get() as unknown as
        | {
            host: string;
            port: number;
            secure: number;
            user: string;
            pass: string;
            mailFrom: string;
            mailTo: string;
        }
        | undefined;

    if (!row) {
        return getDefaultMailSettings();
    }

    return normalizeMailSettings(
        {
            host: row.host,
            port: row.port,
            secure: Boolean(row.secure),
            user: row.user,
            pass: row.pass,
            mailFrom: row.mailFrom,
            mailTo: row.mailTo
        },
        getDefaultMailSettings()
    );
}

export async function getMailSettingsForAdmin(): Promise<MailSettingsForAdmin> {
    const settings = await getMailSettings();

    return {
        host: settings.host,
        port: settings.port,
        secure: settings.secure,
        user: settings.user,
        mailFrom: settings.mailFrom,
        mailTo: settings.mailTo,
        hasPassword: Boolean(settings.pass)
    };
}

export async function saveMailSettings(settings: MailSettings) {
    return withTransaction(getDatabase(), () => writeMailSettings(settings));
}
