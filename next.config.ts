import type { NextConfig } from "next";
import withPWA from 'next-pwa';

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
  // 추가적인 설정 옵션을 여기에 추가할 수 있습니다
};

const nextConfig = withPWA({
  ...baseConfig,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    // optional runtime caching can be added here
  },
});

export default nextConfig;

// Silence Turbopack warning – we rely on a webpack‑based plugin (next‑pwa)
// An empty turbopack config tells Next.js we are aware of the mismatch.
export const turbopack = {};

