import type { Metadata, Viewport } from 'next';
import '@/app/style/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google';
import { Noto_Sans_KR } from 'next/font/google';

const noto_sans_kr = Noto_Sans_KR({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});
const SNAME = { 
  DEV: 'NEXTIO:D',
  LOCAL: 'NEXTIO:L' ,
  PRD: 'NEXTIO'
}[process.env.NEXT_PUBLIC_ENV || 'PRD'];

export const metadata: Metadata = {
  title: SNAME,
  description: '최신 영화 정보, 리뷰, 트레일러, 인기 영화 검색 서비스. 영화 팬들을 위한 완벽한 정보 검색 앱! 방대한 영화 데이터베이스에서 영화 정보를 검색하세요. 평점, 리뷰, 감독 정보, 출연진 등 다양한 정보를 제공합니다.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nextio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: '-VkSsPm2o6T2VkeRry8QBbdER8kBPXLvQeqGf2QzSdw',
  },
  openGraph: {
    title: 'NEXTIO',
    description: '최신 영화 정보, 리뷰, 트레일러, 인기 영화 검색 서비스. 영화 팬들을 위한 완벽한 정보 검색 앱! 방대한 영화 데이터베이스에서 배급사, 평점, 리뷰, 감독 정보, 출연진 등 다양한 정보를 제공합니다.',
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
    locale: 'ko_KR',
    type: 'website',
  },
};

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

export default function RootLayout(props: { children: React.ReactNode }) {
  const isVercel = process.env.NEXT_PUBLIC_SITE_URL === 'https://nextio.vercel.app/';
  const isProd = process.env.NODE_ENV === 'production';

  return (
    <html lang='ko' className={`${noto_sans_kr.variable}`}>
      <head>
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#1c1c1c" />
      </head>
      <body className={`body ${noto_sans_kr.className} antialiased`}>
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
