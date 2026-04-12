'use client'; // 클라이언트 구성 요소로 설정

import axios from 'axios';
import CateMenu from '@/app/components/CateMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

import { use } from 'react';
import ui from '@/app/lib/ui';
import Img from '@/app/components/Img';
import ItemB from '@/app/components/ItemB';
import './list.css';
import Loading from '@/app/components/Loading';
import ListSkeleton from '@/app/components/ListSkeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface Genre {
  id: number;
  name: string;
}



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
  const pageRef = useRef(1);
  const callStatRef = useRef(true);

  const getCate = async () => {
    await axios
      .get(
        `//api.themoviedb.org/3/genre/${opts}/list?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      )
      .then((res) => {
        genrMenuSet(res.data.genres);
      });
  };

  const fetchMoive = async (p: any) => {
    const fetchURL = `https://api.themoviedb.org/3/discover/${opts}?${cateList}&page=${p}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    await axios
      .get(fetchURL)
      .then((res) => {
        console.log(res.data.results);
        movieListSet((prevList) => [...prevList, ...res.data.results]);
        callStatRef.current = true;
        loadErrorSet('');
        nowPageSet({ pge: res.data.page, tot: res.data.total_pages });
        if (res.data.total_pages <= p) {
          callStatRef.current = false;
          loadHideSet(' hide');
        } else {
          loadHideSet('');
        }
        loadActiveSet('');
      })
      .catch((e) => {
        console.error(e);
        callStatRef.current = true;
        loadErrorSet(' error');
      });
  };


  const [nowPage, nowPageSet] = useState({ pge: 0, tot: 0 });
  const [loadActive, loadActiveSet] = useState(``);
  const [loadHide, loadHideSet] = useState(``);
  const [loadError, loadErrorSet] = useState(``);

  const scrollEvent = () => {
    const wHt = ui.viewport.height();
    const docH = ui.viewport.docHeight();
    const scr = ui.viewport.scrollTop() + wHt + 300;
    
    if (docH <= scr && callStatRef.current === true) {
      loadActiveSet(' active');
      callStatRef.current = false;

      if (ui.lock.stat) {
        callStatRef.current = true;
        return;
      }
      setTimeout(() => {
        pageRef.current += 1;
        fetchMoive(pageRef.current);        
      }, 300);
    }
  };

  useEffect(() => {
    pageRef.current = 1;
    callStatRef.current = true;
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
      <div className='container flex-col movie-list'>
        <main className='p-3'>
          <div className='poster-list'>
          
            {!movieList.length ? (
              <ListSkeleton count={20} />
            ) : (
              <>
                <ul className='grid grid-cols-4 gap-3'>
                  {movieList.map((data, num) => (
                    <li key={data.id + '_' + num} data-id={data.id + '_' + num}>
                      <ItemB data={data} opts={opts} cate={cate} />
                    </li>
                  ))}
                </ul>
                <div className={`ui-loadmore${ loadActive + loadHide + loadError } mt-3`}>
                  <div className='flex justify-center h-12 items-center loading'>
                    <Loading opts={{ type: 'glx' }} />
                  </div>
                  <button
                    onClick={(e) => {
                      callStatRef.current = true;
                      fetchMoive(pageRef.current);
                    }} type='button' className='btn-load'>
                    <i>
                      <FontAwesomeIcon icon={['fas', 'rotate-right']} />
                    </i>
                  </button>

                </div>
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
