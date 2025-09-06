import Navbar from "@/components/navigation/navbar";

export default function LandingPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-dvh">
            <header className="flex w-fit gap-2 bg-transparent py-4 sticky top-0 z-50 mx-auto ">
                <Navbar />
            </header>
            <main className="h-full w-full">{children}</main>
        </div>
    );
}
