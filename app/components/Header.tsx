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
  return (
    <>
      <header className={`header`}>
        <div className="inr">
          <div className="ldt">
            {
              <h1 className="logo">
                <Link href={`/`} className="btlogo">
                  <i>N</i>
                  <em>extio</em>
                </Link>
              </h1>
            }
          </div>
          <div className="rdt">
            <button type="button" className="bt gnb"><i><FontAwesomeIcon icon={["fas", "bars"]} /></i><b>메뉴</b></button>
          </div>
        </div>
      </header>
    </>
  )
}
