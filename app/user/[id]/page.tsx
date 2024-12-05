'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import '@/app/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Myinfo as MyinfoType, User as UserType } from '@/app/types';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
import getUser from "@/app/getUser";
export const runtime = 'edge';

export default function User() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [myinfo, setMyinfo] = useState<MyinfoType | null>(null);
  const params = useParams();
  const id = params.id as string;
  const cateID = params.cate as string;
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    router.push('/');
  }
  useEffect(() => {
    getUser().then((data) => {
      setUser(data?.user as UserType);
      setMyinfo(data?.myinfo as MyinfoType);
      console.table(data?.user);
      console.table(data?.myinfo);
    });
  }, []);
  return (

    <div className="container page movie list">
      <main className="contents">
        <h2><FontAwesomeIcon icon="house" /> User / {id} </h2>
        {
          user?.id !== undefined ?
            <>
              <div className="border border-white/20 rounded-md p-4 mt-8 flex flex-col gap-4 text-sm break-all relative">
                <p>회원번호 : {myinfo?.id}</p>
                <p>이름 : {myinfo?.username}</p>
                <p>이메일 : {myinfo?.email}</p>
                <p>프로필 : <img src={myinfo?.profile_picture} alt="" className="w-10 h-10 rounded-full" /></p>
                <p>가입일 : {myinfo?.created_at}</p>
                <button
                  className="btn absolute top-2 right-2"
                  onClick={signOut}>로그아웃</button>
              </div>
              
            </>
            :
            <>
              <button className="btn" onClick={() => router.push('/user/login')}>로그인</button>
            </>
        }

        
      </main>
    </div>

  );
}
