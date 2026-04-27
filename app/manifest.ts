import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const ENV = !(process.env.NEXT_PUBLIC_ENV == 'PRD') ? ':'+process.env.NEXT_PUBLIC_ENV : '';
  return {
    name: `NEXTIO${ENV}`,
    short_name: `NEXTIO${ENV}`,
    description: '최신 영화 정보 서비스 NEXTIO',
    start_url: '/',
    scope: '/',
    orientation: 'portrait',
    display: 'standalone',
    background_color: '#1c1c1c',
    theme_color: '#1c1c1c',
    icons: [
      {
        src: '/img/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      },
      {
        src: '/img/icon_app.png',
        type: "image/png",
        sizes: "192x192",
        purpose: "maskable"
      },
      {
        src: '/img/icon_app.png',
        type: "image/png",
        sizes: "512x512",
        purpose: "any"
      }
    ],
  }
}