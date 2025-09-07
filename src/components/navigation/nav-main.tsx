"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import NavLink from "./nav-link";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    const path = usePathname();
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => {
                    if (!item.items) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <NavLink
                                    href={item.url}
                                    title={item.title}
                                    icon={item.icon}
                                />
                            </SidebarMenuItem>
                        );
                    }
                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={item.items.some(
                                (sub) => sub.url === path
                            )}
                            className="group/collapsible curp"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        className="cursor-pointer"
                                        tooltip={item.title}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <NavLink
                                                    href={subItem.url}
                                                    title={subItem.title}
                                                    nested
                                                    sub
                                                />
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
