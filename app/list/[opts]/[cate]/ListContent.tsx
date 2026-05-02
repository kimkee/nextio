'use client';

import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import ui from '@/app/lib/ui';
import ItemB from '@/app/components/ItemB';
import Loading from '@/app/components/Loading';
import ListSkeleton from '@/app/components/ListSkeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ListContent({ opts, cate }: { opts: string; cate: string }) {
  const [movieList, movieListSet] = useState<any[]>([]);
  const cateList = cate !== '0' ? `&with_genres=${cate}` : ``;
  const pageRef = useRef(1);
  const callStatRef = useRef(true);

  const [nowPage, nowPageSet] = useState({ pge: 0, tot: 0 });
  const [loadActive, loadActiveSet] = useState(``);
  const [loadHide, loadHideSet] = useState(``);
  const [loadError, loadErrorSet] = useState(``);

  const fetchMoive = async (p: any) => {
    // const fetchURL = `https://api.themoviedb.org/3/discover/${opts}?${cateList}&page=${p}&language=ko&region=kr&sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/discover/${opts}`,
      params: {
        with_genres: cate !== '0' ? cate : '',
        page: p,
        language: 'ko-KR',
        region: 'kr',
        sort_by: 'popularity.desc',
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
      }
    };  
    await axios
      .request(options)
      .then((res) => {
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
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
    // eslint-disable-next-line
  }, [cate, opts]);

  return (
    <>
      <div className='poster-list'>
        { !movieList.length 
          ? 
          ( <ListSkeleton count={20} /> ) 
          : 
          (
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
          )
        }
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
    </>
  );
}
