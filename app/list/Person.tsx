'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useParams, useRouter, useSearchParams } from 'next/navigation'; //,useOutletContext  , useLocation, Outlet,

import ui from '@/app/lib/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PersonClient from './PersonClient';

export default function Person() {

  const router = useRouter();
 

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    
 
    ui.lock.using(true); 
    setMounted(true);
    
    return () => {
      ui.lock.using(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  // article 전체 영역 휠 → pct 스크롤로 위임
  // shift+wheel은 출연진/영상 등 가로 스크롤 영역이 처리하도록 통과
  const pctRef = useRef<HTMLDivElement>(null);
  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (e.shiftKey) return;
    const pct = pctRef.current;
    if (!pct) return;
    pct.scrollTop += e.deltaY;
  };

  const opts ='person'
  const id = ''

  return (
  <>

    <article onWheel={handleWheel} className={`pop-layer c popup person fixed left-0 top-0 bottom-0 right-0 flex justify-center items-end pr-(--scrPad) open backdrop-blur-md `}>
      <div className="fixed top-2 w-full max-w-(--mwide) left-1/2 -translate-x-1/2 z-50 text-right pr-2">
        <button type="button" aria-label='닫기' onClick={ () => { router.back() } } 
          className="btn-pop-close h-10 w-10 text-white inline-flex items-center justify-center text-3xl"
        >
          <FontAwesomeIcon icon={['fas', 'xmark']} className='w-5 h-5 flex text-white'/>
        </button>
      </div>
        
      <div className={`pbd bottom-0 inline-block text-left whitespace-normal relative
        max-h-[calc(100dvh-0px)] max-w-(--mwide) ml-(--scrPad) w-[calc(100%-0rem)] margin-bottom-0 rounded-t-xl
        transition-[transform,opacity,translate] ease-out duration-200
        ${mounted ? 'translate-y-0' : 'translate-y-90' }
      `}>
        <div ref={pctRef} className="pct max-h-[calc(100dvh-0px)] overflow-y-auto scrollbar-hidden bg-linear-to-b from-transparent via-[#111111] to-[#111111]">
          <main className="poptents mb-5 p-5">

            <PersonClient params={{ opts, id }} />
              
          </main>
        </div>
      
      </div>
    </article>
  </>
  )
}
