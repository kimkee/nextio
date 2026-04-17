'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useRouter, useSearchParams, usePathname} from 'next/navigation'; //,useOutletContext  , useLocation, Outlet,
import ui from '@/app/lib/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DetailVideo from './DetailVideo';


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

export default function Videos() {

  const router = useRouter();
  const params = useParams()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const postID = params.id;
  const vId = searchParams.get('idx')
  const opts = searchParams.get('video')

  // const getMediaType = (pathname:string ) => {
  //   const parts = pathname.split('/');
  //   return parts.find(p => p === 'movie' || p === 'tv') || '';
  // };
  // const mediaType = getMediaType(pathname);
  // opts = opts || mediaType


  const [movs, setMovs] = useState({results:[]});
  const loopSet = ()=> movs.results.length > 1 ? true : false;
  const movURL = `https://api.themoviedb.org/3/${opts}/${postID}/videos?language=ko&region=kr&language=ko&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const fetchMov = () => {
    axios.get( movURL ).then(response => {
      console.log("영상" , response.data);
      setMovs( response.data);
    }).catch( e => { console.log(e); });
  };

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    
    fetchMov();
    
    ui.lock.using(true); 
    setMounted(true);
    return () => {
      ui.lock.using(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return (
  <>
  {postID}
  {vId}
  {opts}
    <article className="pop-layer b popup videos fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center pr-(--scrPad) backdrop-blur-sm open">
      <div className={`pbd w-[calc(100%-2rem)] max-w-180 bg-transparent align-middle relative
          transition-[transform,opacity,translate] ease-out duration-200
          ${mounted ? 'translate-y-0' : 'translate-y-90' }
        `}>
        <button onClick={() => { router.back(); }} aria-label='닫기' className='btn-pop-close h-10 w-10 text-white inline-flex items-center justify-center text-3xl absolute left-1/2 -translate-x-1/2 z-50 -bottom-12 bg-[rgba(80,80,80,0.5)] rounded-full'>
          <FontAwesomeIcon icon={['fas', 'xmark']} className='w-5 h-5 flex text-white'/>
        </button>
        <div className="phd" >
          <div className="inr h-14">
              <div className="ptit"></div>
          </div>
        </div>
        <div className="pct bg-black/10 backdrop-blur-sm">
          <main className="poptents">
            <div className="videos-box">
              <div className="absolute left-0 -top-16 z-50 w-100 hidden">
                <p>{`opts ` + opts}</p>
                <p>{`id ` + postID}</p>
                <p>{`movURL ` + movURL}</p>
              </div>

              {movs && movs.results.length ? 
              <Swiper className=" swiper-wrapper swiper slide relative
                [&_.swiper-pagination]:w-auto!
                [&_.swiper-pagination]:left-1/2!
                [&_.swiper-pagination]:-translate-x-1/2!
                [&_.swiper-pagination]:bottom-5!
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
              " 
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              loop={loopSet()}
              
              // lazy={ {enabled: true, loadPrevNext: true, loadPrevNextAmount: 3} as any} // 지금 loadPrevNext 옵션이 동작 안됨 ㅡㅡ; 
              observeParents = {true}
              observeSlideChildren = {true}
              observer = {true}
              // effect={"fade"}
              // autoplay={false}
              // autoplay={{ delay: 3000 ,waitForTransition:false, pauseOnMouseEnter: true ,disableOnInteraction: true}}
              wrapperTag="ul"
              pagination={{ clickable: true ,type:'fraction'}}
              // scrollbar={{ draggable: true }}
              // initialSlide={ Math.floor( Math.random() *10  ) } // 0 ~ 9
              // autoHeight={true}
              onSwiper={(swiper) => {
                console.log("initialize swiper", swiper);
                swiper.slideTo(Number(vId) , 0);
              }}
              onSlideChange={() => {/* console.log('slide change') */}} >
                {
                movs.results.filter( (item:any, i:number) => i < 100 ).reverse().map( (data:any, idx:number) => {  // .filter( (item, i) => i < 10 )
                  return (
                    <SwiperSlide tag="li" key={idx} className={`swiper-slide pbox ${loopSet() ? 'pb-16' : ''}`}>
                      <div className={`box `}>
                          <div className="pics block pb-[calc(900/1600*100%)] overflow-hidden rounded-0 bg-black relative w-full">
                            <span className={`ui-load-glx full z-10! ${loopSet() ? '-mt-16' : ''}`}> <span className="gbx"> <em className="bx"> <i></i> <i></i> <i></i> <i></i> </em> </span> </span>
                            <iframe className='iframe absolute z-20 left-0 top-0 w-full h-full' title={data.name} src={"//www.youtube.com/embed/"+data.key}  allow="autoplay; encrypted-media" allowFullScreen loading='lazy'></iframe>
                          </div>
                      </div>
                    </SwiperSlide>
                  )
                })
                }
              </Swiper>
              :<><div className='bg-black pb-[calc(900/1600*100%)] mb-16'></div></>}

            </div>
          </main>
        </div>
      </div>
    </article>
  </>
  )
}
