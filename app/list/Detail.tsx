'use client';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import Img from '@/app/components/Img';
import ui from '@/app/lib/ui';
import Loading from '../components/Loading';
import StarPoint from '../components/StarPoint';
import Link from 'next/link';
export default function Detail({ params }: { params: { opts: string; cate: string; id: string } }) {
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
        let bgDm = response.data.backdrop_path ? response.data.backdrop_path : response.data.poster_path;
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
    ui.loading.show('glx');
    window.setTimeout(() => {
      fetchDatas();
      fetchCast();
      fetchMov();
      ui.loading.hide();
    }, 500);
  };

  return (
    <>
      {/* <p>Detail - {params.opts}</p>
      <p>{JSON.stringify(params)}</p> */}

      <div className='movie-detail'>
        <div className='bgs' style={{ backgroundImage: `url(${bgImg})` }}></div>
        {!datas || !casts || !moves ? (
          // <Skeleton opts={ {type: 'movie-detail'} } />
          <Loading opts={{ type: 'glx' }} />
        ) : (
          <div className='m-info'>
            <title>{`${datas.title || datas.name} `}</title>
            <meta name='description' content={datas.overview} />
            <meta property='og:image' content={'//image.tmdb.org/t/p/w300' + datas.poster_path} />
            <meta property='og:image:width' content='300' />
            <meta property='og:image:height' content='400' />
            <div className='info'>
              <div className='desc'>
                <p className='tit'>
                  {datas.title || datas.name}
                  <button className='refresh' onClick={refrashDatas}>
                    <i className='fa-solid fa-rotate'></i>
                  </button>
                </p>
                {datas.tagline && <p className='sit'>{datas.tagline}</p>}
                <p className='tio'>{datas.original_title || datas.original_name}</p>

                <div className='star'>
                  <StarPoint point={datas.vote_average} />
                </div>
                <div className='cate'>
                  {datas.genres.map((item: any) => (
                    <em className='ico' key={item.id}>
                      {' '}
                      {item.name}
                    </em>
                  ))}
                </div>
                <ul className='lst'>
                  <li className='vot'>
                    <i className='fa-regular fa-thumbs-up'></i> <b>평점</b> : {datas.vote_average} / 10
                  </li>
                  {datas.release_date && (
                    <li className='opn'>
                      <i className=' fa-regular fa-camera-movie'></i> <b>개봉</b> : {datas.release_date}
                    </li>
                  )}
                  {datas.first_air_date && (
                    <li className='opn'>
                      <i className=' fa-regular fa-camera-movie'></i> {datas.first_air_date} ~ {datas.last_air_date}
                    </li>
                  )}

                  {datas.runtime && (
                    <li className='tim'>
                      <i className='fa-regular fa-timer'></i> <b>시간</b> : {datas.runtime} 분
                    </li>
                  )}
                  {datas.number_of_seasons && (
                    <li className='tim'>
                      <i className='fa-regular fa-timer'></i> <b>시즌</b> : {datas.number_of_seasons}개 - <b>에피소드</b> : {datas.number_of_episodes}개
                    </li>
                  )}
                  {datas.homepage && (
                    <li className='web'>
                      <i className='fa-regular fa-globe'></i>{' '}
                      <a className='lk' href={datas.homepage} target='_blank' rel='noopener noreferrer'>
                        {datas.homepage}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div className='thum'>
                <Link href={`/list/${opts}/${cate}/${id}/poster/0`} className='pics'>
                  <img src={'//image.tmdb.org/t/p/w300' + datas.poster_path} alt={datas.title || datas.name} className='img' onError={ui.error.poster} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className='grid grid-cols-4 gap-2'>
        <Img
          width={300}
          height={450}
          src='http://image.tmdb.org/t/p/w300/zTgjeblxSLSvomt6F6UYtpiD4n7.jpg'
          alt='extio'
          srcerr='/img/common/non_poster.png'
          className='w-full h-auto'
        />
      </div>
      <div className='flex flex-col mt-4 gap-4'>
        <p className='text-lg font-medium'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          cumque consequuntur deserunt esse alias. Eligendi nobis laborum
          quaerat nulla laboriosam aperiam quidem, dolorem sit. Vel et similique
          dolores a ratione?
        </p>
      </div> */}
    </>
  );
}
