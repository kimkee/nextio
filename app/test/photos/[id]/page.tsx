export const dynamicParams = false;



export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <div className="card">{id}</div>;
}
