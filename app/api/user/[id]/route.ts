// app/api/user/[id]/route.ts
// http://localhost:9017/api/user/62
import { NextResponse } from 'next/server';
import { supabase } from '@/app/supabase';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const { data, error } = await supabase.from('MEMBERS').select("*").eq('id', Number(id)).order('created_at', { ascending: true });

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
