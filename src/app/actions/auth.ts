"use server";

import { saveToken } from "@/lib/cookies";
import { ActionState, loginResponse } from "@/types/auth";
import z from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .trim(),
});

const registerSchema = z
    .object({
        first_name: z
            .string()
            .min(1, { message: "First name is required" })
            .trim(),
        last_name: z
            .string()
            .min(1, { message: "Last name is required" })
            .trim(),
        email: z.string().email({ message: "Invalid email address" }).trim(),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .trim(),
        confirm_password: z
            .string()
            .min(8, {
                message: "Confirm password must be at least 8 characters long",
            })
            .trim(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Password does not match",
        path: ["confirm_password"],
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

        await saveToken(
            "access_token",
            data.data.access_token,
            24 * 60 * 60 * 7
        );
        return {
            success: true,
        }
    } catch (error) {
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

export async function registerAction(
    prevState: ActionState | undefined,
    formData: FormData
): Promise<ActionState | undefined> {
    const rawFormData = Object.fromEntries(formData);
    const registerData = registerSchema.safeParse(rawFormData);

    if (!registerData.success) {
        return {
            error: registerData.error.flatten().fieldErrors,
            values: {
                first_name: rawFormData.first_name as string,
                last_name: rawFormData.last_name as string,
                email: rawFormData.email as string,
            },
        };
    }
    const { first_name, last_name, email, password } = registerData.data;
    const payload = { first_name, last_name, email, password };
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data: loginResponse = await res.json();
        console.log("Register response data:", data);
        if (!res.ok) {
            return {
                error: {
                    message: [data.meta.message || "An Unknown Error Occurred"],
                },
            };
        }
        return {
            success: true,
        }
    } catch (error) {
        console.error("Registration failed:", error);
        return {
            error: {
                message: [
                    (error as Error).message || "An Unknown Error Occurred",
                ],
            },
            values: {
                first_name: first_name,
                last_name: last_name,
                email: email,
            },
        };
    }
}
