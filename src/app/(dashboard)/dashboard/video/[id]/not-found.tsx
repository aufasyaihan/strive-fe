import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
    return (
        <div className="container mx-auto px-6 py-8 max-w-2xl">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-2">
                        Video Not Found
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">
                        The video you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild>
                            <Link href="/dashboard/video">
                                Back to Videos
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard">
                                Go to Dashboard
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
