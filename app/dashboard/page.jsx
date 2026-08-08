"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

// ===== PROVIDER HELPERS =====
// When multiple wallets are installed they all inject into window.ethereum.
// We need to find the *real* MetaMask provider, not the one Phantom hijacked.
function getMetaMaskProvider() {
  if (typeof window === "undefined") return null;

  // Multi-wallet: each extension registers itself in the providers array
  if (Array.isArray(window.ethereum?.providers)) {
    const mm = window.ethereum.providers.find(
      (p) => p.isMetaMask && !p.isPhantom
    );
    return mm ?? null;
  }

  // Single wallet: make sure it is actually MetaMask and not Phantom
  if (window.ethereum?.isMetaMask && !window.ethereum?.isPhantom) {
    return window.ethereum;
  }

  return null;
}

// ===== CONSTANTS =====
const MONAD_TESTNET_CHAIN_ID = "0x279F";
const MONAD_TESTNET_PARAMS = {
  chainId: MONAD_TESTNET_CHAIN_ID,
  chainName: "Monad Testnet",
  nativeCurrency: {
    name: "Testnet MON Token",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: ["https://testnet-rpc.monad.xyz"],
  blockExplorerUrls: ["https://testnet.monadexplorer.com"],
};

const AUCTION_TEMPLATES = [
  { id: 1, title: "Times Square Billboard", category: "Urban Out-Of-Home" },
  { id: 2, title: "Downtown LED Wall", category: "City Center Display" },
  { id: 3, title: "Mall Atrium Display", category: "Retail Footfall" },
  { id: 4, title: "Science Journal Sidebar Banner", category: "Science Media" },
  { id: 5, title: "Art Gallery Top Banner", category: "Arts & Culture" },
];

const AUCTION_FEATURES = [
  { endsIn: "2h 12m", minBid: 1.8, topBid: 3.2, impressions: 215000 },
  { endsIn: "5h 40m", minBid: 1.2, topBid: 1.75, impressions: 132400 },
  { endsIn: "14h 05m", minBid: 0.9, topBid: 0.95, impressions: 82000 },
  { endsIn: "8h 20m", minBid: 0.7, topBid: 1.05, impressions: 98000 },
  { endsIn: "1d 04h", minBid: 0.55, topBid: 0.72, impressions: 67000 },
];

const getInitialAuctions = () =>
  AUCTION_TEMPLATES.map((item, index) => ({
    ...item,
    ...AUCTION_FEATURES[index],
    ethRate: (AUCTION_FEATURES[index].topBid * 0.98).toFixed(2),
  }));

// ===== WALLET SELECTOR MODAL =====
function WalletSelectorModal({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative z-10 w-[340px] rounded-2xl bg-[#0d0d0d] border border-white/10 shadow-2xl p-6 flex flex-col items-center text-white">
        {/* Icons */}
        <div className="flex items-center gap-4 mb-5">
          <span style={{ fontSize: "2.6rem" }}>👻</span>
          <span style={{ fontSize: "2.6rem" }}>🦊</span>
        </div>

        <h2 className="text-2xl font-bold text-center leading-snug mb-7">
          Which extension do you<br />want to connect with?
        </h2>

        {/* MetaMask button */}
        <button
          id="wallet-select-metamask"
          type="button"
          onClick={() => onSelect("metamask")}
          className="w-full mb-3 py-3 rounded-full bg-[#1a1a1a] border border-white/10 text-white font-semibold text-base hover:bg-white/10 transition"
        >
          Use MetaMask
        </button>

        {/* Phantom button */}
        <button
          id="wallet-select-phantom"
          type="button"
          onClick={() => onSelect("phantom")}
          className="w-full py-3 rounded-full font-semibold text-base transition"
          style={{
            background: "linear-gradient(135deg, #ab9ff2 0%, #7b5ea7 100%)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(171,159,242,0.35)",
          }}
        >
          Use Phantom
        </button>

        {/* Don't ask again hint */}
        <p className="mt-5 text-xs text-slate-500 text-center">
          Configurable in Settings → Default App Wallet.
        </p>
      </div>
    </div>
  );
}

// ===== COMPONENT =====
export default function Dashboard() {
  const [auctions, setAuctions] = useState(getInitialAuctions);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState(""); // "metamask" | "phantom"
  const [chainId, setChainId] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [activeBidAuction, setActiveBidAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [txProcessing, setTxProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  // ===== DERIVED STATE =====
  const isConnected = useMemo(() => Boolean(walletAddress), [walletAddress]);
  const isCorrectNetwork = useMemo(
    () => walletType === "phantom" || chainId === MONAD_TESTNET_CHAIN_ID,
    [walletType, chainId]
  );
  // Bid only requires a connected wallet — network mismatch shows a warning but doesn't block
  const canBid = useMemo(() => isConnected, [isConnected]);
  const displayAddress = useMemo(
    () =>
      walletAddress
        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Wallet Disconnected",
    [walletAddress]
  );

  // ===== ETHEREUM EVENT LISTENERS (MetaMask) =====
  useEffect(() => {
    const provider = getMetaMaskProvider();
    if (!provider) return;

    const handleAccountsChanged = (accounts) => {
      if (walletType === "metamask") {
        setWalletAddress(accounts.length > 0 ? accounts[0] : "");
      }
    };

    const handleChainChanged = (chain) => {
      if (walletType === "metamask") {
        setChainId(chain);
      }
    };

    provider.request({ method: "eth_chainId" }).then(handleChainChanged).catch(() => {});
    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);

    return () => {
      if (provider?.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [walletType]);

  // ===== TOAST AUTO-DISMISS =====
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timeout);
  }, [toast]);

  // ===== WALLET FUNCTIONS =====
  const ensureMonadTestnet = useCallback(async (provider) => {
    if (!provider) return false;

    try {
      const currentChain = await provider.request({ method: "eth_chainId" });
      setChainId(currentChain);
      if (currentChain === MONAD_TESTNET_CHAIN_ID) return true;

      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: MONAD_TESTNET_CHAIN_ID }],
      });
      setChainId(MONAD_TESTNET_CHAIN_ID);
      return true;
    } catch (error) {
      if (error?.code === 4902 || error?.data?.originalError?.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [MONAD_TESTNET_PARAMS],
          });
          setChainId(MONAD_TESTNET_CHAIN_ID);
          return true;
        } catch (addError) {
          return false;
        }
      }
      return false;
    }
  }, []);

  const connectMetaMask = useCallback(async () => {
    const provider = getMetaMaskProvider();
    if (!provider) {
      setToast({ type: "error", message: "MetaMask not found. Please install the MetaMask extension." });
      return;
    }

    setConnecting(true);
    try {
      // wallet_requestPermissions always opens the MetaMask account-picker popup,
      // even if the site already has a saved permission — so the user can choose
      // a different account each time.
      await provider.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      // After the user approves, fetch the selected account
      const accounts = await provider.request({ method: "eth_accounts" });
      const address = accounts?.[0] ?? "";
      if (!address) {
        setToast({ type: "error", message: "No wallet account was returned." });
        return;
      }

      // Always set the wallet address first — connection is independent of network
      setWalletAddress(address);
      setWalletType("metamask");

      // Attempt network switch non-blocking — warn but do NOT prevent connection
      const networkOk = await ensureMonadTestnet(provider);
      if (!networkOk) {
        setToast({ type: "info", message: "MetaMask connected. Please switch to Monad Testnet for full functionality." });
      } else {
        setToast({ type: "success", message: "MetaMask connected on Monad Testnet." });
      }
    } catch (error) {
      setToast({ type: "error", message: "MetaMask connection rejected or failed." });
    } finally {
      setConnecting(false);
    }
  }, [ensureMonadTestnet]);

  const connectPhantom = useCallback(async () => {
    if (typeof window === "undefined") return;

    // Phantom injects window.solana; if not found, prompt installation
    const phantom = window.phantom?.solana ?? window.solana;

    if (!phantom || !phantom.isPhantom) {
      setToast({ type: "error", message: "Phantom wallet not found. Please install the Phantom extension." });
      return;
    }

    setConnecting(true);
    try {
      const response = await phantom.connect();
      const address = response.publicKey.toString();
      setWalletAddress(address);
      setWalletType("phantom");
      setToast({ type: "success", message: "Phantom wallet connected." });
    } catch (error) {
      setToast({ type: "error", message: "Phantom connection rejected or failed." });
    } finally {
      setConnecting(false);
    }
  }, []);

  // Called when user picks a wallet from the modal
  const handleWalletSelect = useCallback(
    async (type) => {
      setShowWalletSelector(false);
      if (type === "metamask") {
        await connectMetaMask();
      } else if (type === "phantom") {
        await connectPhantom();
      }
    },
    [connectMetaMask, connectPhantom]
  );

  const disconnectWallet = useCallback(() => {
    // Disconnect Phantom gracefully if it was used
    if (walletType === "phantom") {
      const phantom = window.phantom?.solana ?? window.solana;
      phantom?.disconnect().catch(() => {});
    }
    setWalletAddress("");
    setWalletType("");
    setChainId("");
    setToast({ type: "info", message: "Wallet disconnected." });
  }, [walletType]);

  // ===== BID MODAL FUNCTIONS =====
  const openBidModal = useCallback(
    (auction) => {
      if (!isConnected) {
        setToast({ type: "error", message: "Please connect your wallet first to place a bid." });
        return;
      }
      setActiveBidAuction(auction);
      setBidAmount(String((auction.topBid + 0.1).toFixed(2)));
    },
    [isConnected]
  );

  const closeBidModal = useCallback(() => {
    setActiveBidAuction(null);
    setBidAmount("");
  }, []);

  const submitBid = useCallback(() => {
    if (!isConnected) {
      setToast({ type: "error", message: "Please connect your wallet first to place a bid." });
      return;
    }

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= activeBidAuction.topBid) {
      setToast({ type: "error", message: "Enter a valid bid higher than the top bid." });
      return;
    }

    setTxProcessing(true);
    setTimeout(() => {
      setTxProcessing(false);
      setAuctions((prev) =>
        prev.map((a) => (a.id === activeBidAuction.id ? { ...a, topBid: amount } : a))
      );
      closeBidModal();
      setToast({ type: "success", message: "Bid confirmed on Monad (simulated)." });
    }, 3500);
  }, [isConnected, bidAmount, activeBidAuction, closeBidModal]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001f3f] via-[#00122a] to-black text-slate-100">
      <header className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-200 hover:opacity-90">
          ← Back
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Wallet badge – show wallet type icon when connected */}
          <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-2 text-sm font-medium text-slate-200 ring-1 ring-white/10">
            {isConnected && (
              <span style={{ fontSize: "1rem" }}>
                {walletType === "phantom" ? "👻" : "🦊"}
              </span>
            )}
            {displayAddress}
          </div>

          <button
            id="wallet-connect-btn"
            type="button"
            onClick={isConnected ? disconnectWallet : () => setShowWalletSelector(true)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              isConnected
                ? "bg-emerald-600 hover:bg-emerald-500"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {connecting ? "Connecting..." : isConnected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <section className="text-center pt-6 pb-10">
          <h2 className="text-4xl font-bold">Live Auctions</h2>
          <p className="mt-3 text-slate-400">
            Place bids on premium billboard slots across the Monad Network with unique science, art, and urban placements.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map(auction => (
            <div key={auction.id} className="bg-white/3 border border-white/5 rounded-xl p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{auction.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{auction.category}</p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                  {auction.endsIn}
                </span>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
                  <span className="text-slate-400">Top Bid</span>
                  <span className="font-semibold text-white">{auction.topBid} MON</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
                  <span className="text-slate-400">Min Bid</span>
                  <span className="font-semibold text-white">{auction.minBid} MON</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
                  <span className="text-slate-400">Impressions</span>
                  <span className="font-semibold text-white">{auction.impressions.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openBidModal(auction)}
                  disabled={!canBid}
                  className={`px-4 py-2 rounded-md font-semibold transition ${
                    canBid
                      ? "bg-violet-600 hover:bg-violet-500 text-white"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Place Bid
                </button>
              </div>

              {!isConnected && (
                <div className="mt-3 text-xs text-amber-300">
                  Please connect your wallet first to place a bid.
                </div>
              )}
            </div>
          ))}
        </section>
      </main>

      {/* Wallet Selector Modal */}
      {showWalletSelector && (
        <WalletSelectorModal
          onSelect={handleWalletSelect}
          onClose={() => setShowWalletSelector(false)}
        />
      )}

      {/* Bid Modal */}
      {activeBidAuction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeBidModal}
            aria-hidden
          />

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
                type="button"
                onClick={closeBidModal}
                className="px-4 py-2 rounded-md bg-transparent border border-white/6 text-slate-300 hover:bg-white/2"
                disabled={txProcessing}
              >
                Cancel
              </button>

              <button
                type="button"
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

      {/* TX Processing Overlay */}
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

      {/* Toast */}
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
