import Detail from '@/app/list/Detail';
import PersonClient from '@/app/list/PersonClient';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ opts: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { opts, id } = await params;
  
  if (opts !== 'movie' && opts !== 'tv' && opts !== 'person') {
    return { title: 'Not Found' };
  }

  const fetchURL = `https://api.themoviedb.org/3/${opts}/${id}?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  
  try {
    const res = await fetch(fetchURL);
    const data = await res.json();
    
    if (!res.ok) {
      return { title: '상세 정보 - NEXTIO' };
    }

    const title = data.title || data.name;
    const description = data.overview || data.biography || data.known_for_department;
    const image = `https://image.tmdb.org/t/p/w780${data.backdrop_path || data.poster_path || data.profile_path}`;

    return {
      title: `${title} - NEXTIO`,
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
