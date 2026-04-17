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

export default function Person() {

  let params = useParams()
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const opts = params.opts;
  console.log(params);
  // const personID = params.nums;

  // const getMediaType = (pathname:string ) => {
  //   const parts = pathname.split('/');
  //   return parts.find(p => p === 'movie' || p === 'tv') || '';
  // };
  // const mediaType = getMediaType(pathname);
  // opts = opts || mediaType


  const personID = searchParams.get('person')

  const [datas, setDatas] = useState<any>(null);
  const [casts, setCasts] = useState<any>(null);
  const [photos, setPhotos] = useState<any>(null);




  const personURL = `https://api.themoviedb.org/3/person/${personID}?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const fetchPerson = () => {
    axios.get( personURL ).then(response => {
      console.log("인물 정보" , response.data);
      setDatas(response.data);
      
    }).catch( e => { console.log(e); });
  };
  const creditsURL = `https://api.themoviedb.org/3/person/${personID}/movie_credits?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const fetchCredits = () => {
    axios.get( creditsURL ).then(response => {
      console.log("인물 출연작" , response.data);
      setCasts(response.data);
    }).catch( e => { console.log(e); });
  };
  const photoURL = `https://api.themoviedb.org/3/person/${personID}/images?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const fetchPhotos = () => {
    axios.get( photoURL ).then(response => {
      console.log("인물 사진" , response.data);
      setPhotos(response.data);
    }).catch( e => { console.log(e); });
  };


  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    
    fetchPerson();
    fetchCredits();
    fetchPhotos();
    
    ui.lock.using(true); 
    setMounted(true);
    return () => {
      ui.lock.using(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return (
  <>

    <article className={`pop-layer c bottom popup person fixed left-0 top-0 bottom-0 right-0 flex justify-center items-end pr-(--scrPad) open backdrop-blur-xs
      `}>
      {/* <div className="fixed max-w-(--mwide) left-1/2 -translate-x-1/2 top-0 w-full h-full bg-black opacity-50 -z-10 backdrop-blur-sm"></div> */}
      <div className={`pbd bg-[#111111] bottom-0 inline-block text-left whitespace-normal relative
        max-w-(--mwide) ml-(--scrPad) w-[calc(100%-0rem)] min-h-[calc(100dvh-150px)] margin-bottom-0 overflow-hidden rounded-t-xl
        transition-[transform,opacity,translate] ease-out duration-200
        ${mounted ? 'translate-y-0' : 'translate-y-90' }
      `}>
        <div className="phd relative h-14">
            <div className="inr">
                <div className="ptit">{/* datas?.name */}</div>
            </div>
        </div>

        <button type="button" 
          className="btn-pop-close h-10 w-10 text-white inline-flex items-center justify-center text-3xl absolute top-2 right-2 z-50" 
          onClick={ () => { router.back() } } 
          aria-label='닫기'
          >
            <FontAwesomeIcon icon={['fas', 'xmark']} className='w-5 h-5 flex text-white'/>
        </button>
        
        <div className="pct overflow-y-auto max-h-[calc(100dvh-150px)] min-h-[calc(100dvh-150px)] scrollbar-hidden">
          <main className="poptents px-5 py-5 pb-[calc(50px+var(--safe-bottom))]">
          
            { !datas && !casts && !photos &&
              <div className="m-info"><Loading opts={{type:'glx', cls:'full'}}/></div>
            }
            { datas && casts && photos &&
              <div className="m-info">
                
                <div className="info flex justify-between gap-5">
                  <div className="desc w-[calc(55%-16px)]">
                    
                    {datas.title && <p className="tit">{datas.title}</p>}
                    {datas.original_title && <p className="tio">{datas.original_title}</p>}

                    {datas.name && <p className="tit">{datas.name}</p>}
                    {datas.known_for_department && <p className="tio">{datas.known_for_department}</p>}
                    {datas.original_name && <p className="tio">{datas.original_name}</p>}

                    <ul className="lst">
                      {datas.birthday && 
                      <li className="vot"><i className="fa-regular fa-calendar-days"></i>  {datas.birthday}</li>
                      }
                      {datas.place_of_birth && 
                      <li className="vot"><i className="fa-regular fa-location-dot"></i>  {datas.place_of_birth}</li>
                      }
                      <li className="vot"> <i className="fa-regular fa-star"></i> {datas.popularity} / 100 </li>
                      {datas.homepage && 
                      <li className="web">
                        <i className="fa-regular fa-globe"></i> <a  className="lk" href={datas.homepage } target="_blank" rel="noopener noreferrer">{datas.homepage}</a>
                      </li>
                      } 
                    </ul>
                  </div>
                  <div className="thum w-[45%]">
                    <div className="pics block relative pb-[150%] w-full overflow-hidden rounded-sm bg-[#424242]">
                      <img src={`https://image.tmdb.org/t/p/w780${datas.profile_path}`} alt={datas.title}  onError={(e:any)=>{e.target.src=`${process.env.NEXT_PUBLIC_SITE_URL}img/common/user.png`}}
                        className="img block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover max-w-inherit min-w-inherit h-full bg-[#000000]"
                      />
                    </div>
                  </div>
                </div>

                
                {casts.cast.length ? 
                <div className="sect post mt-5">
                  <h4 className="tts text-sm text-white/80">출연작 </h4>
                  <div className="lst flex flex-nowrap overflow-x-auto overflow-y-hidden mt-2 -mx-5 px-4 scrollbar-hidden scroll-smooth">
                    {
                    casts.cast.map((item:any,idx:number) => {
                      return(
                      <div key={idx} className='box shrink-0 min-w-[calc(20%-20px)] w-[calc(20%-20px)] mx-1.25' data-index={idx+1}>
                        <Link href={`/movie/${item.id}`}  className='pic pb-[150%] block relative overflow-hidden rounded-sm bg-[#424242]' >
                          <img 
                            className="img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover max-w-inherit min-w-inherit h-full bg-[#000000]"
                            src={'https://image.tmdb.org/t/p/w185'+item.poster_path} alt={item.title}
                            onError={(e:any)=>{e.target.src=`${process.env.NEXT_PUBLIC_SITE_URL}img/common/non_poster.png`}} 
                            loading="lazy"
                          />
                        </Link> 
                      </div>
                      )
                    })
                    }
                  </div>
                </div>
                : null}

                {casts.crew.length ? 
                <div className="sect post mt-5">
                  <h4 className="tts text-sm text-white/80">제작참여 </h4>
                  <div className="lst flex flex-nowrap overflow-x-auto overflow-y-hidden mt-2 -mx-5 px-4 scrollbar-hidden scroll-smooth">
                    {
                    casts.crew.map((item:any,idx:number) => {
                      return(
                      <div key={idx} className='box shrink-0 min-w-[calc(20%-20px)] w-[calc(20%-20px)] mx-1.25' data-index={idx+1}>
                        <Link href={`/movie/${item.id}`} className='pic pb-[150%] block relative overflow-hidden rounded-sm bg-[#424242]'>
                          <img 
                            className="img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover max-w-inherit min-w-inherit h-full bg-[#000000]"
                            src={'https://image.tmdb.org/t/p/w185'+item.poster_path} alt={item.title}
                            onError={(e:any)=>{e.target.src=`${process.env.NEXT_PUBLIC_SITE_URL}img/common/non_poster.png`}} 
                            loading="lazy"
                          />
                        </Link> 
                      </div>
                      )
                    })
                    }
                  </div>
                </div>
                : null}
              
                
              {photos.profiles.length ? 
                <div className="sect post mt-5">
                  <h4 className="tts text-sm text-white/80">사진 </h4>
                  <div className="lst flex flex-nowrap overflow-x-auto overflow-y-hidden mt-2 -mx-5 px-4 scrollbar-hidden scroll-smooth">
                    {
                    photos.profiles.map((item:any,idx:number) => {
                      return(
                      <div key={idx} className='box shrink-0 min-w-[calc(20%-20px)] w-[calc(20%-20px)] mx-1.25' data-index={idx+1}>
                        <div /* to={`/list/${opts}/0/${item.id}`} */  className='pic pb-[150%] block relative overflow-hidden rounded-sm bg-[#424242]'>
                          <img 
                            className="img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover max-w-inherit min-w-inherit h-full bg-[#000000]"
                            src={'https://image.tmdb.org/t/p/w185'+item.file_path} alt={item.title}
                            onError={(e:any)=>{e.target.src=`${process.env.NEXT_PUBLIC_SITE_URL}img/common/non_poster.png`}} 
                            loading="lazy" 
                          />
                        </div> 
                      </div>
                      )
                    })
                    }
                  </div>
                </div>
                : null}
              </div> 
              
            } 
              
          </main>
        </div>
      
      </div>
    </article>
  </>
  )
}
