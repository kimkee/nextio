'use client'
import React, { useEffect, useState } from 'react'; //useState, useEffect
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'
import clsx from 'clsx';
import '@/app/lib/fontawesome';
import ui from  '@/app/lib/ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { supabase } from '@/app/supabase.js'; 
export default function Nav() {
  
  // const location = useLocation();
  const pathname = usePathname();
  

  const isActive = (els:string) => pathname.includes(`${els}`) ? "active" : "";
  const [isOnTop, setIsOnTop] = useState(false);
  const goTop = ()=> ui.scrollTo("body", 0 , 200 );
  const scrollEvent = ()=> {
    if ( ui.lock.stat ) return;
    ui.viewport.scrollTop() > 50 ? setIsOnTop(true) : setIsOnTop(false);
  };
  useEffect( () => {
    window.addEventListener("scroll", scrollEvent);
    return ()=>{
      window.removeEventListener("scroll", scrollEvent);
    }
  },[]);
  return (
    <>
      <div className={`floatnav ${ isOnTop ? `on-top` : `` }` }>
        <button type="button" onClick={goTop} className="bt top"><i className='h-6 w-6 inline-flex'><FontAwesomeIcon icon={["fas", "arrow-up"]} /></i><em>위로</em></button>
      </div>
      
      <nav id="menubar" className="menubar">
        <div className="inr">
          <ul className="menu">
            <li className={isActive("home")}>
              <Link href={`/home/`} className={"bt"}><i><FontAwesomeIcon icon={["fas", "house"]} /></i><em>Home</em></Link>
            </li>
            <li className={isActive("list/movie")}>
              <Link href={`/list/movie/0/`} className={"bt"}><i><FontAwesomeIcon icon={["fas", "clapperboard"]} /></i><em>Movie</em></Link>
            </li>
            <li className={isActive("list/tv")}>
              <Link href={`/list/tv/0/`} className={"bt"}><i><FontAwesomeIcon icon={["fas", "tv"]} /></i><em>TV</em></Link>
            </li>
            <li className={isActive("search/") || isActive("test/")}>
              <Link href={`/search/movie/`} className={"bt"}><i><FontAwesomeIcon icon={["fas", "search"]} /></i><em>Search</em></Link>
              {/* <Link href={`/test/movie/0//`} className={"bt"}><i><FontAwesomeIcon icon={["fas", "search"]} /></i><em>Search</em></Link> */}
            </li>
            <li className={isActive("user/")}>
              <Link href={`/user/62`} className={"bt"}> <i><FontAwesomeIcon icon={["fas", "user"]} /></i><em>MY</em></Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
