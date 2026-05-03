'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function CateMenu({ menu, opts }: { menu: any[], opts: string }) {
  const params = useParams();
  const cateID = (params.cate as string) || '0'; // URL에서 카테고리 ID 추출
  
  const cateBoxRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const goSlide = () => {
    const catebox = cateBoxRef.current;
    const btnAct = activeBtnRef.current;
    if (!catebox || !btnAct) return;
    const cateboxWid = catebox.offsetWidth * 0.5;
    const btnActLeft = btnAct.offsetLeft;
    const btnActWid = btnAct.offsetWidth * 0.5;
    const scr = btnActLeft - cateboxWid + btnActWid;
    catebox.scrollTo(scr, 0);
  };

  useEffect(() => {
    goSlide();
  }, [cateID, menu]); // 카테고리가 바뀌거나 메뉴 데이터가 로드될 때만 스크롤

  const handleWheel = (e: WheelEvent )=> {
    e.preventDefault();
    if(cateBoxRef.current){ cateBoxRef.current.scrollLeft += e.deltaY; }
  }

  const btnClass = `bt inline-flex items-center text-xs h-7 px-2 py-2 rounded-full text-[#b7b7b7] text-shadow-[0_0rem_0.125rem_black] whitespace-nowrap`;

  return (
    <>
      <div className={`cate-box overflow-hidden block w-full h-14 ${cateID}`}>
        <div className="inr h-14 flex flex-nowrap items-center border border-t border-[#6b6b6b]/10 bg-[rgb(30_30_30_/92%)] fixed z-600
          bottom-[calc(3.75rem+var(--safe-bottom))] w-full overflow-x-auto scrollbar-hidden scroll-smooth
          left-1/2 translate-x-[-50%] max-w-(--mwide) ml-[calc(0px-var(--scrPad)/2)]"
          ref={cateBoxRef}
          onMouseOver={  ()=>cateBoxRef.current?.addEventListener('wheel', handleWheel) }
          onMouseLeave={ ()=>cateBoxRef.current?.removeEventListener('wheel', handleWheel) }
        >
          {
            menu.length > 0 ?
            <ul className="list px-2.5 flex flex-nowrap items-center gap-3">
              <li data-index="0" className={`${"0" === cateID ? "active" : ''}`}>
                <button className={`bt ring-1 ${btnClass} ${"0" === cateID ? 'bg-primary/20 ring-primary/30 text-white/90':'bg-black/30 ring-white/10'}`}
                  onClick={() => router.push(`/list/${opts}/0`)} ref={cateID === "0" ? activeBtnRef : null}>
                  전체
                </button>
              </li>
              {menu.map((item: { id: string; name: string; }, idx: number) => {
                const isSelected = item.id.toString() === cateID;
                return (                  
                  <li data-index={idx + 1} key={item.id} data-cate={item.id} className={`${isSelected ? "active" : ''}` }>
                    <button
                      className={`${btnClass} ring-1 ${isSelected ? 'bg-primary/20 ring-primary/30 text-white/90':'bg-black/30 ring-white/10'}`}
                      onClick={() => router.push(`/list/${opts}/${item.id}`)}
                      ref={isSelected ? activeBtnRef : null}
                    >
                      {item.name}
                    </button>
                  </li>
                )
              })}
            </ul>
            :
            <ul className="list px-2.5 flex flex-nowrap items-center w-full gap-3">
              {[0,1,2,3,4,5,6].map((item, idx) => {
                  return (
                    <li className='min-w-[13%]' key={idx}>
                      <div className={`bt ring-1 ${btnClass} w-full bg-black/30 ring-white/3 align-middle`} />
                    </li>
                  )
              })}
            </ul>
          }
        </div>
      </div>
    </>
  )
}