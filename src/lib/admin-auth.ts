import "server-only";

import { createHash } from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "delta-admin-session";

function getCredentials() {
    const username = process.env.ADMIN_LOGIN?.trim() || "";
    const password = process.env.ADMIN_PASSWORD?.trim() || "";

    if (!username || !password) {
        return null;
    }

    return { username, password };
}

function createSessionToken(username: string, password: string) {
    return createHash("sha256")
        .update(`${username}:${password}:delta-admin`)
        .digest("hex");
}

export function isAdminAuthConfigured() {
    return Boolean(getCredentials());
}

export function verifyAdminCredentials(username: string, password: string) {
    const credentials = getCredentials();

    if (!credentials) {
        return true;
    }

    return username === credentials.username && password === credentials.password;
}

export async function setAdminSession() {
    const credentials = getCredentials();

    if (!credentials) {
        return;
    }

    const cookieStore = await cookies();

    cookieStore.set(ADMIN_COOKIE_NAME, createSessionToken(credentials.username, credentials.password), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 12
    });
}

export async function clearAdminSession() {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
    const credentials = getCredentials();

    if (!credentials) {
        return true;
    }

    const cookieStore = await cookies();
    const currentValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!currentValue) {
        return false;
    }

    return currentValue === createSessionToken(credentials.username, credentials.password);
}
