import { cookies } from 'next/headers';
import langData from '@/app/langs/lang.json';

export const LANG_MAP: Record<string, string> = { 
  kr: 'ko', us: 'en', jp: 'jp', cn: 'cn', tw: 'tw' 
};

/**
 * Get current language code from cookies (Server-side)
 */
export async function getLang() {
  const cookieStore = await cookies();
  const globalLangCookie = cookieStore.get('globalLang');
  if (!globalLangCookie) return 'ko';

  try {
    const { region } = JSON.parse(decodeURIComponent(globalLangCookie.value));
    return LANG_MAP[region] || 'ko';
  } catch (e) {
    console.error('Failed to parse globalLang cookie:', e);
    return 'ko';
  }
}

/**
 * Get current translation data (Server-side)
 */
export async function getTranslation() {
  const lang = await getLang();
  return langData.langs[lang as keyof typeof langData.langs];
}
