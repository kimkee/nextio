'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { globalLangAtom } from '@/app/store/lang';
export default function LangSelect() {

  const [globalLang, globalLangSet] = useAtom(globalLangAtom);
  const [openLang, setOpenLang] = useState(false);
  const langTxt = {ko: '한국어',en: 'English',jp: '日本語',cn: '简体中文',tw: '繁體中文'}
  const setLang = (lang: string, region: string) => {
    // globalLangSet({ lang, region });
    const langData = JSON.stringify({ lang, region });
    localStorage.setItem('globalLang', langData);
    document.cookie = `globalLang=${encodeURIComponent(langData)}; path=/; max-age=31536000`;
    setOpenLang(false);
    location.reload();
  }
  useEffect(() => {
    const localLang = localStorage.getItem('globalLang') ||  JSON.stringify({ lang: 'ko-KR', region: 'kr' });
    if(localLang){
      globalLangSet(JSON.parse(localLang));  
    }
    document.addEventListener('mousedown', (e:any) => {
      if (!e.target.closest('.langSelectUI')) {
        setOpenLang(false);
      }
    });
  }, []);
  if(!globalLang.region) return (<></>)
  return (
    <div className='relative z-50 langSelectUI'>
      <button onClick={() => { setOpenLang(!openLang) }} 
        className='bt pressed gnb bt border w-auto h-7 px-2 inline-flex items-center justify-center rounded-sm 
        border-white/40 text-white/80 hover:border-primary/80 hover:text-primary' 
        title={`Language : ${globalLang.lang.toUpperCase()}`}>
        <FontAwesomeIcon icon={['fas', 'earth-americas']} className='w-3 h-3 flex mr-1'  />
        <b className='flex items-center justify-center top-2 left-2 -right-9 bottom-2 text-xs text-shadow-[0_0_1px_black]'>
          {
          globalLang.region === 'kr' ? langTxt.ko
          :globalLang.region === 'us' ? langTxt.en
          :globalLang.region === 'jp' ? langTxt.jp
          :globalLang.region === 'cn' ? langTxt.cn
          :globalLang.region === 'tw' ? langTxt.tw
          :''
          }
        </b>
      </button>
      <div 
        className={`options absolute bg-black/50 z-50 w-20 top-full right-0 grid grid-cols-1 
          ${openLang ? 'block' : 'hidden'}
        `}>
        <button onClick={() => {
          setLang('en-US', 'us');
        }} className={`px-3 py-1.5 text-white/90 text-sm hover:bg-black/70 ${globalLang.lang === 'en-US' ? 'text-primary' : ''}`}>
          {langTxt.en}
        </button>

        <button onClick={() => {
          setLang('ko-KR', 'kr');
        }} className={`px-3 py-1.5 text-white/90 text-sm hover:bg-black/70 ${globalLang.lang === 'ko-KR' ? 'text-primary' : ''}`}>
          {langTxt.ko}
        </button>
        <button onClick={() => {
          setLang('ja-JP', 'jp');
        }} className={`px-3 py-1.5 text-white/90 text-sm hover:bg-black/70 ${globalLang.lang === 'ja-JP' ? 'text-primary' : ''}`}>
          {langTxt.jp}
        </button>
        <button onClick={() => {
          setLang('zh-CN', 'cn');
        }} className={`px-3 py-1.5 text-white/90 text-sm hover:bg-black/70 ${globalLang.lang === 'zh-CN' ? 'text-primary' : ''}`}>
          {langTxt.cn}
        </button>
        <button onClick={() => {
          setLang('zh-TW', 'tw');
        }} className={`px-3 py-1.5 text-white/90 text-sm hover:bg-black/70 ${globalLang.lang === 'zh-TW' ? 'text-primary' : ''}`}>
          {langTxt.tw}
        </button>
      </div>
    </div>
  );
}
