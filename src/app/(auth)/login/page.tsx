import { LoginForm } from "@/components/login-form";
import StriveIcon from "@/components/icons/icon";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="bg-amber-100/30 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-2">
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <StriveIcon className="h-10 w-20 stroke-2" />
                </Link>
                <LoginForm />
            </div>
        </div>
    );
}
