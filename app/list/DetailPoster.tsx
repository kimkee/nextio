import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Img from '@/app/components/Img';

export default function ViewPoster({props}: {props: {title: string, name: string, css: string, poster: string, data: any}}) {
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

  return (
    <>
    <div className={`sect post mt-4 ${props.css}`}>
      <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
        <h4 className="tts text-sm">{props.title} : {props.data.length+1}</h4>
        <div className={`bt-nav ${isNav ? '' : 'hidden'}`}>
          <button type="button" onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
          <button type="button" onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
        </div>
      </div>
      <div ref={scrollBoxRef} className="lst flex flex-nowrap overflow-y-hidden overflow-x-auto -mx-5 px-3 scrollbar-hidden scroll-smooth">
        <div data-index={0} className='box block w-[calc(30%-1.25rem)] min-w-[calc(30%-1.25rem)] mx-[0.4rem]  break-all'>
          <div /* href={`./poster/0`} */ className='pic block relative rounded-sm overflow-hidden w-full bg-black pb-[calc(450%/300*100)] mb-1'>
            <Img width={300} height={430} src={`https://image.tmdb.org/t/p/w300${props.poster}`} alt={props.name} 
              srcerr={'/img/common/non_poster.png'} unoptimized={true} className='img absolute object-cover w-full h-full' loading='eager'
            />
          </div> 
        </div>
        {
        props.data.map((img: any,idx: number) => {
          return(
          <div key={idx} data-index={idx+1} className='box block w-[calc(30%-1.25rem)] min-w-[calc(30%-1.25rem)] mx-[0.4rem]  break-all'>
            <div /* href={`./poster/${idx+1}`} */ className='pic block relative rounded-sm overflow-hidden w-full bg-black pb-[calc(450%/300*100)] mb-1'>
              <Img width={300} height={430} src={`https://image.tmdb.org/t/p/w300${img.file_path}`} alt={props.name +'-Poster-'+ (idx+1)} 
                srcerr={'/img/common/non_poster.png'} unoptimized={true} className='img absolute object-cover w-full h-full' loading='eager'
              />
            </div> 
          </div>
          )
        })
        }
      </div>
    </div>
    </>
  )
}
