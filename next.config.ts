import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/home',
      //   permanent: true, // 영구 리다이렉션 (301), 임시 리다이렉션으로 하려면 false로 설정 (307)
      // },
    ];
  },
  // 추가적인 설정 옵션을 여기에 추가할 수 있습니다
};

export default nextConfig;
