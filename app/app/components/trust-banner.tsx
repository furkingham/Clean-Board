'use client'

import { motion } from 'motion/react'

export function TrustBanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full border-y"
      style={{
        background: 'linear-gradient(180deg, rgba(2,18,12,0.9) 0%, rgba(4,26,17,0.8) 100%)',
        borderColor: 'rgba(16,185,129,0.15)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-10 text-center">
        {/* Brightened green header text with a soft green glow */}
        <p
          className="text-xs font-bold uppercase tracking-[0.25em]"
          style={{
            color: '#10b981',
            textShadow: '0 0 10px rgba(16,185,129,0.4)',
          }}
        >
          Powered by Institutional Grade Infrastructure
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          
          <img src="/cleanverse-logo.png" alt="Cleanverse" className="h-20 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200" />
          
          <img src="/monad-logo.png" alt="Monad" className="h-20 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200" />

          {['CVI', 'CVA'].map((name) => (
            /* Brightened white partner text with hover glow effects */
            <span
              key={name}
              className="text-xl font-bold tracking-tight transition-all duration-200"
              style={{
                color: 'rgba(255,255,255,0.85)',
                textShadow: '0 0 8px rgba(255,255,255,0.15)',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#0bf0a5';
                (e.currentTarget as HTMLElement).style.textShadow = '0 0 20px rgba(11,240,165,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)';
                (e.currentTarget as HTMLElement).style.textShadow = '0 0 8px rgba(255,255,255,0.15)';
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
