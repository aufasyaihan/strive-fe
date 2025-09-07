import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video } from "@/types/content";
import { getToken } from "@/lib/cookies";
import { formatDate } from "@/lib/utils";
import { ApiResponse } from "@/types/general";

async function fetchVideos(): Promise<Video[] | undefined> {
    try {
        const token = await getToken("access_token");

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/video`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch videos: ${response.status}`);
        }

        const data: ApiResponse<Video[]> = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

export default async function VideoList() {
    const videos = await fetchVideos();

    if (videos?.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                    No videos available at the moment.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos?.map((video) => (
                <Link key={video.id} href={`/dashboard/video/${video.id}`}>
                    <Card className="h-full transition-all duration-300 cursor-pointer group pt-0">
                        <div className="relative overflow-hidden rounded-t-xl">
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4">
                                <Badge
                                    variant="secondary"
                                    className="bg-white/90 text-gray-700"
                                >
                                    Video
                                </Badge>
                            </div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-6 h-6 text-amber-600 ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <CardHeader>
                            <CardTitle className="line-clamp-2 group-hover:text-amber-600 transition-colors">
                                {video.title}
                            </CardTitle>
                            <CardDescription className="text-sm">
                                {formatDate(video.createdAt)}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span className="text-amber-600 group-hover:text-amber-700 font-medium">
                                    Watch now →
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
