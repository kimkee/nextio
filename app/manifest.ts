import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const ENV = !(process.env.NEXT_PUBLIC_ENV == 'PRD') ? ':'+process.env.NEXT_PUBLIC_ENV : '';
  return {
    name: `NEXTIO${ENV}`,
    short_name: `NEXTIO${ENV}`,
    description: 'NEXTIO = Supabase + Nest.js',
    start_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    scope: '/',
    orientation: 'portrait',
    display: 'standalone',
    background_color: '#1c1c1c',
    theme_color: '#1c1c1c',
    icons: [
        {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/img/favicon.ico`,
        sizes: '48x48',
        type: 'image/x-icon'
      },
      {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/img/icon_app.png`,
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/img/icon_app.png`,
        type: "image/png",
        sizes: "512x512"
      }
    ],
  }
}