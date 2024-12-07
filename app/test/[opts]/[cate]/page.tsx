"use client"; // 클라이언트 구성 요소로 설정

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';
export const runtime = 'edge';
export default function Page({
  params,
}: {
  params: Promise<{ cate: string, opts: string, id: string }>;
}) {
  // Promise를 언랩하여 params를 추출
  const { cate, opts, id } = use(params);

  const router = useRouter();
  const [currentCate, setCurrentCate] = useState(cate);
  const [currentOpts, setCurrentOpts] = useState(opts);
  const [dataList, setDataList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14]);

  useEffect(() => {
    setCurrentCate(cate);
    setCurrentOpts(opts);
  }, [cate, opts]);

  return (
    <main className="contents">
      <div className='flex gap-4'>
        <Link className="btn" href={`/test/${opts}/0`}>전체</Link>
        <Link className="btn" href={`/test/${opts}/1`}>액션</Link>
        <Link className="btn" href={`/test/${opts}/2`}>멜로</Link>
        <Link className="btn" href={`/test/${opts}/3`}>코믹</Link>
      </div>
      <div className='flex gap-4'>
        <Link className="btn" href={`/test/movie/${cate}`}>MOVIE</Link>
        <Link className="btn" href={`/test/tv/${cate}`}>TV</Link>
      </div>

      <p>{`/test/${opts}/${cate}`}</p>
      <ul className="grid grid-cols-2 gap-4 mt-4">
        {dataList.map((idx) => (
          <li key={idx}>
            <Link
              className="border border-white/20 rounded-md p-4 h-40 flex flex-col gap-1 justify-center items-center text-md uppercase"
              href={`/test/${opts}/${cate}/${idx}`} passHref>
              {opts} - {idx}
            </Link>
          </li>
        ))}
      </ul>
      <button className="btn" onClick={() => setDataList( prev => [...prev, 17,18,19,20,21,22,23,24,25,26,27,28,29,30] )}>More</button>
    </main>
  );
}
