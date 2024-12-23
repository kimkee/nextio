'use client';
import Image from 'next/image';
import Img from '@/app/components/Img';
import React, { useState, useEffect, useRef } from 'react';
import {usePathname, useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import '@/app/lib/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Myinfo as MyinfoType, User as UserType } from '@/app/types';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
import getUser from '@/app/getUser';
import Loading from '@/app/components/Loading';
import ui from '@/app/lib/ui';
export const runtime = 'edge';

export default function User() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [myinfo, setMyinfo] = useState<MyinfoType | null>(null);
  const params = useParams();
  const parm_id = params.id as string;

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    router.push('/');
  };

  const [uInfo, setUInfo] = useState<any>();
  const viewUser = async ()=> {
    console.log(parm_id);
    const { data , error }  = await supabase.from('MEMBERS').select("*").eq('id', parm_id).order('created_at', { ascending: true });
    if(data){
      setUInfo(data[0]);
      // console.log(data[0]);
      // console.log(user);
    }
    if(error) console.log(error);
  }

  useEffect(() => {
    getUser().then((data) => {
      setUser(data?.user as UserType);
      setMyinfo(data?.myinfo as MyinfoType);
      // console.log(data?.user);
      // console.table(data?.myinfo);
    }).then((data) => {
      console.log(user);
      console.log(myinfo);

    });
    viewUser()
  }, []);

  return (
    <>
      {uInfo === null ? (
        <div className='container'>
          <main className='flex flex-col items-center justify-center  flex-1'>
            {/* <div className="rounded-md p-4  gap-4 text-sm break-all relative">loading...</div> */}
            <div className='border border-white/10 bg-white/5 rounded-md p-6 flex flex-col gap-4 text-sm break-all relative  w-full max-w-80 min-h-[270px]'>
              <Loading opts={{ type: 'glx', cls: 'abs' }} />
            </div>
          </main>
        </div>
      ) : (
        <div className='container !block'>
          <main className='flex flex-col'>
            { uInfo && uInfo.id !== undefined ? (
              <>
                <div className="profile pt-8 pb-4 relative">
                  <div className="user flex items-center mb-5 mx-5">
                    <Link href={'/user/'+parm_id} className="pic flex-none relative w-[80px] pb-[80px] mr-4 overflow-hidden">
                      <img src={uInfo.profile_picture} className="img w-[80px] h-[80px] rounded-full absolute left-0 top-0 bg-[#424242]"/>
                      <span className="ico absolute right-0 bottom-0 w-5 h-5 inline-flex items-center justify-center rounded-full bg-white/50">
                        {uInfo.provider == 'google' && <FontAwesomeIcon icon={['fab', 'google']}  className="text-black w-3 !h-3" />}
                        {uInfo.provider == 'github' && <FontAwesomeIcon icon={['fab', 'github']}  className="text-black w-3 !h-3" />}
                        {uInfo.provider == 'kakao'  && <FontAwesomeIcon icon={['fas', 'comment']} className="text-black w-3 !h-3" />}
                      </span>
                    </Link>
                    <div className="info flex w-full px-5 text-sm">
                      <div className="num b flex-1 text-center"><b className="n">{0}</b><p className="t">Post </p></div>    
                      <div className="num p flex-1 text-center"><b className="n">{0}</b><p className="t">Review</p></div>    
                      <div className="num l flex-1 text-center"><b className="n">{0}</b><p className="t">Scrap</p></div>
                    </div>
                  </div>
                  <div className="desc flex flex-col gap-1 mx-5 text-xs">
                    <span className="txt">
                      <FontAwesomeIcon icon={['far', 'calendar-days']} className="mr-1" />
                      Join : {ui.dateForm(uInfo.created_at)}
                    </span>
                    <span className="txt">
                      <FontAwesomeIcon icon={['far', 'envelope']} className="mr-1" />
                      {uInfo.email}
                    </span>
                  </div>
                  {
                    uInfo.user_id == user?.id &&
                    <div className="bts absolute bottom-5 right-6">
                      <button type="button" onClick={signOut} className="btn sm logout">
                        <FontAwesomeIcon icon={['fas', 'power-off']} />
                        <em className='text-xt'>Logout</em>
                      </button>
                    </div>
                  }  
                </div>
              </>
            ) : (
              <>
                <Loading opts={{ type: 'glx', cls: 'full' }} />
              </>
            )}
          </main>
        </div>
      )}
    </>
  );
}
