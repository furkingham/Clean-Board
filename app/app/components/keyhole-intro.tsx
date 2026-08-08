'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Hero } from '@/components/hero'

export function KeyholeIntro() {
  // Driving the timeline off raw scrollY (pixels) is always monotonic. Tracking
  // scrollYProgress on a section that contains a 300x-scaled child destabilizes
  // the measurement near the end, so we map pixels to the same staged feel.
  const { scrollY } = useScroll()
  const [vh, setVh] = useState(800)

  useEffect(() => {
    const update = () => setVh(window.innerHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // The zoom completes right as the sticky stage releases (~1.6 viewport heights).
  const end = vh * 1.6

  // Step 1 — butter-smooth staged zoom through the keyhole: [0, 0.6, 1] -> [1, 60, 300].
  const scale = useTransform(scrollY, [0, end * 0.6, end], [1, 60, 300])
  // Fade the black logo plate out as the mark goes massive: [0.6, 0.9] -> [1, 0].
  const logoOpacity = useTransform(scrollY, [end * 0.6, end * 0.9], [1, 0])
  // Scroll hint disappears as soon as the user starts.
  const hintOpacity = useTransform(scrollY, [0, end * 0.12], [1, 0])

  // Step 2 — hero revealed behind the keyhole, fading up gently: [0.5, 1] -> opacity/ y.
  const heroOpacity = useTransform(scrollY, [end * 0.5, end], [0, 1])
  const heroY = useTransform(scrollY, [end * 0.5, end], [50, 0])

  return (
    <section className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Hero revealed behind the keyhole */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0"
        >
          <Hero />
        </motion.div>

        {/* Black plate holding the logo; we fly through the transparent keyhole */}
        <motion.div
          style={{ opacity: logoOpacity }}
          className="absolute inset-0 flex items-center justify-center bg-background"
        >
          {/* subtle mint glow behind the mark */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-primary/15 blur-3xl"
          />
          <motion.img
            src="/logo.png"
            alt="CleanBoard Logo"
            className="relative w-[min(80vw,640px)] select-none"
            /* transform-origin locked onto the keyhole "O" so the zoom flies through it */
            style={{ scale, transformOrigin: '64% 49%' }}
          />

          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Scroll to enter
            </p>
            <div className="mx-auto mt-3 flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
