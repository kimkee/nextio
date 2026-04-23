'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import getUser from '@/app/getUser';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/app/lib/fontawesome';
import ui from '@/app/lib/ui';
import Img from '@/app/components/Img';
import { Myinfo as MyinfoType } from '@/app/types';

export default function Nav() {
  const pathname = usePathname();

  const isActive = (els: string) => pathname.includes(`${els}`) ? 'active  text-primary border-primary' : '';
  const [isOnTop, setIsOnTop] = useState(false);

  const goTop = () => ui.scrollTo('body', 0, 200);

  const scrollEvent = () => {
    if (ui.lock.stat) return;
    ui.viewport.scrollTop() > 50 ? setIsOnTop(true) : setIsOnTop(false);
  };
  const [myinfo, setMyinfo] = useState<MyinfoType | null>(null);
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
    
    const targetUrl = e.currentTarget.getAttribute('href');
    if (!targetUrl) return;

    // 현재 경로와 클릭한 경로가 같으면 로딩바를 띄우지 않음
    const currentPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const checkUrl = targetUrl.endsWith('/') ? targetUrl : `${targetUrl}/`;
    
    if (currentPath === checkUrl) location.reload();

    ui.loading.show('glx');
  };

  useEffect(() => {
    getUser().then((data: any) => {
      console.log('로긴정보 = ' + data?.user?.id);
      if(data?.user?.id){
        setMyinfo(data?.myinfo);
      }
    });
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return (
    <>
      <div className={`floatnav ${isOnTop 
          ? 'on-top  bottom-[calc(5rem+var(--safe-bottom))] transition -translate-y-16 duration-400' 
          : 'translate-y-32'}
          fixed text-right px-5 left-1/2 -translate-x-1/2 max-w-(--mwide) w-full h-0 z-500 bottom-[calc(2rem+var(--safe-bottom))] transition-transform duration-400 transform `}>
        <button type="button" onClick={goTop} className="bt top mt-3.5 mb-0 mx-auto rounded-full inline-flex items-center justify-center shadow-[0_0_6rem_rgba(0,0,0,0.49)] bg-[rgba(255,255,255,0.7)] border border-[rgba(0,0,0,0.1)] w-[2.8rem] h-[2.8rem] text-black">
          <FontAwesomeIcon icon={['fas', 'arrow-up']} className="h-[1.1rem] w-[1.1rem] inline-flex" />
          <em className='sr-only'>위로</em>
        </button>
      </div>

      <nav id="menubar" className="menubar h-[calc(3.75rem+var(--safe-bottom))]">
        <div className="inr fixed 
          left-1/2 bottom-0 z-500 h-[calc(3.75rem+var(--safe-bottom))] bg-[#1c1c1c] border-t border-[#2e2e2e] 
          w-full max-w-(--mwide) transition-transform duration-200 transform translate-x-[-50%] ml-[calc(0px-var(--scrPad)/2)]"
        >
          <ul className="menu w-full h-full items-center flex justify-between px-5">
            <li className={`flex-1 h-full`}>
              <Link href="/home/" onClick={handleLinkClick} className={`${isActive('home')} bt w-full h-full flex flex-col items-center justify-center pt-1 px-1 pb-[calc(0.125rem+var(--safe-bottom))] border-[#aaaaaa] group`}>
                <FontAwesomeIcon icon={['fas', 'house']} className='h-[1.2rem] w-[1.2rem] inline-flex group-active:scale-90 group-active:opacity-80 transition-transform' />
                <em className='text-xt mt-1'>Home</em>
              </Link>
            </li>
            <li className={`flex-1 h-full`}>
              <Link href="/list/movie/0/" onClick={handleLinkClick} className={`${isActive('list/movie')} bt w-full h-full flex flex-col items-center justify-center pt-1 px-1 pb-[calc(0.125rem+var(--safe-bottom))] border-[#aaaaaa] group`}>
                <FontAwesomeIcon icon={['fas', 'clapperboard']} className='h-[1.2rem] w-[1.2rem] inline-flex group-active:scale-90 group-active:opacity-80 transition-transform' />
                <em className='text-xt mt-1'>Movie</em>
              </Link>
            </li>
            <li className={`flex-1 h-full`}>
              <Link href="/list/tv/0/" onClick={handleLinkClick} className={`${isActive('list/tv')} bt w-full h-full flex flex-col items-center justify-center pt-1 px-1 pb-[calc(0.125rem+var(--safe-bottom))] border-[#aaaaaa] group`}>
                <FontAwesomeIcon icon={['fas', 'tv']} className='h-[1.2rem] w-[1.2rem] inline-flex group-active:scale-90 group-active:opacity-80 transition-transform' />
                <em className='text-xt mt-1'>TV</em>
              </Link>
            </li>
            <li className={`flex-1 h-full`}>
              <Link href="/search/movie/" onClick={handleLinkClick} className={`${isActive('search/')} bt w-full h-full flex flex-col items-center justify-center pt-1 px-1 pb-[calc(0.125rem+var(--safe-bottom))] border-[#aaaaaa] group`}>
                <FontAwesomeIcon icon={['fas', 'search']} className='h-[1.2rem] w-[1.2rem] inline-flex group-active:scale-90 group-active:opacity-80 transition-transform' />
                <em className='text-xt mt-1'>Search</em>
              </Link>
            </li>
            <li className={`flex-1 h-full`}>
              { myinfo?.id !== undefined ? (
                <Link href={`/user/${myinfo?.id}`} onClick={handleLinkClick} className={`${isActive('user/')} bt w-full h-full flex flex-col items-center justify-center pt-1 px-1 pb-[calc(0.125rem+var(--safe-bottom))] border-[#aaaaaa] group`}>
                  <span className="pic w-6.5 h-6.5 block relative border-[0.15rem] border-inherit rounded-full overflow-hidden -mt-1 -mb-1 group-active:scale-90 group-active:opacity-80 transition-transform">
                    <Img className="img absolute w-full h-full left-0 top-0 object-cover"
                      alt={myinfo.username} width={32} height={32}
                      src={myinfo.profile_picture} 
                      srcerr='/img/common/user.png'
                      unoptimized={true}
                    />
                  </span>
                  <em className='text-xt mt-1'>MY</em>
                </Link>
              ) : (
                <a href={myinfo?.id === null ? '' : '/user/login'} className={`${isActive('user/')} bt w-full h-full flex flex-col items-center justify-center pt-1 px-1 pb-[calc(0.125rem+var(--safe-bottom))] border-[#aaaaaa] group`}>
                  <span className="pic w-6.5 h-6.5 relative border-[0.15rem] border-inherit rounded-full overflow-hidden -mt-1 -mb-1 inline-flex items-center justify-center  group-active:scale-90 group-active:opacity-80 transition-transform">
                    <FontAwesomeIcon icon={['fas', 'user']} className='h-3.5 w-3.5 inline-flex' />
                  </span>
                  <em className='text-xt mt-1'>MY</em>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
