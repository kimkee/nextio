"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/app/supabase'; 
import { Provider } from '@supabase/supabase-js';
const signInWithOAuth = async (txt: Provider)=>{
  const { data , error } = await supabase.auth.signInWithOAuth({
    provider: txt,
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${process.env.VITE_SITE_URL}/callback`
    },
  })
}


const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user);
  
  
  
  return {user}  // 사용자 데이터 반환
};

interface User { 
  id: string;
  email: string;
}  
export default function Home() {

  const [user, setUser] = useState<User | null>(null);

  useEffect( () => {
    getUser().then((data : any) => {
      setUser(data.user)   
      console.log('로긴정보 = ' + data?.user?.id);
    })

    return ()=>{ }
  },[]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button onClick={()=>signInWithOAuth('google')}><em>Google </em></button>
        <button onClick={()=>signInWithOAuth('github')}><em>Github </em></button>
        <button onClick={()=>signInWithOAuth('kakao')}><em>Kakao </em></button>
        <p>로그인됨</p>
        <p>사용자 ID : {user?.id}</p>
        <p>사용자 Email : {user?.email}</p>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
