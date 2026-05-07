import { cookies, headers } from 'next/headers';
import langData from '@/app/langs/lang.json';

export const LANG_MAP: Record<string, string> = { 
  kr: 'ko', us: 'en', jp: 'jp', cn: 'cn', tw: 'tw' 
};

/**
 * Get current language code from cookies or browser headers (Server-side)
 */
export async function getLang() {
  const cookieStore = await cookies();
  const globalLangCookie = cookieStore.get('globalLang');
  
  // 1. Check Cookie first (explicit user preference)
  if (globalLangCookie) {
    try {
      const { region } = JSON.parse(decodeURIComponent(globalLangCookie.value));
      const lang = LANG_MAP[region];
      if (lang) return lang;
    } catch (e) {
      console.error('Failed to parse globalLang cookie:', e);
    }
  }

  // 2. Fallback to Browser Language (Accept-Language header)
  try {
    const headerList = await headers();
    const acceptLanguage = headerList.get('accept-language');

    if (acceptLanguage) {
      const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase());
      for (const lang of languages) {
        if (lang.startsWith('ko')) return 'ko';
        if (lang.startsWith('ja') || lang.startsWith('jp')) return 'jp';
        if (lang.startsWith('zh-tw') || lang.startsWith('zh-hk') || lang.startsWith('zh-hant')) return 'tw';
        if (lang.startsWith('zh')) return 'cn';
        if (lang.startsWith('en')) return 'en';
      }
    }
  } catch (e) {
    console.error('Failed to get browser language:', e);
  }

  // 3. Default to 'en' as requested
  return 'en';
}

// 다국어 언어코드 가져오기 (TMDB 등에서 사용)
export async function getLangCode(val?: string) {
  const lang = (val || await getLang()) as keyof typeof values;
  const values = {
    ko: "ko-KR",
    en: "en-US",
    jp: "ja-JP",
    cn: "zh-CN",
    tw: "zh-TW"
  }
  return values[lang];
}

/**
 * Get current translation data (Server-side)
 */
export async function getTranslation() {
  const lang = await getLang();
  return langData.langs[lang as keyof typeof langData.langs];
}
