"use client";
import { useEffect } from 'react';
import ui from '@/app/lib/ui';

export default function Ui() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      ui.init();
    }
  }, []);

  return null; // UI를 추가할 수 있습니다.
}
