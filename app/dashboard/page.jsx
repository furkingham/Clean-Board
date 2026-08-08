"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const initialAuctions = [
    { id: 1, title: "Times Square Billboard", topBid: 3.2, endsIn: "2h 13m" },
    { id: 2, title: "Downtown LED Wall", topBid: 1.75, endsIn: "5h 40m" },
    { id: 3, title: "Mall Atrium Display", topBid: 0.9, endsIn: "1d 3h" },
  ];

  const [auctions, setAuctions] = useState(initialAuctions);
  const [walletConnected, setWalletConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [activeBidAuction, setActiveBidAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [txProcessing, setTxProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  function simulateConnectWallet() {
    setConnecting(true);
    setTimeout(() => {
      setWalletConnected(true);
      setConnecting(false);
      setToast({ type: "success", message: "Wallet connected (simulated)" });
    }, 2000);
  }

  function openBidModal(auction) {
    setActiveBidAuction(auction);
    setBidAmount(String((auction.topBid + 0.1).toFixed(2)));
  }

  function closeBidModal() {
    setActiveBidAuction(null);
    setBidAmount("");
  }

  function submitBid() {
    if (!walletConnected) {
      setToast({ type: "error", message: "Please connect your wallet first" });
      return;
    }

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= activeBidAuction.topBid) {
      setToast({ type: "error", message: "Enter a valid bid higher than the top bid" });
      return;
    }

    setTxProcessing(true);
    setTimeout(() => {
      setTxProcessing(false);
      setAuctions(prev => prev.map(a => (a.id === activeBidAuction.id ? { ...a, topBid: amount } : a)));
      closeBidModal();
      setToast({ type: "success", message: "Bid confirmed on Monad (simulated)" });
    }, 3500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001f3f] via-[#00122a] to-black text-slate-100">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-200 hover:opacity-90">
          ← Back
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-400 mr-4">CleanBoard · Dashboard</div>

          <button
            onClick={() => {
              if (walletConnected) {
                setWalletConnected(false);
                setToast({ type: "info", message: "Wallet disconnected (simulated)" });
              } else {
                simulateConnectWallet();
              }
            }}
            className={`px-4 py-2 rounded-md font-medium transition ${
              walletConnected
                ? "bg-emerald-600 hover:bg-emerald-500"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {connecting ? "Connecting..." : walletConnected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <section className="text-center pt-6 pb-10">
          <h2 className="text-4xl font-bold">Live Auctions</h2>
          <p className="mt-3 text-slate-400">Place bids on premium billboard slots across the Monad Network (simulated).</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map(auction => (
            <div key={auction.id} className="bg-white/3 border border-white/5 rounded-xl p-5">
              <h3 className="text-xl font-semibold">{auction.title}</h3>
              <p className="mt-2 text-sm text-slate-300">Ends in: {auction.endsIn}</p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Top Bid</div>
                  <div className="text-lg font-medium">{auction.topBid} MON</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openBidModal(auction)}
                    disabled={!walletConnected}
                    className={`px-4 py-2 rounded-md font-semibold transition ${
                      walletConnected
                        ? "bg-violet-600 hover:bg-violet-500 text-white"
                        : "bg-slate-700 text-slate-400 cursor-not-allowed"
                    }`}
                    title={!walletConnected ? "Connect wallet to place a bid" : `Place bid on ${auction.title}`}
                  >
                    Place Bid
                  </button>
                </div>
              </div>

              {!walletConnected && (
                <div className="mt-3 text-xs text-amber-300">Please connect your wallet to enable bidding.</div>
              )}
            </div>
          ))}
        </section>
      </main>

      {activeBidAuction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeBidModal} aria-hidden />

          <div className="relative bg-[#061726] border border-white/6 rounded-xl p-6 w-full max-w-md mx-4">
            <h4 className="text-lg font-semibold">Place Bid — {activeBidAuction.title}</h4>
            <p className="mt-2 text-sm text-slate-300">Current top bid: {activeBidAuction.topBid} MON</p>

            <div className="mt-4">
              <label className="block text-xs text-slate-300 mb-2">Your Bid (MON)</label>
              <input
                type="number"
                step="0.01"
                min={(activeBidAuction.topBid + 0.01).toFixed(2)}
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/6 text-white focus:outline-none"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={closeBidModal}
                className="px-4 py-2 rounded-md bg-transparent border border-white/6 text-slate-300 hover:bg-white/2"
                disabled={txProcessing}
              >
                Cancel
              </button>

              <button
                onClick={submitBid}
                disabled={txProcessing}
                className={`px-4 py-2 rounded-md font-semibold ${
                  txProcessing ? "bg-slate-600 text-slate-300 cursor-wait" : "bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
              >
                {txProcessing ? "Processing..." : "Confirm Bid"}
              </button>
            </div>
          </div>
        </div>
      )}

      {txProcessing && (
        <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-70 bg-[#071827] border border-white/6 rounded-lg px-6 py-4 flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
            <div>
              <div className="text-sm font-medium">Confirming Transaction...</div>
              <div className="text-xs text-slate-400">This simulates blockchain confirmation on Monad Testnet.</div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed right-6 bottom-6 z-50">
          <div
            className={`px-4 py-3 rounded-md shadow-lg ${
              toast.type === "success"
                ? "bg-emerald-600 text-white"
                : toast.type === "error"
                ? "bg-rose-600 text-white"
                : "bg-sky-600 text-white"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
