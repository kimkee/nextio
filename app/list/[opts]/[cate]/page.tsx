'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams  } from 'next/navigation';
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
            <li><Link className="border block p-4" href={`/list/${opts}/${cateID}/1/`}>id-1</Link></li>
            <li><Link className="border block p-4" href={`/list/${opts}/${cateID}/2/`}>id-2</Link></li>
            <li><Link className="border block p-4" href={`/list/${opts}/${cateID}/3/`}>id-3</Link></li>
            <li><Link className="border block p-4" href={`/list/${opts}/${cateID}/4/`}>id-4</Link></li>
          </ul>

        </main>
      </div>
    
  );
}
