
import Link from 'next/link';

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ cate: string, opts: string, id: string }>;
}) {
  
  const cate = (await params).cate;
  const opts = (await params).opts;
  return (
    <main className="contents">

      <div className='flex gap-4'>
        <Link className="btn" href={`/test/${opts}/0`}>전체</Link>
        <Link className="btn" href={`/test/${opts}/1`}>액션</Link>
        <Link className="btn" href={`/test/${opts}/2`}>멜로</Link>
        <Link className="btn" href={`/test/${opts}/3`}>코믹</Link>
      </div>
      <div className='flex gap-4'>
        <Link className="btn" href={`/test//movie/${cate}`}>MOVIE</Link>
        <Link className="btn" href={`/test/tv/${cate}`}>TV</Link>
      </div>

      <p>{`/test/${opts}/${cate}`}</p>
      <ul className="grid grid-cols-2 gap-4 mt-4">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((idx) => (
          <li key={idx}>
            <Link
              className="border border-white/20 rounded-md p-4 h-40 flex flex-col gap-1 justify-center items-center text-md uppercase"
              href={`/test/${opts}/${cate}/${idx}`} passHref>
              {opts} - {idx}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
