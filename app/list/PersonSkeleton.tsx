'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useParams, useRouter, useSearchParams } from 'next/navigation'; //,useOutletContext  , useLocation, Outlet,

import ui from '@/app/lib/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PersonCastCrew from './PersonCastCrew';
import PersonPhoto from './PersonPhoto';
import ListSkeleton from '../components/ListSkeleton';

export default function PersonSkeleton() {

  return (
  <>
    <div className="profile pb-3 pt-5 animate-pulse">
      <div className="pics block w-64 h-64 left-1/2 -translate-x-1/2 border-18 border-[rgba(0,0,0,0.5)] relative overflow-hidden rounded-full max-h-(--mwide) z-10">
        <div 
          className="img block w-full object-cover h-full bg-[#000000] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="desc text-center z-11 relative px-6 max-w-80 mx-auto">
        <div className="tit text-3xl text-white font-extrabold bg-black/50 rounded-full h-9 max-w-60 mx-auto"></div>
        <div className="tio text-xl text-white/80 font-extrabold bg-black/50 mt-2 h-4 max-w-40 mx-auto"></div>
      </div>
    </div>

    <div className="m-info relative px-5 py-5 pb-[calc(30px+var(--safe-bottom))] animate-pulse">
      <ul className="lst flex justify-center flex-col gap-1 mx-auto">
        <li className="vot flex justify-center gap-2 text-center text-md text-white/90 bg-black h-6"></li>
        <li className="vot flex justify-center gap-2 text-center text-md text-white/90 bg-black h-6"></li>
        <li className="vot flex justify-center gap-2 text-center text-md text-white/90 bg-black h-6"></li>
      </ul>              
      
      <div className="sect list mt-5">
        <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
          <div className="tts text-base text-white/90 h-5 w-20 bg-black"></div>
        </div>
        <div className="lst flex flex-nowrap overflow-x-auto overflow-y-hidden mt-2 -mx-5 px-4 scrollbar-hidden scroll-smooth">
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
        </div>
      </div>
      
      <div className="sect list mt-5">
        <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
          <div className="tts text-base text-white/90 h-5 w-20 bg-black"></div>
        </div>
        <div className="lst flex flex-nowrap overflow-x-auto overflow-y-hidden mt-2 -mx-5 px-4 scrollbar-hidden scroll-smooth">
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
            <div className='box shrink-0 w-[calc(19%-20px)] mx-1.25 bg-black'>
              <div  className='pic pb-[150%] block relative'></div> 
            </div>
        </div>
      </div>
      
    </div>
         
  </>
  )
}
