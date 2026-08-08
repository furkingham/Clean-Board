'use client'

import { motion } from 'motion/react'

const partners = ['Cleanverse', 'Monad Testnet', 'CVI', 'CVA']

export function TrustBanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full border-y border-border bg-secondary/40"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Powered by Institutional Grade Infrastructure
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((name) => (
            <span
              key={name}
              className="font-display text-xl font-semibold tracking-tight text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
