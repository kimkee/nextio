import DetailClient from './DetailClient';

async function getMovieData(opts: string, id: string) {
  const fetchURL = `https://api.themoviedb.org/3/${opts}/${id}?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos,images&include_image_language=en,null`;
  const castURL = `https://api.themoviedb.org/3/${opts}/${id}/credits?&region=kr&language=ko&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
  const movURL = `https://api.themoviedb.org/3/${opts}/${id}/videos?language=ko&region=kr&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

  const [datasRes, castRes, movRes] = await Promise.all([
    fetch(fetchURL, { next: { revalidate: 3600 } }),
    fetch(castURL, { next: { revalidate: 3600 } }),
    fetch(movURL, { next: { revalidate: 3600 } })
  ]);

  if (!datasRes.ok) throw new Error('Failed to fetch movie data');

  return {
    datas: await datasRes.json(),
    casts: await castRes.json(),
    moves: await movRes.json()
  };
}

export default async function Detail({
  params,
}: {
  params: { opts: string; id: string };
}) {
  const { datas, casts, moves } = await getMovieData(params.opts, params.id);

  return (
    <DetailClient 
      datas={datas} 
      casts={casts} 
      moves={moves} 
      opts={params.opts} 
      postID={params.id} 
    />
  );
}
