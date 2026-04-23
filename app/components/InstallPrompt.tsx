'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<Event | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!deferred) return;
    // @ts-ignore – the event has .prompt()
    (deferred as any).prompt();
    // @ts-ignore – capture user choice
    const { outcome } = await (deferred as any).userChoice;
    console.log('PWA install outcome:', outcome);
    setShow(false);
    setDeferred(null);
  };

  if (!show) return null;
  return (
    <button onClick={install} title='앱 설치'
      className="
        bt pressed gap-1 h-8 inline-flex items-center justify-center text-white hover:text-primary!
        px-2 rounded-sm
    ">
      <FontAwesomeIcon icon={['fas', 'download']} className='w-4 h-4 flex' />
      <span className="text-sm sr-only">앱 설치</span>
    </button>
  );
}
