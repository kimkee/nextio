'use client';

import { type ElementRef, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./modal.scss";
import ui from "@/app/lib/ui";
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'div'>>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  // const ui = window.ui;
  useEffect(() => {
    if (!dialogRef.current?.classList.contains('open')) {
      dialogRef.current?.classList.add('open');
      ui.lock.using(true);
      setMounted(true);
    }
    return () => {
      if (mounted) { ui.lock.using(false); }
    }
  }, [mounted]);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <article className="pop-layer popup" ref={dialogRef}>
      <div className="pbd" >
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
    </article>,
    document.getElementById('modal-root')!
  );
}
