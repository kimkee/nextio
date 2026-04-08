"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ui from '@/app/lib/ui';

export default function Ui() {
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      ui.init();
    }
  }, []);

  useEffect(() => {
    // 페이지 이동이 시작될 때(다른 컴포넌트에서 show를 불렀을 때)를 대비해 
    // MutationObserver로 body의 클래스 변화를 감지하여 5초 타이머를 작동시킬 수도 있지만,
    // 가장 확실한 건 pathname 변경 시 즉시 끄는 것입니다.
    ui.loading.hide();
    
    // 타이머가 있다면 초기화
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 5초 후에도 여전히 로딩 중이라면 강제로 끄는 안전장치 (필요 시 show 호출 시점에 걸어줄 수도 있음)
    // 여기서는 pathname 변경 시 무조건 끄는 것에 집중합니다.
  }, [pathname]);

  // 전역적으로 show가 호출되었을 때를 감지하는 로직 (Safety Timeout)
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isLoading = document.body.classList.contains('is-loading');
          if (isLoading) {
            // 로딩 시작됨 -> 5초 타이머 시작
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              ui.loading.hide();
              console.log('Loading timed out after 5s');
            }, 2000);
          } else {
            // 로딩 끝남 -> 타이머 제거
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
