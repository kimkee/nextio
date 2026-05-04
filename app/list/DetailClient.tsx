'use client';
import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Img from '@/app/components/Img';
import { Myinfo as MyinfoType, User as UserType } from '@/app/types';
import axios from 'axios';
import { useAtom } from 'jotai';
import { globalLangAtom } from '@/app/store/lang';
import Loading from '../components/Loading';
import DetailElips from './DetailElips';
import DetailCtls from './DetailCtls';
import DetailCast from './DetailCast';
import DetailVideo from './DetailVideo';
import DetailPoster from './DetailPoster';
import DetailCollection from './DetailCollection';
import DetailSeasons from './DetailSeasons';
import DetailRev from './DetailRev';
import StarPoint from '@/app/components/StarPoint';
import getUser from '@/app/getUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSetAtom } from 'jotai';
import { modalTitleAtom } from '@/app/store/modal';
import { useTranslation } from '@/app/store/lang';

interface DetailClientProps {
  opts: string;
  postID: string;
}

export default function DetailClient({ opts, postID }: DetailClientProps) {
  const t = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const setTitle = useSetAtom(modalTitleAtom);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<{ datas: any; casts: any; moves: any } | null>(null);
  const [user, setUser] = useState<UserType>(null as any);
  const [myinfo, setMyinfo] = useState<MyinfoType>(null as any);

  const [globalLang] = useAtom(globalLangAtom);

  const fetchMovieData = async () => {
    setData(null);

    const dataOpts = {
      params: {
        language: globalLang.lang,
        region: globalLang.region,
        append_to_response: 'videos,images',
        include_image_language: 'en,null'
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
      }
    };

    const castOpts = {
      params: {
        language: globalLang.lang,
        region: globalLang.region,
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
      }
    };

    const movOpts = {
      params: {
        language: globalLang.lang,
        region: globalLang.region,
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
      }
    };

    const datasRes = await axios.get(`https://api.themoviedb.org/3/${opts}/${postID}`, dataOpts).catch(console.error);
    const castsRes = await axios.get(`https://api.themoviedb.org/3/${opts}/${postID}/credits`, castOpts).catch(console.error);
    const videoRes = await axios.get(`https://api.themoviedb.org/3/${opts}/${postID}/videos`, movOpts).catch(console.error);

    if (datasRes && castsRes && videoRes) {
      setData({
        datas: datasRes.data,
        casts: castsRes.data,
        moves: videoRes.data
      });
      fetchCollection(datasRes.data.belongs_to_collection?.id);
    }
  };

  const [collect, setCollect] = useState<[any] | any>(null);
  const fetchCollection = (id:number) => {
    
    if(!id) return;
    console.log(id);
    axios.request({
      method: 'GET',
      url: `https://api.themoviedb.org/3/collection/${id}?language=${globalLang.lang}&region=${globalLang.region}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
      } 
    }).then(res =>{
      console.log(res.data);
      setCollect(res.data);
    }).catch(e=>{
      console.log(e);
    }); 
  }
  
  useEffect(() => {
    fetchMovieData();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts, postID]);

  useEffect(() => {
    if (data?.datas) {
      console.log(data?.datas);
      const newTitle = data.datas.title || data.datas.name;
      setTitle(newTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    getUser().then((d: any) => {
      if(d?.user?.id){
        setUser(d.user);
        setMyinfo(d.myinfo);
      }else{
        setUser(d);
        setMyinfo(d);
      }
    });
  }, []);

  const refrashDatas = () => {
    fetchMovieData();
  };

  if (isPending || !data) {
    return (
      <div className='movie-detail relative text-white animate-pulse'>
        <div className='m-info relative z-1'>
          {/* 상단 기본 정보 영역 */}
          <div className='info flex flex-wrap justify-between flex-row'>
            <div className='desc flex-1 pr-3'>
              <div className='h-8 bg-black rounded w-3/4 mb-4' />
              <div className='h-4 bg-black rounded w-1/2 mb-6' />
              <div className='h-6 bg-black rounded w-1/3 mb-4' />
              <div className='flex gap-2 mb-6'>
                <div className='h-5 bg-black rounded-full w-12' />
                <div className='h-5 bg-black rounded-full w-12' />
                <div className='h-5 bg-black rounded-full w-12' />
              </div>
              <div className='space-y-2'>
                <div className='h-3 bg-black rounded w-1/4' />
                <div className='h-3 bg-black rounded w-1/4' />
                <div className='h-3 bg-black rounded w-1/4' />
              </div>
            </div>
            <div className='thum max-w-[45%] flex-1 mask-[radial-gradient(101%_7%_at_50%_102%,transparent_50%,white_52%)]'>
              <div className='aspect-2/3 bg-black rounded-sm' />
            </div>
          </div>

          {/* 컨트롤 바 영역 */}
          <div className='mt-6 h-8 bg-black rounded' />
          
          {/* 줄거리 영역 */}
          <div className='mt-4 h-21 bg-black rounded' />

          {/* 출연진 영역 (원형) */}
          <div className='sect mt-4'>
            <div className='h-6 bg-black rounded w-20 mb-2' />
            <div className='lst flex flex-nowrap overflow-y-hidden -mx-5 px-2.5'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='profile w-[calc(20%-1.25rem)] min-w-[calc(20%-1.25rem)] mx-2.5  break-all flex align-top flex-col active:scale-95 transition-transform duration-200'>
                  <div className='pics relative rounded-full w-full bg-black pb-[calc(100%/100*100)] mb-1' />
                  <div className='h-2 bg-black rounded w-12 mx-auto' />
                </div>
              ))}
            </div>
          </div>

          {/* 영상 영역 (16:9 사각형) */}
          <div className='sect mt-10'>
            <div className='h-6 bg-black rounded w-16 mb-4' />
            <div className='flex gap-4 overflow-hidden'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex-none w-40 aspect-video bg-black rounded' />
              ))}
            </div>
          </div>

          {/* 제작진 영역 (원형) */}
          <div className='sect mt-10'>
            <div className='h-6 bg-black rounded w-20 mb-4' />
            <div className='lst flex flex-nowrap overflow-y-hidden -mx-5 px-2.5'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='profile w-[calc(20%-1.25rem)] min-w-[calc(20%-1.25rem)] mx-2.5  break-all flex align-top flex-col active:scale-95 transition-transform duration-200'>
                  <div className='pics relative rounded-full w-full bg-black pb-[calc(100%/100*100)] mb-1' />
                  <div className='h-2 bg-black rounded w-12 mx-auto' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  const openPosterModal = (idx:number, opts:string) => {
    // scroll: false를 주면 스크롤이 맨 위로 튀는 현상을 방지합니다.
    router.push(`${pathname}?poster=${opts}&idx=${idx}`, { scroll: false });
  };
  
  const { datas, casts, moves } = data;
  const bgDm = (datas.backdrop_path ? datas.backdrop_path : datas.poster_path );
  const bgImg = 'https://image.tmdb.org/t/p/w780' + bgDm;
  const videoImg = bgDm ? 'https://image.tmdb.org/t/p/w780' + bgDm : '/img/common/non_video.png';
  // console.log(data);
  return (
    <>
      <div 
        className={`
          bgs fixed  w-full h-full bg-center bg-cover bg-no-repeat max-w-(--mwide) max-h-120 right-0 left-1/2 top-0 transform -translate-x-1/2 opacity-30 blur-[2px]
          after:absolute after:bottom-0 after:left-0 after:right-0 after:z-2 after:h-72 after:bg-linear-to-b after:from-transparent after:to-[#111111]
        `}
        style={{ 
          backgroundImage: `url(${bgImg})`,
          // marginLeft: 'calc(0px - var(--scrPad) / 2)' 
        }}
      ></div>
      <div className='movie-detail relative text-white'>
        <div className='m-info relative z-1'>
          <div className='info flex flex-wrap justify-between flex-row'>
            <div className='desc flex-1 pr-3'>
              <h1 className='tit text-xx '>
                {datas.title || datas.name}
                <button className='refresh ml-1 w-5 h-5 leading-none p-0 inline-flex align-middle items-center justify-center -mt-1' onClick={refrashDatas}>
                  <FontAwesomeIcon icon={['fas', 'rotate']} className='text-white/80 w-4 h-4  align-middle leading-none' />
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
                <li className='vot text-12 text-primary/90  relative pl-4'>
                  <FontAwesomeIcon icon={['far', 'thumbs-up']} className='absolute left-0 top-0.5' />
                  <b>평점</b> : {datas.vote_average} / 10
                </li>
                {datas.release_date ? (
                  <li className='opn text-12 text-primary/90  relative pl-4'>
                    <FontAwesomeIcon icon={['far', 'calendar-days']} className='absolute left-0 top-0.5' />
                    <b>개봉</b> : {datas.release_date}
                  </li>
                ):null}
                {datas.first_air_date ? (
                  <li className='opn text-12 text-primary/90  relative pl-4'>
                    <FontAwesomeIcon icon={['far', 'calendar-days']} className='absolute left-0 top-0.5' />
                    <b>{datas.first_air_date} ~ {datas.last_air_date}</b>
                  </li>
                ):null}

                {datas.runtime ? (
                  <li className='tim text-12 text-primary/90  relative pl-4'>
                    <FontAwesomeIcon icon={['far', 'clock']} className='absolute left-0 top-0.5' />
                    <b>시간</b> : {datas.runtime} 분
                  </li>
                ):null}
                {datas.number_of_seasons ? (
                  <li className='tim text-12 text-primary/90  relative pl-4'>
                    <FontAwesomeIcon icon={['far', 'clock']} className='absolute left-0 top-0.5' />
                    <b>시즌</b> : {datas.number_of_seasons}개 - <b>에피소드</b> : {datas.number_of_episodes}개
                  </li>
                ):null}
                {datas.homepage ? (
                  <li className='web text-12 text-primary/90  relative pl-4 break-all'>
                    <FontAwesomeIcon icon={['fas', 'globe']} className='absolute left-0 top-0.5' />
                    <a
                      className='lk text-primary/90'
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
              <button type='button' onClick={()=>{openPosterModal(0, opts) }} 
                className='pics block w-full relative overflow-hidden rounded-sm pb-[calc(450/300*100%)] bg-black active:scale-98 transition-all duration-300
                 mask-[radial-gradient(101%_7%_at_50%_102%,transparent_50%,white_52%)]'
              >
                <Img
                  width={400}
                  height={570}
                  className='img absolute object-cover w-full h-full'
                  classNameErr='opacity-100! border border-white/15! border-4'
                  priority={true}
                  unoptimized={true}
                  src={'https://image.tmdb.org/t/p/w400' + datas.poster_path}
                  alt={datas.title || datas.name}
                  srcerr='/img/common/non_poster.png'
                />
              </button>
            </div>
          </div>
          
          <DetailCtls datas={datas} postID={postID} opts={opts} />

          {datas.overview && <DetailElips overview={datas.overview} />}

          {casts.cast.length ? <DetailCast props={{ title: t.detailTool.cast, css: "cast", data: casts.cast }} /> : ''}

          {moves.results.length ? <DetailVideo props={{ title: t.detailTool.video, css: "movs", opts: opts, data: moves.results, defaultImg: videoImg }} /> : ''}

          {casts.crew.length ? <DetailCast props={{ title: t.detailTool.crew, css: "crew", data: casts.crew }} /> : ''}

          {datas.images.posters.length ? <DetailPoster props={{ title: t.detailTool.poster, name: datas.title || datas.name, css: "movie", opts: opts, poster: datas.poster_path, data: datas.images.posters }} /> : ''}

          {collect ? <DetailCollection opts={opts} props={{ title: t.detailTool.series, css: "collect", data: collect }} /> : ''}

          {datas.seasons && datas.seasons.length > 1 ? <DetailSeasons opts={opts} props={{ title: t.detailTool.season, css: "season", data: datas.seasons }} /> : ''}

          <DetailRev datas={datas} postID={postID} opts={opts} user={user} myinfo={myinfo} />

          {datas.production_companies.length ? 
          <div className="sect comp flex flex-wrap mt-8 gap-1">
            {datas.production_companies.map((comp: any) => (
               
              <span key={comp.id} className='logo bg-white/20 px-2 py-0.5 rounded-full inline-flex items-center h-7 max-w-full text-10 text-black'>
                {
                  comp.logo_path
                  ? <Img 
                      width={100} height={100} src={`https://image.tmdb.org/t/p/w92${comp.logo_path}`}
                      className='img max-h-3 align-middle max-w-full w-auto h-auto'
                      alt={comp.name} srcerr='/img/common/non_poster.png'
                      unoptimized={true}
                    />
                  : comp.name
                }
              </span> 
            ))}
          </div>
          : null}
        </div>
      </div>
    </>
  );
}
