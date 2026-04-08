'use client';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Img from '@/app/components/Img';
import { Myinfo as MyinfoType, User as UserType } from '@/app/types';
import Loading from '../components/Loading';
import DetailElips from './DetailElips';
import DetailCtls from './DetailCtls';
import DetailCast from './DetailCast';
import DetailVideo from './DetailVideo';
import DetailPoster from './DetailPoster';
import DetailRev from './DetailRev';
import StarPoint from '@/app/components/StarPoint';
import getUser from '@/app/getUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DetailClientProps {
  datas: any;
  casts: any;
  moves: any;
  opts: string;
  postID: string;
}

export default function DetailClient({ datas, casts, moves, opts, postID }: DetailClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<UserType>(null as any);
  const [myinfo, setMyinfo] = useState<MyinfoType>(null as any);
  
  const bgDm = datas.backdrop_path ? datas.backdrop_path : datas.poster_path;
  const bgImg = 'https://image.tmdb.org/t/p/w780' + bgDm;

  useEffect(() => {
    getUser().then((data: any) => {
      if(data?.user?.id){
        setUser(data.user);
        setMyinfo(data.myinfo);
      }else{
        setUser(data);
        setMyinfo(data);
      }
    });
  }, []);

  const refrashDatas = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  if (isPending) {
    return (
      <div className='movie-detail relative text-white animate-pulse'>
        <div className='m-info relative z-1'>
          {/* 상단 기본 정보 영역 */}
          <div className='info flex flex-wrap justify-between flex-row'>
            <div className='desc flex-1 pr-3'>
              <div className='h-8 bg-white/10 rounded w-3/4 mb-4' />
              <div className='h-4 bg-white/10 rounded w-1/2 mb-6' />
              <div className='h-6 bg-white/10 rounded w-1/3 mb-4' />
              <div className='flex gap-2 mb-6'>
                <div className='h-5 bg-white/10 rounded-full w-12' />
                <div className='h-5 bg-white/10 rounded-full w-12' />
                <div className='h-5 bg-white/10 rounded-full w-12' />
              </div>
              <div className='space-y-2'>
                <div className='h-3 bg-white/10 rounded w-1/4' />
                <div className='h-3 bg-white/10 rounded w-1/4' />
                <div className='h-3 bg-white/10 rounded w-1/4' />
              </div>
            </div>
            <div className='thum max-w-[45%] flex-1'>
              <div className='aspect-[2/3] bg-white/10 rounded-sm' />
            </div>
          </div>

          {/* 컨트롤 바 영역 */}
          <div className='mt-8 h-10 bg-white/10 rounded' />
          
          {/* 줄거리 영역 */}
          <div className='mt-8 h-24 bg-white/10 rounded' />

          {/* 출연진 영역 (원형) */}
          <div className='sect mt-10'>
            <div className='h-6 bg-white/10 rounded w-20 mb-4' />
            <div className='flex gap-4 overflow-hidden'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='flex-none'>
                  <div className='w-16 h-16 bg-white/10 rounded-full mb-2' />
                  <div className='h-2 bg-white/10 rounded w-12 mx-auto' />
                </div>
              ))}
            </div>
          </div>

          {/* 영상 영역 (16:9 사각형) */}
          <div className='sect mt-10'>
            <div className='h-6 bg-white/10 rounded w-16 mb-4' />
            <div className='flex gap-4 overflow-hidden'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex-none w-40 aspect-video bg-white/10 rounded' />
              ))}
            </div>
          </div>

          {/* 제작진 영역 (원형) */}
          <div className='sect mt-10'>
            <div className='h-6 bg-white/10 rounded w-20 mb-4' />
            <div className='flex gap-4 overflow-hidden'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='flex-none'>
                  <div className='w-16 h-16 bg-white/10 rounded-full mb-2' />
                  <div className='h-2 bg-white/10 rounded w-12 mx-auto' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='bgs fixed  w-full h-full bg-center bg-cover bg-no-repeat z-2 max-w-[480px] max-h-[470px] right-0 left-[50%] top-0 transform -translate-x-1/2 opacity-30 blur-[2px]
          after:absolute after:bottom-0 after:left-0 after:right-0 after:z-2 after:h-[18rem] after:bg-gradient-to-b from-transparent to-[#111111]'
        style={{ backgroundImage: `url(${bgImg})`, marginLeft: 'calc(0px - var(--scrPad) / 2)' }}
      ></div>
      <div className='movie-detail relative text-white'>
        <div className='m-info relative z-1'>
          <div className='info flex flex-wrap justify-between flex-row'>
            <div className='desc flex-1 pr-3'>
              <h1 className='tit text-xx '>
                {datas.title || datas.name}
                <button className='refresh ml-1 w-5 h-5 leading-none p-0 inline-flex align-middle items-center justify-center -mt-1' onClick={refrashDatas}>
                  <FontAwesomeIcon icon={['fas', 'rotate']} className='text-white/80 !w-4 !h-4  align-middle leading-none' />
                </button>
              </h1>
              {datas.tagline && <p className='sit text-14 text-[#cccccc] mt-2'>{datas.tagline}</p>}
              <p className='tio text-xt text-[#cccccc] mt-1'>
                {datas.original_title || datas.original_name}
              </p>

              <div className='star text-xl mt-3 leading-none min-h-6'>
                <StarPoint point={datas.vote_average} opts={{ cls: 'lg' }}/>
              </div>
              <div className='cate mt-4 leading-none min-h-6'>
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
              <div className='pics block relative overflow-hidden rounded-sm pb-[calc(450%/300*100)] bg-black'>
                <Img
                  width={400}
                  height={570}
                  className='img absolute object-cover w-full h-full !opacity-100'
                  src={'https://image.tmdb.org/t/p/w400' + datas.poster_path}
                  alt={datas.title || datas.name}
                  srcerr='/img/common/non_poster.png'
                />
              </div>
            </div>
          </div>
          
          <DetailCtls datas={datas} postID={postID} opts={opts} />

          {datas.overview && <DetailElips overview={datas.overview} />}

          {casts.cast.length ? <DetailCast props={{ title: "출연진", css: "cast", data: casts.cast }} /> : ''}

          {moves.results.length ? <DetailVideo props={{ title: "영상", css: "movs", data: moves.results }} /> : ''}

          {casts.crew.length ? <DetailCast props={{ title: "제작진", css: "crew", data: casts.crew }} /> : ''}

          {datas.images.posters.length ? <DetailPoster props={{ title: "포스터", name: datas.title || datas.name, css: "movie", poster: datas.poster_path, data: datas.images.posters }} /> : ''}

          <DetailRev datas={datas} postID={postID} opts={opts} user={user} myinfo={myinfo} />

          {datas.production_companies.length ? 
          <div className="sect comp flex flex-wrap mt-8 gap-1">
            {datas.production_companies.map((comp: any) => (
              comp.logo_path 
              ? 
              <span key={comp.id} className='logo bg-white/50 px-2 py-0.5 rounded-full inline-flex items-center h-7 max-w-full text-10 text-black'>
                <Img 
                  width={100} height={100} src={`https://image.tmdb.org/t/p/w92${comp.logo_path}`}
                  className='img max-h-3 align-middle max-w-full w-auto h-auto'
                  alt={comp.name} srcerr='/img/common/non_poster.png'
                />
              </span> 
              : 
              <span key={comp.id} className='logo bg-white/70 px-2 py-0.5 rounded-full inline-flex items-center h-7 max-w-full text-10 text-black'>
                {comp.name}
              </span> 
            ))}
          </div>
          : null}
        </div>
      </div>
    </>
  );
}
