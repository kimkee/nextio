/**
 * @file app/types.ts
 * @author naeun
 * @description Type declarations for this app
 */
export type Myinfo = {
  id: number;
  created_at: string;
  email: string;
  username: string;
  updated_at: string;
  profile_picture: string;
  is_active: boolean;
  user_id: string;
  provider: string;
  level: number;
  tmdb_movie_scrap?: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }[];
  tmdb_tv_scrap?: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }[];
}

export type User = {
  id: string;
  email?: string;
  user_metadata: {
    full_name?: string;
    user_name?: string;
    avatar_url?: string;
  };
  full_name?: string;
  user_name?: string;
  avatar_url?: string;
  app_metadata: {
    provider?: string; // provider 속성을 선택 사항으로 변경
  };
  provider?: string;
}
