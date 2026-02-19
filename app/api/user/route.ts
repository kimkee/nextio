import { NextResponse } from 'next/server';
import { supabase } from '@/app/supabase';

// 1. Edge Runtime 사용 (이미 잘 넣어주셨습니다!)
export const runtime = 'edge';

// 2. 추가: 이 API는 호출될 때마다 실행되도록 설정 (빌드 시 렌더링 방지)
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const num = searchParams.get('num');

    if (!num) {
      return NextResponse.json({ error: 'Missing query parameter: num' }, { status: 400 });
    }

    // Supabase 쿼리 실행
    const { data, error } = await supabase
      .from('MEMBERS')
      .select("*")
      .eq('id', Number(num))
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 특정 필드 제거 (구조 분해 할당 활용)
    const filteredData = data.map((item) => {
      const { tmdb_movie_scrap, tmdb_tv_scrap, ...rest } = item;
      return rest;
    });

    return NextResponse.json(filteredData[0], { status: 200 });
  } catch (err) {
    // 예상치 못한 에러 처리
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}