
import Link from 'next/link';
export const runtime = 'edge';
export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ cate: string, opts: string, id: string }>;
}) {
  
  const cate = (await params).cate;
  const opts = (await params).opts;
  return (
    <main className="p-6">

      <div className='flex gap-4'>
        <Link className="btn" href={`/search/movie/`}>MOVIE</Link>
        <Link className="btn" href={`/search/tv/`}>TV</Link>
      </div>

      <p>{`/search/${opts}`}</p>
      <ul className="grid grid-cols-2 gap-4 mt-4">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((idx) => (
          <li key={idx}>
            <Link
              className="border border-white/20 rounded-md p-4 h-40 flex flex-col gap-1 justify-center items-center text-md uppercase"
              href={`/search/${opts}/${idx}`} passHref>
              {opts} - {idx}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
