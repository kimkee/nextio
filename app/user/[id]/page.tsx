'use client';
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import '@/app/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Myinfo as MyinfoType, User as UserType } from '@/app/types';

import getUser from "@/app/getUser";
export const runtime = 'edge';

export default function User() {

  const [user, setUser] = useState<UserType | null>(null);
  const [myinfo, setMyinfo] = useState<MyinfoType | null>(null);
  const params = useParams();
  const id = params.id as string;
  const cateID = params.cate as string;

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
        <div className="border border-white/20 rounded-md p-4 mt-8 flex flex-col gap-4 text-sm break-all">
          <p>{myinfo?.id}</p>
          <p>{myinfo?.username}</p>
          <p>{myinfo?.email}</p>
          <p><img src={myinfo?.profile_picture} alt="" className="w-10 h-10 rounded-full" /></p>
          <p>{myinfo?.created_at}</p>
          <p>{myinfo?.updated_at}</p>
        </div>
      </main>
    </div>

  );
}
