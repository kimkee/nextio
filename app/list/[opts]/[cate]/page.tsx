'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
import '@/app/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export const runtime = 'edge';
export default function List() {

  const params = useParams();
  const opts = params.opts;
  const cateID = params.cate;
  // cateID === undefined && navigate(`/${opts}/0`) ;

  return (

    <div className="container page movie list">
      <main className="contents">
        <h2><FontAwesomeIcon icon="house" /> List / {opts} / {cateID}</h2>
        <ul className="grid grid-cols-2 gap-4 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((idx) => {
            return (
              <li key={idx}>
                <Link
                  className="border border-white/20 p-4 h-40 flex flex-col gap-1 justify-center items-center text-xl uppercase"
                  href={`/list/${opts}/${cateID}/${idx}/`}>
                  <p>{opts}</p>
                  <p>id-{idx}</p>
                </Link>
              </li>
            )
          })}
        </ul>

      </main>
    </div>

  );
}
