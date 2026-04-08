// getUser.ts
import { supabase } from "@/app/supabase";
import { cache } from 'react';

interface User {
  id: string;
  email?: string;
  user_metadata: {
    full_name?: string;
    user_name?: string;
    avatar_url?: string;
  };
  app_metadata: {
    provider?: string;
  };
  [key: string]: any;
}

interface Member {
  user_id: string;
  email: string;
  username: string;
  provider: string;
  profile_picture: string;
  level: number;
  created_at: Date;
  join_url: string;
}

/**
 * 서버 사이드에서는 React.cache를 통해 단일 요청 내에서만 캐싱되도록 보장합니다.
 * 전역 변수 캐싱은 Vercel 서버 환경에서 사용자 간 데이터 유출 위험이 있으므로 사용하지 않습니다.
 */
const getUser = cache(async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    // DB 사용자 추가 로직 (필요 시)
    await addUserToDatabase(user);

    const { data, error } = await supabase.from('MEMBERS')
      .select("*")
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching user info:', error);
      return null;
    }

    return { user, myinfo: data[0] };
  } catch (e) {
    console.error('getUser Error:', e);
    return null;
  }
});

const addUserToDatabase = async (user: User) => {
  if (!user.email) return;

  // 서버 부하를 줄이기 위해 먼저 존재하는지 확인
  const { data, error: fetchError } = await supabase.from('MEMBERS').select('user_id').eq('email', user.email).limit(1);

  if (fetchError || (data && data.length > 0)) {
    return;
  }

  const newUser: Member = {
    user_id: user.id,
    email: user.email,
    username: user.user_metadata.full_name || user.user_metadata.user_name || '',
    provider: user.app_metadata.provider || '',
    profile_picture: user.user_metadata.avatar_url || '',
    level: 10,
    created_at: new Date(),
    join_url: process.env.NEXT_PUBLIC_SITE_URL || '',
  };

  await supabase.from('MEMBERS').insert([newUser]);
};

export default getUser;
