import Navbar from "@/components/navigation/navbar";

export default function LandingPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-dvh bg-gray-100">
            <header className="bg-transparent py-2 sticky top-0 z-50">
                <Navbar />
            </header>
            {children}
        </div>
    );
}
