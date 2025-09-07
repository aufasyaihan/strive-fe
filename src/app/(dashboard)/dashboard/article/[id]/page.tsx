export default async function ArticleDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log(id);

    return <div>ArticleDetailPage</div>;
}
