import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Video } from "@/types/content";
import { ApiResponse } from "@/types/general";
import { getToken } from "@/lib/cookies";
import { formatDate } from "@/lib/utils";
import VideoDetailSkeleton from "@/components/skeleton/video-detail-skeleton";
import MembershipUpdate from "@/components/dashboard/membership-update-wrapper";
import ForbiddenPage from "@/components/ui/forbidden-page";

type VideoFetchResult = Video | null | 'forbidden';

async function fetchVideo(id: string): Promise<VideoFetchResult> {
    try {
        const token = await getToken("access_token");

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/video/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            if (response.status === 403) {
                return 'forbidden';
            }
            throw new Error(`Failed to fetch video: ${response.status}`);
        }

        const data: ApiResponse<Video> = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching video:", error);
        return null;
    }
}

async function VideoContent({ id }: { id: string }) {
    const result = await fetchVideo(id);

    if (!result) {
        notFound();
    }

    if (result === 'forbidden') {
        return <ForbiddenPage />;
    }

    // Now TypeScript knows result is Video
    const video = result;

    return (
        <MembershipUpdate contentId={video.id}>
            <div className="container mx-auto px-6 py-8 max-w-4xl">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/video">Videos</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{video.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {video.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-6">
                        <span className="font-medium">
                            By {video.author.firstName} {video.author.lastName}
                        </span>
                        <Separator orientation="vertical" className="h-4" />
                        <span>{formatDate(video.createdAt)}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <Badge variant="secondary">Video</Badge>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="relative overflow-hidden rounded-lg bg-black">
                        <video
                            className="w-full h-64 md:h-96"
                            controls
                            poster={video.thumbnail}
                            preload="metadata"
                        >
                            <source src={video.url} type="video/mp4" />
                            <source src={video.url} type="video/webm" />
                            <source src={video.url} type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {video.description}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MembershipUpdate>
    );
}

export default async function VideoDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <Suspense fallback={<VideoDetailSkeleton />}>
            <VideoContent id={id} />
        </Suspense>
    );
}
