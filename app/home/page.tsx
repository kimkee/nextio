import React, { useState, useEffect, useRef } from 'react';
import '@/app/fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const runtime = 'edge';
export default function Home() {



  return (
    
      <div className="container page home">
        <main className="contents">
          <h2><FontAwesomeIcon icon="house" /> Home </h2>
        </main>
      </div>
    
  );
}
