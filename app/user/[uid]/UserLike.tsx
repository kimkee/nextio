'use client';
import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import Img from '@/app/components/Img';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import '@/app/lib/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from '@/app/supabase';
import Loading from '@/app/components/Loading';
import ui from '@/app/lib/ui';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules'; //,EffectFade 
import { Swiper, SwiperSlide } from 'swiper/react'; //, useSwiper 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import StarPoint from '@/app/components/StarPoint';

// 개별 아이템 메모이제이션
const LikeItem = memo(({ data, uInfo, user, handleLinkClick, deleteScrap }: any) => {
  const tit = data.title || data.name;
  const detailUrl = `/user/${uInfo.id}/${data.mvtv}/${data.idmvtv}`;
  const imgpath = 'https://image.tmdb.org/t/p/w92';
  const img = imgpath + data.poster_path;

  return (
    <li className="odd:border-r border-b border-[#202020]">
      <div className="box relative">
        <Link 
          className="cont flex justify-between w-full text-xs py-3 pl-4 pr-5 active:scale-95 active:opacity-80 transition-transform" 
          href={detailUrl}
          scroll={false}
          prefetch={true}
          onClick={(e) => handleLinkClick(e, detailUrl)}
        >
          <div className="w-14 mr-3">
            <div className="pics w-full flex-none bg-black relative overflow-hidden pb-[calc(450/300*100%)]">
              <Img 
                width={92} height={138} src={`${img}`} alt={tit} srcerr='/img/common/non_poster.png' loading="eager"
                className='img block object-cover w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
              />
            </div>
          </div>
          <div className="dd flex-1">
            <div className="tits mb-2 line-clamp-1">{tit}</div>
            <div className="hits flex flex-col gap-2 relative">
              <div className="relative inline-flex">
                <StarPoint point={data.vote_average} opts={{ cls: 'text-10 absolute top-0 left-0' }} />
              </div>
              <em><FontAwesomeIcon icon={["far", "thumbs-up"]} /> <span>{data.vote_average}</span></em>
            </div>
            <div className="date mt-2 text-white/40"><span>{data.release_date || data.first_air_date}</span></div>
          </div>
        </Link>
        <div className="bts absolute right-1 bottom-2">
          { uInfo?.user_id == user?.id &&
            <button type="button" className="bt w-6 h-6 flex items-center justify-center text-white/40" aria-label='삭제' onClick={ (e)=> {
              e.stopPropagation();
              ui.confirm(`'${tit}'<br> 스크랩을 삭제할까요?`,{ybt:'네',nbt:'아니오', ycb:()=>deleteScrap(data.mvtv, data.id)}) 
            } }>
              <FontAwesomeIcon icon={["far", "trash-can"]} className='w-3 h-3' />
            </button>
          }
        </div>
      </div>
    </li>
  );
});
LikeItem.displayName = 'LikeItem';

// 리스트 전체 메모이제이션
const LikeList = memo(({ data, total, uInfo, user, handleLinkClick, deleteScrap, getMore }: any) => {
  if (data === null) return <Loading opts={{ type: 'glx', cls: 'abs' }} />;
  if (!data.length) return (
    <div className="nodata py-20 flex flex-col items-center justify-center gap-4 text-sm">
      <FontAwesomeIcon icon={["fas", "comment-dots"]} className='w-6 h-6' />
      <p> 스크랩된 컨텐츠가 없습니다.</p>
    </div>
  );

  return (
    <>
      <ul className='list grid grid-cols-2'>
        {data.map((item: any, num: number) => (
          <LikeItem 
            key={`${item.id}_${num}`} 
            data={item} 
            uInfo={uInfo} 
            user={user} 
            handleLinkClick={handleLinkClick} 
            deleteScrap={deleteScrap} 
          />
        ))}
      </ul>
      { data.length < total &&
        <div className="loading border-b border-[#202020]">
          <button type="button" className='text-sm text-[#c9d1d9] h-14 flex flex-col items-center justify-center w-full leading-none'
            onClick={getMore}
          >
            <b>More</b><FontAwesomeIcon icon={["fas", "caret-down"]} className='w-3 h-3' />
          </button>
        </div>
      }
    </>
  );
});
LikeList.displayName = 'LikeList';

function UserLike({uInfo,user,swiper1dep}:{uInfo:any,user:any,swiper1dep:any}) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrapMV, setScrapMV] = useState<any>(null);
  const [scrapTV, setScrapTV] = useState<any>(null);
  const [media, setMedia] = useState<'movie' | 'tv'>('movie');

  const [swiper, setSwiper] = useState(null as any);
  
  const updateSwiper = useCallback(() => {
    if (typeof window === 'undefined') return;
    // 다중 타임아웃을 사용하여 렌더링 완료 시점을 더 확실히 잡음
    const update = () => {
      swiper?.update();
      swiper?.updateAutoHeight();
      swiper1dep?.update();
      swiper1dep?.updateAutoHeight();
    };
    
    setTimeout(update, 100);
    setTimeout(update, 400); // 이미지 로드나 긴 리스트 렌더링 대비
  }, [swiper, swiper1dep]);

  const mdChange = useCallback((num:number)=>{
    setMedia(num == 0 ? 'movie' : 'tv')   
    updateSwiper()
  }, [updateSwiper]);

  const deleteScrap = useCallback(async (opts: string, id: number) => {
    ui.loading.show('glx');
    const { error } = await supabase.from('TMDB_SCRAP').delete().eq('id', id).eq('mvtv', opts);
    if (error) {
      console.error("SCRAP 삭제 에러 :", error.message);
    } else {
      console.table("SCRAP 삭제 성공");
    }
    ui.loading.hide();
  }, []);

  const [scrapMvTot, setScrapMvTot] = useState<number>(0);
  const [scrapTvTot, setScrapTvTot] = useState<number>(0);
  
  const getMyScrapTotal = useCallback(async (user_id: any, opts: string)=> {
    const { count, error } = await supabase
    .from('TMDB_SCRAP')
    .select('*', { count: 'exact', head: true })
    .eq('user_num', user_id)
    .eq('mvtv', opts);
    if (error) {
      console.error("행 수 조회 에러", error.message);
    } else {
      if(!count) return
      opts == 'movie' && setScrapMvTot(count);
      opts == 'tv'    && setScrapTvTot(count);
    }
  }, []);

  const pagingAmount = 40;
  const getMyScrap = useCallback(async (user_id: any, opts: string, num: number)=> {
    ui.loading.show('glx');
    num = (num || pagingAmount) - 1;
    const {data:data, error:error} = await supabase
      .from('TMDB_SCRAP')
      .select("*")
      .order('created_at', { ascending: false })
      .eq('user_num', user_id)
      .eq('mvtv', opts)
      .range(0,num);
    if(data){
      opts == 'movie' && setScrapMV(data);
      opts == 'tv'    && setScrapTV(data);
      ui.loading.hide();
    }
    if(error) {
      console.log(error)
      ui.loading.hide();
    };
  }, []);

  const realtimeChannel = useRef<any>(null);
  const setupRealtimeListener = useCallback((tableName: string) => {
    realtimeChannel.current = supabase.channel(`public:${tableName}:user:${uInfo.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        getMyScrap(uInfo.id,'movie',pagingAmount);
        getMyScrap(uInfo.id,'tv',pagingAmount);
        getMyScrapTotal(uInfo.id,'movie');
        getMyScrapTotal(uInfo.id,'tv');
      })
      .subscribe();
  }, [getMyScrap, getMyScrapTotal, uInfo.id]);

  const handleLinkClick = useCallback((e: React.MouseEvent, targetUrl: string) => {
    if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
  }, []);

  useEffect(() => {
    getMyScrap(uInfo.id,'movie',pagingAmount);
    getMyScrap(uInfo.id,'tv',pagingAmount);
    getMyScrapTotal(uInfo.id,'movie');
    getMyScrapTotal(uInfo.id,'tv');
    setupRealtimeListener('TMDB_SCRAP');
      
    return ()=>{
      if (realtimeChannel.current) {
        supabase.removeChannel(realtimeChannel.current);
      }
    }
  },[uInfo.id, getMyScrap, getMyScrapTotal, setupRealtimeListener]);

  const gotoSlide = useCallback((num: number)=>{
    swiper?.slideTo(num);
  }, [swiper]);

  useEffect(() => {
    updateSwiper();
  }, [scrapMV, scrapTV, updateSwiper]);

  return (
    <div className="movie-list user">
      <div className="tabs flex justify-center border-b border-[#202020] h-12" role="tablist">
        <button onClick={()=>gotoSlide(0)} className={`w-full text-xs ${media == 'movie' ? 'active text-primary font-bold':''}`}>
          <em>Movie</em>
          <i className={`${media == 'movie' ? 'bg-primary':'bg-white/50'} not-italic text-10 h-0.6rem leading-none rounded-full px-1 text-black ml-1`}>{scrapMvTot}</i>
        </button>
        <button onClick={()=>gotoSlide(1)} className={`w-full text-xs ${media == 'tv' ? 'active text-primary':''}`}>
          <em>TV</em>
          <i className={`${media == 'tv' ? 'bg-primary':'bg-white/50'} not-italic text-10 h-0.6rem leading-none rounded-full px-1 text-black ml-1`}>{scrapTvTot}</i>
        </button>
      </div>

      <Swiper className="swiper-wrapper swiper pctn" 
          modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
          slidesPerView={1}
          loop={false}
          autoHeight={true}
          // 성능 최적화: 가벼운 관찰 옵션만 유지
          watchOverflow={true}
          onSwiper={setSwiper}
          onSlideChange={(s) => mdChange(s.activeIndex)}
        >
          <SwiperSlide tag="section" className="tablike mv min-h-[calc(100vh-25.5rem-var(--safe-top)-var(--safe-bottom))] pb-20">
            <LikeList 
              data={scrapMV} 
              total={scrapMvTot} 
              uInfo={uInfo} 
              user={user} 
              handleLinkClick={handleLinkClick} 
              deleteScrap={deleteScrap}
              getMore={() => getMyScrap(uInfo.id, 'movie', scrapMV.length + pagingAmount)}
            />
          </SwiperSlide>
          
          <SwiperSlide tag="section" className="tablike mv min-h-[calc(100vh-25.5rem-var(--safe-top)-var(--safe-bottom))] pb-20">
            <LikeList 
              data={scrapTV} 
              total={scrapTvTot} 
              uInfo={uInfo} 
              user={user} 
              handleLinkClick={handleLinkClick} 
              deleteScrap={deleteScrap}
              getMore={() => getMyScrap(uInfo.id, 'tv', scrapTV.length + pagingAmount)}
            />
          </SwiperSlide>
        </Swiper>
    </div>
  );
}

export default memo(UserLike);
