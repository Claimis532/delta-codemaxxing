import "server-only";

import path from "path";
import { mkdirSync } from "fs";
import { DatabaseSync } from "node:sqlite";

const DATABASE_DIR = path.join(process.cwd(), "data");
export const DATABASE_PATH = path.join(DATABASE_DIR, "site.db");

declare global {
    var __deltaSqliteDb__: DatabaseSync | undefined;
}

function initializeSchema(db: DatabaseSync) {
    db.exec(`
        PRAGMA journal_mode = WAL;
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS footer_settings (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            company_name TEXT NOT NULL,
            intro_text TEXT NOT NULL,
            phone TEXT NOT NULL,
            phone_href TEXT NOT NULL,
            email TEXT NOT NULL,
            address_line1 TEXT NOT NULL,
            address_line2 TEXT NOT NULL,
            company_legal_name TEXT NOT NULL,
            legal_details TEXT NOT NULL,
            work_hours TEXT NOT NULL,
            privacy_policy_url TEXT NOT NULL,
            privacy_policy_label TEXT NOT NULL,
            copyright_label TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS hero_settings (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            eyebrow TEXT NOT NULL,
            headline TEXT NOT NULL,
            description TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS hero_photos (
            id TEXT PRIMARY KEY,
            sort_order INTEGER NOT NULL,
            src TEXT NOT NULL,
            alt TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS projects_section (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            title TEXT NOT NULL,
            description TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS project_cards (
            id TEXT PRIMARY KEY,
            sort_order INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            badge TEXT NOT NULL,
            cover_image TEXT NOT NULL,
            is_placeholder INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS project_object_names (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            card_id TEXT NOT NULL,
            sort_order INTEGER NOT NULL,
            name TEXT NOT NULL,
            FOREIGN KEY (card_id) REFERENCES project_cards(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS project_gallery_items (
            id TEXT PRIMARY KEY,
            card_id TEXT NOT NULL,
            sort_order INTEGER NOT NULL,
            src TEXT NOT NULL,
            object_name TEXT NOT NULL,
            FOREIGN KEY (card_id) REFERENCES project_cards(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_project_object_names_card_order
            ON project_object_names (card_id, sort_order);

        CREATE INDEX IF NOT EXISTS idx_project_gallery_items_card_order
            ON project_gallery_items (card_id, sort_order);

        CREATE TABLE IF NOT EXISTS mail_settings (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            host TEXT NOT NULL,
            port INTEGER NOT NULL,
            secure INTEGER NOT NULL,
            user TEXT NOT NULL,
            pass TEXT NOT NULL,
            mail_from TEXT NOT NULL,
            mail_to TEXT NOT NULL
        );
    `);
}

export function getDatabase() {
    if (!globalThis.__deltaSqliteDb__) {
        mkdirSync(DATABASE_DIR, { recursive: true });

        const db = new DatabaseSync(DATABASE_PATH);
        initializeSchema(db);
        globalThis.__deltaSqliteDb__ = db;
    }

    return globalThis.__deltaSqliteDb__;
}

export function withTransaction<T>(db: DatabaseSync, callback: () => T) {
    db.exec("BEGIN IMMEDIATE");

    try {
        const result = callback();
        db.exec("COMMIT");
        return result;
    } catch (error) {
        db.exec("ROLLBACK");
        throw error;
    }
}
