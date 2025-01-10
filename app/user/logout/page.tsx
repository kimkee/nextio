'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;
// import axios from 'axios';

export default function SignOut() {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    window.location.replace('/');
  };

  useEffect(() => {
    signOut();
    // eslint-disable-next-line
  });

  return (
    <>
      <div className='container items-center justify-center'>
        <main className='flex flex-col max-w-[16rem] w-full justify-center items-center py-6'></main>
      </div>
    </>
  );
}
