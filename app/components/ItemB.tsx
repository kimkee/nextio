'use client';
import React from 'react';
import Link from 'next/link';  // useParams , Outlet, useSearchParams, useLocation
import './ItemB.css';
import StarPoint from '@/app/components/StarPoint';
import Img from '@/app/components/Img';

// Movie, TV 리스트 유닛
export default function ItemB({ data, opts, cate }: any) {
  // console.log(data);

  const img = `https://image.tmdb.org/t/p/w200/${data.poster_path}`;
  const tit = data.title || data.name;

  return (
    <>
      <Link className='box block relative mb-0.5' href={`/list/${opts}/${cate}/${data.id}`} scroll={false}>
        <div className="cont relative">
          <div className="pics block relative overflow-hidden pb-[calc(1200%/780*100)] bg-black">
            <Img 
              width={200} height={300} src={`${img}`} alt={tit} srcerr='/img/common/non_poster.png' unoptimized={true} loading="eager"
              className='img block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full !opacity-100'
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
}