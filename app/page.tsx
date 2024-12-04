"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams  } from 'next/navigation';
import { supabase } from '@/app/supabase'; 
import { Provider } from '@supabase/supabase-js';


interface User { 
  id: string;
  email: string;
}  
export default function Home() {
  const router = useRouter();
  const signInWithOAuth = async (txt: Provider)=>{
    await supabase.auth.signInWithOAuth({
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

  useEffect( () => {
    setTimeout( () => window.location.replace(`/home`), 300);

    return ()=>{ }
  },[]);

  return (
    <div className="container items-center justify-center">
      <main className="flex flex-col gap-8 row-start-2 items-center">
         
      </main>
    </div>
  );
}
