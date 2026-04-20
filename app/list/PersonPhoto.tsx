'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function PersonPhoto({title, data, setProfileImg, name}: {title:string, data:any, setProfileImg:any, name:string}) {
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const [isNav, setIsNav] = useState(false);
  
  const goScroll = (els: string, e?: any) => {
    const scrollBox = scrollBoxRef.current;
    const isNext = els === 'next' ? true : false;
    if(!scrollBox) return;
    const minus = isNext ? 1 : -1;
    const scAmt = (scrollBox.offsetWidth - 100) * minus;
    scrollBox.scrollLeft += scAmt;
  };

  const isNavBtn = () => {
    const el = scrollBoxRef.current;
    if (!el) return;
    setIsNav(el?.scrollWidth > el?.clientWidth);
  };

  useEffect(() => {
    isNavBtn();
    
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <>
    <div className="sect list mt-5">
      <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
        <h4 className="tts text-base text-white/90">{title}</h4>
        <div className={`bt-nav ${isNav ? '' : 'hidden'}`}>
          <button type="button" onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
          <button type="button" onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
        </div>
      </div>
      <div ref={scrollBoxRef} className="lst flex flex-nowrap overflow-x-auto overflow-y-hidden mt-2 -mx-5 px-4 scrollbar-hidden scroll-smooth">
        {
        data.map((item:any,idx:number) => {
          return(
          <div key={idx} className='box shrink-0 w-[calc(19%-20px)] mx-1.25' data-index={idx+1}>
            <button type='button' onClick={()=>{
              // 부모컴포넌트에 setProfileImg 전달 하기
              setProfileImg('https://image.tmdb.org/t/p/w400'+item.file_path);
            }} className='pic pb-[150%] block w-full relative overflow-hidden rounded-sm bg-black active:scale-95 transition-all duration-200'>
              <img 
                className="img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover max-w-inherit min-w-inherit h-full bg-[#000000]"
                src={'https://image.tmdb.org/t/p/w400'+item.file_path} alt={`${name }-${idx+1}`}
                onError={(e:any)=>{e.target.src=`${process.env.NEXT_PUBLIC_SITE_URL}img/common/non_poster.png`}} 
                loading="lazy" 
              />
            </button> 
          </div>
          )
        })
        }
      </div>
    </div>
  </>
  )
}
