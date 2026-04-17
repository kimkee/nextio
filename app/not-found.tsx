// app/not-found.tsx
import { Suspense } from 'react';
import NotFoundContent from './components/NotFoundContent';

export default function NotFound() {
  return (
    <Suspense fallback={null}>
      <NotFoundContent />
    </Suspense>
  );
}
