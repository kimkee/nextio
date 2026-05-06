import type { MetadataRoute } from 'next'
import { version } from '../package.json'

type AppManifest = MetadataRoute.Manifest & { version: string };

export default function manifest(): AppManifest {
  const ENV = !(process.env.NEXT_PUBLIC_ENV == 'PRD') ? ':'+process.env.NEXT_PUBLIC_ENV : '';
  return {
    name: `NEXTIO${ENV}`,
    short_name: `NEXTIO${ENV}`,
    version: `v${version}`,
    description: 'The Latest Movie Information Service',
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
  } as unknown as MetadataRoute.Manifest & { version: string };
}