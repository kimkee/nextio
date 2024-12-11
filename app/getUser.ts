// getUser.ts
import { supabase } from "@/app/supabase";

interface User {
  id: string;
  email?: string; // email 속성을 선택 사항으로 변경
  user_metadata: {
    full_name?: string;
    user_name?: string;
    avatar_url?: string;
  };
  app_metadata: {
    provider?: string; // provider 속성을 선택 사항으로 변경
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
}

const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;
  await addUserToDatabase(user);

  const { data, error } = await supabase.from('MEMBERS').select("*").eq('user_id', user.id).order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching user info:', error);
    return;
  }

  return { user, myinfo: data[0] };
};

const addUserToDatabase = async (user: User) => {
  if (!user.email) {
    console.error('User email is undefined');
    return;
  }

  const { data, error: fetchError } = await supabase.from('MEMBERS').select('*').eq('email', user.email);

  if (fetchError) {
    console.error('Error fetching user data:', fetchError);
    return;
  }

  if (data.length > 0) {
    console.log('Existing user:', data[0]);
    return;
  } else {
    const newUser: Member = {
      user_id: user.id,
      email: user.email,
      username: user.user_metadata.full_name || user.user_metadata.user_name || '',
      provider: user.app_metadata.provider || '', // provider 기본값 설정
      profile_picture: user.user_metadata.avatar_url || '',
      level: 10,
      created_at: new Date(),
    };

    const { data: insertData, error: insertError } = await supabase.from('MEMBERS').insert([newUser]);

    if (insertError) {
      console.error('Error inserting new user:', insertError);
      console.log(insertError.code);
    } else {
      console.log('User added successfully:', insertData);
    }
  }
};

export default getUser;
