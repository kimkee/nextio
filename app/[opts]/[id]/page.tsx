import { cookies } from 'next/headers';
import Detail from '@/app/list/Detail';
import PersonClient from '@/app/list/PersonClient';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ opts: string; id: string }>;
};
const SNAME = { 
  DEV: 'NEXTIO:D',
  LOCAL: 'NEXTIO:L' ,
  PRD: 'NEXTIO'
}[process.env.NEXT_PUBLIC_ENV || 'PRD'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { opts, id } = await params;
  
  if (opts !== 'movie' && opts !== 'tv' && opts !== 'person') {
    return { title: 'Not Found' };
  }

  const cookieStore = await cookies();
  const globalLangCookie = cookieStore.get('globalLang');
  let lang = 'ko-KR';
  let region = 'kr';

  if (globalLangCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(globalLangCookie.value));
      if (parsed.lang) lang = parsed.lang;
      if (parsed.region) region = parsed.region;
    } catch (e) {}
  }

  
  const fetchURL = `https://api.themoviedb.org/3/${opts}/${id}?language=${lang}&region=${region}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
    }
  };
  try {
    const res = await fetch(fetchURL, options);
    const data = await res.json();
    // console.log("상세페이지 메타데이터 가져오기", data);
    
    if (!res.ok) {
      return { title: `상세 정보 - ${SNAME}` };
    }

    const title = data.title || data.name;
    const description = data.overview || data.biography || data.known_for_department;
    const image = `https://image.tmdb.org/t/p/w780${data.backdrop_path || data.poster_path || data.profile_path}`;

    return {
      title: `${title} - ${SNAME}`,
      description,
      openGraph: {
        title,
        description,
        images: [image],
      },
    };
  } catch (e) {
    return { title: '상세 정보 - NEXTIO' };
  }
}

export default async function View({ params }: Props) {
  const { opts, id } = await params;

  // 허용되지 않은 opts(movie나 tv가 아닌 경우)는 404 처리
  if (opts !== 'movie' && opts !== 'tv' && opts !== 'person') {
    notFound();
  }

  return (
    <div className='container'>
      <main className='contents'>
        {opts === 'movie' || opts === 'tv' ? <Detail params={{ opts, id }} /> : <></>}
        {opts === 'person' ? <PersonClient params={{ opts, id }} /> : <></>}
      </main>
    </div>
  );
}
