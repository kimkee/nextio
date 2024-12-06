"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;
interface User {
  user_metadata: any;
  id: string;
  email: string;
}
export default function Home() {
  const router = useRouter();
  const signInWithOAuth = async (txt: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: txt,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${SITE_URL}callback`
      },
    })
  }



  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user);
    return { user }  // 사용자 데이터 반환
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser().then((data: any) => {
      setUser(data.user)
      console.log('로긴정보 = ' + data?.user?.id);
    })

    return () => { }
  }, []);

  return (
    <div className="container items-center justify-center">
      <main className="flex flex-col max-w-[16rem] w-full justify-center items-center py-6 -mt-12">


        <div className="mb-1">
          <img className="w-12" src="/img/logo.png" alt="" />
        </div>
        <div className="my-4 text-center mb-7 relative before:absolute before:left-0 before:right-0 before:border-t before:border-gray-500/40 before:top-1/2 before:z-0 w-full">
          <em className="text-primary relative px-2 z-1 bg-white dark:bg-[#0d111b]">로그인</em>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full">
          <button className="btn btn-lg" onClick={() => signInWithOAuth('google')}>
            <i><FontAwesomeIcon icon={["fab", "google"]} /></i><em>Google </em>
          </button>
          <button className="btn btn-lg" onClick={() => signInWithOAuth('github')}>
            <i><FontAwesomeIcon icon={["fab", "github"]} /></i><em>Github </em>
          </button>
          <button className="btn btn-lg" onClick={() => signInWithOAuth('kakao')}>
            <i><FontAwesomeIcon icon={["fas", "comment"]} /></i><em>Kakao </em>
          </button>
        </div>


        <p className="text-sm mt-6">{SITE_URL}</p>

      </main>
    </div>
  );
}
