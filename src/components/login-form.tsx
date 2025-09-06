"use client";

import { ActionState } from "@/types/auth";
import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import Password from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import SubmitButton from "./submit-button";

export default function LoginForm() {
    const [state, formAction] = useActionState<
        ActionState | undefined,
        FormData
    >(loginAction, undefined);

    return (
        <form action={formAction}>
            {state?.error?.message && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                    {state.error.message[0]}
                </div>
            )}
            <div className="grid gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                        {state?.error?.email && (
                            <p className="text-sm text-red-600">
                                {state.error.email[0]}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Password id="password" name="password" required />
                        {state?.error?.password && (
                            <p className="text-sm text-red-600">
                                {state.error.password[0]}
                            </p>
                        )}
                    </div>
                    <SubmitButton
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600"
                    >
                        Login
                    </SubmitButton>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <Button variant="outline" className="w-fit">
                        <FaGithub />
                    </Button>
                    <Button variant="outline" className="w-fit">
                        <FaGoogle />
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </form>
    );
}
