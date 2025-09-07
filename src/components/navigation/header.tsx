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

export default function Header() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex justify-between items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
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
