"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { ChevronDown, LogOut, User } from "lucide-react";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { useAuth } from "@/store/auth-context";
import { useMembership } from "@/store/membership-context";
import { Badge } from "../ui/badge";

export default function Header() {
    const { user } = useAuth();
    const { membershipLimits } = useMembership();

    const getMembershipDisplay = () => {
        if (!user || !membershipLimits) return "Loading...";
        
        const totalUsed = (user.articlesCount || 0) + (user.videosCount || 0);
        
        switch (user.membership) {
            case "A":
                return `${totalUsed} / 10 Articles & Videos`;
            case "B":
                return `${totalUsed} / 20 Articles & Videos`;
            case "C":
                return "Unlimited Articles & Videos";
            default:
                return "No Plan";
        }
    };

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex justify-between items-center gap-2 px-4 w-full">
                <div className="flex gap-2 items-center">
                    <SidebarTrigger className="-ml-1" />
                    <Badge className="text-sm px-2 py-1 rounded-md bg-amber-100 text-amber-800">
                        {getMembershipDisplay()}
                    </Badge>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
                        <Avatar className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full align-middle">
                            <AvatarImage src="https://i.pravatar.cc/300" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="/profile" className="flex gap-2">
                                <User /> <p>Profile</p>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            className="flex gap-2 cursor-pointer"
                            onClick={() => logout()}
                        >
                            <LogOut /> <p>Logout</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
