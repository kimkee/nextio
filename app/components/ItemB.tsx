'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './ItemB.css';
import StarPoint from '@/app/components/StarPoint';
import Img from '@/app/components/Img';
import ui from '@/app/lib/ui';

// Movie, TV 리스트 유닛
export default function ItemB({ data, opts, cate }: any) {
  const pathname = usePathname();
  // console.log(data);

  const img = `https://image.tmdb.org/t/p/w200/${data.poster_path}`;
  const tit = data.title || data.name;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
    
    // const targetUrl = e.currentTarget.getAttribute('href');
    // if (!targetUrl) return;

    // if (pathname === targetUrl) return;

    // 상세페이지가 모달로 뜨면서 자체 스켈레톤을 가지므로, 여기서 전역 로딩을 부를 필요가 없음
    // ui.loading.show('glx'); 
  };

  return (
    <>
      <Link 
        className='box block relative mb-0.5 group' 
        href={`/list/${opts}/${cate}/${data.id}`} 
        scroll={false}
        prefetch={true}
        onClick={handleLinkClick}
      >
        <div className="cont relative">
          <div className="pics block relative overflow-hidden pb-[calc(1200/780*100%)] bg-black group-active:scale-95 group-active:opacity-80 transition-transform">
            <Img 
              width={200} height={300} src={`${img}`} alt={tit} unoptimized={true} srcerr='/img/common/non_poster.png' loading="eager"
              className='img block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full'
            />
          </div>
          <div className="desc absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/62 to-transparent p-1">
            <StarPoint point={data.vote_average} opts={{ cls: 'text-xs' }} />
          </div>
        </div>
        <div className="mt-1 text-xs line-clamp-1 overflow-hidden break-all">{tit}</div>

      </Link>
    </>
  )
}