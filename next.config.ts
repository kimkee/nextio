import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
});

const baseConfig: NextConfig = {
  // Empty Turbopack config to silence the warning
  turbopack: {},
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/home',
      //   permanent: true, // 영구 리다이렉션 (301), 임시 리다이렉션으로 하려면 false로 설정 (307)
      // },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Seoul',
    }).format(new Date()).replace('오후', 'PM').replace('오전', 'AM'),
  },
  // 추가적인 설정 옵션을 여기에 추가할 수 있습니다
};

export default withPWA(baseConfig);

// Silence Turbopack warning – we rely on a webpack‑based plugin (next‑pwa)
// An empty turbopack config tells Next.js we are aware of the mismatch.
export const turbopack = {};

