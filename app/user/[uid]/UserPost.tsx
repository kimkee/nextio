'use client';
import React, { useState, useEffect, useRef } from 'react';
import Img from '@/app/components/Img';
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
import StarPoint from '@/app/components/StarPoint';

export default function UserPost({uInfo,user,swiper}:{uInfo:any,user:any,swiper:any}) {
  
  /* 내 리뷰 조회 */
  const [myReview, setMyReview] = useState<any>(null);
  const getMyReviews = async () => {
    const { data, error } = await supabase
      .from('TMDB_REVIEW')
      .select('*')
      .eq('user_id', uInfo.user_id)
      .order('updated_at', { ascending: false });
    console.log(data);
    setMyReview(data);
    
    if(error) console.error(error);
  }
  const realtimeChannel = useRef<any>(null);
  const setupRealtimeListener = (tableName: string) => {
    realtimeChannel.current = supabase.channel(`public:${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        getMyReviews();
        console.log(`${tableName} 업데이트`);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to ${tableName} changes`);
        }
      });
  };
  /* 내 리뷰삭제 */
  const deleteReview = async (opts: string, id: number) => {
    console.log(opts, id);
    const { data, error }  = await supabase.from('TMDB_REVIEW').delete().eq('id', id);
    if (error) {
      console.error("내 리뷰 삭제 에러", error.message);
    } else {
      console.table("내 리뷰 삭제 성공");
      getMyReviews();
      swiper?.update();
    }
  }
  useEffect( () => {
    getMyReviews();
    setupRealtimeListener('TMDB_REVIEW');
    return ()=>{
      realtimeChannel.current.unsubscribe();
    }
    // eslint-disable-next-line
  },[uInfo]);

  if(!myReview) return 
  
  return (
    <>
      <ul className="mrvlist pb-20">
        
        {myReview.length > 0 ? myReview.map((data:any, num: number)=>{
          const imgpath = 'https://image.tmdb.org/t/p/w92';
          const img = imgpath + data.poster_path;
          return (
            <li key={num} data-idmvtv={data.idmvtv} className="border-b border-[#202020]">
              <div className="box relative">
                <Link className="cont flex justify-between w-full text-xs py-3 pl-4 pr-5" href={`/user/${uInfo.id}/${data.mvtv}/${data.idmvtv}`}>
                  <div className="w-9 flex-none mr-3">
                    <div className="pics w-full flex-none bg-[#203140] relative overflow-hidden pb-[calc(450%/300*100)]">
                      <Img 
                        width={92} height={138} src={`${img}`} alt={data.title} srcerr='/img/common/non_poster.png' unoptimized={true} loading="eager"
                        className='img block object-cover   w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
                      />
                    </div>
                  </div>
                  {/* <div className="pics"><img src={`${img}`} alt={data.title} onError={ui.error.poster} className='img'/></div> */}
                  <div className="dd flex-1 ">
                    <div className="tits mb-2 min-h-6 text-sm">{ui.textHtml(data.content,'decode')}</div>
                    <div className="hits flex gap-2">
                      <StarPoint point={data.vote_average} opts={{ cls: 'text-10' }} />
                      <span className="date mt-0 text-white/40 text-xt"> {ui.dateForm(data.created_at,'short')}</span>
                    </div>
                  </div>
                </Link>
                { uInfo?.user_id == user?.id &&
                <div className="bts absolute right-3 bottom-2">
                  <button type="button" className="bt text-white/40" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteReview(data.mvtv, data.id)}) }>
                    <span><FontAwesomeIcon icon={["far", "trash-can"]} className='w-3 !h-3' /></span>
                  </button>
                </div>
                }
              </div>
            </li>
          )
        }):
        <div className="nodata py-20 flex flex-col items-center justify-center gap-4 text-sm">
            <FontAwesomeIcon icon={["fas", "comment-dots"]} className='w-6 !h-6' />
            <p>작성하신 리뷰가 없습니다</p>
        </div>}
      </ul>
      
    </>
  )
}