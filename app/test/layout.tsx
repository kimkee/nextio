import '@/app/globals.scss';

export const metadata = { title: 'NextGram', description: 'A sample Next.js app' };

export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="container">
        {props.children}
        {props.modal}
      </div>
      <div id="modal-root" />
    </>
  );
}
