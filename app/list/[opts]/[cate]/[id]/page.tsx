import Detail from '@/app/list/Detail';

type Props = {
  params: Promise<{ id: string; cate: string; opts: string }>;
};

export default async function View({ params }: Props) {
  const { id, opts } = await params;

  return (
    <div className='container'>
      <main className='contents'>
        <Detail params={{ opts, id }} />
      </main>
    </div>
  );
}
