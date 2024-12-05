import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NEXTIO',
    short_name: 'NEXTIO',
    description: 'NEXTIO = Supabase + Nest.js',
    start_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    display: 'standalone',
    background_color: '#1c1c1c',
    theme_color: '#1c1c1c',
    icons: [
        {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}img/favicon.ico`,
        sizes: '48x48',
        type: 'image/x-icon'
      },
      {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}img/icon_app.png`,
        type: "image/png",
        sizes: "512x512"
      }
    ],
  }
}