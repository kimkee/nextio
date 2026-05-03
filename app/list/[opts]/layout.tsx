'use client';
import { use, useState, useEffect } from 'react';
import axios from 'axios';
import CateMenu from '@/app/list/[opts]/[cate]/CateMenu';

export default function Layout({ children, params, }: { children: React.ReactNode; params: Promise<{ opts: string }>; }) {
  const { opts } = use(params);
  const [genrMenu, genrMenuSet] = useState<any[]>([]);

  const getCate = async () => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/genre/${opts}/list`,
      params: {
        language: 'ko-KR',
        region: 'kr'
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
      }
    };
    await axios.request(options)
    .then((res)=>{
      genrMenuSet(res.data.genres);
    })
    .catch((e)=>{
      console.error('Failed to fetch genres:', e);
    });
  };

  useEffect(() => {
    getCate();
  }, [opts]);

  return (
    <>
      {children}
      <CateMenu menu={genrMenu} opts={opts} />
    </>
  );
}
