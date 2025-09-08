import { Metadata } from "next";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/navigation/header";
import { AuthProvider } from "@/store/auth-context";
import { MembershipProvider } from "@/store/membership-context";

export const metadata: Metadata = {
    title: "Strive Dashboard",
    description:
        "Your personal dashboard to manage and see articles and videos.",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <MembershipProvider>
                <SidebarProvider>
                    <AppSidebar variant="floating" />
                    <SidebarInset>
                        <Header />
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            {children}
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </MembershipProvider>
        </AuthProvider>
    );
}
