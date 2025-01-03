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

export default function Home() {
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
        
        <ListSet opts={{media:"movie", list: "discover/movie", cate: "16", title: "영화/애니메이션"}} />
        
        <ListSet opts={{media:"movie", list: "discover/movie", cate: "10402", title: "영화/음악"}} />
        
        <ListSet opts={{media:"movie", list: "discover/movie", cate: "99", title: "영화/다큐멘터리"}} />

        <ListTop10 opts={{media:"tv", list: "trending/tv/week", cate: "0", title:"Weekly TV TOP 20"}} />
        
        <ListSet opts={{media:"tv", list: "discover/tv", cate: "16", title: "TV/애니메이션"}} />
        
        <ListSet opts={{media:"tv", list: "discover/tv", cate: "10764", title: "TV/Reality"}} />
        
        <ListSet opts={{media:"tv", list: "discover/tv", cate: "80", title: "TV/범죄"}} />

      </main>
    </div>
  );
}
