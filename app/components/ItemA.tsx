'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './ItemB.css';
import StarPoint from '@/app/components/StarPoint';
import Img from '@/app/components/Img';
import ui from '@/app/lib/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Movie, TV 검색결과 유닛
export default function ItemA({ data, opts, cate }: any) {
  const pathname = usePathname();
  const imgpath = 'https://image.tmdb.org/t/p/w200';
  const img = imgpath + data.poster_path;
  const bgs = data.backdrop_path ? imgpath + data.backdrop_path : imgpath + data.poster_path;
  const tit = data.title || data.name;

  if(!data){return}

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
    
    // const targetUrl = e.currentTarget.getAttribute('href');
    // if (!targetUrl) return;

    // // 현재 경로와 클릭한 경로가 같으면 로딩바를 띄우지 않음
    // if (pathname === targetUrl) return;

    // ui.loading.show('glx');
  };

  return (
  <>
    <Link 
      className="box block p-4 relative" 
      href={`/search/${opts}/${data.id}`} 
      scroll={false}
      prefetch={true}
      onClick={handleLinkClick}
    >
      <div className="cont flex items-center">
        <div className="pics flex-none relative w-[5rem] pb-[7.5rem] mr-4 overflow-hidden  bg-black">
          <Img 
            width={200} height={300} src={`${img}`} alt={tit} unoptimized={true} srcerr='/img/common/non_poster.png' 
            className='img block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full !opacity-100'
          />  
        </div>
        <div className="desc">
          <div className="tits text-[#bbbbbb] text-sm mb-1 line-clamp-1">{tit}</div>
          <div className="text line-clamp-5 text-12 text-[#888888] mb-2">{data.overview}</div>
        </div>
      </div>
      <div className="info flex justify-between items-start pt-2 gap-3">
        <div className="dd">
          <div className="cate">
            <span className="txt flex flex-wrap gap-1">
              {data.genre_ids.map( (item: number) => {
                return <em className="ico bg-[#333] rounded-full inline-flex items-center justify-center px-1.5 py-0.5 text-[#aaa] text-10" key={item}> {  cate[item] } </em>
              })}
            </span>
          </div>
        </div>
        <div className="dd items-center flex text-[#707887] gap-2">
          <div className="hits inline-flex items-center gap-2 text-xt whitespace-nowrap">
            <StarPoint point={data.vote_average} opts={{cls:'-mt-1'}} />
            <em className="ico inline-flex items-center gap-1 ">
              <FontAwesomeIcon icon={['far', 'heart']} className='w-3 !h-3 align-middle' />
              <b>{data.vote_average}</b>
            </em>
          </div>
          <div className="date inline-flex items-center gap-1 text-xt whitespace-nowrap">
            <FontAwesomeIcon icon={['far', 'calendar-days']} className='w-3 !h-3 align-middle' />
            <b>{data.release_date || data.first_air_date}</b>
          </div>
        </div>
      </div>
      <div className="bgs bg-cover bg-center absolute left-0 top-0 right-0 bottom-0 -z-10 opacity-5 " style={{backgroundImage: `url(${bgs})`}}></div>
    </Link>
  </>  
  )
}