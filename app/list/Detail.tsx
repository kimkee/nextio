import DetailClient from './DetailClient';

export default function Detail({
  params,
}: {
  params: { opts: string; id: string };
}) {
  return <DetailClient opts={params.opts} postID={params.id} />;
}
