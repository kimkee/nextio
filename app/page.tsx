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


  useEffect( () => {
    setTimeout( () => window.location.replace(`/home`), 300);
    supabase.auth.onAuthStateChange((state, event) => {     
      // state === 'SIGNED_IN' ? router.push('/home') : router.push('/user/login');
      // console.log('==========================================' + state);

    }); 
    return ()=>{ }
  },[]);

  return (
    <div className="container items-center justify-center">
      <main className="flex flex-col gap-8 row-start-2 items-center">
         
      </main>
    </div>
  );
}
