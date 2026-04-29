"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

export default function LoginPage() {
  const router = useRouter();
  // 세션 로딩 중 여부 (true일 때는 UI를 아예 그리지 않아 깜빡임 방지)
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.id) {
        // 이미 로그인된 상태 → 히스토리에 로그인 페이지를 남기지 않고 홈으로 교체
        window.location.replace('/home');
      } else {
        // 비로그인 상태 확인 완료 → 로그인 UI 표시
        setAuthChecking(false);
      }
    });
  }, []);

  const signInWithOAuth = async (txt: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: txt,
      options: {
        // queryParams: {
        //   access_type: 'offline',
        //   prompt: 'consent',
        // },        
        redirectTo: `${SITE_URL}`
      },
    });
  };

  // 세션 확인 중엔 아무것도 렌더링하지 않음 (깜빡임 방지)
  if (authChecking) return null;

  return (
    <div className="container items-center justify-center">
      <main className="flex flex-col max-w-[16rem] w-full justify-center items-center py-6">

        <div className="mb-1">
          <Image width={96} height={96} className="w-12" src="/img/logo.png" alt="" />
        </div>
        <div className="my-4 text-center mb-7 relative before:absolute before:left-0 before:right-0 before:border-t before:border-gray-500/40 before:top-1/2 before:z-0 w-full">
          <em className="text-primary relative px-2 z-1 bg-[#181818]">로그인</em>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full">
          <button className="btn btn-lg" onClick={() => signInWithOAuth('google')}>
            <i><FontAwesomeIcon icon={["fab", "google"]} /></i><em>Google</em>
          </button>
          <button className="btn btn-lg" onClick={() => signInWithOAuth('kakao')}>
            <i><FontAwesomeIcon icon={["fab", "kakao-talk"]} /></i><em>Kakao</em>
          </button>
          <button className="btn btn-lg" onClick={() => signInWithOAuth('github')}>
            <i><FontAwesomeIcon icon={["fab", "github"]} /></i><em>Github</em>
          </button>
        </div>

        <p className="text-sm mt-6">{SITE_URL}</p>

      </main>
    </div>
  );
}
