import Detail from "@/app/list/Detail";

export const runtime = 'edge';
export const dynamicParams = false;

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string, cate: string, opts: string }>;
}) {
  const id = (await params).id;
  const cate = (await params).cate;
  const opts = (await params).opts;

  return (
    <main className="contents">
      {/* <title>{`영화 상세`}</title>
        <meta name="description" content={`상세 정보`} /> */}
      <h2>/list/{opts}/{cate}/{id}</h2>
      <div className="flex flex-col">
        <p>opts : {opts}</p>
        <p>cate : {cate}</p>
        <p>id : {id}</p>
      </div>
      <Detail params={{ opts, cate, id }} />
    </main>
  );
}
