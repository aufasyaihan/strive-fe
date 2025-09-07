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
import { Article } from "@/types/content";
import { getToken } from "@/lib/cookies";
import { formatDate } from "@/lib/utils";
import { ApiResponse } from "@/types/general";

async function fetchArticles(): Promise<Article[] | undefined> {
    try {
        const token = await getToken("access_token");

        const response = await fetch(
            `${
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
            }/article`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const data: ApiResponse<Article[]> = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
}

export default async function ArticleList() {
    const articles = await fetchArticles();

    if (articles?.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                    No articles available at the moment.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles?.map((article) => (
                <Link
                    key={article.id}
                    href={`/dashboard/article/${article.id}`}
                >
                    <Card className="h-full transition-all duration-300 cursor-pointer group pt-0">
                        <div className="relative overflow-hidden rounded-t-xl">
                            <Image
                                src={article.thumbnail}
                                alt={article.title}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4">
                                <Badge
                                    variant="secondary"
                                    className="bg-white/90 text-gray-700"
                                >
                                    Article
                                </Badge>
                            </div>
                        </div>

                        <CardHeader>
                            <CardTitle className="line-clamp-2 group-hover:text-amber-600 transition-colors">
                                {article.title}
                            </CardTitle>
                            <CardDescription className="text-sm">
                                By {article.author.firstName}{" "}
                                {article.author.lastName}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{formatDate(article.createdAt)}</span>
                                <span className="text-amber-600 group-hover:text-amber-700 font-medium">
                                    Read more →
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
