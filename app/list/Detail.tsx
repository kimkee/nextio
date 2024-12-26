'use client';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import Img from '@/app/components/Img';
import ui from '@/app/lib/ui';
import Loading from '../components/Loading';
import DetailElips from './DetailElips';
import DetailCtls from './DetailCtls';
import DetailCast from './DetailCast';
import DetailVideo from './DetailVideo';
import DetailPoster from './DetailPoster';
import DetailRev from './DetailRev';
import StarPoint from '@/app/components/StarPoint';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Detail({
  params,
}: {
  params: { opts: string; id: string };
}) {
  const postID = params.id;
  const opts = params.opts;

  const [datas, setDatas] = useState<any>(null);
  const [casts, setCasts] = useState<any>(null);
  const [moves, setMovs] = useState<any>(null);
  const [bgImg, setBgImg] = useState('');
  const fetchURL = `https://api.themoviedb.org/3/${opts}/${postID}?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos,images&include_image_language=en,null`;
  const fetchDatas = () => {
    axios
      .get(fetchURL)
      .then((response) => {
        console.log('영화정보', response.data);
        setDatas(response.data);
        const bgDm = response.data.backdrop_path
          ? response.data.backdrop_path
          : response.data.poster_path;
        setBgImg('https://image.tmdb.org/t/p/w780' + bgDm);

        // 팝업 헤더에 제목
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const castURL = `https://api.themoviedb.org/3/${opts}/${postID}/credits?&region=kr&language=ko&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const fetchCast = () => {
    axios
      .get(castURL)
      .then((response) => {
        console.log('출연,제작', response.data);
        setCasts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const movURL = `https://api.themoviedb.org/3/${opts}/${postID}/videos?language=ko&region=kr&language=ko&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const fetchMov = () => {
    axios
      .get(movURL)
      .then((response) => {
        console.log('영상', response.data);
        setMovs(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    // goTop();
    fetchDatas();
    fetchCast();
    fetchMov();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const refrashDatas = () => {
    setDatas(null);
    setCasts(null);
    setMovs(null);
    window.setTimeout(() => {
      fetchDatas();
      fetchCast();
      fetchMov();
    }, 500);
  };

 return (
    <>

      <div className='bgs fixed  w-full h-full bg-center bg-cover bg-no-repeat z-2 max-w-[480px] max-h-[470px] right-0 left-[50%] top-0 transform -translate-x-1/2 opacity-30 blur-[2px]
          after:absolute after:bottom-0 after:left-0 after:right-0 after:z-2 after:h-[18rem] after:bg-gradient-to-b from-transparent to-[#111111]'
        style={{ backgroundImage: `url(${bgImg})`, marginLeft: 'calc(0px - var(--scrPad) / 2)' }}
      ></div>
      <div className='movie-detail relative text-white'>
        {!datas || !casts || !moves ? (        
          // <Skeleton opts={ {type: 'movie-detail'} } />
          <><Loading opts={{ type: 'glx', cls: 'full' }} /></>
        ) : (
          <div className='m-info relative z-1'>
            <title>{`${datas.title || datas.name} `}</title>
            <meta name='description' content={datas.overview} />
            <meta property='og:url' content={window.location.href} />
            <meta property='og:image' content={'//image.tmdb.org/t/p/w300' + datas.poster_path} />
            <meta property='og:image:width' content='300' />
            <meta property='og:image:height' content='400' />
            <div className='info flex flex-wrap justify-between flex-row'>
              <div className='desc flex-1 pr-3'>
                <h1 className='tit text-xx '>
                  {datas.title || datas.name}
                  <button className='refresh ml-1 w-5 h-5 leading-none p-0' onClick={refrashDatas}>
                    <FontAwesomeIcon icon={['fas', 'rotate']} className='text-white/80 w-4 h-4 -mt-2 align-middle' />
                  </button>
                </h1>
                {datas.tagline && <p className='sit text-14 text-[#cccccc] mt-2'>{datas.tagline}</p>}
                <p className='tio text-xt text-[#cccccc] mt-1'>
                  {datas.original_title || datas.original_name}
                </p>

                <div className='star !text-xl mt-3'>
                  <StarPoint point={datas.vote_average} opts={{ cls: 'lg' }}/>
                </div>
                <div className='cate mt-4'>
                  {datas.genres.map((item: any) => (
                    <em className='ico inline-flex justify-center rounded-3xl px-2 py-0.5 bg-[#1f6476] mr-1 mt-0.5 text-xt' key={item.id}>
                      {item.name}
                    </em>
                  ))}
                </div>
                <ul className='lst mt-4 grid gap-1'>
                  <li className='vot text-12 text-[#53a4bb]  relative pl-4'>
                    <FontAwesomeIcon icon={['far', 'thumbs-up']} className='absolute left-0 top-0.5' />
                    <b>평점</b> : {datas.vote_average} / 10
                  </li>
                  {datas.release_date ? (
                    <li className='opn text-12 text-[#53a4bb]  relative pl-4'>
                      <FontAwesomeIcon icon={['far', 'calendar-days']} className='absolute left-0 top-0.5' />
                      <b>개봉</b> : {datas.release_date}
                    </li>
                  ):null}
                  {datas.first_air_date ? (
                    <li className='opn text-12 text-[#53a4bb]  relative pl-4'>
                      <FontAwesomeIcon icon={['far', 'calendar-days']} className='absolute left-0 top-0.5' />
                      <b>{datas.first_air_date} ~ {datas.last_air_date}</b>
                    </li>
                  ):null}

                  {datas.runtime ? (
                    <li className='tim text-12 text-[#53a4bb]  relative pl-4'>
                      <FontAwesomeIcon icon={['far', 'clock']} className='absolute left-0 top-0.5' />
                      <b>시간</b> : {datas.runtime} 분
                    </li>
                  ):null}
                  {datas.number_of_seasons ? (
                    <li className='tim text-12 text-[#53a4bb]  relative pl-4'>
                      <FontAwesomeIcon icon={['far', 'clock']} className='absolute left-0 top-0.5' />
                      <b>시즌</b> : {datas.number_of_seasons}개 - <b>에피소드</b> : {datas.number_of_episodes}개
                    </li>
                  ):null}
                  {datas.homepage ? (
                    <li className='web text-12 text-[#53a4bb]  relative pl-4 break-all'>
                      <FontAwesomeIcon icon={['fas', 'globe']} className='absolute left-0 top-0.5' />
                      <a
                        className='lk text-[#53a4bb]'
                        href={datas.homepage}
                        target='_blank'
                        rel='noopener noreferrer'>
                        {datas.homepage}
                      </a>
                    </li>
                  ):null}
                </ul>
              </div>
              <div className='thum max-w-[45%] flex-1'>
                <div
                  /* href={`/list/${opts}/${cate}/${id}/poster/0`} */
                  className='pics block relative overflow-hidden rounded-sm pb-[calc(450%/300*100)] bg-black'>
                  <Img
                    width={400}
                    height={570}
                    className='img absolute object-cover w-full h-full !opacity-100'
                    src={'https://image.tmdb.org/t/p/w400' + datas.poster_path}
                    alt={datas.title || datas.name}
                    srcerr='/img/common/non_poster.png'
                    unoptimized={true}
                  />
                </div>
              </div>
            </div>
            
            <DetailCtls   datas={datas} postID={postID} opts={opts} />

            {datas.overview && <DetailElips  overview={datas.overview} />}

            {casts.cast.length ? <DetailCast props={{ title: "출연진", css: "cast", data: casts.cast }} /> : ''}

            {moves.results.length ? <DetailVideo props={{ title: "영상", css: "movs", data: moves.results }} /> : ''}

            {casts.crew.length ? <DetailCast props={{ title: "제작진", css: "crew", data: casts.crew }} /> : ''}

            {datas.images.posters.length ? <DetailPoster props={{ title: "포스터", css: "movie", poster: datas.poster_path, data: datas.images.posters }} /> : ''}

            <DetailRev datas={datas} postID={postID} opts={opts} /* user={user} myinfo={myinfo} */ />

            {datas.production_companies.length ? 
            <>
            <div className="sect comp flex flex-wrap mt-8 gap-1">
              {
                datas.production_companies.map((comp: any) => {
                  return comp.logo_path 
                  ? 
                  <span key={comp.id} className='logo bg-white/50 px-2 py-0.5 rounded-full inline-flex  items-center h-7 max-w-full text-10 text-black'>
                    <Img 
                      width={100} height={100} src={`https://image.tmdb.org/t/p/w92${comp.logo_path}`}
                      className='img max-h-3 align-middle max-w-full w-auto h-auto'
                      alt={comp.name} srcerr='/img/common/non_poster.png' unoptimized={true}
                    />
                  </span> 
                  : 
                  <span key={comp.id} className='logo bg-white/70 px-2 py-0.5 rounded-full inline-flex  items-center h-7 max-w-full text-10 text-black'>
                    {comp.name}
                  </span> 
                })
              }
            </div>
            </>
            : null}
          </div>
        )}
      </div>


    </>
  );
}
