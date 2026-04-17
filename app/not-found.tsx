// app/not-found.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import NotFoundContent from './components/NotFoundContent';

export default function NotFound() {
  const router = useRouter();
  return (
    <Suspense fallback={null}>
      <NotFoundContent />
    </Suspense>
  );
}
