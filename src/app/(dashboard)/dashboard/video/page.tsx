import { Suspense } from "react";
import VideoList from "@/components/dashboard/video";
import VideoListSkeleton from "@/components/skeleton/video-list-skeleton";

export default function VideoPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Videos</h1>
        <p className="text-gray-600">Watch our collection of educational videos</p>
      </div>

      <Suspense fallback={<VideoListSkeleton />}>
        <VideoList />
      </Suspense>
    </div>
  );
}
