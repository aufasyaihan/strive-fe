import StriveIcon from "@/components/icons/icon";
import Password from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function RegisterPages() {
    return (
        <div className="bg-amber-100/30 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-2">
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <StriveIcon className="h-10 w-25 stroke-2 text-amber-500" />
                </Link>
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">
                                Let&apos;s get you started
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid gap-6">
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">
                                                    First Name
                                                </Label>
                                                <Input
                                                    id="first_name"
                                                    name="first_name"
                                                    type="text"
                                                    placeholder="John"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">
                                                    Last Name
                                                </Label>
                                                <Input
                                                    id="last_name"
                                                    name="last_name"
                                                    type="text"
                                                    placeholder="Doe"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Password
                                                id="password"
                                                name="password"
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-amber-500 hover:bg-amber-600"
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                                            Or continue with
                                        </span>
                                    </div>
                                    <div className="flex w-full justify-center items-center gap-4">
                                        <Button
                                            variant="outline"
                                            className="w-fit"
                                        >
                                            <FaGithub />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-fit"
                                        >
                                            <FaGoogle />
                                        </Button>
                                    </div>

                                    <div className="text-center text-sm">
                                        Already have an account?{" "}
                                        <Link
                                            href="/login"
                                            className="underline underline-offset-4"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
