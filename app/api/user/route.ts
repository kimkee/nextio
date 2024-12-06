// app/api/user/route.ts
// http://localhost:9017/api/user?num=58
import { NextResponse } from 'next/server';
import { supabase } from '@/app/supabase';
export const runtime = 'edge';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const num = searchParams.get('num');

  if (!num) {
    return NextResponse.json({ error: 'Missing query parameter: num' }, { status: 400 });
  }

  const { data, error } = await supabase.from('MEMBERS').select("*").eq('id', Number(num)).order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 특정 필드 제거
  const filteredData = data.map((item) => {
    const { tmdb_movie_scrap, tmdb_tv_scrap, ...rest } = item;
    return rest;
  });

  return NextResponse.json(filteredData[0], { status: 200 });
}
