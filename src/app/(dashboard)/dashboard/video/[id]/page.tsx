export default async function VideoDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log(id);
    return <div>VideoDetailPage</div>;
}
