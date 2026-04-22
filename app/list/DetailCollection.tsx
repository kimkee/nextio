import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Img from '@/app/components/Img';

export default function DetailCollection({opts, props}: {opts: string, props: any}) {
  
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
  useEffect(() => {
    isNavBtn();
    
    
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  console.log(props.data); 
  // return ('')
  if(!props.data.parts) return ;
  return (
    <>
    <div className={`sect post mt-4 ${props.css}`}>
      <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
        <h4 className="tts text-sm" onClick={isNavBtn}>{props.title} <span className="text-sm text-white/60">: {props.data.parts.length}</span></h4>
        <div className={`bt-nav ${isNav ? '' : 'hidden'}`}>
          <button type="button" onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
          <button type="button" onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
        </div>
      </div>
      <div ref={scrollBoxRef} className="lst flex flex-nowrap overflow-y-hidden overflow-x-auto -mx-5 px-3 scrollbar-hidden scroll-smooth">
        {
          props.data.parts.sort( (a:any, b:any) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime() ).map((item: any,idx: number) => {
            return(
            <Link href={`/${opts}/${item.id}`} key={idx} data-index={idx+1} scroll={false} className='box block relative w-[calc(34%-1.0rem)] min-w-[calc(34%-1.0rem)] mx-[0.4rem] break-all active:scale-98 transition-all duration-300'>
              <div  className='pic block relative rounded-sm overflow-hidden w-full bg-black pb-[calc(9/16*100%)] mb-1'>
                <Img width={300} height={430} src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`} 
                  className='img absolute object-cover w-full h-full' loading='eager'
                  alt={item.name +'-Poster-'+ (idx+1)} srcerr={'/img/common/non_poster.png'} unoptimized={true}
                />
                <p className='tit text-10 text-white/80 bg-black/40 text-shadow-[1px_1px_1px_#000000] absolute left-0 right-0 top-0 p-1 leading-none text-center'>{item.title}</p>
                <p className='tio text-9 text-white/80 bg-black/40 text-shadow-[1px_1px_1px_#000000] absolute left-0 right-0 bottom-0 p-1 leading-none text-center'>{item.release_date}</p>
              </div>
            </Link>
            )
          })
        }
      </div>
    </div>
    </>
  )
}
