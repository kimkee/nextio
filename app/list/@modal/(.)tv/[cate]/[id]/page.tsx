import Detail from "@/app/list/Detail";
import { Modal } from '@/app/components/Modal';
export const runtime = 'edge';
export default async function TvModal({
  params,
}: {
  params: Promise<{ id: string, cate: string, opts: string }>;
}) {
  const id = (await params).id;
  const opts = 'tv';
  return (
    <Modal>
      {/* <div className="block">Tv / 장르 : {cate} / 영상:{id}</div> */}
      <Detail params={{ opts, id }} />
    </Modal>
  );
}
