'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useParams, useRouter, useSearchParams } from 'next/navigation'; //,useOutletContext  , useLocation, Outlet,

import ui from '@/app/lib/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PersonCastCrew from './PersonCastCrew';
import PersonPhoto from './PersonPhoto';

export default function Person() {

  let params = useParams()
  const router = useRouter();
  const searchParams = useSearchParams();

  const personID = searchParams.get('person');

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


  const [profileImg, setProfileImg] = useState<string>('');
  const handleSetProfileImg = (imgUrl: string) => {
    setProfileImg(imgUrl);
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
  // article 전체 영역 휠 → pct 스크롤로 위임
  // shift+wheel은 출연진/영상 등 가로 스크롤 영역이 처리하도록 통과
  const pctRef = useRef<HTMLDivElement>(null);
  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (e.shiftKey) return;
    const pct = pctRef.current;
    if (!pct) return;
    pct.scrollTop += e.deltaY;
  };
  return (
  <>

    <article onWheel={handleWheel} className={`pop-layer c popup person fixed left-0 top-0 bottom-0 right-0 flex justify-center items-end pr-(--scrPad) open backdrop-blur-md `}>
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
        <div ref={pctRef} className="pct max-h-[calc(100dvh-0px)] overflow-y-auto scrollbar-hidden bg-linear-to-b from-transparent via-[#111111] to-[#111111]">
          <main className="poptents mb-5">
            
            { datas && casts && photos &&
            <>
              <div className="profile pb-3 pt-5">
                <div className="pics block w-64 h-64 left-1/2 -translate-x-1/2 border-18 border-[rgba(0,0,0,0.5)] relative overflow-hidden rounded-full max-h-(--mwide) z-10">
                  <img id='profile_img' src={profileImg || `https://image.tmdb.org/t/p/w400${datas.profile_path}`} alt={`${datas.name}`}  onError={(e:any)=>{e.target.src=`${process.env.NEXT_PUBLIC_SITE_URL}img/common/user.png`}}
                    className="img block w-full object-cover h-full bg-[#000000] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <div className="desc text-center z-11 relative -mt-12 px-6">
                  {datas.name && <p className="tit text-3xl text-white font-extrabold text-shadow-[1px_1px_2px_#000000]">{datas.name}</p>}
                  {datas.known_for_department && <p className="tio text-xl text-white/80 font-extrabold text-shadow-[1px_1px_2px_#000000] mt-2">{datas.known_for_department}</p>}
                  {datas.also_known_as && <p className="tit text-xs mt-2 text-white/80 font-extrabold text-shadow-[1px_1px_2px_#000000] px-20">{datas.also_known_as.filter((item:any,i:number)=> i < 3).join(', ')}</p>}
                </div>
              </div>

              <div className="m-info relative px-5 py-5 pb-[calc(30px+var(--safe-bottom))]">
                <ul className="lst flex justify-center flex-col gap-1">
                  {datas.birthday && 
                  <li className="vot flex justify-center gap-2 text-center text-md text-white/90"><FontAwesomeIcon icon={['fas', 'calendar-days']} className='w-4 h-4 text-primary align-middle mt-1'/>  {datas.birthday}</li>
                  }
                  {datas.place_of_birth && 
                  <li className="vot flex justify-center gap-2 text-center text-md text-white/90"><FontAwesomeIcon icon={['fas', 'location-dot']} className='w-4 h-4 text-primary align-middle mt-1'/>  {datas.place_of_birth}</li>
                  }
                  <li className="vot flex justify-center gap-2 text-center text-md text-white/90"> <FontAwesomeIcon icon={['fas', 'star']} className='w-4 h-4 text-primary align-middle mt-1'/> {datas.popularity} / 100 </li>
                  {datas.homepage && 
                  <li className="web flex justify-center gap-2 text-center text-xs text-white/90 mt-2">
                    <FontAwesomeIcon icon={['fas', 'globe']} className='w-3 h-3 text-primary align-middle mt-0.5'/> <a  className="lk ellipsis max-w-[calc(100%-6rem)] whitespace-nowrap overflow-hidden text-ellipsis inline-block text-white/90 underline" href={datas.homepage } target="_blank" rel="noopener noreferrer">{datas.homepage}</a>
                  </li>
                  } 
                </ul>              
                
                {casts.cast.length ? <PersonCastCrew title="출연작" data={casts.cast} /> : <></>}
                {casts.crew.length ? <PersonCastCrew title="제작진" data={casts.crew} /> : <></>}
                {photos.profiles.length ? <PersonPhoto title="사진" data={photos.profiles} setProfileImg={handleSetProfileImg} name={datas.name}/> : <></>}

                {/* {casts.cast.length ? 
                <div className="sect list mt-5">
                  <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
                    <h4 className="tts text-base text-white/90">출연작 </h4>
                    <div className="bt-nav">
                      <button type="button" onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
                      <button type="button" onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
                    </div>
                  </div>
                  <div className="lst flex flex-nowrap overflow-x-auto overflow-y-hidden mt-2 -mx-5 px-4 scrollbar-hidden scroll-smooth">
                    {
                    casts.cast.map((item:any,idx:number) => {
                      return(
                      <div key={idx} className='box shrink-0 w-[calc(19%-20px)] mx-1.25' data-index={idx+1}>
                        <Link href={`/movie/${item.id}`}  className='pic pb-[150%] block relative overflow-hidden rounded-sm bg-black active:scale-95 transition-all duration-200' >
                          <img 
                            className="img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover max-w-inherit min-w-inherit h-full bg-[#000000]"
                            src={'https://image.tmdb.org/t/p/w185'+item.poster_path} 
                            alt={item.title}
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
                <div className="sect list mt-5">
                  <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
                    <h4 className="tts text-base text-white/90">제작참여 </h4>
                    <div className="bt-nav">
                      <button type="button" onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
                      <button type="button" onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
                    </div>
                  </div>
                  <div className="lst flex flex-nowrap overflow-x-auto overflow-y-hidden mt-2 -mx-5 px-4 scrollbar-hidden scroll-smooth">
                    {
                    casts.crew.map((item:any,idx:number) => {
                      return(
                      <div key={idx} className='box shrink-0 w-[calc(19%-20px)] mx-1.25' data-index={idx+1}>
                        <Link href={`/movie/${item.id}`} className='pic pb-[150%] block relative overflow-hidden rounded-sm bg-black active:scale-95 transition-all duration-200'>
                          <img 
                            className="img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover max-w-inherit min-w-inherit h-full bg-[#000000]"
                            src={'https://image.tmdb.org/t/p/w185'+item.poster_path}
                            alt={item.title}
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
                <div className="sect list mt-5">
                  <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none">
                    <h4 className="tts text-base text-white/90">사진 </h4>
                    <div className={`bt-nav`}>
                      <button type="button" onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
                      <button type="button" onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
                    </div>
                  </div>
                  <div className="lst flex flex-nowrap overflow-x-auto overflow-y-hidden mt-2 -mx-5 px-4 scrollbar-hidden scroll-smooth">
                    {
                    photos.profiles.map((item:any,idx:number) => {
                      return(
                      <div key={idx} className='box shrink-0 w-[calc(19%-20px)] mx-1.25' data-index={idx+1}>
                        <button type='button' onClick={()=>{
                          // 클릭하면. 여기 이미지 url을  id='profile_img'  에 교체하기
                          setProfileImg('https://image.tmdb.org/t/p/w400'+item.file_path);
                        }} className='pic pb-[150%] block w-full relative overflow-hidden rounded-sm bg-black active:scale-95 transition-all duration-200'>
                          <img 
                            className="img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-cover max-w-inherit min-w-inherit h-full bg-[#000000]"
                            src={'https://image.tmdb.org/t/p/w400'+item.file_path} alt={item.title}
                            onError={(e:any)=>{e.target.src=`${process.env.NEXT_PUBLIC_SITE_URL}img/common/non_poster.png`}} 
                            loading="lazy" 
                          />
                        </button> 
                      </div>
                      )
                    })
                    }
                  </div>
                </div>
                : null} */}
                
              </div>
            </>
            } 
              
          </main>
        </div>
      
      </div>
    </article>
  </>
  )
}
