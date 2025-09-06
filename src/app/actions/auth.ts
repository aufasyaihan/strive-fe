"use server";

import { saveCookie } from "@/lib/cookies";
import { ActionState, loginResponse } from "@/types/auth";
import { redirect } from "next/navigation";
import z from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .trim(),
});

export async function loginAction(
    prevState: ActionState | undefined,
    formData: FormData
): Promise<ActionState | undefined> {
    const rawFormData = Object.fromEntries(formData);
    const loginData = loginSchema.safeParse(rawFormData);

    if (!loginData.success) {
        return {
            error: loginData.error.flatten().fieldErrors,
            values: {
                email: rawFormData.email as string,
            },
        };
    }

    const { email, password } = loginData.data;

    const payload = { email, password };

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data: loginResponse = await res.json();
        console.log("Login response data:", data);
        

        if (!res.ok) {
            return {
                error: {
                    message: [data.meta.message || "An Unknown Error Occurred"],
                },
            };
        }
        
        await saveCookie("access_token", data.data.access_token, 24 * 60 * 60 * 7);
        redirect("/dashboard");
    } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        
        console.error("Login failed:", error);
        return {
            error: {
                message: [
                    (error as Error).message || "An Unknown Error Occurred",
                ],
            },
            values: {
                email: email,
            },
        };
    }
}
