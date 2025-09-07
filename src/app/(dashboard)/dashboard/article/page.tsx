import { Suspense } from "react";
import ArticleList from "@/components/dashboard/article";
import ArticleListSkeleton from "@/components/skeleton/article-list-skeleton";

export default function ArticlePage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Articles</h1>
        <p className="text-gray-600">Explore our collection of insightful articles</p>
      </div>

      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList />
      </Suspense>
    </div>
  );
}
