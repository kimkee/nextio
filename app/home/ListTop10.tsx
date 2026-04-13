'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import ui from '@/app/lib/ui';
import StarPoint from '@/app/components/StarPoint';
import Img from '@/app/components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default  function ListSet({opts}:{opts:{media:string, list:string, cate:string, title:string }}){
  const pathname = usePathname();
  const [mlist, setMlist] = useState<any>(null);
 
  const cateList = opts.cate !== '0' ? `&with_genres=${opts.cate}` : ``;
  
  const fetchMoive = ()=>{
    const fetchURL = `https://api.themoviedb.org/3/${opts.list}?page=1${cateList}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      setMlist( res.data.results );
    }).catch(e=>{
      console.log(e);
    }); 
  }

  const goScroll = (els: string, e?: any) => {
    const scrollBox = scrollBoxRef.current;
    const isNext = els === 'next' ? true : false;
    if(!scrollBox) return;
    const minus = isNext ? 1 : -1;
    const scAmt = (scrollBox.offsetWidth - 100) * minus;
    console.log(scAmt, scrollBox, minus);
    scrollBox.scrollLeft += scAmt;
  };
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  

  const handleWheel = (event: any)=> {
    event.preventDefault();
    if(scrollBoxRef.current){
      scrollBoxRef.current.scrollLeft += event.deltaY;
    }
  }
  const [isNavPrev, setIsNavPrev] = useState(false);
  const [isNavNext, setIsNavNext] = useState(false);
  const handeScroll = ()=> {
    const box = scrollBoxRef.current;
    if(!box) return;
    const amt = Math.ceil(box.scrollLeft / (box.scrollWidth - box.offsetWidth)*100 || 0);
    // console.log( amt );
    setIsNavPrev( amt <= 0 ? true : false);
    setIsNavNext( amt >= 100 ? true : false);
  }
  
  const [isNav, setIsNav] = useState(false);
  const isNavBtn = () => {
    const el = scrollBoxRef.current;
    // console.log(el?.scrollWidth ,el?.clientWidth);
    if (!el) return;
    setIsNav(el?.scrollWidth > el?.clientWidth);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
    
    // const targetUrl = e.currentTarget.getAttribute('href');
    // if (!targetUrl) return;

    // // 현재 경로와 클릭한 경로가 같으면 로딩바를 띄우지 않음
    // if (pathname === targetUrl) return;

    // ui.loading.show('glx');
  };

  useEffect(() => {
    fetchMoive();
    // isNavBtn()
    setTimeout(() => isNavBtn(), 1000);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (mlist === null) {
    return (
      <section className="sect mnList mb-4 animate-pulse">
        {/* 섹션 헤더 스켈레톤 - ListTop10은 이탤릭 대형 제목 */}
        <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none px-5 py-2">
          <div className="h-5 w-44 rounded bg-black" />
        </div>
        {/* 가로 스크롤 포스터 행 - Top10은 30% 너비 카드 */}
        <div className="flex flex-nowrap overflow-hidden px-1 gap-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-none w-[calc(30%-0.625rem)] min-w-[calc(30%-0.625rem)] pt-2 pl-2 mx-[0.4rem]">
               
              {/* 포스터 */}
              <div className="pb-[calc(1200/780*100%)] w-full rounded-sm bg-black" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return(
    <>
      
      <section className="sect mnList mb-4">

        <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none px-5 py-2">
          <div className="link inline-flex items-center italic">
            <h4 className="tts text-xl">{opts.title}</h4>
          </div>
          <div className={`bt-nav ${isNav ? '' : 'hidden'}`}>
            <button type="button" disabled={isNavPrev} onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
            <button type="button" disabled={isNavNext} onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
          </div>
        </div>

        <div ref={scrollBoxRef}
          className="inr flex flex-nowrap overflow-y-hidden overflow-x-auto px-1 scrollbar-hidden"
          onMouseEnter={ ()=>scrollBoxRef.current?.addEventListener('wheel', handleWheel) }
          onMouseLeave={ ()=>scrollBoxRef.current?.removeEventListener('wheel', handleWheel) }
          onScroll={ handeScroll }
        >
          
          { mlist.filter( (item: any, i: number) => i < 20 ).map( (data: any, idx: number) => {
              const img = `https://image.tmdb.org/t/p/w154${data.poster_path}` ;
              const tit = data.title || data.name;
              const detailUrl = `/home/${opts.media}/${data.id}`;
              return (
                <div key={idx} className={`pbox box pt-2 pl-2 block w-[calc(30%-0.625rem)] min-w-[calc(30%-0.625rem)] mx-[0.4rem]  break-all last:mr-3 ${idx<3 ? '[&_.num]:text-primary' : ''}`}>
                  <Link 
                     className="box group block relative rounded-sm w-full bg-black pb-[calc(1200/780*100%)] mb-1 active:scale-95 active:opacity-80 transition-transform"
                     href={detailUrl}
                     scroll={false}
                     prefetch={true}
                     onClick={handleLinkClick}
                  >
                    <div className='num absolute -top-3 -left-2 text-white text-3xl font-extrabold drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] italic z-10'>{idx + 1}</div>
                    <Img width={300} height={450} src={`${img}`} alt={tit} unoptimized={true} srcerr='/img/common/non_poster.png' className='img absolute object-cover w-full h-full'/>
                    <div className="info absolute left-0 bottom-0 right-0 bg-linear-to-t from-black/62 to-transparent p-1">
                      <StarPoint point={data.vote_average} opts={{cls:'text-sm'}} />
                    </div>
                  </Link>
                </div>
              )
            })
          }
            
        </div>
      </section>
    </>
  )
}