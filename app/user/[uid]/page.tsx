'use client';
import Image from 'next/image';
import Img from '@/app/components/Img';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import UserLike from './UserLike';
import UserFolw from './UserFolw';
import UserPost from './UserPost';


export default function User() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [myinfo, setMyinfo] = useState<MyinfoType | null>(null);
  const params = useParams();
  const param_id = params.uid as string;

  const signOut = useCallback(async () => {
    router.push('/user/logout');
  }, [router]);

  const [uInfo, setUInfo] = useState<any>();
  const viewUser = useCallback(async ()=> {
    const { data , error }  = await supabase.from('MEMBERS').select("*").eq('id', param_id).order('created_at', { ascending: true });
    if(data){
      setUInfo(data[0]);
    }
    if(error) console.log(error);
  }, [param_id]);

  const [swiper, setSwiper] = useState(null as any);
  const [spIdx, setSpIdx] = useState<number>(0);
  
  const gotoSlide = useCallback((num: number)=>{
    swiper?.slideTo(num);
  }, [swiper]);

  useEffect(() => {
    getUser().then((data) => {
      setUser(data?.user as UserType);
      setMyinfo(data?.myinfo as MyinfoType);
    });
    viewUser()
  }, [param_id, viewUser]);

  const slideHeightClass = "min-h-[calc(100dvh-22.5rem-var(--safe-top)-var(--safe-bottom))]";

  return (
    <>
      {uInfo === undefined? (
        <div className='container'>
          <main className='flex flex-col items-center justify-center  flex-1'>
            
              <Loading opts={{ type: 'glx', cls: 'abs' }} />
            
          </main>
        </div>
      ) : (
        <div className='container block!'>
          <main className='flex flex-col'>
            { uInfo && uInfo.id !== undefined ? (
              <>
                <div className="profile pt-8 pb-4 relative">
                  <div className="user flex items-center mb-5 mx-5">
                    <Link href={'/user/'+param_id} className="pic flex-none relative w-20 pb-20 mr-4 overflow-hidden">
                      <Img className={`img w-20 h-20 rounded-full absolute left-0 top-0 bg-[#424242]`}
                        width={80} height={80}
                        src={uInfo.profile_picture}
                        alt={uInfo.username}
                        srcerr='/img/common/user.png'
                        unoptimized={true}
                      />
                      <span className="ico absolute right-0 bottom-0 w-5 h-5 inline-flex items-center justify-center rounded-full bg-white/50">
                        {uInfo.provider == 'google' && <FontAwesomeIcon icon={['fab', 'google']}  className="text-black w-3 h-3!" />}
                        {uInfo.provider == 'github' && <FontAwesomeIcon icon={['fab', 'github']}  className="text-black w-3 h-3!" />}
                        {uInfo.provider == 'kakao'  && <FontAwesomeIcon icon={['fas', 'comment']} className="text-black w-3 h-3!" />}
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
                      <button type="button" onClick={signOut} className="btn btn-md btn-primary logout">
                        <FontAwesomeIcon icon={['fas', 'power-off']} />
                        <em className='text-xt uppercase'>Logout</em>
                      </button>
                    </div>
                  }  
                </div>
  
                <div className="user-post">
                  <ul className="
                    menu sticky top-[calc(3.375rem+var(--safe-top))] h-14 flex w-full 
                    border-b border-b-[#242b36] z-100 bg-[#111111]"
                  >
                    {[
                      { idx: 0, icon: 'bookmark' },
                      { idx: 1, icon: 'list' },
                      { idx: 2, icon: 'users' }
                    ].map((item) => (
                      <li key={item.idx} className={`${spIdx === item.idx ? "active text-primary" : ""} flex-1 relative`}>
                        <button type="button" className="bt h-full w-full text-center text-inherit" onClick={()=>gotoSlide(item.idx)}>
                          <FontAwesomeIcon icon={['fas', item.icon as any]} />
                        </button>
                        {spIdx === item.idx && <i className="bar absolute left-0 bottom-0 right-0 h-0.5 bg-primary"></i>}
                      </li>
                    ))}
                  </ul>
                  <Swiper 
                    className="swiper-wrapper swiper pctn" 
                    modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={false}
                    autoplay={false}
                    initialSlide={0}
                    autoHeight={true}
                    // 성능 최적화: 필요한 관찰 설정만 유지
                    watchOverflow={true}
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setSpIdx(s.activeIndex)}
                  >
                    <SwiperSlide tag="section" className={`ctn like ${slideHeightClass}`}>
                      <UserLike uInfo={uInfo} user={user} swiper1dep={swiper} />
                    </SwiperSlide>
                    <SwiperSlide tag="section" className={`ctn post ${slideHeightClass}`}>
                      <UserPost uInfo={uInfo} user={user} swiper={swiper} />
                    </SwiperSlide>
                    <SwiperSlide tag="section" className={`ctn repl ${slideHeightClass}`}>
                      <UserFolw uInfo={uInfo} user={user} swiper1dep={swiper} />
                    </SwiperSlide>
                  </Swiper>
                </div>  
              </>
            ) : (
              <Loading opts={{ type: 'glx', cls: 'full' }} />
            )}
          </main>
        </div>
      )}
    </>
  );
}
