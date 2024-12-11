'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/app/lib/fontawesome';
import ui from '@/app/lib/ui';

export default function Nav() {
  const pathname = usePathname();

  const isActive = (els: string) =>
    pathname.includes(`${els}`) ? 'active' : '';
  const [isOnTop, setIsOnTop] = useState(false);

  const goTop = () => ui.scrollTo('body', 0, 200);

  const scrollEvent = () => {
    if (ui.lock.stat) return;
    ui.viewport.scrollTop() > 50 ? setIsOnTop(true) : setIsOnTop(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return (
    <>
      <div className={`floatnav ${isOnTop ? 'on-top' : ''}`}>
        <button type="button" onClick={goTop} className="bt top">
          <FontAwesomeIcon icon={['fas', 'arrow-up']} className='h-[1.1rem] w-[1.1rem] inline-flex' />
          <em>위로</em>
        </button>
      </div>

      <nav id="menubar" className="menubar">
        <div className="inr">
          <ul className="menu">
            <li className={isActive('home')}>
              <Link href="/home/" className="bt">
                <FontAwesomeIcon icon={['fas', 'house']} className='h-[1.2rem] w-[1.2rem] inline-flex' />
                <em>Home</em>
              </Link>
            </li>
            <li className={isActive('list/movie')}>
              <Link href="/list/movie/0/" className="bt">
                <FontAwesomeIcon icon={['fas', 'clapperboard']} className='h-[1.2rem] w-[1.2rem] inline-flex' />
                <em>Movie</em>
              </Link>
            </li>
            <li className={isActive('list/tv')}>
              <Link href="/list/tv/0/" className="bt">
                <FontAwesomeIcon icon={['fas', 'tv']} className='h-[1.2rem] w-[1.2rem] inline-flex' />
                <em>TV</em>
              </Link>
            </li>
            <li className={isActive('search/') || isActive('test/')}>
              <Link href="/search/movie/" className="bt">
                <FontAwesomeIcon icon={['fas', 'search']} className='h-[1.2rem] w-[1.2rem] inline-flex' />
                <em>Search</em>
              </Link>
            </li>
            <li className={isActive('user/')}>
              <Link href="/user/62" className="bt">
                <FontAwesomeIcon icon={['fas', 'user']} className='h-[1.2rem] w-[1.2rem] inline-flex' />
                <em>MY</em>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
