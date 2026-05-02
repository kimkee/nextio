'use client'; // 클라이언트 구성 요소로 설정

import { use } from 'react';
import ListContent from './ListContent';
import './list.css';

export default function Page({
  params,
}: {
  params: Promise<{ cate: string; opts: string; id: string }>;
}) {
  // Promise를 언랩하여 params를 추출
  const { cate, opts } = use(params);

  return (
    <>
      <div className='container flex-col movie-list'>
        <main className='p-3'>
          <ListContent opts={opts} cate={cate} />
        </main>
      </div>
    </>
  );
}
