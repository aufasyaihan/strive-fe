import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuSubButton } from "../ui/sidebar";
import { cn } from "@/lib/utils";

export default function NavLink({
    href,
    icon: Icon,
    title,
    sub,
    nested,
}: {
    href: string;
    icon?: LucideIcon;
    title: string;
    sub?: boolean;
    nested?:boolean;
}) {
    const path = usePathname();
    const isActive = path === href;

    if (sub) {
        return (
            <SidebarMenuSubButton
                asChild
                isActive={nested ? path.startsWith(href) : isActive}
            >
                <Link
                    href={href}
                    className={cn("flex gap-2 items-center px-2 py-1 rounded-md text-sm", isActive && "font-medium")}
                >
                    {Icon && <Icon className="size-4" />}
                    <span>{title}</span>
                </Link>
            </SidebarMenuSubButton>
        );
    }
    return (
        <SidebarMenuButton asChild tooltip={title} isActive={isActive}>
            <Link
                href={href}
                className={cn("flex gap-2 items-center px-2 py-1 rounded-md text-sm", isActive && "font-medium")}
            >
                {Icon && <Icon className="size-4" />}
                <span>{title}</span>
            </Link>
        </SidebarMenuButton>
    );
}
