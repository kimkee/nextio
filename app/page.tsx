'use client';
import Image from 'next/image';
import Img from '@/app/components/Img';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';

export default function Index() {

  useEffect(() => {
    const lastActiveRoute = sessionStorage.getItem('last_active_route');

    if (lastActiveRoute && lastActiveRoute !== '/' && lastActiveRoute !== '/home') {
      sessionStorage.removeItem('last_active_route');
      window.location.replace(lastActiveRoute);
    } else {
      console.log('HOME~~~~');
      setTimeout(() => { window.location.replace(`/home`); }, 1000);
    }

    return () => { };
  }, []);

  return (
    <div className='container items-center justify-center'>
      <main className='flex flex-col gap-8 row-start-2 items-center'>
        <Img
          width={128}
          height={128}
          className={'w-16'}
          src='/img/logo_nextjs.png'
          srcerr={'/img/logo_nextjs.png'}
          alt='Next.js Logo'
        />
      </main>
    </div>
  );
}
