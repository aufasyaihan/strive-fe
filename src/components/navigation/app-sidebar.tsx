"use client";

import { ChartLine, Home } from "lucide-react";

import { NavMain } from "@/components/navigation/nav-main";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import StriveIcon from "../icons/icon";
import { cn } from "@/lib/utils";

const data = {
    navMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "Learning",
            url: "#",
            icon: ChartLine,
            items: [
                {
                    title: "Videos",
                    url: "/dashboard/video",
                },
                {
                    title: "Articles",
                    url: "/dashboard/article",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { state } = useSidebar();
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <StriveIcon
                    className={cn(
                        "stroke-2 text-amber-500",
                        state === "collapsed" ? "h-6 w-full" : " pl-2 h-10 w-28"
                    )}
                    type={state === "collapsed" ? "icon" : "full"}
                />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
