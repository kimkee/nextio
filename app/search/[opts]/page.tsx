'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams  } from 'next/navigation';
import { supabase } from '@/app/supabase'; 
import { Provider } from '@supabase/supabase-js';
import '@/app/lib/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const runtime = 'edge';
export default function Search() {

  const params = useParams();
  const opts = params.opts;
  const cateID = params.cate;
  // cateID === undefined && navigate(`/${opts}/0`) ;

  return (
    
      <div className="container page movie list">
        <main className="contents">
          <h2><FontAwesomeIcon icon="house" /> Search / {opts} </h2>
        </main>
      </div>
    
  );
}
