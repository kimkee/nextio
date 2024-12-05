// app/api/user/all/route.ts
// http://localhost:9017/api/user/all
import { NextResponse } from 'next/server';
import { supabase } from '@/app/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('MEMBERS')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 특정 필드 제외
  // spread operator 로 item 의 속성을 모두 복사하고,
  // tmdb_movie_scrap, tmdb_tv_scrap 속성을 제외하고 새로운 객체를 생성
  const filteredData = data.map((item) => {
    const { tmdb_movie_scrap, tmdb_tv_scrap, ...rest } = item;
    return rest;
  });

  return NextResponse.json(filteredData, { status: 200 });
}
