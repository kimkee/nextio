/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'; //useState, useEffect
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'
import clsx from 'clsx';
import '@/app/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabase } from '@/app/supabase.js';
import Image from 'next/image';


export default function Header() {
  
  // const location = useLocation();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <header className={`header`}>
        <div className="inr">
          <div className="ldt">
            {
              <h1 className="logo">
                <Link href={`/`} className="btlogo">
                  <img src="/img/logo_next.png" alt="extio" className='w-20 h-auto' />
                  <em>extio</em>
                </Link>
              </h1>
            }
          </div>
          <div className="rdt">
            <button onClick={() => router.push('/login')} type="button" className="bt gnb"><i><FontAwesomeIcon icon={["fas", "bars"]} /></i><b>메뉴</b></button>
          </div>
        </div>
      </header>
    </>
  )
}
