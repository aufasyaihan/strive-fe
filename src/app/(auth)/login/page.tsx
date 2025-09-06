import StriveIcon from "@/components/icons/icon";
import LoginForm from "@/components/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
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
                                Welcome back
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LoginForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
