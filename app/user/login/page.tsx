"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';

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
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    router.push('/');
  }
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
      <main className="flex flex-col gap-8 row-start-2 items-center">

        {
          user?.id !== undefined ?
            <>
              <p>사용자 ID : {user?.user_metadata.full_name || user?.user_metadata.user_name}</p>
              <p>사용자 Email : {user?.email}</p>
              <button onClick={signOut}>로그아웃</button>
            </>
            :
            <>
              <button onClick={() => signInWithOAuth('google')}><em>Google </em></button>
              <button onClick={() => signInWithOAuth('github')}><em>Github </em></button>
              <button onClick={() => signInWithOAuth('kakao')}><em>Kakao </em></button>
            </>
        }
        <p>{SITE_URL}</p>
        
      </main>
    </div>
  );
}
