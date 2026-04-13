/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react'; //useState, useEffect
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import '@/app/lib/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from '@/app/supabase.js';
import Image from 'next/image';
import Img from '@/app/components/Img';

export default function Header() {
  // const location = useLocation();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const isActive = (els: string) => (pathname.split('/').includes(`${els}`) ? 'active' : '');
  const PUBLIC_ENV = process.env.NEXT_PUBLIC_ENV == 'PRD' ? '' : process.env.NEXT_PUBLIC_ENV
  // console.log( params );

  // usePathname() 을 이용하여 SSR과 CSR 사이에 일치하도록 isVal 계산 (Hydration Mismatch 방지)
  const isVal = pathname?.includes('search') ?? false;
  return (
    <>
      <header className={`header h-[calc(3.5rem+var(--safe-top)+var(--safe-watch))] flex items-center justify-between z-500 relative`}>
        <div className={`inr backdrop-blur-sm flex w-full h-[calc(3.5rem+var(--safe-top)+var(--safe-watch))] items-center justify-between fixed right-0 top-0 z-500 
          ${isActive('user') ?'bg-[#1c1c1c]':'bg-[rgb(50_50_50_/33%)]'}  
          ${ isVal ?'bg-[#1c1c1c]! backdrop-blur-none!':''}
          border-b border-[rgb(58_58_58_/38%)] px-5 pt-[calc(var(--safe-top)+var(--safe-watch))] max-w-(--mwide) ml-[calc(0px-var(--scrPad)/2)] overflow-hidden
          left-1/2 translate-x-[-50%] transition-colors duration-300 w-full`}
          
        >

          <div className='ldt flex items-center'>
            {/* isActive('user') */ false ? (
              <>
                <button onClick={() => router.back()} type='button' className='bt w-8 h-8 inline-flex items-center justify-center -mx-0.5 text-white hover:text-primary'>
                  <FontAwesomeIcon icon={['fas', 'arrow-left']} className='w-5 h-5 flex' />
                  <b className='sr-only'>GoBack</b>
                </button>
              </>
            ) : (
              <h1 className='logo flex gap-2 items-baseline'>
                <Link 
                  href={`/home/`} 
                  className='btlogo py-1 flex'
                  
                >
                  <Img priority={true} width={256} height={54} src={'/img/logo_next.png'} unoptimized={true} alt='Nextio' srcerr='' className='w-20 h-auto' />
                </Link>
                <span className='text-xt'>{PUBLIC_ENV}</span>
              </h1>
            )}
          </div>

          <div className='rdt flex items-center'>
            {/* {pathname} */}
            <a href={'/user/login'} className='bt gnb bt w-8 h-8 inline-flex items-center justify-center -mx-0.5 text-white hover:text-primary'>
              <FontAwesomeIcon icon={['fas', 'bars']} className='w-5 h-5 flex text-white'  />
              <b className='sr-only'>Menu</b>
            </a>
          </div>

        </div>
      </header>
    </>
  );
}
