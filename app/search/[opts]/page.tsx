
'use client';
import Link from 'next/link';
import type { Metadata } from 'next';
import { useParams, useRouter } from 'next/navigation';
import { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import Img from '@/app/components/Img';
import ui from '@/app/lib/ui';
// export const runtime = 'edge';
// export const dynamicParams = false;

export default function Page() {
  const params = useParams();
  const id = params.id;
  const opts = params.opts;
  return (
    <main className='p-6'>
      <div className='flex gap-4'>{opts}
        <Link className='btn' href={`/search/movie/`}>MOVIE</Link>
        <Link className='btn' href={`/search/tv/`}>TV</Link>
      </div>

      <p>{`/search/${opts}`}</p>
      <ul className='grid grid-cols-2 gap-4 mt-4'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((idx) => (
          <li key={idx}>
            <Link
              className='border border-white/20 rounded-md p-4 h-40 flex flex-col gap-1 justify-center items-center text-md uppercase'
              href={`/search/${opts}/${idx}`}
              passHref
              scroll={false}
            >
              {opts} - {idx}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
