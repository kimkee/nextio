'use client'
import React, { useState, useEffect } from 'react'; //useState, useEffect

import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/app/style/StarPoint.css';
// import ui from '/src/ui.js';

export default function StarPoint({ point: point, opts: opts }: { point: number, opts: any }) {

  const n = parseFloat((Math.round(point * 100) / 100).toFixed(1)) / 2;
  const stars = [0, 0.5 , 1 , 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
  let res = 0;
  stars.reverse().forEach(p => { 
    if (n <= p) {
      res = p;
    } 
  });
  
  const S_Dimm = ()=> <FontAwesomeIcon icon={["fas", "star"     ]} className="relative inline-flex text-gray-400" />
  const S_Full = ()=> <FontAwesomeIcon icon={["fas", "star"     ]} className="relative inline-flex text-primary drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
  const S_Half = ()=> <FontAwesomeIcon icon={["fas", "star-half"]} className="relative inline-flex text-primary drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] z-10" />

  const renderStars = (rating:number = 0) => {
    const elements = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      elements.push(<S_Full key={`full-${i}`} />);
    }
    if (rating % 1 !== 0) {
      elements.push(<S_Half key={`half`} />);
    }
    return elements;
  };

  return (
    <>
      <em role="img" aria-label={`평점 ${point}/10점 만점`} className={`ui-star ${opts.cls} relative inline-flex align-middle align-items-center min-h-[9%] leading-none after:content-['.'] after:align-middle after:opacity-0`} data-point={`${point}`} data-star={`${res}`}>
        <span className="absolute left-0 top-0 z-10 align-middle whitespace-nowrap inline-flex">
          {renderStars(res)}
        </span>
        <span className='relative inline-flex z-0 align-middle'>
          <S_Dimm /> <S_Dimm /> <S_Dimm /> <S_Dimm /> <S_Dimm />
        </span>
      </em>
    </>
  )

  // return (
  //   <em className={`ui-star ${opts.cls}`}>
  //     <i>
  //       <FontAwesomeIcon icon={["fas", "star"]} />
  //       <FontAwesomeIcon icon={["fas", "star"]} />
  //       <FontAwesomeIcon icon={["fas", "star"]} />
  //       <FontAwesomeIcon icon={["fas", "star"]} />
  //       <FontAwesomeIcon icon={["fas", "star"]} />
  //     </i>
  //     <em>{point}</em>
  //   </em>
  // )
}
