'use client';

// 영화/TV 리스트 스켈레톤 UI - ItemB 카드 구조와 동일하게 맞춤
export default function ListSkeleton({ count = 20 }: { count?: number }) {
  return (
    <ul className='grid grid-cols-4 gap-3'>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className='animate-pulse'>
          {/* 포스터 영역 - ItemB의 pb-[calc(1200%/780*100)] 비율과 동일 */}
          <div className='relative overflow-hidden rounded-sm bg-black pb-[calc(1200/780*100%)]'></div>
          {/* 타이틀 영역 */}
          <div className='mt-1.5 h-2.5 bg-black rounded w-4/5'></div>
        </li>
      ))}
    </ul>
  );
}
