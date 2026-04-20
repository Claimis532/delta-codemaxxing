import "server-only";

import path from "path";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";

const UPLOADS_ROOT = path.join(process.cwd(), "public", "uploads");
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const MIME_TO_EXTENSION: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "image/avif": ".avif"
};

function sanitizeSegment(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function resolveExtension(file: File) {
    const fromName = path.extname(file.name).toLowerCase();

    if (fromName) {
        return fromName;
    }

    return MIME_TO_EXTENSION[file.type] ?? ".bin";
}

export async function saveUploadedImage(file: File, folder: string) {
    if (!(file instanceof File) || file.size === 0) {
        return "";
    }

    if (!file.type.startsWith("image/")) {
        throw new Error("INVALID_IMAGE_TYPE");
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
        throw new Error("IMAGE_TOO_LARGE");
    }

    const safeFolder = sanitizeSegment(folder) || "misc";
    const extension = resolveExtension(file);
    const fileName = `${Date.now()}-${randomUUID()}${extension}`;
    const destinationDir = path.join(UPLOADS_ROOT, safeFolder);
    const destinationPath = path.join(destinationDir, fileName);

    await mkdir(destinationDir, { recursive: true });
    await writeFile(destinationPath, Buffer.from(await file.arrayBuffer()));

    return `/uploads/${safeFolder}/${fileName}`;
}
