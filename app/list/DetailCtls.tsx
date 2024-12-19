import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import ui from '@/app/lib/ui';
import Loading from '@/app/components/Loading';

export default function ViewCtls({datas,postID, opts}: {datas: any, postID: string, opts: any}) {
  
  useEffect(() => {
    
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <>
    <div className="dins mt-5 h-8 flex ring-[#30363d] ring-1 rounded-sm justify-center overflow-hidden gap-0">
      <button type="button" className="bt inline-flex justify-center items-center bg-black/40 w-full text-ss gap-1 ring-[#30363d] ring-1 px-3">
        {false 
        ?(<Loading opts={{type:'glx', cls:''}}/>) 
        :(<><FontAwesomeIcon icon={['far', 'bookmark']} className='w-4 !h-4 align-middle' /><em className='-mt-0.5'>스크랩</em></>)}
      </button>
      <button type="button" className="bt inline-flex justify-center items-center bg-black/40 w-full text-ss gap-1 ring-[#30363d] ring-1 px-3">
        <FontAwesomeIcon icon={['far', 'pen-to-square']} className='w-4 !h-4 align-middle' /><em className='-mt-0.5'>리뷰</em>
      </button>
      <button type="button" className="bt inline-flex justify-center items-center bg-black/40 w-full text-ss gap-1 ring-[#30363d] ring-1 px-3">
        <FontAwesomeIcon icon={['fas', 'share-nodes']} className='w-4 !h-4 align-middle' /><em className='-mt-0.5'>공유</em>
      </button>
    </div>
    </>
  )
}
