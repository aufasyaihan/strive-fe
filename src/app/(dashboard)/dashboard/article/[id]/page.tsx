import { Suspense } from "react";
import Image from "next/image";
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
import { Article } from "@/types/content";
import { ApiResponse } from "@/types/general";
import { getToken } from "@/lib/cookies";
import { formatDate } from "@/lib/utils";
import ArticleDetailSkeleton from "@/components/skeleton/article-detail-skeleton";
import MembershipUpdate from "@/components/dashboard/membership-update-wrapper";
import ForbiddenPage from "@/components/ui/forbidden-page";

type FetchResult = Article | null | 'forbidden';

async function fetchArticle(id: string): Promise<FetchResult> {
    try {
        const token = await getToken("access_token");

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/article/${id}`,
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
            throw new Error(`Failed to fetch article: ${response.status}`);
        }

        const data: ApiResponse<Article> = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching article:", error);
        return null;
    }
}

async function ArticleContent({ id }: { id: string }) {
    const result = await fetchArticle(id);

    if (!result) {
        notFound();
    }

    if (result === 'forbidden') {
        return <ForbiddenPage />;
    }

    const article = result;

    return (
        <MembershipUpdate contentId={article.id}>
            <div className="container mx-auto px-6 py-8 max-w-4xl">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/article">Articles</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{article.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-6">
                        <span className="font-medium">
                            By {article.author.firstName} {article.author.lastName}
                        </span>
                        <Separator orientation="vertical" className="h-4" />
                        <span>{formatDate(article.createdAt)}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <Badge variant="secondary">Article</Badge>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="relative overflow-hidden rounded-lg">
                        <Image
                            src={article.thumbnail}
                            alt={article.title}
                            width={800}
                            height={400}
                            className="w-full h-64 md:h-96 object-cover"
                            priority
                        />
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {article.content}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MembershipUpdate>
    );
}

export default async function ArticleDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <Suspense fallback={<ArticleDetailSkeleton />}>
            <ArticleContent id={id} />
        </Suspense>
    );
}
