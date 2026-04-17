import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Img from '@/app/components/Img';

export default function ViewVideo({props}: {props: {title: string, css: string, data: any, defaultImg: any}}) {
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
    console.log(props.defaultImg);
    
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  
  const openVideosModal = (idx:number) => {
    // scroll: false를 주면 스크롤이 맨 위로 튀는 현상을 방지합니다.
    router.push(`${pathname}?videos=${idx}`, { scroll: false });
  };
  console.log(props.data); 

  return (
    <>
    <div className="sect movs mt-4">
      <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
        <h4 className="tts text-sm">{props.title}</h4>
        <div className={`bt-nav ${isNav ? '' : 'hidden'}`}>
          <button type="button" onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
          <button type="button" onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
        </div>
      </div>
      <div ref={scrollBoxRef} className="lst flex flex-nowrap overflow-y-hidden overflow-x-auto -mx-5 px-3 scrollbar-hidden scroll-smooth">
        {
          props.data.filter( (item:any, i:number) => i < 100 ).reverse().map( (mov:any,idx:number) => {
            return (
              <div data-key={mov.id}  key={mov.id} 
                className="box w-[calc(70%-1.25rem)] min-w-[calc(70%-1.25rem)] mx-[0.3rem] relative block 
                only:mx-2 only:w-[calc(100%-1rem)] only:min-w-[calc(100%-1rem)]"
              >
                <button onClick={()=>{openVideosModal(idx) }} className="pic block relative w-full pb-[calc(900/1600*100%)] break-all cursor-pointer" >
                  <span className="msg px-2.5 py-3 absolute bottom-0 left-0 right-0 bg-black/40 z-10">
                    <span className="tit text-xs text-white/70 line-clamp-1">{mov.name}</span>
                  </span>
                  <i className="ico bg-linear-to-tl from-white/30 to-white/10 rounded-full shadow-lg w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center">
                    <FontAwesomeIcon icon={['fas', 'play']} className='text-black/70 w-4 h-4 ml-0.5' />
                  </i>
                  <Img 
                    width={300} height={160}
                    src={`https://i.ytimg.com/vi/${mov.key}/hqdefault.jpg`}
                    // YouTube 썸네일이 없을 경우 대체할 이미지 주소입니다.
                    srcerr={props.defaultImg}
                    className={"img absolute object-cover w-full h-full bg-black"} 
                    unoptimized={true}
                    alt={mov.name} loading="lazy"
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
