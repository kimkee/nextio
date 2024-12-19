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
  // console.log(pathname.split('/'));

  return (
    <>
      <header className={`header`}>
        <div className='inr backdrop-blur-sm'>
          <div className='ldt'>
            {isActive('user') ? (
              <>
                <button onClick={() => router.back()} type='button' className='bt'>
                  <i>
                    <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                  </i>
                  <b>GoBack</b>
                </button>
              </>
            ) : (
              <h1 className='logo'>
                <Link href={`/`} className='btlogo'>
                  <Img width={256} height={54} src='/img/logo_next.png' unoptimized={true} alt='Nextio' srcerr='' loading='lazy' className='w-20 h-auto' />
                </Link>
              </h1>
            )}
          </div>
          <div className='rdt'>
            {/* {pathname} */}
            <Link href={'/user/login'} className='bt gnb'>
              <i>
                <FontAwesomeIcon icon={['fas', 'bars']} />
              </i>
              <b>Menu</b>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
