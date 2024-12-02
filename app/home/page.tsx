"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/app/supabase'; 
import { Provider } from '@supabase/supabase-js';
import '@/app/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <p><FontAwesomeIcon icon="thumbs-up" /> 로그인 </p>
        
        <button onClick={()=>signInWithOAuth('google')}><em>Google </em></button>
        <button onClick={()=>signInWithOAuth('github')}><em>Github </em></button>
        <button onClick={()=>signInWithOAuth('kakao')}><em>Kakao </em></button>
        <p>사용자 ID : {user?.id}</p>
        <p>사용자 Email : {user?.email}</p>
       

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
