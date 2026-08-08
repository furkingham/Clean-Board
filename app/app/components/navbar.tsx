'use client'

import { motion } from 'motion/react'
import { BadgeCheck, Wallet } from 'lucide-react'

const links = ['Auctions', 'RWA Ecosystem', 'Compliance']

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        {/* Left: logo */}
        <a href="#" className="flex shrink-0 items-center" aria-label="CleanBoard home">
          <img src="/logo.png" alt="CleanBoard" className="h-9 w-36 object-cover" />
        </a>

        {/* Center: links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: CVI badge + Connect Wallet */}
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-accent px-3 py-1.5 text-xs font-medium text-primary sm:inline-flex">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            CVI Verified
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_-4px_var(--color-primary)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Wallet className="h-4 w-4" aria-hidden />
            Connect Wallet
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
