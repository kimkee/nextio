'use client'; // 클라이언트 구성 요소로 설정
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';
import ui from '@/app/lib/ui';
import HomeTop from "./HomeTop";
import ListSet from "./ListSet";
import ListTop10 from "./ListTop10";
import { useTranslation } from '@/app/store/lang';
import { version } from '@/package.json'

export default function Home() {
  const t = useTranslation();
  const scrollEvent = ()=> {
    const header = document.querySelector('.header');
    const scr = ui.viewport.scrollTop(); 
    if ( ui.lock.stat ) return;
    if( scr > 100){
      // header.classList.add("trans");
    }else{
      // header.classList.remove("trans");
    }
  };
 
  useEffect(() => {
    window.scrollTo(0, 0);
    const header = document.querySelector('.header');
    // header.classList.add("home");
    window.addEventListener("scroll",scrollEvent);
    return ()=>{
      // header.classList.remove("home");
      window.removeEventListener("scroll",scrollEvent);
    }
  },[]);
  return (
    <div className='page home -mt-14'>
      <main className='block overflow-hidden pd-0 pb-5'>

        <HomeTop opts={{media:"movie"}} />

        <ListTop10 opts={{media:"movie", list: "trending/movie/week", cate: "0", title:"Weekly Movie TOP 20"}} />
        
        <ListSet opts={{media:"movie", list: "discover/movie", cate: "16", title: `${t.movie}/${t.animation}`}} />
        
        <ListSet opts={{media:"movie", list: "discover/movie", cate: "10402", title: `${t.movie}/${t.music}`}} />
        
        <ListSet opts={{media:"movie", list: "discover/movie", cate: "99", title: `${t.movie}/${t.documentary}`}} />

        <ListTop10 opts={{media:"tv", list: "trending/tv/week", cate: "0", title:"Weekly TV TOP 20"}} />
        
        <ListSet opts={{media:"tv", list: "discover/tv", cate: "16", title: `${t.tv}/${t.animation}`}} />
        
        <ListSet opts={{media:"tv", list: "discover/tv", cate: "10764", title: `${t.tv}/${t.reality}`}} />
        
        <ListSet opts={{media:"tv", list: "discover/tv", cate: "80", title: `${t.tv}/${t.crime}`}} />

        <div className="flex flex-col justify-center items-center pb-3">
          <p className="text-xs mt-3 flex gap-1 border border-gray-500/40 items-center justify-center px-2 py-1 rounded-xl bg-white/10 leading-none">
            <span className="font-bold">{`Version ${version}`}</span>
          </p>
          <p className="font-light text-xs mt-2">
            Build : {process.env.NEXT_PUBLIC_BUILD_TIME}
          </p>
        </div>
      </main>
    </div>
  );
}
