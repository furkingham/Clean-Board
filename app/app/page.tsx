"use client";

import { useState } from 'react';
import Link from 'next/link';

const auctions = [
  {
    title: 'Sports Platform Right Banner',
    location: 'Right Sidebar Ad',
    deadline: '2 days left',
    minBid: '0.25 ETH',
    traffic: '180K+ impressions',
  },
  {
    title: 'Tech Blog Top Banner',
    location: 'Top Header Ad',
    deadline: '5 hours left',
    minBid: '0.18 ETH',
    traffic: '95K+ impressions',
  },
  {
    title: 'Magazine Left Banner',
    location: 'Left Sidebar Ad',
    deadline: '1 day 3 hours',
    minBid: '0.22 ETH',
    traffic: '132K+ impressions',
  },
];

export default function AppPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [tooltip, setTooltip] = useState('');
  const [selectedAuction, setSelectedAuction] = useState<typeof auctions[0] | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  const handleConnect = () => setWalletConnected(true);

  const showTooltip = (message: string) => {
    setTooltip(message);
    setTimeout(() => setTooltip(''), 3000);
  };

  const openBidModal = (auction: typeof auctions[0]) => {
    if (!walletConnected) {
      showTooltip('Please connect your wallet first from the top right');
      return;
    }

    setSelectedAuction(auction);
    setBidAmount('');
  };

  const closeBidModal = () => {
    if (isSubmitting) return;
    setSelectedAuction(null);
    setBidAmount('');
  };

  const handleSubmitBid = () => {
    if (!selectedAuction || !bidAmount || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedAuction(null);
      setToast('Bid submitted successfully');
      setTimeout(() => setToast(''), 3500);
    }, 3400);
  };

  return (
    <main className="min-h-screen bg-[#020617] px-6 py-6 sm:px-10 lg:px-16">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] border border-slate-800/80 bg-slate-950/80 px-6 py-5 shadow-glow shadow-slate-900/50 backdrop-blur-xl sm:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-sky-300/70">CleanBoard</p>
          <p className="mt-1 text-xs text-slate-400">Decentralized billboard auction experience</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-2 text-sm text-slate-300 shadow-inner shadow-black/20">
            {walletConnected ? <span className="text-emerald-300">Wallet Connected</span> : <span className="text-rose-300">Wallet Disconnected</span>}
          </div>
          <button
            onClick={handleConnect}
            className="rounded-full bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
          >
            Connect Wallet
          </button>
        </div>
      </nav>

      <section className="mx-auto mt-10 flex max-w-7xl flex-col gap-8 lg:gap-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-800/80 bg-[#0d1321]/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-sky-300/80">Active Auctions</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Web3 billboard auctions for the Monad era.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Discover premium ad inventory, place bids in a secure auction flow, and bring your campaigns to life with a polished decentralized dashboard.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-slate-800/80 bg-[#11203c]/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="rounded-[1.75rem] bg-slate-950/90 p-6 text-slate-200 shadow-inner shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Launch Guide</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Connect, bid, upload, preview.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Every action is designed for judges to feel the speed and confidence of a premium Web3 advertising product.
              </p>
            </div>

            <div className="mt-6 space-y-4 rounded-[1.75rem] border border-slate-800/80 bg-slate-950/80 p-6 text-slate-200">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Why CleanBoard?</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Fast Monad Testnet auction flow</li>
                  <li>• Wallet-based bidding access</li>
                  <li>• Premium dark interface with modern motion</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {auctions.map((auction) => (
            <article
              key={auction.title}
              onClick={() => openBidModal(auction)}
              className="group cursor-pointer overflow-hidden rounded-[2rem] border border-slate-800/80 bg-[#081123] p-6 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#0f1a34]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{auction.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{auction.location}</p>
                </div>
                <span className="rounded-full bg-slate-800/90 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-300/90">
                  {auction.deadline}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] bg-slate-950/90 p-4 text-sm text-slate-300">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Minimum Bid</p>
                  <p className="mt-2 text-lg font-semibold text-white">{auction.minBid}</p>
                </div>
                <div className="rounded-[1.75rem] bg-slate-950/90 p-4 text-sm text-slate-300">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Impressions</p>
                  <p className="mt-2 text-lg font-semibold text-white">{auction.traffic}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openBidModal(auction);
                  }}
                  disabled={!walletConnected}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${walletConnected ? 'bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20 hover:from-violet-400 hover:to-cyan-300' : 'cursor-not-allowed bg-slate-700 text-slate-400 opacity-60'}`}
                >
                  Place Bid
                </button>
                <span className="text-sm text-slate-400">Boost your brand presence instantly.</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedAuction ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2rem] border border-slate-800/90 bg-[#081524] p-8 shadow-2xl shadow-black/40">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Auction Details</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">{selectedAuction.title}</h2>
                <p className="mt-2 text-sm text-slate-400">Current minimum bid: {selectedAuction.minBid}</p>
              </div>
              <button
                type="button"
                onClick={closeBidModal}
                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <div className="rounded-[1.75rem] bg-slate-950/90 p-6">
                <p className="text-sm text-slate-400">
                  Enter your bid amount in ETH to participate in the Monad auction. The system will simulate a secure transaction experience.
                </p>
                <label className="mt-6 block text-sm font-semibold text-slate-200">Your Bid</label>
                <div className="mt-3 flex gap-3">
                  <input
                    value={bidAmount}
                    onChange={(event) => setBidAmount(event.target.value)}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder={selectedAuction.minBid}
                    className="w-full rounded-[1.5rem] border border-slate-700/80 bg-[#071023] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <span className="inline-flex items-center rounded-[1.5rem] bg-slate-800/90 px-4 text-sm text-slate-300">ETH</span>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-slate-950/90 p-6 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-200">Auction status</span>
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-cyan-300">Live</span>
                </div>
                <p className="mt-3 text-slate-400">A premium loading state will run to simulate network confirmation on the Monad Testnet.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleSubmitBid}
                disabled={!bidAmount || isSubmitting}
                className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition sm:w-auto ${bidAmount && !isSubmitting ? 'bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20 hover:from-violet-400 hover:to-cyan-300' : 'cursor-not-allowed bg-slate-700 text-slate-400 opacity-60'}`}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Confirming Transaction...
                  </span>
                ) : (
                  'Submit Bid'
                )}
              </button>
              <button
                type="button"
                onClick={closeBidModal}
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {tooltip ? (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-950/95 px-5 py-3 text-sm text-slate-100 shadow-2xl shadow-slate-950/40 ring-1 ring-cyan-400/20">
          {tooltip}
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50 rounded-full bg-emerald-500/95 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-500/30 ring-1 ring-emerald-200/30">
          {toast}
        </div>
      ) : null}
    </main>
  );
}
