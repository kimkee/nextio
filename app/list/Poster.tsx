'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useRouter, useSearchParams, usePathname } from 'next/navigation'; //,useOutletContext  , useLocation, Outlet,




import ui from '@/app/lib/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from '@/app/components/Loading';
import Link from 'next/link';

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
import { useAtom } from 'jotai';
import { globalLangAtom } from '@/app/store/lang';

export default function Poster() {

  
  let params = useParams()
  const router = useRouter();
  const searchParams = useSearchParams();
  const [globalLang] = useAtom(globalLangAtom);
  

  const postID = params.id;
  const vId = searchParams.get('idx')
  const opts = searchParams.get('poster')

  const [datas, setDatas] = useState<any>(null);
  const [pstImg, pstImgSet] = useState('');
  const [title, titleSet] = useState('');
  const loopSet = ()=> datas.images.posters.length > 1 ? true : false;
  // const fetchURL = `https://api.themoviedb.org/3/${opts}/${postID}?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos,images&include_image_language=en,null`;
  const fetchDatas = () => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/${opts}/${postID}`,
      params: {
        language: globalLang.lang,
        region: globalLang.region,
        append_to_response: 'videos,images',
        include_image_language: 'en,null'
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
      }
    };
    axios.request(options).then(response => {
      console.log("영화정보" , response.data);
      setDatas(response.data);
      let bgDm = response.data.poster_path ? response.data.poster_path : response.data.backdrop_path;
      pstImgSet('//image.tmdb.org/t/p/w780'+bgDm);
      titleSet(response.data.title || response.data.name);
    }).catch( e => { console.log(e); });
  };
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    
    fetchDatas();
    // console.log(datas);
    
    ui.lock.using(true); 
    setMounted(true);
    return () => {
      ui.lock.using(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  // if (!datas || !casts || !photos){
  //   return <div className="m-info"><Loading opts={{type:'glx', cls:'full'}}/></div>
  // }
  return (
  <>

    <article className={`pop-layer c popup person fixed left-0 top-0 bottom-0 right-0 flex justify-center items-center pr-(--scrPad) open backdrop-blur-md `}>
      <div className="fixed top-2 w-full max-w-(--mwide) left-1/2 -translate-x-1/2 z-50 text-right pr-2">
        <button type="button" aria-label='닫기' onClick={ () => { router.back() } } 
          className="btn-pop-close h-10 w-10 text-white inline-flex items-center justify-center text-3xl"
        >
          <FontAwesomeIcon icon={['fas', 'xmark']} className='w-5 h-5 flex text-white'/>
        </button>
      </div>
        
      <div className={`pbd bottom-0 inline-block text-left whitespace-normal relative
        max-h-[calc(100dvh-0px)] max-w-(--mwide) ml-(--scrPad) w-[calc(100%-0rem)] margin-bottom-0 rounded-t-xl
        transition-[transform,opacity,translate] ease-out duration-200
        ${mounted ? 'translate-y-0' : 'translate-y-90' }
      `}>
        {/* <div className="phd relative h-14">
            <div className="inr">
                <div className="ptit"></div>
            </div>
        </div> */}
        <div className="pct h-[calc(100dvh-0px)] overflow-y-auto scrollbar-hidden">
          <main className="poptents mb-5">

            <div className="poster-box">
              {datas && datas.images.posters ? 
              <Swiper className="swiper-wrapper swiper slide h-[calc(100dvh-0px)]!
                [&_.swiper-pagination]:w-auto!
                [&_.swiper-pagination]:left-1/2!
                [&_.swiper-pagination]:-translate-x-1/2!
                [&_.swiper-pagination]:bottom-12!
                [&_.swiper-pagination]:bg-[rgba(80,80,80,0.5)]
                [&_.swiper-pagination]:text-sm!
                [&_.swiper-pagination]:px-3!
                [&_.swiper-pagination]:pt-2!
                [&_.swiper-pagination]:pb-2.5!
                [&_.swiper-pagination]:text-white!
                [&_.swiper-pagination]:leading-none!
                [&_.swiper-pagination]:rounded-full!
                [&_.swiper-button-prev]:bottom-3!
                [&_.swiper-button-next]:bottom-3!
                [&_.swiper-button-prev]:top-auto!
                [&_.swiper-button-next]:top-auto!
                [&_.swiper-button-prev]:text-white!
                [&_.swiper-button-next]:text-white!
                [&_.swiper-button-prev]:scale-60!
                [&_.swiper-button-next]:scale-60!
                [&_.swiper-wrapper]:h-[calc(100dvh-0px)]!
                [&_.swiper-slide]:h-[calc(100dvh-0px)]!
                [&_.swiper-slide]:flex!
                [&_.swiper-slide]:items-center!
                [&_.swiper-slide]:justify-center!
                " 
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                // navigation
                loop={loopSet()}
                // lazy={ {enabled: true, loadPrevNext: true, loadPrevNextAmount: 3} } // 지금 loadPrevNext 옵션이 동작 안됨 ㅡㅡ; 
                // effect={"fade"}
                // autoplay={false}
                // autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: true}}
                wrapperTag="ul"
                pagination={{ clickable: true ,type:'fraction'}}
                // scrollbar={{ draggable: true }}
                // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
                autoHeight={true}
                onSwiper={(swiper) => {
                  console.log("initialize swiper", swiper);
                  swiper.slideToLoop(Number(vId) , 0);
                }}
                onSlideChange={() => {/* console.log('slide change') */}} >
                <SwiperSlide tag="li">
                  <div className='box w-full h-full'>
                    <div className="pics block  overflow-hidden rounded-0 relative w-full h-full">
                      <img src={pstImg} className="img relative object-contain w-full h-full z-2" alt={`${title}_Poster[1]`} onError={ui.error.poster} loading="lazy"/>
                      <div className="lazy-preloader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1"><Loading opts={{type:'glx',cls:'full'}} /></div>
                    </div>
                  </div>
                </SwiperSlide>
                {
                  datas.images.posters.map((item: any, idx: number) => {  // .filter( (item, i) => i < 10 )
                    const img = `//image.tmdb.org/t/p/w780${item.file_path}`;
                    return (
                      <SwiperSlide tag="li" key={idx} className="swiper-slide pbox">
                        <div className='box w-full h-full'>
                          <div className="pics block  overflow-hidden rounded-0 relative w-full h-full">
                            <img src={`${img}`} alt={`${title}_Poster[${idx + 2}]`} className='img relative object-contain w-full h-full z-2' onError={ui.error.poster} loading="lazy" />
                            <div className="lazy-preloader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1"><Loading opts={{ type: 'glx', cls: `full` }} /></div>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
              :null}

            </div>
              
          </main>
        </div>
      
      </div>
    </article>
  </>
  )
}
