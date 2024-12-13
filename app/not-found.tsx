// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='container items-center justify-center'>
      <main className='flex flex-col gap-4 row-start-2 items-center'>
        <h1 className='font-bold text-center flex flex-col gap-2'>
          <span className='text-4xl'>404</span>
          <span className='text-xl'>Page Not Found</span>
        </h1>
        <p className='mt-4 text-sm'>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href='/' className='btn mt-6 text-blue-500'>
          Go back to Home
        </Link>
      </main>
    </div>
  );
}
