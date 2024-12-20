'use client'; // 클라이언트 구성 요소로 설정

import axios from 'axios';
import CateMenu from '@/app/components/CateMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';
import ui from '@/app/lib/ui';
import Img from '@/app/components/Img';
import ItemB from '@/app/components/ItemB';
import './list.css';
import Loading from '@/app/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface Genre {
  id: number;
  name: string;
}

export const runtime = 'edge';

export default function Page({
  params,
}: {
  params: Promise<{ cate: string; opts: string; id: string }>;
}) {
  // Promise를 언랩하여 params를 추출
  const { cate, opts, id } = use(params);

  const router = useRouter();
  // const [currentCate, setCurrentCate] = useState(cate);
  // const [currentOpts, setCurrentOpts] = useState(opts);
  const [dataList, setDataList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  ]);
  const [genrMenu, genrMenuSet] = useState<any[]>([]);
  const [movieList, movieListSet] = useState<any[]>([]);
  const cateID = cate;
  const cateList = cateID !== '0' ? `&with_genres=${cateID}` : ``;
  let page = 1;
  const getCate = async () => {
    await axios
      .get(
        `//api.themoviedb.org/3/genre/${opts}/list?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      )
      .then((res) => {
        genrMenuSet(res.data.genres);
      });
  };

  const fetchMoive = async (page: any) => {
    const fetchURL = `https://api.themoviedb.org/3/discover/${opts}?${cateList}&page=${page}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    await axios
      .get(fetchURL)
      .then((res) => {
        console.log(res.data);
        console.log('로드 ' + page);
        movieListSet((prevList) => [...prevList, ...res.data.results]);
        console.log( `callStat : ${callStat} , page : ${page} , res.data.total_pages :  ${res.data.total_pages} ` );
        callStat = true;
        loadErrorSet('');
        nowPageSet({ pge: res.data.page, tot: res.data.total_pages });
        if (res.data.total_pages <= page) {
          callStat = false;
          loadHideSet(' hide');
        } else {
          loadHideSet('');
        }
        loadActiveSet('');
      })
      .catch((e) => {
        console.log(e);
        callStat = true;
        loadErrorSet(' error');
      });
  };

  const [nowPage, nowPageSet] = useState({ pge: 0, tot: 0 });
  const [loadActive, loadActiveSet] = useState(``);
  const [loadHide, loadHideSet] = useState(``);
  const [loadError, loadErrorSet] = useState(``);
  let callStat = true;
  const scrollEvent = () => {
    const wHt = ui.viewport.height();
    const docH = ui.viewport.docHeight();
    const scr = ui.viewport.scrollTop() + wHt + 300;
    // console.log(callStat +" =  "+  page);
    if (docH <= scr && callStat === true) {
      console.log();
      console.log('바닥도착 : ' + page);

      loadActiveSet(' active');
      callStat = false;
      console.log(callStat);
      console.log(loadActive);

      if (ui.lock.stat) {
        callStat = true;
        return;
      }
      setTimeout(() => {
        page = page + 1;
        fetchMoive(page);
      }, 300);
    }
  };
  useEffect(() => {
    console.log(movieList);
    movieListSet([]);
    window.scrollTo(0, 0);
    fetchMoive(1);
    getCate();
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
    // eslint-disable-next-line
  }, [cate, opts]);

  return (
    <>
      <title>{`${opts == 'movie' ? '영화' : 'TV'} 목록`}</title>
      {/* <meta name="description" content={`상세 정보`} /> */}
      <div className='container flex-col movie-list'>
        <main className='p-3'>
          <div className='poster-list'>
          
            {!movieList.length ? (
              // <ul className='list skelt'>
              //   <Skeleton opts={ {type: 'movie-list', num: 20} } />
              // </ul>
              <><Loading opts={{ type: 'glx', cls: 'full' }} /></>
            ) : (
              <>
                <ul className='grid grid-cols-4 gap-3'>
                  {movieList.map((data, num) => (
                    <li key={data.id + '_' + num} data-id={data.id + '_' + num}>
                      <ItemB data={data} opts={opts} cate={cate} />
                      {/* <Link
                  className="border border-white/20 rounded-md p-4 h-40 flex flex-col gap-1 justify-center items-center text-md uppercase"
                  href={`/list/${opts}/${cate}/${data.id}`}
                  passHref
                  scroll={false}
                >
                  <Img width={300} height={450}  src={`https://image.tmdb.org/t/p/w200${data.poster_path}`} alt='extio' srcerr='/img/common/non_poster.png' className='w-full h-auto' />
                  <p>{opts} - {cate} - {data.id}</p>
                  <p>{data.poster_path}</p>
                </Link> */}
                    </li>
                  ))}
                </ul>
                <div className={`ui-loadmore${ loadActive + loadHide + loadError } mt-3`}>
                  <div className='flex justify-center h-12 items-center loading'>
                    <Loading opts={{ type: 'glx' }} />
                  </div>
                  <button
                    onClick={(e) => {
                      callStat = true;
                      fetchMoive(page);
                    }} type='button' className='btn-load'>
                    <i>
                      <FontAwesomeIcon icon={['fas', 'rotate-right']} />
                    </i>
                  </button>
                </div>
                {/* <button
            className="btn btn-xl w-full mt-6"
            onClick={ (e)=>{ callStat = true; fetchMoive( page ); } }
          >
            More
          </button> */}
              </>
            )}
          </div>
          <div className='page-set'>
            {nowPage.tot > 0 && (
              <div className='inr'>
                <div className='pg'>
                  <i className='p'>{nowPage.pge}</i> <i className='s'>/</i>{' '}
                  <i className='t'>{nowPage.tot}</i>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <CateMenu menu={genrMenu} opts={opts} />
    </>
  );
}
