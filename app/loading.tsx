import Loading from '@/app/components/Loading';

export default function RootLoading() {
  return (
    <div className='container'>
      <main className='flex items-center justify-center min-h-screen relative z-50 bg-black/60'>
        <Loading opts={{ type: 'glx', cls: 'full' }} />
      </main>
    </div>
  );
}
