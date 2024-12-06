export const dynamicParams = false;


export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string, cate: string, opts: string }>;
}) {
  const id = (await params).id;
  const cate = (await params).cate;
  const opts = (await params).opts;
  return <div className="contents">/test/{opts}/{cate}/{id}</div>;
}
