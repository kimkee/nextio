// app/api/user/[id]/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/app/supabase';
import { NextRequest } from 'next/server';
export const runtime = 'nodejs'; // Node.js 런타임 지정
export async function GET(request: NextRequest, context: { params: { id: number } }) {
  const { id } = context.params;

  // num가 숫자인지 확인
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalnum ID parameter' }, { status: 400 });
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
