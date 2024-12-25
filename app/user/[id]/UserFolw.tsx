'use client';
import React, { useState, useEffect, useRef } from 'react';
import Img from '@/app/components/Img';
import { usePathname, useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import '@/app/lib/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Myinfo as MyinfoType, User as UserType } from '@/app/types';
import { supabase } from '@/app/supabase';
import { Provider } from '@supabase/supabase-js';
import getUser from '@/app/getUser';
import Loading from '@/app/components/Loading';
import ui from '@/app/lib/ui';

export default function UserFolw({ uInfo, user, swiper1dep }: { uInfo: any, user: any, swiper1dep: any }) {
  const router = useRouter();
  const [member, setMember] = useState<any>(null);
  const members = async () => {
    const { data, error } = await supabase.from('MEMBERS').select('*').order('created_at', { ascending: true });
    setMember(data);
  };
  const goPage = (link: any) => {
    router.push(`/user/${link}`);
    console.log(link);
  };

  useEffect(() => {
    members();
    return () => {};
    // eslint-disable-next-line
  }, [uInfo]);

  if(!member) return
  return (
    <>
      <div className="members p-5 pb-20">
        <ul className="mlist flex flex-wrap justify-start gap-6 pt-5">
          {member.length > 0 ? member.map((data:any,num:number) =>{
          return(
            <li
              className="w-[calc(100%/4-1.13rem)] text-center"
              key={data.id+'_'+num} data-id={data.id+'_'+num}
            >
              <button onClick={()=>goPage(data.id)} className='box max-w-16 inline-block'>
                <span className="pic relative">
                  <Img className="img rounded-full"
                    width={100} height={100} src={`${data.profile_picture}`} alt={data.username} srcerr='/img/common/user.png' unoptimized={true}loading="eager"
                  />
                  <span className="ico absolute right-0 bottom-0 w-5 h-5 inline-flex items-center justify-center rounded-full bg-white/50">
                    {data.provider == 'google' && <FontAwesomeIcon icon={['fab', 'google']}  className="text-black w-3 !h-3" />}
                    {data.provider == 'github' && <FontAwesomeIcon icon={['fab', 'github']}  className="text-black w-3 !h-3" />}
                    {data.provider == 'kakao'  && <FontAwesomeIcon icon={['fas', 'comment']} className="text-black w-3 !h-3" />}
                  </span>
                </span>
                <div className="name text-sm">{data.username}</div>
              </button>
            </li>)
          })
          :
          <li className="nodata w-full py-10 gap-2 flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={['fas', 'person-digging']} className="text-2xl text-primary/80" />
            <p>Work in Progress</p>
          </li>
          }
        </ul>
      </div>
    </>
  )
}