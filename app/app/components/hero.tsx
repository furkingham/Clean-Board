'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-background via-background/80 to-background overflow-hidden px-6">
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
        className="relative z-10 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Premium Ad Auctions
          <br />
          on Blockchain
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Bid on exclusive billboard placements across the Monad Network. Transparent,
          instant settlements with institutional-grade infrastructure.
        </p>
        <motion.a
          href="/dashboard"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Auctions
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}
