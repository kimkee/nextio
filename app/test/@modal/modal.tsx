'use client';

import { type ElementRef, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./modal.scss";
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'div'>>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!dialogRef.current?.classList.contains('open')) {
      dialogRef.current?.classList.add('open');
      document.body.classList.add('is-lock');
      document.documentElement.classList.add('is-lock');
      setMounted(true);
    }
    return () => {
      console.log(mounted);
      if(mounted) {document.body.classList.remove('is-lock');
      document.documentElement.classList.remove('is-lock');}
    }
  }, [mounted]);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="popup">
      <div className="pbd" ref={dialogRef} >
        <button onClick={onDismiss} className="btn-pop-close">
          <i><FontAwesomeIcon icon={["fas", "arrow-left"]} /></i>
        </button>
        <div className="phd h-0">
          <div className="inr">
            <div className="ptit">타이틀</div>
          </div>
        </div>
        <div className="pct">
          <div className="poptents">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}
