import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/app/supabase'; 
import { Provider } from '@supabase/supabase-js';

export const runtime = 'edge';
export default function Home() {



  return (
    
      <div className="container page home">
        <main className="contents">
          <h2>Home</h2>
        </main>
      </div>
    
  );
}
