"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(true);
  }, []);

  return (
    <main className="relative flex h-screen w-full flex-col items-center bg-gradient-to-br from-[#010805] via-[#021f14] to-[#010805] text-white overflow-hidden selection:bg-emerald-500/30">
      
      {/* Subtle Web3 Glowing Edges */}
      <div className="absolute top-0 left-1/2 h-[30vh] w-[60vw] -translate-x-1/2 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[30vh] w-[40vw] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[30vh] w-[40vw] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col items-center justify-between py-6">
        
        {/* Typography & Content placement - COMPACT */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-2 mt-2 shrink-0"
        >
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            <h2 className="text-xl font-bold tracking-tight">CleanBoard</h2>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-50 to-slate-300 drop-shadow-sm">
            Decentralized Advertising, Redefined.
          </h1>
          
          <p className="text-sm md:text-base text-emerald-100/70 font-light max-w-2xl leading-relaxed">
            Bid on premium billboard inventory, upload creatives, and preview live placements — all secured on the Monad Testnet.
          </p>
        </motion.div>

        {/* Central Billboard Content - SCALES TO FIT */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-5xl flex-1 min-h-0 my-4 flex items-center justify-center group"
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] border border-emerald-900/30">
            {/* Real-world Street Billboard Mockup */}
            <Image 
              src="/billboard.jpg" 
              alt="City Billboard Mockup" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Warm glow overlay simulating light casting from the screen */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent mix-blend-overlay pointer-events-none" />
          </div>
        </motion.div>

        {/* Action Elements - FIXED AT BOTTOM */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="shrink-0 mb-2"
        >
          <Link 
            href="/app" 
            className="group relative inline-flex items-center justify-center px-8 py-3 text-base md:text-lg font-bold text-slate-900 transition-all duration-300 rounded-full bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-400 hover:from-teal-200 hover:via-emerald-300 hover:to-cyan-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span>Go to App</span>
          </Link>
        </motion.div>
        
      </div>
    </main>
  );
}
