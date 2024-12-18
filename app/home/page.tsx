'use client'; // 클라이언트 구성 요소로 설정
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';
import ui from '@/app/lib/ui';
import HomeTop from "./HomeTop";
import './home.scss';
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
    <div className='page home'>
      <main className='block overflow-hidden pd-0 pb-5'>

        <HomeTop opts={{media:"movie"}} />
        {/* <div className={'fds'}></div> */}
        {/* <Image width={128} height={128} className='w-16' src='/img/logo_nextjs.png' alt='Next.js Logo' /> */}
        
        <div className="p-6 text-center">
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
          <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p><p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p> <p> Welcome to <a href="https://nextjs.org">Next.js!</a> </p>
        </div>
      </main>
    </div>
  );
}
