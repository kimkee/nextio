import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import '@/app/style/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google';
import { Noto_Sans_KR, Noto_Sans, Noto_Sans_JP, Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google';

const noto_sans_kr = Noto_Sans_KR({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});
const noto_sans_en = Noto_Sans({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-en',
});
const noto_sans_jp = Noto_Sans_JP({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});
const noto_sans_sc = Noto_Sans_SC({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-sc',
});
const noto_sans_tc = Noto_Sans_TC({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-tc',
});
import { getLang, getTranslation } from '@/app/lib/lang';

const SNAME = { 
  DEV: 'NEXTIO:D',
  LOCAL: 'NEXTIO:L' ,
  PRD: 'NEXTIO'
}[process.env.NEXT_PUBLIC_ENV || 'PRD'];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslation();
  
  return {
    title: SNAME,
    description: t.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nextio.vercel.app'),
    alternates: {
      canonical: '/',
    },
    verification: {
      google: '-VkSsPm2o6T2VkeRry8QBbdER8kBPXLvQeqGf2QzSdw',
    },
    openGraph: {
      title: t.title || 'NEXTIO',
      description: t.description,
      url: './',
      siteName: 'NEXTIO',
      images: [
        {
          url: '/img/ogimage.png',
          width: 1200,
          height: 630,
          alt: 'NEXTIO',
        },
      ],
      locale: 'ko_KR', // Note: could also be dynamic if needed
      type: 'website',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
};

import Header from '@/app/components/Header';
import Nav from '@/app/components/Nav';
import Ui from '@/app/components/Ui';
import Popup from '@/app/components/Popup';
import RouteTracker from '@/app/components/RouteTracker';
import { Suspense } from 'react';

export default async function RootLayout(props: { children: React.ReactNode }) {
  const isVercel = process.env.NEXT_PUBLIC_SITE_URL === 'https://nextio.vercel.app';
  const isProd = process.env.NEXT_PUBLIC_ENV === 'PRD';

  const lang = await getLang();
  const fontSet = (l:string)=>{
    switch(l){
      case 'ko': return noto_sans_kr;
      case 'en': return noto_sans_en;
      case 'jp': return noto_sans_jp;
      case 'cn': return noto_sans_sc;
      case 'tw': return noto_sans_tc;
      default: return noto_sans_kr;
    }
  }
  return (
    <html lang={lang} className={`${fontSet(lang).variable}`}>
      <head>
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
        <meta name="theme-color" content="#1c1c1c" />
      </head>
      <body className={`body ${fontSet(lang).className} antialiased`}>
        <Suspense fallback={null}>
          <RouteTracker />
          <Popup />
        </Suspense>
        <div className='wrap'>
          <Header />
          {props.children}
          <Nav />
        </div>
        <div id='modal-root' className='fixed z-1000' />
        <Ui />
        {isProd && (
          <>
            {isVercel ? <SpeedInsights /> : <GoogleAnalytics gaId='G-9BBCJ4KC3Z' />}
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}
