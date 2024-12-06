import { Modal } from "../../../modal";
export const runtime = 'edge';
export default async function MovieModal({
  params,
}: {
  params: Promise<{ id: string, cate: string, opts: string }>;
}) {
  const id = (await params).id;
  const cate = (await params).cate;
  const opts = (await params).opts;
  return <Modal>Movie / 장르 : {cate} / 영상:{id}</Modal>;
}
