import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ id: string; cate: string; opts: string }>;
};

export default async function View({ params }: Props) {
  const { id, opts } = await params;
  redirect(`/${opts}/${id}`);
}
