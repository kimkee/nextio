import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Img from '@/app/components/Img';
import axios from 'axios';

export default function ViewStills({opts, postID }: {opts: string, postID: string }) {
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
    const [isNav, setIsNav] = useState(false);
    const isNavBtn = () => {
      const el = scrollBoxRef.current;
      if (!el) return;
      setIsNav(el?.scrollWidth > el?.clientWidth);
    };

  const pathname = usePathname();
  const router = useRouter();
  
  const openPosterModal = (idx:number, opts:string) => {
    // scroll: false를 주면 스크롤이 맨 위로 튀는 현상을 방지합니다.
    // 기존 url에  ?poster=${opts}&idx=${idx}  추가하는방식으로 바꾸자
    const url = new URL(window.location.href);
    url.searchParams.set('poster', opts);
    url.searchParams.set('idx', idx.toString());
    router.push(url.toString(), { scroll: false });
    // router.push(`${pathname}?poster=${opts}&idx=${idx}`, { scroll: false });

  };

  const [dataStills, setDataStills] = useState<any>();
  const fetchStills = () => {
    if(opts === 'movie') return;
    const list = `https://api.themoviedb.org/3/${opts}/${postID}/season/1/episode/1/images?api_key=f76021076e8162ea929bd2cea62c6646`;
    axios.get(list).then((res)=>{
      setDataStills(res.data.stills);
      console.log(res.data.stills);
      setTimeout(() => {
        isNavBtn();
      }, 500);
    }).catch((e)=>{ console.error('Failed to fetch stills:', e); });
  }
  const fetchBackdrops = () => {
    if(opts === 'tv') return;
    const list = `https://api.themoviedb.org/3/movie/${postID}/images?api_key=f76021076e8162ea929bd2cea62c6646`;
    axios.get(list).then((res)=>{
      setDataStills(res.data.backdrops);
      console.log(res.data.backdrops);
      setTimeout(() => {
        isNavBtn();
      }, 500);
    }).catch((e)=>{ console.error('Failed to fetch stills:', e); });
  }

  console.log(dataStills);
  

  useEffect(() => {
    fetchStills();
    fetchBackdrops();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(props.data); 
  if(!dataStills || dataStills.length == 0) return <></>;
  return (
    <>
    <div className={`sect post mt-4`}>
      <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
        <h4 className="tts text-sm">Stills <span className="text-sm text-white/60">: {dataStills?.length}</span></h4>
        <div className={`bt-nav ${isNav ? '' : 'hidden'}`}>
          <button type="button" onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
          <button type="button" onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
        </div>
      </div>
      <div ref={scrollBoxRef} className="lst flex flex-nowrap overflow-y-hidden overflow-x-auto -mx-5 px-3 scrollbar-hidden scroll-smooth">
        
        {
        dataStills?.map((img: any,idx: number) => {
          return(
          <div key={idx} data-index={idx+1} className='box block w-[calc(46%-1.25rem)] min-w-[calc(46%-1.25rem)] mx-[0.4rem]  break-all'>
            <button type='button' /* onClick={()=>{openPosterModal(idx+1, opts) }} */ className='pic block relative rounded-sm overflow-hidden w-full bg-black pb-[calc(9/16*100%)] mb-1 active:scale-98 transition-all duration-300'>
              <Img width={300} height={430} src={`https://image.tmdb.org/t/p/w300${img.file_path}`} alt={postID +'-Poster-'+ (idx+1)} 
                srcerr={'/img/common/non_poster.png'} unoptimized={true} 
                className='img absolute object-cover w-full h-full' loading='eager'
                classNameErr='opacity-100! border border-white/20! border-2'
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
