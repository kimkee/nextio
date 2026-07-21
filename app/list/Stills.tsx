'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter, useSearchParams, usePathname } from 'next/navigation'; //,useOutletContext  , useLocation, Outlet,




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

export default function Stills() {

  let params = useParams()
  const router = useRouter();
  const searchParams = useSearchParams();
  const [globalLang] = useAtom(globalLangAtom);

  const postID = params.id;
  const vId = searchParams.get('idx')
  const opts = searchParams.get('stills')
  const loopSet = () => dataStills?.length > 1 ? true : false;
  const [mounted, setMounted] = useState<boolean>(false);

  const [dataStills, setDataStills] = useState<any>();
  const fetchStills = () => {
    axios.request({
      method: 'GET',
      url: opts === 'movie' ? `https://api.themoviedb.org/3/movie/${postID}/images` : `https://api.themoviedb.org/3/tv/${postID}/season/1/episode/1/images`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
      }
    }).then((res) => {
      setDataStills(res.data.stills || res.data.backdrops);
    });
  }

  useEffect(() => {
    fetchStills();
    ui.lock.using(true);
    setMounted(true);
    return () => {
      ui.lock.using(false);
    };
  }, []);

  return (

    <article className={`pop-layer c popup person fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center pr-(--scrPad) open backdrop-blur-md `}>
      <div className={`pbd w-[calc(100%-0rem)] max-w-180 h-full bg-transparent align-middle relative
          transition-[transform,opacity,translate] ease-out duration-200
          ${mounted ? 'translate-y-0' : 'translate-y-90'}
        `}>
        <div className="pct relative w-full h-full">
          <button type="button" aria-label='닫기' onClick={() => { router.back() }}
            className="btn-pop-close h-10 w-10 text-white inline-flex items-center justify-center text-3xl z-20 absolute right-2 top-2 rounded-full"
          >
            <FontAwesomeIcon icon={['fas', 'xmark']} className='w-5 h-5 flex text-white' />
          </button>
          <main className="poptents h-full">

            <div className="poster-box h-full">
              {dataStills ?
                <>
                  <Swiper className="swiper relative h-dvh!"
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                    spaceBetween={20}
                    slidesPerView={1}
                    // navigation
                    // loop={loopSet()}
                    loop={loopSet()}
                    observeParents={true}
                    observeSlideChildren={true}
                    observer={true}
                    // lazy={ {enabled: true, loadPrevNext: true, loadPrevNextAmount: 3} } // 지금 loadPrevNext 옵션이 동작 안됨 ㅡㅡ; 
                    // effect={"fade"}
                    // autoplay={false}
                    // autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: true}}
                    wrapperTag="ul"
                    pagination={{ clickable: true, type: 'fraction', el: ".navigation .custom-pagination", }}
                    // scrollbar={{ draggable: true }}
                    // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
                    onSwiper={(swiper) => {
                      console.log("initialize swiper", swiper);
                      swiper.slideTo(Number(vId), 0);
                    }}
                    onSlideChange={() => {/* console.log('slide change') */ }} >

                    {
                      dataStills?.filter((item: any, i: number) => i < 30).map((item: any, idx: number) => {  // .filter( (item, i) => i < 10 )
                        const img = `//image.tmdb.org/t/p/w780${item.file_path}`;
                        return (
                          <SwiperSlide tag="li" key={idx} className="swiper-slide h-full flex items-center justify-center pbox">
                            <div className='box w-full h-full'>
                              <div className="pics block overflow-hidden rounded-0 relative w-full h-full">
                                <img src={`${img}`} alt={`Image_${postID}_${idx + 1}`} className='img relative object-contain w-full h-full z-2' onError={ui.error.stills} loading="lazy" />
                                <div className="lazy-preloader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1"><Loading opts={{ type: 'glx', cls: `full` }} /></div>
                              </div>
                            </div>
                          </SwiperSlide>
                        )
                      })
                    }
                  </Swiper>
                  <div className="navigation absolute bottom-9 left-0 right-0 w-full z-10">
                    <div className="custom-pagination absolute left-1/2! bottom-0! -translate-x-1/2 w-auto! bg-[rgba(80,80,80,0.5)] px-3 text-sm pt-2 pb-2.5 text-white! leading-none rounded-full"></div>
                  </div>
                </>
                : null}

            </div>

          </main>
        </div>

      </div>
    </article>

  )
}
