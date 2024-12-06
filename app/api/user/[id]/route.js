// app/api/user/[id]/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/app/supabase';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request, { params }) {
  const { id } = params;

  // ID가 숫자인지 확인
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid ID parameter' }, { status: 400 });
  }

  // Supabase 쿼리 실행
  const { data, error } = await supabase
    .from('MEMBERS')
    .select('*')
    .eq('id', Number(id))
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  }

  // 특정 필드 제거
  const filteredData = data.map((item) => {
    const { tmdb_movie_scrap, tmdb_tv_scrap, ...rest } = item;
    return rest;
  });

  return NextResponse.json(filteredData[0], { status: 200 });
}
