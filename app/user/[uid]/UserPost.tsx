'use client';
import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import Img from '@/app/components/Img';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import '@/app/lib/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from '@/app/supabase';
import ui from '@/app/lib/ui';
import StarPoint from '@/app/components/StarPoint';

const ReviewItem = memo(({ data, uInfo, user, handleLinkClick, deleteReview }: any) => {
  const imgpath = 'https://image.tmdb.org/t/p/w92';
  const img = imgpath + data.poster_path;
  const detailUrl = `/user/${uInfo.id}/${data.mvtv}/${data.idmvtv}`;

  return (
    <li data-idmvtv={data.idmvtv} className="border-b border-[#202020]">
      <div className="box relative">
        <Link 
          className="cont flex justify-between w-full text-xs py-3 pl-4 pr-5" 
          href={detailUrl}
          scroll={false}
          prefetch={true}
          onClick={handleLinkClick}
        >
          <div className="w-9 flex-none mr-3">
            <div className="pics w-full flex-none bg-black relative overflow-hidden pb-[calc(450/300*100%)]">
              <Img 
                width={92} height={138} src={`${img}`} alt={data.title} srcerr='/img/common/non_poster.png' loading="eager"
                className='img block object-cover w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
              />
            </div>
          </div>
          <div className="dd flex-1 ">
            <div className="tits mb-2 min-h-6 text-sm">{ui.textHtml(data.content, 'decode')}</div>
            <div className="hits flex gap-2">
              <StarPoint point={data.vote_average} opts={{ cls: 'text-10' }} />
              <span className="date mt-0 text-white/40 text-xt"> {ui.dateForm(data.created_at, 'short')}</span>
            </div>
          </div>
        </Link>
        { uInfo?.user_id == user?.id &&
        <div className="bts absolute right-3 bottom-2">
          <button type="button" className="bt text-white/40" onClick={ (e)=> {
            e.stopPropagation();
            ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteReview(data.mvtv, data.id)}) 
          } }>
            <span><FontAwesomeIcon icon={["far", "trash-can"]} className='w-3 h-3' /></span>
          </button>
        </div>
        }
      </div>
    </li>
  );
});
ReviewItem.displayName = 'ReviewItem';

const ReviewList = memo(({ items, uInfo, user, handleLinkClick, deleteReview }: any) => {
  if (!items.length) return (
    <div className="nodata py-20 flex flex-col items-center justify-center gap-4 text-sm">
      <FontAwesomeIcon icon={["fas", "comment-dots"]} className='w-6 h-6' />
      <p>작성하신 리뷰가 없습니다</p>
    </div>
  );

  return (
    <ul className="mrvlist pb-20">
      {items.map((item: any, num: number) => (
        <ReviewItem 
          key={`${item.id}_${num}`} 
          data={item} 
          uInfo={uInfo} 
          user={user} 
          handleLinkClick={handleLinkClick} 
          deleteReview={deleteReview} 
        />
      ))}
    </ul>
  );
});
ReviewList.displayName = 'ReviewList';

function UserPost({uInfo,user,swiper}:{uInfo:any,user:any,swiper:any}) {
  const pathname = usePathname();
  /* 내 리뷰 조회 */
  const [myReview, setMyReview] = useState<any>(null);
  
  const getMyReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from('TMDB_REVIEW')
      .select('*')
      .eq('user_id', uInfo.user_id)
      .order('updated_at', { ascending: false });
    setMyReview(data);
    if(error) console.error(error);
  }, [uInfo.user_id]);

  const realtimeChannel = useRef<any>(null);
  const setupRealtimeListener = useCallback((tableName: string) => {
    realtimeChannel.current = supabase.channel(`public:${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        getMyReviews();
      })
      .subscribe();
  }, [getMyReviews]);

  /* 내 리뷰삭제 */
  const deleteReview = useCallback(async (opts: string, id: number) => {
    const { error }  = await supabase.from('TMDB_REVIEW').delete().eq('id', id);
    if (error) {
      console.error("내 리뷰 삭제 에러", error.message);
    } else {
      getMyReviews();
      swiper?.update();
    }
  }, [getMyReviews, swiper]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
  }, []);

  useEffect( () => {
    getMyReviews();
    setupRealtimeListener('TMDB_REVIEW');
    return ()=>{
      realtimeChannel.current?.unsubscribe();
    }
  }, [getMyReviews, setupRealtimeListener]);

  useEffect(() => {
    if (myReview) {
      setTimeout(() => {
        swiper?.update();
        swiper?.updateAutoHeight();
      }, 100);
    }
  }, [myReview, swiper]);

  if(!myReview) return null;
  
  return (
    <ReviewList 
      items={myReview} 
      uInfo={uInfo} 
      user={user} 
      handleLinkClick={handleLinkClick} 
      deleteReview={deleteReview} 
    />
  );
}

export default memo(UserPost);
