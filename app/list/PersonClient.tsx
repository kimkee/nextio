'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {useParams, useRouter, useSearchParams } from 'next/navigation'; //,useOutletContext  , useLocation, Outlet,
import Link from 'next/link';

import ui from '@/app/lib/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PersonCastCrew from './PersonCastCrew';
import PersonPhoto from './PersonPhoto';
import PersonSkeleton from './PersonSkeleton';
import PersonInfoText from './PersonInfoText';
import Loading from '@/app/components/Loading';
import Img from '@/app/components/Img';
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
      !searchParams.get('person') && setTitle(newTitle); //person을 키로 가져올때는 타이틀에 사용하지 않음. 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas]);

  const shareLink = ()=> {
    const surl = `${process.env.NEXT_PUBLIC_SITE_URL}/person/${personID}`;
    navigator.clipboard.writeText(surl);
    // ui.alert(`<b>${parentTit}</b><br> URL 주소를 복사했습니다 <br> <a class="under" href="${surl}" target="_blank">${surl}</a>`)
    const datatitle = datas.title || datas.name;
    if (navigator.share) {
      navigator.share({
        title: datatitle,
        text: '공유합니다.',
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
      ui.alert(`<strong>${datatitle}</strong><br> URL 주소를 복사했습니다 <br> <a class="under" href="${surl}" target="_blank">${surl}</a>`)
      console.log('Web Share API를 지원하지 않습니다.');
    }
  }
  const isInfo = () => {
    return datas && datas.birthday || datas.place_of_birth || datas.deathday || datas.homepage || datas.biography; 
  };
  return (
  <>
      <div className="mb-5">
        <div className="bg-rainbow absolute w-[calc(100%-2.5rem)] h-100 blur-2xl opacity-10"></div>
        {/* Skeleton Area */}
        {/* { !datas && !casts && !photos   &&
          <div className="min-[471px]:hidden"><PersonSkeleton /></div>
        } */}

        { datas && casts && photos &&
        <>
          <div className="profile pb-3 pt-5">
            <div className="pics block w-65 h-65 mx-auto relative rounded-full max-h-(--mwide) z-10">
              <div className="w-full h-full bg-rainbow p-3 absolute rounded-full opacity-50 backdrop-blur-xs blur-xl "></div>
              <Link href={`/person/${personID}`} className="w-[calc(100%-2rem)] h-[calc(100%-2rem)] absolute left-4 top-4 rounded-full border-12 border-[rgba(0,0,0,0.3)] overflow-hidden z-10">
                <span className='block w-full h-full bg-black'>
                  <Img
                    src={profileImg || `https://image.tmdb.org/t/p/w400${datas.profile_path}`}
                    alt={`${datas.name}`}
                    className="img block w-full h-full object-cover"
                    classNameErr='opacity-100 bg-black'
                    srcerr='/img/common/user.png'
                    width={260}
                    height={260}
                  />
                </span>
              </Link>
            </div>
            <div className="desc text-center z-11 relative -mt-12 px-6">
              {datas.name && <p className="tit text-3xl text-white text-shadow-[1px_1px_2px_#000000]"> {datas.name} </p> }
              {datas.known_for_department && <p className="tio text-xl text-white/80 text-shadow-[1px_1px_2px_#000000] mt-2">{datas.known_for_department}</p>}
              {datas.also_known_as && <p className="tit text-xs mt-2 text-white/80 text-shadow-[1px_1px_2px_#000000] px-20">{datas.also_known_as.filter((item:any,i:number)=> i < 3).join(', ')}</p>}
            </div>
          </div>
          
          <div className="m-info relative py-5 pb-[calc(30px+var(--safe-bottom))]">
            <button type="button" onClick={shareLink} className={`bt inline-flex justify-center items-center size-6 absolute right-4 text-white/60 z-10 ${isInfo() ? 'top-10' : 'top-0 right-0!'}`}>
              <FontAwesomeIcon icon={['far', 'share-from-square']} className={`w-5 h-5 align-middle`} /><em className='text-primary sr-only'>공유</em>
            </button>
            {isInfo() ?
            <div className="relative rounded-md bg-white/2 border border-white/10 px-5 py-5 pr-9 shadow-[0_0_1rem_rgba(128,128,128,0.1)]">
              <ul className="lst  flex flex-wrap gap-x-9 gap-y-2">
                {datas.birthday ?
                <li className="vot text-md text-white/80 relative pl-6">
                  <FontAwesomeIcon icon={['fas', 'calendar-days']} className='w-4 h-4 text-primary align-middle mr-1 absolute left-0 top-1'/>
                  {datas.birthday}
                </li>
                : <></>}
                {datas.popularity ?
                <li className="vot text-md text-white/80 relative pl-6">
                  <FontAwesomeIcon icon={['fas', 'star']} className='w-4 h-4 text-primary align-middle mr-1 absolute left-0 top-1'/>
                  {datas.popularity} 
                </li>
                : <></>}
                {datas.place_of_birth ?
                <li className="vot text-md text-white/80 relative pl-6">
                  <FontAwesomeIcon icon={['fas', 'location-dot']} className='w-4 h-4 text-primary align-middle mr-1 absolute left-0 top-1'/>
                  {datas.place_of_birth}
                </li>
                : <></>}
                {datas.homepage ?
                <li className="web text-md text-white/80 w-[calc(100%)] relative pl-6">
                  <FontAwesomeIcon icon={['fas', 'globe']} className='w-4 h-4 text-primary align-middle mr-1 absolute left-0 top-1'/>
                  <a className="lk text-sm align-middle break-all block text-white/80 hover:text-primary underline" href={datas.homepage} target="_blank" rel="noopener noreferrer">{datas.homepage}</a>
                </li>
                : <></>}
              </ul>
              {datas.biography ? <PersonInfoText infoTxt={datas.biography}/> : <></>}
            </div>              
            : <></>
            }
       
            {casts.cast.length ? <PersonCastCrew title="출연" data={casts.cast} /> : <></>}
            {photos.profiles.length >=2 ? <PersonPhoto title="사진" data={photos.profiles} setProfileImg={handleSetProfileImg} name={datas.name}/> : <></>}
            {casts.crew.length ? <PersonCastCrew title="참여" data={casts.crew} /> : <></>}
            
          </div>
        </>
        } 
          
      </div>
  </>
  )
}
