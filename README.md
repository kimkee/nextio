<div align="center">
  <img src="https://nextio.vercel.app/img/NEXTIO.png" alt="Next.io Logo" width="300" />
  
  <br/>

  <h3><strong>Nextio: Cinematic Content Universe</strong></h3>
  <p>A modern, highly-performant movie and TV show exploration platform powered by Next.js 14 and TMDB.</p>

  <p>
    <a href="https://nextio.vercel.app" target="_blank">View Live Demo</a>
    ·
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next JS" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB API" />
  </p>
</div>

---

## ⚡ Overview

**Nextio** is a full-stack media discovery application built with the newest **Next.js App Router** architecture. It leverages the global **TMDB Database** to fetch deep metadata for cinema and television, seamlessly integrating with **Supabase Auth & Database** for robust user progression, favorites, and real-time backend state management.

Crafted with a focus on UI/UX, the application boasts dynamic animations, infinite horizontal swipers for categorized lists, and a rich cinema-focused aesthetic.

## ✨ Key Features

- 🎟 **Real-time Media Feeds**: Fetching live trending and top-rated movies/TV shows via the TMDB API.
- 🔐 **Authentication via Supabase**: Secure session management and social/email login wrappers handled gracefully on the edge.
- 🚀 **Server-Side Rendering (SSR)**: Engineered using Next.js 14 Server-side & Client-side boundaries to achieve extreme SEO friendliness and sub-second TTL routing.
- 🎨 **Responsive & Glassmorphic UI**: High-end minimalist design powered by Tailwind CSS and custom vanilla CSS modules.
- ⚡ **Optimized Caching**: Implementation of Promise Singleton Caching for deep backend calls, completely bypassing unnecessary DB I/O drops on navigation.

## 🛠 Tech Stack

| Category | Technologies |
| --- | --- |
| **Framework** | [Next.js (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) / PostCSS |
| **Database & Auth** | [Supabase](https://supabase.io) |
| **Media Data** | [TMDB API](https://www.themoviedb.org) |
| **UI Components** | [Swiper.js](https://swiperjs.com/), FontAwesome |
| **Deployment** | [Vercel Platform](https://vercel.com/) |

## 🚀 Getting Started

If you want to run this application locally, follow these steps.

### Prerequisites

You will need `Node.js (v18+)` and a package manager (`npm`/`yarn`/`pnpm`). You also need accounts on Supabase and TMDB to issue API keys.

### 1. Clone the repository

```bash
git clone https://github.com/kimkee/nextio.git
cd nextio
```

### 2. Environment Setup

Create a `.env.local` file in the root directory and embed your API credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# TMDB Configuration
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

### 3. Installation & Run

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:9017](http://localhost:9017) with your browser to see the result.

## ⚙️ Performance Architecture Notes

To prevent UI "freezing" bugs seen in modern SPAs:
- **Streaming UI:** Routes implement `loading.tsx` `<Suspense>` boundaries to unblock the Next.js router main thread, ensuring immediate navigation transitions.
- **Node.js Runtime Target:** The default Edge Runtime was explicitly avoided on heavy client-bundled components to circumvent V8 Isolate cold-start penalties when importing large UI libraries (like Swiper). Core pages utilize Vercel's caching Node.js Serverless architecture for stable performance.
- **API Deduplication:** Database auth checking functions rely on programmatic promise-locks to prevent client components from shotgunning duplicate HTTP requests to Supabase concurrently.

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
