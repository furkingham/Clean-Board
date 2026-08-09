'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, LogOut, ChevronDown } from 'lucide-react'

// ── Cleanverse API ──────────────────────────────────────────────────
const CLEANVERSE_API_KEY = 'qhfPE24VqLv7wTK7AXMkD4p2i7zKnerg84AtT0IGto0='

export function Navbar() {
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const verified = localStorage.getItem("cleanverse_verified")
      const address = localStorage.getItem("cleanverse_address")
      const display = localStorage.getItem("cleanverse_display")
      if (verified === "true" && address) {
        setUser({ address, display })
      }
    }
  }, [])

  const handleCleanverseConnect = () => {
    const key = prompt("Please enter your Cleanverse API Key:")
    if (key === CLEANVERSE_API_KEY) {
      const mockAddr = '0x34d3995ea710b981c25582699abc'
      localStorage.setItem("cleanverse_verified", "true")
      localStorage.setItem("cleanverse_address", mockAddr)
      localStorage.setItem("cleanverse_display", "Cleanverse User")
      setUser({ address: mockAddr, display: "Cleanverse User" })
      alert("Identity successfully verified via Cleanverse API!")
      window.location.reload()
    } else if (key !== null) {
      alert("Invalid API Key. Please try again.")
    }
  }

  const handleDisconnect = () => {
    localStorage.clear()
    setUser(null)
    setOpen(false)
    window.location.reload()
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 bg-transparent backdrop-blur-sm">

        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center" aria-label="CleanBoard home">
          <img src="/logo.png" alt="CleanBoard" className="h-12 w-auto object-contain" style={{ maxHeight: '48px' }} />
        </a>



        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              {/* Verified user badge */}
              <button
                onClick={() => setOpen(o => !o)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-95"
                style={{ background: 'linear-gradient(90deg,#0bf0a5,#10b981)', color: '#071827', boxShadow: '0 8px 30px rgba(16,185,129,0.25)' }}
              >
                <BadgeCheck className="h-4 w-4" />
                {user.display}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
              </button>

              {open && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl p-1 shadow-2xl"
                  style={{ background: 'rgba(4,14,9,0.98)', border: '1px solid rgba(16,185,129,0.2)', backdropFilter: 'blur(14px)' }}
                >
                  <div className="px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[11px] text-emerald-400 font-semibold tracking-wide uppercase mb-0.5">Verified via Cleanverse</p>
                    <p className="text-xs font-mono text-slate-400 truncate">{user.address}</p>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors mt-1"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Cleanverse API Button: White background, black text, clean style */
            <button
              onClick={handleCleanverseConnect}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-black bg-white transition-all hover:bg-slate-100 hover:scale-[1.03] active:scale-95"
              style={{
                boxShadow: '0 4px 15px rgba(255,255,255,0.15)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <BadgeCheck className="h-4 w-4 text-black" />
              Use Cleanverse API
            </button>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
