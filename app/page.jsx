"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001f3f] via-[#00122a] to-black flex items-center justify-center">
      <div className="w-full max-w-4xl px-6 py-32 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-500">
            CleanBoard
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300">
            Decentralized Advertising, Redefined. Bid, Place, and Broadcast on the Monad Network.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold shadow-2xl transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Go to Dashboard"
            >
              Go to App
            </Link>

            <a
              href="https://github.com/furkingham/Clean-Board"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300 transition"
            >
              View Repo
            </a>
          </div>

          <div className="mt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300">
              <svg className="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 8l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 16l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Monad Testnet · Simulated bidding UI</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
