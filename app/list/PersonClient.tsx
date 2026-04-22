'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useParams, useRouter, useSearchParams } from 'next/navigation'; //,useOutletContext  , useLocation, Outlet,

import ui from '@/app/lib/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PersonCastCrew from './PersonCastCrew';
import PersonPhoto from './PersonPhoto';
import PersonSkeleton from './PersonSkeleton';
import PersonInfoText from './PersonInfoText';
import Loading from '@/app/components/Loading';
import { useSetAtom } from 'jotai';
import { modalTitleAtom } from '@/app/store/modal';

export default function PersonClient({params}: {params: { opts: string, id: string }}) {

  // let params = useParams()
  const router = useRouter();
  const searchParams = useSearchParams();
  const setTitle = useSetAtom(modalTitleAtom);
  const personID = searchParams.get('person') ||  params.id;

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
  const creditsURL2 = `https://api.themoviedb.org/3/person/${personID}/tv_credits?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const creditsURL3 = `https://api.themoviedb.org/3/person/${personID}/combined_credits?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const fetchCredits = () => {
    axios.get( creditsURL3 ).then(response => {
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
    setMounted(true);
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  useEffect(() => {
    if (datas) {
      console.log(datas);
      const newTitle = datas.name;
      setTitle(newTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas]);
  // article 전체 영역 휠 → pct 스크롤로 위임
  // shift+wheel은 출연진/영상 등 가로 스크롤 영역이 처리하도록 통과
  const pctRef = useRef<HTMLDivElement>(null);
  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (e.shiftKey) return;
    const pct = pctRef.current;
    if (!pct) return;
    pct.scrollTop += e.deltaY;
  };
  const shareLink = ()=> {
    const surl = `${process.env.NEXT_PUBLIC_SITE_URL}person/${personID}`;
    navigator.clipboard.writeText(surl);
    // ui.alert(`<b>${parentTit}</b><br> URL 주소를 복사했습니다 <br> <a class="under" href="${surl}" target="_blank">${surl}</a>`)
    const datatitle = datas.title || datas.name;
    if (navigator.share) {
      navigator.share({
        title: datatitle,
        text: datatitle +' 를 공유합니다.',
        url: surl,
      })
      .then(() => {
        console.log('공유 성공');
        
      })
      .catch((error) => {
        // ui.alert('공유 실패:'+ error)
        console.error('공유 실패:', error);
      });
    } else {
      ui.alert(`<b>${datatitle}</b><br> URL 주소를 복사했습니다 <br> <a class="under" href="${surl}" target="_blank">${surl}</a>`)
      console.log('Web Share API를 지원하지 않습니다.');
    }
  }
  
  return (
  <>
      <div className="mb-5">

        {/* Skeleton Area */}
        {/* { !datas && !casts && !photos   &&
          <div className="min-[471px]:hidden"><PersonSkeleton /></div>
        } */}

        { datas && casts && photos &&
        <>
          <div className="profile pb-3 pt-5">
            <div className="pics block w-64 h-64 mx-auto border-18 border-[rgba(0,0,0,0.5)] relative overflow-hidden rounded-full max-h-(--mwide) z-10">
              <img id='profile_img' src={profileImg || `https://image.tmdb.org/t/p/w400${datas.profile_path}`} alt={`${datas.name}`}  onError={(e:any)=>{e.target.src=`${process.env.NEXT_PUBLIC_SITE_URL}img/common/user.png`}}
                className="img block w-full object-cover h-full bg-[#000000] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <div className="desc text-center z-11 relative -mt-12 px-6">
              {datas.name && 
                <p className="tit text-3xl text-white font-extrabold text-shadow-[1px_1px_2px_#000000]">
                  {datas.name}
                  <button type="button" onClick={shareLink} className="bt inline-flex justify-center items-center size-6 -mr-8 ml-2 -mt-2">
                    <FontAwesomeIcon icon={['far', 'copy']} className={`w-5 h-5 text-white align-middle`} /><em className='text-primary sr-only'>공유</em>
                  </button>
                </p>
              }
              {datas.known_for_department && <p className="tio text-xl text-white/80 font-extrabold text-shadow-[1px_1px_2px_#000000] mt-2">{datas.known_for_department}</p>}
              {datas.also_known_as && <p className="tit text-xs mt-2 text-white/80 font-extrabold text-shadow-[1px_1px_2px_#000000] px-20">{datas.also_known_as.filter((item:any,i:number)=> i < 3).join(', ')}</p>}
            </div>
          </div>
          
          <div className="m-info relative py-5 pb-[calc(30px+var(--safe-bottom))]">
            <ul className="lst flex justify-center flex-col gap-1">
              {datas.birthday && 
              <li className="vot text-center text-md text-white/90">
                <FontAwesomeIcon icon={['fas', 'calendar-days']} className='w-4 h-4 text-primary align-middle mr-1 -mt-1'/>
                {datas.birthday}
              </li>
              }
              {datas.place_of_birth && 
              <li className="vot text-center text-md text-white/90">
                <FontAwesomeIcon icon={['fas', 'location-dot']} className='w-4 h-4 text-primary align-middle mr-1 -mt-1'/>
                {datas.place_of_birth}
              </li>
              }
              <li className="vot text-center text-md text-white/90"> 
                <FontAwesomeIcon icon={['fas', 'star']} className='w-4 h-4 text-primary align-middle mr-1 -mt-1'/>
                {datas.popularity}
              </li>
              {datas.homepage && 
              <li className="web text-center text-xs text-white/90 mt-2">
                <FontAwesomeIcon icon={['fas', 'globe']} className='w-3 h-3 text-primary align-middle mr-1 -mt-2'/>
                <a className="lk ellipsis max-w-[calc(100%-6rem)] whitespace-nowrap overflow-hidden text-ellipsis inline-block text-white/90 underline" href={datas.homepage } target="_blank" rel="noopener noreferrer">{datas.homepage}</a>
              </li>
              } 
            </ul>              

            {datas.biography ? <PersonInfoText infoTxt={datas.biography}/> : <></>}
       
            {casts.cast.length ? <PersonCastCrew title="출연작" data={casts.cast} /> : <></>}
            {photos.profiles.length >=2 ? <PersonPhoto title="사진" data={photos.profiles} setProfileImg={handleSetProfileImg} name={datas.name}/> : <></>}
            {casts.crew.length ? <PersonCastCrew title="제작진" data={casts.crew} /> : <></>}

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
          
      </div>
  </>
  )
}
