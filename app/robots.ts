import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextio.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/user/',
        '/callback/',
        '/search/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
