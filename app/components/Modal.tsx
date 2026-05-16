'use client';

import { type ElementRef, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '@/app/style/modal.scss';
import ui from '@/app/lib/ui';
import Link from 'next/link';
import { useAtomValue, useSetAtom } from 'jotai';
import { modalTitleAtom } from '@/app/store/modal';
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const modalTitle = useAtomValue(modalTitleAtom);
  const setTitle = useSetAtom(modalTitleAtom);

  useEffect(() => {
    return () => setTitle(''); // 모달 닫힐 때 제목 초기화
  }, [setTitle]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const goTop = () => ui.scrollTo(pctRef.current, 0, 0, 200);
  const [scr, setScr] = useState(0);
  const scrollEvent = (e: any) => setScr(parseInt(e.target.scrollTop));

  // article 전체 영역 휠 → pct 스크롤로 위임
  // shift+wheel은 출연진/영상 등 가로 스크롤 영역이 처리하도록 통과
  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (e.shiftKey) return;
    const pct = pctRef.current;
    if (!pct) return;
    pct.scrollTop += e.deltaY;
  };
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
    <article ref={dialogRef} onWheel={handleWheel} className='pop-layer popup fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center pr-(--scrPad)'>
      <div className={`
          pbd my-0 bg-black/80 backdrop-blur-md relative text-white mx-auto w-full max-w-(--mwide) flex flex-col h-dvh
          transition-[transform,opacity,translate] ease-out duration-200
          ${mounted 
            ? 'max-[471px]:translate-x-0 min-[471px]:translate-y-0   '
            : 'max-[471px]:translate-x-90 min-[471px]:translate-y-90 '
          }
        `}
      >
        
        <button onClick={onDismiss} className='btn-pop-close h-8 w-8 -ml-1 text-white inline-flex items-center justify-center text-3xl  absolute  left-5 z-50 top-[calc(0.8rem+var(--safe-top)+var(--safe-watch))]'>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} className='w-5 h-5 flex text-white'/>
        </button>

        <div className={`phd h-0 z-20`}>
          <div className={`inr left-0 right-0 top-0 flex ${scr > 50 ? 'bg-black/50 backdrop-blur-sm border-b border-[rgb(58_58_58_/28%)]' : ''} items-center justify-center absolute bg-transparent pt-[calc(var(--safe-top)+var(--safe-watch))] h-[calc(3.5rem+var(--safe-top)+var(--safe-watch))]`}>
            <div className='ptit text-right pl-16 pr-5 w-full'>
              <a href={`${process.env.NEXT_PUBLIC_SITE_URL}/home`} className={`${scr > 50 ? 'hidden' : ''} text-primary font-bold `}>{`NEXTIO`}</a> 
              <div  className={`${scr > 50 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'} text-base transition-opacity duration-300 text-shadow-[0px_0px_2px_#000000]`}>
                {modalTitle}
              </div>
            </div>
          </div>
        </div>

        <div ref={pctRef} className='pct flex-1 flex flex-col py-8 px-5 pb-9 overflow-y-auto overflow-x-hidden scrollbar-hidden pt-[calc(4.2rem+var(--safe-top)+var(--safe-watch))]'
          onScroll={scrollEvent}
        >
          <div className='poptents'>{children}</div>
        </div>

        <div className={`floatpop 
          ${scr > 50 ? 'on-top -translate-y-16' : 'translate-y-32'}
          fixed text-right px-5 left-1/2 max-w-(--mwide) w-full h-0 z-50 bottom-[calc(2rem+var(--safe-bottom))] transition-transform duration-200 transform translate-x-[-50%]`}
        >
          <button type='button'
            className='bt top mt-3.5 mb-0 mx-auto rounded-full inline-flex items-center justify-center shadow-[0_0_6rem_rgba(0,0,0,0.49)] bg-[rgba(255,255,255,0.7)] border border-[rgba(0,0,0,0.1)] w-[2.8rem] h-[2.8rem] text-black'
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

