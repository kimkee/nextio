// app/not-found.tsx
'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='container items-center justify-center'>
      <main className='flex flex-col gap-4 row-start-2 items-center'>
        <div className="">
          <h1 className='font-bold text-center flex flex-col gap-2'>
            <span className='text-4xl'>404</span>
            <span className='text-xl'>Page Not Found</span>
          </h1>
          {/* <p className='mt-4 text-sm text-white/70 leading-5 text-center'>
            Sorry!!
          </p> */}
          <div className="flex gap-2 mt-8 justify-center">
              <button type="button" className="btn btn-sm !px-3" onClick={ ()=>{router.back()} }>
                <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                <em>Back</em>
              </button>
              <button type="button" className="btn btn-sm !px-3" onClick={ ()=>{router.push(`/`)} }>
                <FontAwesomeIcon icon={['fas', 'home']} />
                <em>Home</em>
              </button>
          </div>
        </div>
      </main>
    </div>
  );
}
