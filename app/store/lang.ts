import { atom, useAtomValue } from 'jotai';
import langData from '@/app/langs/lang.json';

export const globalLangAtom = atom({ lang: '', region: '' });
export const langAtom = atom('ko');
// export const globalLangAtom = atom({ lang: 'ko-KR', region: 'kr' });
// export const globalLangAtom = atom({ lang: 'ja-JP', region: 'jp' });
// export const globalLangAtom = atom({ lang: 'zh-CN', region: 'cn' });
// export const globalLangAtom = atom({ lang: 'zh-TW', region: 'tw' });

export function useTranslation() {
  const { region } = useAtomValue(globalLangAtom);
  const langMap: Record<string, keyof typeof langData.langs> = { kr: 'ko', us: 'en', jp: 'jp', cn: 'cn', tw: 'tw' };
  const currentLang = langMap[region] || 'en';
  return langData.langs[currentLang];
}
