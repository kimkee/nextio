import { Modal } from "../../../modal";

export default async function TvModal({
  params,
}: {
  params: Promise<{ id: string, cate: string, opts: string }>;
}) {
  const id = (await params).id;
  const cate = (await params).cate;
  const opts = (await params).opts;
  return <Modal>Tv / 장르 : {cate} / 영상:{id}</Modal>;
}
