import Detail from "@/app/list/Detail";
import { Modal } from "../../../modal";
export const runtime = 'edge';
export default async function TvModal({
  params,
}: {
  params: Promise<{ id: string, cate: string, opts: string }>;
}) {
  const id = (await params).id;
  const cate = (await params).cate;
  const opts = (await params).opts;
  return (
    <Modal>
      <div className="block">Tv / 장르 : {cate} / 영상:{id}</div>
      <Detail params={{ opts, cate, id }} />
    </Modal>
  );
}
