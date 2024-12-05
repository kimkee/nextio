"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams  } from 'next/navigation';
import { supabase } from '@/app/supabase'; 
import { Provider } from '@supabase/supabase-js';


export default function Callback() {


  return (
    <div className="container items-center justify-center">
      <main className="flex flex-col gap-8 row-start-2 items-center">
          Callback         
      </main>
    </div>
  );
}
