import Detail from '@/app/list/Detail';
import PersonClient from '@/app/list/PersonClient';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLangCode, getLang, getTranslation } from '@/app/lib/lang';

type Props = {
  params: Promise<{ opts: string; id: string }>;
  searchParams: Promise<{ lang: string; }>;
};
const SNAME = { 
  DEV: 'NEXTIO:D',
  LOCAL: 'NEXTIO:L' ,
  PRD: 'NEXTIO'
}[process.env.NEXT_PUBLIC_ENV || 'PRD'];

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { opts, id } = await params;
  const t = await getTranslation();
  
  if (opts !== 'movie' && opts !== 'tv' && opts !== 'person') {
    return { title: 'Not Found' };
  }
  
  const regionCode = (await getLang());
  const langCode = (await getLangCode());
  const { lang: langParams } = await searchParams;
  const LCODE = (await getLangCode(langParams));

  console.log("상세페이지 메타데이터 가져오기",langParams, LCODE, regionCode, langCode  );

  const fetchURL = `https://api.themoviedb.org/3/${opts}/${id}?language=${LCODE || langCode}&region=${regionCode}`;
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
    console.log("상세페이지 메타데이터 가져오기", fetchURL, data);
    
    if (!res.ok) {
      return { title: `${t.title} - ${SNAME}` };
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
    return { title: `${t.title} - ${SNAME}` };
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
