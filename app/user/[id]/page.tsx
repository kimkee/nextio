'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import '@/app/lib/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Myinfo as MyinfoType, User as UserType } from '@/app/types';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
import getUser from "@/app/getUser";
import Loading from "@/app/components/Loading";
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
    <>
      
      {myinfo === null ?
        <div className="container">
          <main className="flex flex-col items-center justify-center  flex-1">
            {/* <div className="rounded-md p-4  gap-4 text-sm break-all relative">loading...</div> */}
            <div className="border border-white/10 bg-white/5 rounded-md p-6 flex flex-col gap-4 text-sm break-all relative  w-full max-w-80 min-h-[270px]">
              <Loading opts={{ type: 'glx', cls: 'abs' }} />
            </div>
          </main>
        </div>
        :
        <div className="container">
          <main className="flex flex-col items-center justify-center flex-1 p-6">
            {
              myinfo && myinfo.id !== undefined ?
                <>
                  <div className="border border-white/10 bg-white/5 rounded-md p-6 flex flex-col gap-4 text-sm break-all relative  w-full max-w-80">
                    <p><Image width={80} height={80} src={myinfo.profile_picture} alt="" className="w-10 h-10 rounded-full" /></p>
                    <p>Num : {myinfo.id}</p>
                    <p>Username : {myinfo.username}</p>
                    <p>Email : {myinfo.email}</p>
                    <p>Provider : {myinfo.provider}</p>
                    <p>Join : {myinfo.created_at}</p>
                    <button
                      className="btn absolute top-6 right-6"
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

      }


    </>


  );
}
