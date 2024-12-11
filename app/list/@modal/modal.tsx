'use client';

import { type ElementRef, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/app/style/modal.scss';
import ui from '@/app/lib/ui';
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'div'>>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const goTop = () => ui.scrollTo('.popup .pct', 0, 200);
  const [scr, setScr] = useState(0);
  const scrollEvent = (e: any) => setScr(parseInt(e.target.scrollTop));
  // const ui = window.ui;
  useEffect(() => {
    if (!dialogRef.current?.classList.contains('open')) {
      dialogRef.current?.classList.add('open');
      ui.lock.using(true);
      setMounted(true);
    }
    return () => {
      if (mounted) {
        ui.lock.using(false);
      }
    };
  }, [mounted]);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <article ref={dialogRef} 
      className='pop-layer popup fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center pr-[var(--scrPad)]'
    >
      <div className='pbd my-0 bg-[#111111] relative text-white mx-auto w-full max-w-[480px] flex flex-col h-dvh'>
        <button onClick={onDismiss} 
          className='btn-pop-close h-8 w-8 text-white inline-flex items-center justify-center text-3xl  absolute  left-5 z-50 top-[calc(0.8rem+var(--safe-top)+var(--safe-watch))] '
        >
          <FontAwesomeIcon icon={['fas', 'arrow-left']} className='h-[1.3rem] w-[1.3rem] inline-flex'/>
        </button>
        <div className={`phd h-0 z-20 ${scr > 50 ? 'trans' : ''}`}>
          <div 
            className='inr left-0 right-0 top-0 flex items-center justify-center absolute bg-transparent pt-[calc(var(--safe-top)+var(--safe-watch))] h-[calc(3.5rem+var(--safe-top)+var(--safe-watch))]'
          >
            <div className='ptit text-right pl-16 pr-5 w-full'>{`Title`}</div>
          </div>
        </div>
        <div className='pct flex-1 flex flex-col py-8 px-5 overflow-y-auto overflow-x-hidden webkit-scrollbar-none pt-[calc(4.2rem+var(--safe-top)+var(--safe-watch))]'
          onScroll={scrollEvent}
        >
          <div className='poptents'>{children}</div>
        </div>

        <div className={`floatpop 
          ${scr > 50 
            ? 'on-top on-top transform translate-y-[-4.2rem] transition-transform duration-200' 
            :''} fixed text-right px-5 left-1/2 max-w-[var(--mwide)] w-full h-0 z-50 transition-all duration-300 bottom-[calc(2rem+var(--safe-bottom))] transform translate-x-[-50%] translate-y-[5.625rem]`}>
          <button type='button' 
            className='bt top text-xt mt-3.5 mb-0 mx-auto rounded-full shadow-[0_0_6rem_rgba(0,0,0,0.49)] bg-[rgba(255,255,255,0.7)] border border-[rgba(0,0,0,0.1)] text-center w-[2.8rem] h-[2.8rem] text-black'
             onClick={goTop}
          >
            <FontAwesomeIcon icon={['fas', 'arrow-up']} className="h-[1.1rem] w-[1.1rem] inline-flex" />
            <em className='sr-only'>위로</em>
          </button>
        </div>

      </div>
    </article>,
    document.getElementById('modal-root')!
  );
}
