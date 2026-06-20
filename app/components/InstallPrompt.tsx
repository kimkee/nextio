'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/app/store/lang';

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<Event | null>(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    // 1. 이미 앱으로 설치되어 실행 중인지 검사
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;
    if (isStandalone) {
      return;
    }

    // 2. beforeinstallprompt 지원 브라우저 핸들러 (안드로이드, 크롬 등)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // 3. iOS 기기 감지 (사파리 등은 beforeinstallprompt가 없어 설치 가능 여부를 자바스크립트로 체크할 수 없으므로 강제 노출)
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (ios) {
      setIsIOS(true);
      setShow(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (deferred) {
      // @ts-ignore – the event has .prompt()
      (deferred as any).prompt();
      // @ts-ignore – capture user choice
      const { outcome } = await (deferred as any).userChoice;
      // setShowIOSGuide(true);
      console.log('PWA install outcome:', outcome);
      if (outcome === 'accepted') {
        setShow(false);
        setDeferred(null);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  // SSR 및 하이드레이션 불일치 에러를 방지하기 위해 마운트 완료 전이거나 show가 false면 null 반환
  if (!show || !mounted) return null;

  // modal-root 요소가 브라우저 DOM에 존재할 때만 포탈을 타도록 처리
  const modalRoot = typeof document !== 'undefined' ? document.getElementById('modal-root') : null;

  return (
    <>
      <button onClick={install} title='앱 설치'
        className="
          bt pressed gap-1 h-8 inline-flex items-center justify-center text-white hover:text-primary!
          px-2 rounded-sm
      ">
        <FontAwesomeIcon icon={['fas', 'download']} className='w-4 h-4 flex' />
        <span className="text-sm sr-only">앱 설치</span>
      </button>

      {showIOSGuide && modalRoot && createPortal(
        <div 
          onClick={() => setShowIOSGuide(false)}
          className="fixed inset-0 z-5000 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-ios-fade"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs bg-[#1e1e1e] border border-[rgb(58_58_58_/50%)] rounded-2xl shadow-2xl p-5 pt-7 text-white relative animate-ios-scale"
          >
            {/* 닫기 버튼 */}
            <button 
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1"
            >
              <FontAwesomeIcon icon={['fas', 'xmark']} className="w-5 h-5" />
            </button>

            {/* 타이틀 및 헤더 */}
            <div className="flex flex-col items-center mb-5 text-center">
              <h3 className="text-md font-bold text-gray-100">{t.pwa.title}</h3>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed px-2">{t.pwa.desc}</p>
            </div>

            {/* 단계별 설명 */}
            <div className="space-y-3 mb-5">
              {/* Step 1 */}
              <div className="flex items-center gap-3 bg-[#262626] p-3 rounded-lg border border-white/5 text-sm text-gray-300">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </span>
                <span className="flex-1 leading-normal">
                  {t.pwa.step1}
                  <svg className="w-4.5 h-4.5 inline-block mx-1.5 align-middle text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3 bg-[#262626] p-3 rounded-lg border border-white/5 text-sm text-gray-300">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </span>
                <span className="flex-1 leading-normal">
                  {t.pwa.step2}
                  <svg className="w-4.5 h-4.5 inline-block mx-1.5 align-middle text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
                  </svg>
                </span>
              </div>
            </div>

            {/* 확인 버튼 */}
            <button 
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 hover:border-primary/60 transition-all rounded-lg text-primary text-sm font-semibold pressed"
            >
              {t.pwa.btn}
            </button>
          </div>
        </div>,
        modalRoot
      )}
    </>
  );
}
