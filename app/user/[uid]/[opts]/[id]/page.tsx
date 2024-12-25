import Detail from '@/app/list/Detail';

export const runtime = 'edge';
export const dynamicParams = false;

export default async function View({
  params,
}: {
  params: Promise<{ id: string; opts: string }>;
}) {
  const id = (await params).id;
  const opts = (await params).opts;

  return (
    <div className='container'>
      <main className='contents'>
        {/* <h2>
          {opts}/{cate}/{id}
        </h2>
        <div className="flex flex-col">
          <p>opts : {opts}</p>
          <p>cate : {cate}</p>
          <p>id : {id}</p>
        </div> */}
        <Detail params={{ opts, id }} />
      </main>
    </div>
  );
}
