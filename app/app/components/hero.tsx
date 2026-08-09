'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full min-h-[78vh] flex items-center justify-center overflow-hidden px-6 pt-56 pb-16" style={{ backgroundColor: '#0a0a0a' }}>
      {/* subtle grid overlay for technical/blockchain feel */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: `repeating-linear-gradient(transparent, transparent 23px, rgba(255,255,255,0.02) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(255,255,255,0.02) 24px)` }} />
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl mix-blend-multiply" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-3xl text-center px-4 sm:px-6 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#10b981' }}>● VERIFIED AD SPACES. CLEAN REVENUE.</p>

        <h1 className="w-full mx-auto text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-2xl text-white">
          Tokenized RWA Ad Spaces. <span style={{ color: '#10b981' }}>On-Chain Bidding.</span>
        </h1>

        <div className="mt-8">
          <a href="/dashboard" className="inline-block px-6 py-3 rounded-full font-semibold text-black" style={{ background: '#10b981', boxShadow: '0 8px 30px rgba(16,185,129,0.18)' }}>
            Explore Auctions
          </a>
        </div>
      </motion.div>
    </section>
  )
}
