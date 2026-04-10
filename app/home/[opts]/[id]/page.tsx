import { redirect } from 'next/navigation';

export const runtime = 'edge';
export const dynamicParams = false;

export default async function View({
  params,
}: {
  params: Promise<{ id: string; cate: string; opts: string }>;
}) {
  const id = (await params).id;
  const opts = (await params).opts;

  redirect(`/${opts}/${id}`);
}
