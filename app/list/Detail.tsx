'use client';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import Img from '@/app/components/Img';
import ui from '@/app/lib/ui';
import Loading from '../components/Loading';
import DetailElips from './DetailElips';
import StarPoint from '../components/StarPoint';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Detail({
  params,
}: {
  params: { opts: string; cate: string; id: string };
}) {
  const postID = params.id;
  const opts = params.opts;
  const cate = params.cate;
  const id = params.id;

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
      {/* <p>Detail - {params.opts}</p>
      <p>{JSON.stringify(params)}</p> */}

      <div className='
          bgs fixed  w-full h-full bg-center bg-cover bg-no-repeat z-2 max-w-[480px] max-h-[470px] right-0 left-[50%] top-0 transform -translate-x-1/2 opacity-30 blur-[2px]
          after:absolute after:bottom-0 after:left-0 after:right-0 after:z-2 after:h-[18rem] after:bg-gradient-to-b from-transparent to-[#111111]'
        style={{ backgroundImage: `url(${bgImg})`, marginLeft: 'calc(0px - var(--scrPad)' }}
      ></div>
      <div className='movie-detail relative text-white'>
        {!datas || !casts || !moves ? (
          // <Skeleton opts={ {type: 'movie-detail'} } />
          <Loading opts={{ type: 'glx' }} />
        ) : (
          <div className='m-info relative z-1'>
            <title>{`${datas.title || datas.name} `}</title>
            <meta name='description' content={datas.overview} />
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
                  {datas.release_date && (
                    <li className='opn text-12 text-[#53a4bb]  relative pl-4'>
                      <FontAwesomeIcon icon={['far', 'calendar-days']} className='absolute left-0 top-0.5' />
                      <b>개봉</b> : {datas.release_date}
                    </li>
                  )}
                  {datas.first_air_date && (
                    <li className='opn text-12 text-[#53a4bb]  relative pl-4'>
                      <FontAwesomeIcon icon={['far', 'calendar-days']} className='absolute left-0 top-0.5' />
                      <b>{datas.first_air_date} ~ {datas.last_air_date}</b>
                    </li>
                  )}

                  {datas.runtime && (
                    <li className='tim text-12 text-[#53a4bb]  relative pl-4'>
                      <FontAwesomeIcon icon={['far', 'clock']} className='absolute left-0 top-0.5' />
                      <b>시간</b> : {datas.runtime} 분
                    </li>
                  )}
                  {datas.number_of_seasons && (
                    <li className='tim text-12 text-[#53a4bb]  relative pl-4'>
                      <FontAwesomeIcon icon={['far', 'clock']} className='absolute left-0 top-0.5' />
                      <b>시즌</b> : {datas.number_of_seasons}개 - <b>에피소드</b> : {datas.number_of_episodes}개
                    </li>
                  )}
                  {datas.homepage && (
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
                  )}
                </ul>
              </div>
              <div className='thum max-w-[45%] flex-1'>
                <Link
                  href={`/list/${opts}/${cate}/${id}/poster/0`}
                  className='pics block relative overflow-hidden rounded-md pb-[calc(1200%/780*93)] bg-black'>
                  <Img
                    width={400}
                    height={570}
                    className='img absolute object-cover w-full h-full'
                    src={'https://image.tmdb.org/t/p/w400' + datas.poster_path}
                    alt={datas.title || datas.name}
                    srcerr='/img/common/non_poster.png'
                    unoptimized={true}
                  />
                </Link>
              </div>
            </div>
            
            <div className="dins mt-5 h-[2.25rem] flex ring-[#30363d] ring-1 rounded-[0.3125rem] justify-center overflow-hidden gap-0">
              <button type="button" className="bt inline-flex justify-center items-center bg-black/40 w-full text-ss gap-1 ring-[#30363d] ring-1 px-3">
                {false 
                ?(<Loading opts={{type:'glx', cls:''}}/>) 
                :(<><i className="w-5 h-5 -mt-1"><FontAwesomeIcon icon={['far', 'bookmark']} className='w-4 h-4 align-middle' /></i><em className='-mt-0.5'>스크랩</em></>)}
              </button>
              <button type="button" className="bt inline-flex justify-center items-center bg-black/40 w-full text-ss gap-1 ring-[#30363d] ring-1 px-3">
                <i className="w-5 h-5 -mt-1"><FontAwesomeIcon icon={['far', 'pen-to-square']} className='w-4 h-4 align-middle' /></i><em className='-mt-0.5'>리뷰</em>
              </button>
              <button type="button" className="bt inline-flex justify-center items-center bg-black/40 w-full text-ss gap-1 ring-[#30363d] ring-1 px-3">
                <i className="w-5 h-5 -mt-1"><FontAwesomeIcon icon={['fas', 'share-nodes']} className='w-4 h-4 align-middle' /></i><em className='-mt-0.5'>공유</em>
              </button>
            </div>

            {datas.overview && <DetailElips  overview={datas.overview} /> }



            <div className='grid grid-cols-4 gap-2'>
              {/* <Img
                width={300}
                height={450}
                src='http://image.tmdb.org/t/p/w300/zTgjeblxSLSvomt6F6UYtpiD4n7.jpg'
                alt='extio'
                srcerr='/img/common/non_poster.png'
                className='w-full h-auto'
              /> */}
            </div>
            <div className='flex flex-col mt-4 gap-4'>
              <p className='text-lg font-medium'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione? </p>
              <p className='text-lg font-medium'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione? </p>
              <p className='text-lg font-medium'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione? </p>
              <p className='text-lg font-medium'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione? </p>
              <p className='text-lg font-medium'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione? </p>
              <p className='text-lg font-medium'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione? </p>
              <p className='text-lg font-medium'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione? </p>
              <p className='text-lg font-medium'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque consequuntur deserunt esse alias. Eligendi nobis laborum quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique dolores a ratione? </p>
            </div>            
          </div>
        )}
      </div>


    </>
  );
}
