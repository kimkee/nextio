'use client'
import React, { useState, useEffect } from 'react'; //useState, useEffect

import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/app/style/StarPoint.css';
// import ui from '/src/ui.js';

export default function StarPoint({ point: point, opts: opts }: { point: number, opts: any }) {

  const [res, resSet] = useState<number | null>(null);
  
  const stars = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  
  const setPoint = () => {
    // n의 타입을 명시적으로 변환
    const n = parseFloat((Math.round(point * 100) / 100).toFixed(1)) / 2;
    let r = null;
    stars.reverse().forEach(p => { 
      if (n <= p) {
        r = p;
      } 
    });
    resSet(r); // r의 타입이 number임을 보장
    // console.log(n, r);
  };
  
  // console.log(res);
  
  const S_Dimm = ()=> <FontAwesomeIcon icon={["fas", "star"     ]} className="relative inline-flex text-gray-400" />
  const S_Full = ()=> <FontAwesomeIcon icon={["fas", "star"     ]} className="relative inline-flex text-primary drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
  const S_Half = ()=> <FontAwesomeIcon icon={["fas", "star-half"]} className="relative inline-flex text-primary drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] z-10" />

  useEffect(() => {
    setPoint();
    // eslint-disable-next-line
  });


  if(res === null) return <><em className={`ui-star ${opts.cls}`}></em></>;
  if(res === 5) return <><em className={`ui-star ${opts.cls}`}></em></>;


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
  return (
    <>
      <em className={`ui-star ${opts.cls} relative inline-flex align-middle align-items-center min-h-[9%] leading-none after:content-['.'] after:align-middle after:opacity-0`} data-point={`${point}`} data-star={`${res}`}>
        <span className="absolute left-0 top-0 z-10 align-middle whitespace-nowrap inline-flex">
          {renderStars(res)}
        </span>
        <span className='relative inline-flex z-0 align-middle'>
          <S_Dimm /> <S_Dimm /> <S_Dimm /> <S_Dimm /> <S_Dimm />
        </span>
      </em>
    </>
  )
}
