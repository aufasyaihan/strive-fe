"use server";

import { cookies } from "next/headers";

export async function saveCookie(name: string, value: string, days: number) {
    const cookie = await cookies();
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    cookie.set(name, value, { expires, secure: true, httpOnly: true });
}

export async function getCookie(name: string) {
    const cookie = await cookies();
    return cookie.get(name)?.value || null;
}

export async function deleteCookie(name: string) {
    const cookie = await cookies();
    cookie.delete(name);
}
