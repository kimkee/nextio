import type { Metadata } from 'next';
// import localFont from "next/font/local";
import '@/app/style/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Roboto_Mono, Noto_Sans, Noto_Sans_KR } from 'next/font/google';
import { usePathname } from 'next/navigation';
export const metadata: Metadata = {
  title: 'NEXTIO',
  description: '최신 영화 정보, 리뷰, 트레일러, 인기 영화 검색 서비스. 영화 팬들을 위한 완벽한 정보 검색 앱! 방대한 영화 데이터베이스에서 영화 정보를 검색하세요. 평점, 리뷰, 감독 정보, 출연진 등 다양한 정보를 제공합니다.',
  openGraph: {
    title: 'NEXTIO',
    description: '최신 영화 정보, 리뷰, 트레일러, 인기 영화 검색 서비스. 영화 팬들을 위한 완벽한 정보 검색 앱! 방대한 영화 데이터베이스에서 영화 정보를 검색하세요. 평점, 리뷰, 감독 정보, 출연진 등 다양한 정보를 제공합니다.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}img/ogimage.png`,
        width: 1200,
        height: 630,
        alt: 'NEXTIO',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  shrinkToFit: false,
};

const noto_sans_kr = Noto_Sans_KR({ subsets: ['latin'], display: 'swap' });

import Header from '@/app/components/Header';
import Nav from '@/app/components/Nav';
import Ui from '@/app/components/Ui';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={`body ${noto_sans_kr.className} antialiased`}>
        <div className='wrap'>
          <Header />
          {props.children}
          <Nav />
        </div>
        <div id='modal-root' className='fixed z-[1000]' />
        <Ui />
        {process.env.NEXT_PUBLIC_SITE_URL === 'https://nextio.vercel.app/' && <SpeedInsights />}
        <GoogleAnalytics gaId='G-9BBCJ4KC3Z' />
        <Analytics />
      </body>
    </html>
  );
}
