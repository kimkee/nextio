'use client';
import Image from 'next/image';
import Img from '@/app/components/Img';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
}
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const lastActiveRoute = localStorage.getItem('last_active_route');

    setTimeout(() => {
      if (lastActiveRoute) {
        localStorage.removeItem('last_active_route');
        window.location.replace(lastActiveRoute);
      } else {
        window.location.replace(`/home`);
      }
    }, 400);

    supabase.auth.onAuthStateChange((state, event) => {
      // state === 'SIGNED_IN' ? router.push('/home') : router.push('/user/login');
      // console.log('==========================================' + state);
    });
    return () => {};
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
