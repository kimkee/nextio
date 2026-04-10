'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 로그인 페이지나 콜백 등 로그인 프로세스와 연관된 페이지가 아닐 때만 저장
    if (
      pathname && 
      !pathname.includes('/user/login') && 
      !pathname.includes('/user/logout') && 
      !pathname.includes('/auth') &&
      pathname !== '/' &&      // 보통 홈 화면 (인증 복귀점)
      pathname !== '/callback' // 콜백 페이지가 있다면 제외
    ) {
      const qs = searchParams.toString();
      const currentUrl = pathname + (qs ? `?${qs}` : '');
      // 개발 환경에서 여러차례 세팅되는 것을 대비해 최신 주소를 안전하게 갈아끼웁니다.
      localStorage.setItem('last_active_route', currentUrl);
    }
  }, [pathname, searchParams]);

  return null;
}
