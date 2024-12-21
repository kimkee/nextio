'use client';
import React from 'react';
import Link from 'next/link';  // useParams , Outlet, useSearchParams, useLocation
import './ItemB.css';
import StarPoint from '@/app/components/StarPoint';
import Img from '@/app/components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Movie, TV 검색결과 유닛
export default function ItemA({ data, opts, cate }: any) {

// console.log(data);
  // console.log(cate);
  const imgpath = '//image.tmdb.org/t/p/w200';
  const img = imgpath + data.poster_path;
  const bgs = data.backdrop_path ? imgpath + data.backdrop_path : imgpath + data.poster_path;
  const tit = data.title || data.name;
  if(!data){return}
  return (
  <>
    {/* {JSON.stringify(cate)} */}
    <Link className="box block p-4 relative" href={`/search/${opts}/${data.id}`} scroll={false}>
      <div className="cont flex items-center">
        <div className="pics flex-none relative w-[5rem] pb-[7.5rem] mr-4 overflow-hidden  bg-[#203140]">
          {/* <img src={`${img}`} alt={tit} className='img'/> */}
          <Img 
            width={200} height={300} src={`${img}`} alt={tit} srcerr='/img/common/non_poster.png' unoptimized={true}
            className='img block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full'
          />  
        </div>
        <div className="desc">
          <div className="tits">{tit}</div>
          <div className="text line-clamp-5 text-12 text-[#888888]">{data.overview}</div>
        </div>
      </div>
      <div className="info flex justify-between items-start pt-2">
        <div className="dd">
          <div className="cate">
            <span className="txt flex flex-wrap gap-1">
              {data.genre_ids.map( (item: number) => {
                return <em className="ico bg-[#333] rounded-full inline-flex items-center justify-center px-1.5 py-0.5 text-[#aaa] text-10" key={item}> {  cate[item] } </em>
              })}
            </span>
          </div>
        </div>
        <div className="dd gap-1 items-center">
          <div className="hits inline-flex items-center gap-1">
            <StarPoint point={data.vote_average} opts={{cls:'-mt-1'}} />
            <em><FontAwesomeIcon icon={['far', 'heart']} className='w-3 !h-3 align-middle' /> <b>{data.vote_average}</b></em>
          </div>
          <div className="date inline-flex items-center gap-1">
            {/* <i className="fa-regular fa-calendar-days"></i> */}
            <FontAwesomeIcon icon={['far', 'calendar-days']} className='w-3 !h-3 align-middle' />
            <b>{data.release_date || data.first_air_date}</b>
          </div>
        </div>
      </div>
      <div className="bgs" style={{backgroundImage: `url(${bgs})`}}></div>
    </Link>
  </>  
  )

  /*   
  const img = `https://image.tmdb.org/t/p/w200/${data.poster_path}`;
  const tit = data.title || data.name;

  return (
    <>
      <Link className='box block relative mb-0.5' href={`/search/${opts}/${data.id}`} scroll={false}>
        <div className="cont relative">
          <div className="pics block relative overflow-hidden pb-[calc(1200%/780*100)] bg-black">
            <Img 
              width={200} height={300} src={`${img}`} alt={tit} srcerr='/img/common/non_poster.png' unoptimized={true}
              className='img block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full'
            />
          </div>
          <div className="desc absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/62 to-transparent p-1">
            <StarPoint point={data.vote_average} opts={opts} />
          </div>
        </div>
        <div className="mt-1 text-xs line-clamp-1 overflow-hidden break-all">{tit}</div>

      </Link>
    </>
  ) 
  */
}