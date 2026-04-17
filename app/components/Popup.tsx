'use client';

import Videos from '@/app/list/Videos';
import { useSearchParams, useParams } from 'next/navigation';

interface PopupProps {
  opts: string;
  menu: string;
  id: string;
}




export default function Popup( ) {
  const searchParams = useSearchParams();
  const isVideosModalOpen = searchParams.get('video') !== null;
  const params = useParams();
  const {opts, menu, id} = params;
  return (
    

    <>
    <div className="fix left-0 top-0 hidden">
      <p>{JSON.stringify(params)}</p>
      <p>{opts}</p>
      <p>{menu}</p>
      <p>{id}</p>
    </div>
    <div className='fixed z-1500'>
      {isVideosModalOpen && <Videos />}
    </div>
    </>
  );
}
