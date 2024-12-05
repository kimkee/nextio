// app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/supabase';

export async function GET(request: NextRequest, { query }: { query: { id: string } }) {
  const { id } = query;

  const { data, error } = await supabase
    .from('MEMBERS')
    .select('*')
    .eq('id', Number(id))
    .order('created_at', { ascending: true });

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
