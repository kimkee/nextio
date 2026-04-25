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
export default function ItemPerson({ data, opts }: any) {
  const pathname = usePathname();
  const imgpath = 'https://image.tmdb.org/t/p/w200';
  const img = imgpath + data.profile_path;
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
    <div className="box block relative" >
      <Link href={`/search/${opts}/${data.id}`} scroll={false} prefetch={true} onClick={handleLinkClick}
        className="cont flex w-full items-center pressed py-4 pb-2 pr-3 pl-5"
      >
        <div className='w-20 flex-none mr-2 overflow-hidden'>
          <div className="pics relative w-full h-full pb-[calc(200/200*100%)] rounded-full overflow-hidden">
            <Img 
              width={200} height={300} src={`${img}`} alt={tit} unoptimized={true} srcerr='/img/common/user.png' 
              className='img block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-full mt-2'
              classNameErr='opacity-70 bg-black border border-white/15 border-4 mt-0! rounded-full'
            />  
          </div>
        </div>
        <div className="desc w-[calc(100%-80px)]">
          <div className="block">
            <div className="tits text-[#bbbbbb] text-sm">{tit}</div>
            <div className="text line-clamp-5 text-10 text-[#888888] mb-2">{data.known_for_department}</div>
            <div className="text-xt flex items-center gap-2"><StarPoint point={data.popularity} opts={{cls:'text-10 -mt-1'}} /></div>
          </div>
        </div>
      </Link>
      <div className="cate flex flex-wrap gap-1 leading-none p-4 pt-1">
        {data.known_for.map( (item: any) => {
          return (
            <Link href={`/search/${item.media_type}/${item.id}`} key={item.id} title={item.title || item.name} 
              className="ico bg-[#333] rounded-full inline-block max-w-[calc(100%-1rem)] overflow-hidden text-ellipsis whitespace-nowrap  px-1.5 py-0.5 text-white/60 text-xs pressed" 
            >
              {  item.title || item.name }
            </Link>
          )
        })}
      </div>
       {/*
       <div className="info flex justify-between items-start pt-2 gap-3">
        
        <div className="dd items-center flex text-[#707887] gap-2">
          <div className="hits inline-flex items-center gap-2 text-xt whitespace-nowrap">
            
            <em className="ico inline-flex items-center gap-1 ">
              <FontAwesomeIcon icon={['far', 'heart']} className='w-3 h-3 align-middle' />
              <b>{data.vote_average}</b>
            </em>
          </div>
          <div className="date inline-flex items-center gap-1 text-xt whitespace-nowrap">
            <FontAwesomeIcon icon={['far', 'calendar-days']} className='w-3 h-3 align-middle' />
            <b>{data.release_date || data.first_air_date}</b>
          </div>
        </div>
      </div>
      <div className="bgs bg-cover bg-center absolute left-0 top-0 right-0 bottom-0 -z-10 opacity-5 " style={{backgroundImage: `url(${bgs})`}}></div> 
      */}
    </div>
  </>  
  )
}