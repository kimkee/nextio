import Link from 'next/link';

export default function Page() {
  const photos = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <main className="flex flex-col items-center justify-center flex-1 p-6">
      {photos.map((id) => (
        <Link className="card" key={id} href={`/test/photos/${id}`} passHref>
          {id}
        </Link>
      ))}
    </main>
  );
}
