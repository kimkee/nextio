'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center">
      <dialog className="my-0 bg-black text-white mx-auto w-full max-w-[480px] flex h-dvh items-center justify-center max-h-dvh" 
        ref={dialogRef}  onClose={onDismiss}
      >
        <button onClick={onDismiss} className="h-8 w-8 text-center py-1  inline-flex items-center justify-center text-2xl">
          <i><FontAwesomeIcon icon={["fas", "arrow-left"]} /></i>
        </button>
        {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}
