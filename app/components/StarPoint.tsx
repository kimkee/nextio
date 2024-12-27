'use client'
import React, { useState, useEffect } from 'react'; //useState, useEffect

import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/app/style/StarPoint.scss';
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
  

  const S_Dimm = ()=> <span className="relative flex text-gray-500"><FontAwesomeIcon icon={["fas", "star"]} /></span>
  const S_Full = ()=> <span className="relative flex text-primary"><FontAwesomeIcon icon={["fas", "star"]} /></span>
  const S_Half = ()=> (
    <span className="relative flex">
      <FontAwesomeIcon icon={["fas", "star"]} className="text-primary z-1" style={{clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)', zIndex: 1}}/>
      <FontAwesomeIcon icon={["fas", "star"]} className="absolute text-gray-500" style={{zIndex: 0}} />
    </span>
  )

  useEffect(() => {
    setPoint();
    // eslint-disable-next-line
  });


  if(res === null) return <><em className={`ui-star ${opts.cls}`}></em></>;
  if(res === 5) return <><em className={`ui-star ${opts.cls}`}></em></>;

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
      <em className={`ui-star ${opts.cls} inline-flex align-items-center min-h-[9%]`}>
        
        {res === 0   ? <> <S_Dimm /> <S_Dimm /> <S_Dimm /> <S_Dimm /> <S_Dimm /> </> : null}
        {res === 0.5 ? <> <S_Half /> <S_Dimm /> <S_Dimm /> <S_Dimm /> <S_Dimm /> </> : null}
        {res === 1   ? <> <S_Full /> <S_Dimm /> <S_Dimm /> <S_Dimm /> <S_Dimm /> </> : null}
        {res === 1.5 ? <> <S_Full /> <S_Half /> <S_Dimm /> <S_Dimm /> <S_Dimm /> </> : null}
        {res === 2   ? <> <S_Full /> <S_Full /> <S_Dimm /> <S_Dimm /> <S_Dimm /> </> : null}
        {res === 2.5 ? <> <S_Full /> <S_Full /> <S_Half /> <S_Dimm /> <S_Dimm /> </> : null}
        {res === 3   ? <> <S_Full /> <S_Full /> <S_Full /> <S_Dimm /> <S_Dimm /> </> : null}
        {res === 3.5 ? <> <S_Full /> <S_Full /> <S_Full /> <S_Half /> <S_Dimm /> </> : null}
        {res === 4   ? <> <S_Full /> <S_Full /> <S_Full /> <S_Full /> <S_Dimm /> </> : null}
        {res === 4.5 ? <> <S_Full /> <S_Full /> <S_Full /> <S_Full /> <S_Half /> </> : null}
        {res === 5   ? <> <S_Full /> <S_Full /> <S_Full /> <S_Full /> <S_Full /> </> : null}

      </em>
    </>
  )
}
