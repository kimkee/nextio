'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';

import '@/app/lib/fontawesome';
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

        <div className="border border-white/20 rounded-md p-4 mt-8 h-80 flex flex-col gap-4 justify-center items-center text-3xl uppercase"><p>{opts}</p><p>id-{id}</p></div>

      </main>
    </div>

  );
}
