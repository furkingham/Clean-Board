"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // trigger entrance animation after mount
    setEntered(true);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-[#020617] via-[#030823] to-[#00030a] text-white overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid" />

      <div className="container mx-auto px-6 text-center">
        <h1 className={`mx-auto max-w-4xl text-6xl font-extrabold tracking-tight sm:text-7xl ${entered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} transition-all duration-700`}>CleanBoard</h1>

        <p className={`mt-6 text-xl text-slate-300 ${entered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} transition-all duration-800 delay-150`}>Decentralized Advertising, Redefined.</p>

        <p className={`mt-4 max-w-2xl mx-auto text-sm text-slate-400 ${entered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} transition-all duration-900 delay-250`}>Bid on premium billboard inventory, upload creatives, and preview live placements — all secured on the Monad Testnet.</p>

        <div className={`mt-12 ${entered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} transition-all duration-1000 delay-350`}>
          <Link href="/app">
            <a className="inline-block rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-10 py-4 text-lg font-semibold text-black shadow-2xl shadow-cyan-500/30 hover:scale-[1.02] transition-transform">
              Go to App
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
}
