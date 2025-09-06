"use client";

import { ActionState } from "@/types/auth";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/app/actions/auth";
import Password from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import SubmitButton from "./submit-button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Form({
    actionHandler = loginAction,
    type,
    ...props
}: React.FormHTMLAttributes<HTMLFormElement> & {
    actionHandler: (
        prevState: ActionState | undefined,
        formData: FormData
    ) => Promise<ActionState | undefined>;
    type: "login" | "register";
}) {
    const [state, formAction] = useActionState<
        ActionState | undefined,
        FormData
    >(actionHandler, undefined);
    const router = useRouter();
    useEffect(() => {
        if (state?.success) {
            toast.success(
                type === "register"
                    ? "Registered successfully!"
                    : "Logged in successfully!",
                {
                    description:
                        type === "register"
                            ? "You can now log in with your credentials."
                            : "Redirecting to dashboard...",
                }
            );
            router.push(type === "register" ? "/login" : "/dashboard");
            state.success = undefined;
        }
        if (state?.error) {
            state.error = undefined;
        }
    }, [state, type, router]);

    return (
        <form action={formAction} {...props}>
            {state?.error?.message && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                    {state.error.message[0]}
                </div>
            )}
            <div className="grid gap-6">
                <div className="grid gap-3">
                    {type === "register" && (
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="name">First Name</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    placeholder="John"
                                    defaultValue={
                                        state?.values?.first_name || ""
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Doe"
                                    defaultValue={
                                        state?.values?.last_name || ""
                                    }
                                    required
                                />
                            </div>
                        </div>
                    )}
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            defaultValue={state?.values?.email || ""}
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
                    {type === "register" && (
                        <div className="grid gap-3">
                            <Label htmlFor="confirm_password">
                                Confirm Password
                            </Label>
                            <Password
                                id="confirm_password"
                                name="confirm_password"
                                required
                            />
                            {state?.error?.confirm_password && (
                                <p className="text-sm text-red-600">
                                    {state.error.confirm_password[0]}
                                </p>
                            )}
                        </div>
                    )}
                    <SubmitButton
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600"
                    >
                        {type === "register" ? "Sign up" : "Login"}
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
                        href={type === "register" ? "/login" : "/register"}
                        className="underline underline-offset-4"
                    >
                        {type === "register" ? "Log in" : "Sign up"}
                    </Link>
                </div>
            </div>
        </form>
    );
}
