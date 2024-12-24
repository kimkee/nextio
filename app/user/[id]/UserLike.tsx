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

export default function UserLike({uInfo,user,swiper1dep}:{uInfo:any,user:any,swiper1dep:any}) {

  const [scrapMV, setScrapMV] = useState<any>(null);
  const [scrapTV, setScrapTV] = useState<any>(null);
  const [media, setMedia] = useState<'movie' | 'tv'>('movie');

  const [swiper, setSwiper] = useState(null as any);
  const updateSwiper = ()=> setTimeout(() => {
    // swiper?.update();
    // swiper?.updateAutoHeight();
    swiper1dep?.update();
    swiper1dep?.updateAutoHeight();
  }, 500);

  const mdChange = (num:number)=>{
    setMedia(num == 0 ? 'movie' : 'tv')   
    updateSwiper()
  }
  const deleteScrap = async (opts: string, id: number) => {
    ui.loading.show('glx');
    console.log(opts, id); 
    const { error } = await supabase.from('TMDB_SCRAP').delete().eq('id', id).eq('mvtv', opts);
    if (error) {
      console.error("SCRAP 삭제 에러 :", error.message);
    }else{
      console.table("SCRAP 삭제 성공");
    }
    ui.loading.hide();
  };

  const [scrapMvTot, setScrapMvTot] = useState<number>(0);
  const [scrapTvTot, setScrapTvTot] = useState<number>(0);
  const getMyScrapTotal = async (user_id: any, opts: string)=> {
    const { count, error } = await supabase
    .from('TMDB_SCRAP')
    .select('*', { count: 'exact', head: true })
    .eq('user_num', user_id)
    .eq('mvtv', opts);
    if (error) {
      console.error("행 수 조회 에러", error.message);
    } else {
      if(!count) return
      console.log("총 행 수:", count);
      opts == 'movie' && setScrapMvTot(count);
      opts == 'tv'    && setScrapTvTot(count);
    }
  }
  const pagingAmount = 40;
  const getMyScrap = async (user_id: any, opts: string, num: number)=> {
    ui.loading.show('glx');
    console.log(user_id);
    num = (num || pagingAmount) - 1;
    const {data:data, error:error} = await supabase
      .from('TMDB_SCRAP')
      .select("*")
      .order('created_at', { ascending: false })
      .eq('user_num', user_id)
      .eq('mvtv', opts)
      .range(0,num);
    if(data){
      console.log(data) 
      console.table("내 스크랩 조회 성공");
      opts == 'movie' && setScrapMV(data);
      opts == 'tv'    && setScrapTV(data);
    }
    if(error) console.log(error);
    ui.loading.hide();
    // console.log(data);
    
  }
  const realtimeChannel = useRef<any>(null);
  const setupRealtimeListener = (tableName: string) => {
    
    realtimeChannel.current = supabase.channel(`public:${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        getMyScrap(uInfo.id,'movie',pagingAmount);
        getMyScrap(uInfo.id,'tv',pagingAmount);
        console.log(`${tableName} 업데이트`);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to ${tableName} changes`);
        }
      });
  };

  
  useEffect( () => {
    console.log(uInfo , user);
    getMyScrap(uInfo.id,'movie',pagingAmount);
    getMyScrap(uInfo.id,'tv',pagingAmount);
    getMyScrapTotal(uInfo.id,'movie');
    getMyScrapTotal(uInfo.id,'tv');
    setupRealtimeListener('TMDB_SCRAP');
      
    return ()=>{
      realtimeChannel.current?.unsubscribe();
    }
    // eslint-disable-next-line
  },[uInfo,swiper]);
  const gotoSlide = (num: number)=>{
    console.log(num);
    swiper.slideToLoop(num);
  }
  return (
    <>
      <div className="movie-list user">
        <button onClick={()=>{updateSwiper()}} className='btn sm hidden'>S</button>
        
        <div className="tabs flex justify-center border-b border-[#202020] h-12" role="tablist">
          <button className={`w-full text-xs ${media == 'movie' ? 'active text-primary font-bold':''}`} onClick={()=>gotoSlide(0)}>
            <em>Movie</em>
            <i className={`${media == 'movie' ? 'bg-primary':'bg-white/50'} text-10 h-0.6rem leading-none rounded-full px-1 text-black ml-1`}>{scrapMvTot}</i>
          </button>
          <button className={`w-full text-xs ${media == 'tv' ? 'active text-primary':''}`} onClick={()=>gotoSlide(1)}>
            <em>TV</em>
            <i className={`${media == 'tv' ? 'bg-primary':'bg-white/50'} text-10 h-0.6rem leading-none rounded-full px-1 text-black ml-1`}>{scrapTvTot}</i>
          </button>
        </div>
        <Swiper className="swiper-wrapper swiper pctn " 
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            loop={false}
            autoplay={false}
            wrapperTag="div"
            initialSlide={ 0 } 
            autoHeight={true}
            watchOverflow={true}
            observer={true}
            observeSlideChildren={true}
            observeParents={true}
            onSwiper={(swiper) => {
              console.log("initialize swiper", swiper);
              setSwiper(swiper);
              mdChange(swiper.realIndex)
              updateSwiper()
            }}
            onSlideChange={(swiper) => {
              console.log('slide change' , swiper.realIndex , swiper.activeIndex);
              mdChange(swiper.realIndex)
              updateSwiper()
            }}
          >
              
            <SwiperSlide tag="section" className="tablike mv min-h-[calc(100vh-25.5rem-var(--safe-top)-var(--safe-bottom))] pb-20">
            {scrapMV === null ? <Loading opts={{ type: 'glx', cls: 'abs' }} /> : 
            <>
              {scrapMV.length ?
              <>
              <ul className='list grid grid-cols-2'>
                {scrapMV.map((data:any,num:number) =>{
                    const imgpath = '//image.tmdb.org/t/p/w92';
                    const img = imgpath + data.poster_path;
                    const tit = data.title || data.name;
                    return(
                      <li key={data.id+'_'+num} data-id={data.id+'_'+num} className="odd:border-r border-b border-[#202020]">
                        <div className="box relative">
                          <div className="cont  flex justify-between w-full text-xs py-3 pl-4 pr-5" /* href={`${data.mvtv}/${data.idmvtv}`} */>
                            <div className="w-14 mr-3">
                              <div className="pics w-full flex-none bg-[#203140] relative overflow-hidden pb-[calc(450%/300*100)]">
                                <Img 
                                  width={92} height={138} src={`${img}`} alt={tit} srcerr='/img/common/non_poster.png' unoptimized={true}
                                  className='img block object-cover   w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                />
                              </div>
                            </div>
                            <div className="dd flex-1">
                              <div className="tits mb-2 line-clamp-1">{data.title || data.name}</div>
                              <div className="hits flex flex-col gap-2">
                                <StarPoint point={data.vote_average} opts={{ cls: 'sm' }} />
                                <em><FontAwesomeIcon icon={["far", "thumbs-up"]} /> <span>{data.vote_average}</span></em>
                              </div>
                              <div className="date mt-2 text-white/40"><span>{data.release_date || data.first_air_date}</span></div>
                            </div>
                          </div>
                          <div className="bts absolute right-3 bottom-2">
                            { uInfo?.user_id == user?.id &&
                              <button type="button" className="bt text-white/40" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteScrap(data.mvtv, data.id)}) }>
                                <span><FontAwesomeIcon icon={["far", "trash-can"]} className='w-3 !h-3' /></span>
                              </button>
                            }
                          </div>
                        </div>
                      </li>
                    )
                })}
                
              </ul>
              { scrapMV.length < scrapMvTot &&
              <div className="loading border-b border-[#202020]">
                <button type="button"  className='bg-[#111111] text-sm text-[#c9d1d9] h-14 flex flex-col items-center justify-center w-full leading-none'
                  onClick={()=>{getMyScrap(uInfo.id,'movie',scrapMV.length+pagingAmount)}}
                >
                  <b>More</b><FontAwesomeIcon icon={["fas", "caret-down"]} className='w-3 !h-3' />
                </button>
              </div>
              }
              </>
              :
              <div className="nodata py-20 flex flex-col items-center justify-center gap-4 text-sm">
                <FontAwesomeIcon icon={["fas", "comment-dots"]} className='w-6 !h-6' />
                <p> 스크랩된 컨텐츠가 없습니다.</p>
              </div>
              }
            </>
            }
            </SwiperSlide>

            <SwiperSlide tag="section" className="tablike tv min-h-[calc(100vh-25.5rem-var(--safe-top)-var(--safe-bottom))] pb-20">
            {scrapTV === null ? <Loading opts={{ type: 'glx', cls: 'abs' }} /> : 
            <>
              {scrapTV.length ?
              <>
              <ul className='list grid grid-cols-2'>
                {scrapTV.map((data:any,num:number) =>{
                    const imgpath = '//image.tmdb.org/t/p/w92';
                    const img = imgpath + data.poster_path;
                    const tit = data.title || data.name;
                    return(
                      <li key={data.id+'_'+num} data-id={data.id+'_'+num} className="odd:border-r border-b border-[#202020]">
                        <div className="box relative">
                          <div className="cont  flex justify-between w-full text-xs py-3 pl-4 pr-5" /* href={`${data.mvtv}/${data.idmvtv}`} */>
                            <div className="w-14 mr-3">
                              <div className="pics w-full flex-none bg-[#203140] relative overflow-hidden pb-[calc(450%/300*100)]">
                                <Img 
                                  width={92} height={138} src={`${img}`} alt={tit} srcerr='/img/common/non_poster.png' unoptimized={true}
                                  className='img block object-cover   w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                />
                              </div>
                            </div>
                            <div className="dd flex-1">
                              <div className="tits mb-2 line-clamp-1">{data.title || data.name}</div>
                              <div className="hits flex flex-col gap-2">
                                <StarPoint point={data.vote_average} opts={{ cls: 'sm' }} />
                                <em><FontAwesomeIcon icon={["far", "thumbs-up"]} /> <span>{data.vote_average}</span></em>
                              </div>
                              <div className="date mt-2 text-white/40"><span>{data.release_date || data.first_air_date}</span></div>
                            </div>
                          </div>
                          <div className="bts absolute right-3 bottom-2">
                            { uInfo?.user_id == user?.id &&
                              <button type="button" className="bt text-white/40" onClick={ ()=> ui.confirm('삭제할까요?',{ybt:'네',nbt:'아니오', ycb:()=>deleteScrap(data.mvtv, data.id)}) }>
                                <span><FontAwesomeIcon icon={["far", "trash-can"]} className='w-3 !h-3' /></span>
                              </button>
                            }
                          </div>
                        </div>
                      </li>
                    )
                })}
                
              </ul>
              { scrapTV.length < scrapTvTot &&
              <div className="loading border-b border-[#202020]">
                <button type="button"  className='bg-[#111111] text-sm text-[#c9d1d9] h-14 flex flex-col items-center justify-center w-full leading-none'
                  onClick={()=>{getMyScrap(uInfo.id,'tv',scrapTV.length+pagingAmount)}}
                >
                  <b>More</b><FontAwesomeIcon icon={["fas", "caret-down"]} className='w-3 !h-3' />
                </button>
              </div>
              }
              </>
              :
              <div className="nodata py-20 flex flex-col items-center justify-center gap-4 text-sm">
                <FontAwesomeIcon icon={["fas", "comment-dots"]} className='w-6 !h-6' />
                <p> 스크랩된 컨텐츠가 없습니다.</p>
              </div>
              }
            </>
            }
            </SwiperSlide>
          </Swiper>


        
      </div>
    </>
  )
}