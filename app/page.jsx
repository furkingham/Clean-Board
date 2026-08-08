"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="w-full max-w-4xl px-6 py-28 text-center">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-14 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-500">
            CleanBoard
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300">
            Decentralized Advertising, Redefined. Bid, place, and broadcast your digital campaigns securely on-chain.
          </p>
          <div className="mt-10">
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-violet-400">
              Go to App
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
