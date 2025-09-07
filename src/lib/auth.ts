"use server";

import { ProfilResponse, User } from "@/types/auth";
import { cookies } from "next/headers";
import { getToken } from "./cookies";
import { cache } from "react";

export async function isLoggedIn(): Promise<boolean> {
    const cookieStore = await cookies();
    const loggedInCookie = cookieStore.get("logged_in")?.value;
    return loggedInCookie === "true";
}

export async function setLoggedInStatus(status: boolean) {
    const cookieStore = await cookies();

    if (status) {
        cookieStore.set("logged_in", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
    } else {
        cookieStore.delete("logged_in");
    }
}

export const getCurrentUser = cache(async (): Promise<User | null> => {
    try {
        console.log("Fetching current user...");
        
        const token = await getToken("access_token");
        
        if (!token) {
            throw new Error("No access token found");
        }
        const loggedIn = await isLoggedIn();
        if (!loggedIn) {
            return null;
        }

        const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            console.error(
                "Failed to fetch current user:",
                res.status,
                res.statusText,
                res
            );
            await setLoggedInStatus(false);
            return null;
        }

        const user: ProfilResponse = await res.json();
        console.log("Fetched current user:", user);

        return user.data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        await setLoggedInStatus(false);
        return null;
    }
});
