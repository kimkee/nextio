'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams  } from 'next/navigation';

import '@/app/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export const runtime = 'edge';
export default function View() {

  const params = useParams();
  const opts = params.opts;
  const cateID = params.cate;
  const id = params.id;
  // cateID === undefined && navigate(`/${opts}/0`) ;

  return (
    
      <div className="container page movie list">
        <main className="contents">
          <h2><FontAwesomeIcon icon="house" /> List / {opts} / {cateID} / {id}</h2>
          
          <div className="border block p-4 mt-8">id-{id}</div>

        </main>
      </div>
    
  );
}
