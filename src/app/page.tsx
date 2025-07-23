'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center font-sans p-4">
      <h1 className="text-2xl mb-2">¡Algo increíble está en camino! 🚀</h1>
      <h2 className="text-lg mb-4">Estos posts te encantarán:</h2>
      <Link href="/posts">
        <button className="p-2 m-2 rounded-2xl cursor-pointer hover:bg-amber-200 bg-blue-200 text-black">
          Ir a los posts
        </button>
      </Link>
    </div>
  );
}
