import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function VideoDetailSkeleton() {
    return (
        <div className="container mx-auto px-6 py-8 max-w-4xl">
            <div className="mb-6">
                <Skeleton className="h-4 w-48" />
            </div>

            <div className="mb-8">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <div className="flex items-center gap-4 mb-6">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>

            <div className="mb-8">
                <Skeleton className="w-full h-64 md:h-96 rounded-lg" />
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
