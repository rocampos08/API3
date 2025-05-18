'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';




const LottieAnimation = dynamic(() => import('./components/Lottie'), {
  ssr: false, 
});

export default function Home() {
  return (
    <>
      <LottieAnimation />
      <div className="text-center font-sans">
        <h1>Estamos construyendo lo mejor para ti 🏗️🚧</h1>
        <h2>Mientras esperas, mira estos posts que te encantarán:</h2>
        <Link href="/posts">
          <button className="p-2 m-2 rounded-2xl cursor-pointer hover:bg-amber-200 bg-blue-200 text-black">
            Ir ahora
          </button>
        </Link>
      </div>
    </>
  );
}
