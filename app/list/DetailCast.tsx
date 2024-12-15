import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Img from '@/app/components/Img';

export default function ViewCast({props}: {props: {title: string, css: string, data: []}}) {
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
    <div className={`sect cast mt-5 ${props.css}`}>
      <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
        <h4 className="tts text-sm">{props.title}</h4>
        <div className={`bt-nav ${isNav ? '' : 'hidden'}`}>
          <button type="button" onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
          <button type="button" onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
        </div>
      </div>
      <div ref={scrollBoxRef} className="lst flex flex-nowrap overflow-y-hidden overflow-x-auto -mx-5 px-2.5 scrollbar-hidden scroll-smooth">
        {
          props.data.filter( (item: any, i: number) => i < 999 ).map( (b: any) => {
            return (
              <Link href={`./person/${b.id}`} key={b.credit_id} className='profile block w-[calc(20%-1.25rem)] min-w-[calc(20%-1.25rem)] mx-[0.625rem]  break-all'>
                <div className="pics relative rounded-full overflow-hidden w-full bg-black pb-[calc(100%/100*100)] mb-1">
                  <Img width={92} height={92} src={`https://image.tmdb.org/t/p/w92${b.profile_path}`} alt={b.name} 
                    srcerr={'/img/common/user.png'} unoptimized={true} className='img absolute object-cover w-full h-full' loading='lazy'
                  />
                </div>
                <div className="name text-center text-10 -mx-2 -mb-0.5 text-[#dddddd]">{b.name}</div>
                <div className="carc text-center text-9  -mx-2 text-[#999999]">{b.character}</div>
              </Link>
            )
          })
        }
      </div>
    </div>
    </>
  )
}
