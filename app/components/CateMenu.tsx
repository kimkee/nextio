
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
export default function CateMenu({ menu, opts }: { menu: any[], opts: string }) {
  const params = useParams()
  const [slideActive, slideActiveSet] = useState(0);
  const cateBoxRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const goSlide = (num: number) => {
    const catebox = cateBoxRef.current;
    const btnAct = activeBtnRef.current;
    if (catebox && btnAct) {
      const cateboxWid = catebox?.offsetWidth * 0.5;
      const btnActLeft = btnAct?.offsetLeft;
      const btnActWid = btnAct?.offsetWidth * 0.5;

      const scr = btnActLeft - cateboxWid + btnActWid;
      catebox?.scrollTo(scr, 0);
      console.log("slideActive == " + slideActive + "  " + btnActLeft);
      slideActiveSet(num);
    }
  };
  const cateID = params.cate;
  useEffect(() => {
    goSlide(slideActive);
    // console.log(menu);

    return () => { }
    // eslint-disable-next-line
  }, [cateID, slideActive, menu, opts]);

  const handleWheel = (event: any)=> {
    event.preventDefault();
    if(cateBoxRef.current){ cateBoxRef.current.scrollLeft += event.deltaY; }
  }

  const btnClass = `bt inline-flex items-center text-xs h-7 px-2 py-2 rounded-full text-[#b7b7b7] text-shadow-[0_0rem_0.125rem_black] whitespace-nowrap`;

  return (
    <>
      
      <div className={`cate-box overflow-hidden block w-full h-14 ${cateID}`}>
        <div className="inr h-14 flex flex-nowrap items-center border border-t border-[#6b6b6b]/10 bg-[rgb(30_30_30_/92%)] fixed z-[600]
          bottom-[calc(3.75rem+var(--safe-bottom))] w-full z-600 overflow-x-auto scrollbar-hidden
          left-1/2 translate-x-[-50%] max-w-[var(--mwide)] ml-[calc( 0px - var(--scrPad) /2 )]"
          ref={cateBoxRef}
          onMouseEnter={ ()=>cateBoxRef.current?.addEventListener('wheel', handleWheel) }
          onMouseLeave={ ()=>cateBoxRef.current?.removeEventListener('wheel', handleWheel) }
        >
          {
            
            menu.length > 0 ?
            <ul className="list px-2.5 flex flex-nowrap items-center">
              <li data-index="0" className={"0" === cateID ? "active" : ''}>
                <button className={`bt ring-1 ring-[#3c3c3c] ${btnClass} ${"0" === cateID ? 'bg-[#273c5a] ring-[#2c3a58]':'bg-[#1c1c1c] ring-[#3c3c3c]'}`}
                  onClick={() => router.push(`/list/${opts}/0`)} ref={cateID === "0" ? activeBtnRef : null}>
                  전체
                </button>
              </li>
              {menu.map((item: { id: string; name: string; }, idx: number) => {
                return (                  
                  <li data-index={idx + 1} key={item.id} data-cate={item.id} className={`${item.id.toString() === cateID ? "active" : ''} mx-1.5` }>
                    <button
                      className={`${btnClass} ring-1 ${item.id.toString() === cateID ? 'bg-[#273c5a] ring-[#2c3a58]':'bg-[#1c1c1c] ring-[#3c3c3c]'}`}
                      onClick={() => router.push(`/list/${opts}/${item.id}`)}
                      ref={item.id.toString() === cateID ? activeBtnRef : null}
                    >
                      {item.name}
                    </button>
                  </li>
                )
              })}
            </ul>
            :
            null
          }
        </div>
      </div>
    </>
  )
}