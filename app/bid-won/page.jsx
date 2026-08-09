"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "motion/react";

export default function BidWon() {
  const [monadParticles, setMonadParticles] = useState([]);

  useEffect(() => {
    // 1. Standard Confetti (Neon turquoise, Green, Monad Purple)
    const duration = 3500;
    const end = Date.now() + duration;
    const colors = ['#2dd4bf', '#10b981', '#8b5cf6'];

    (function frame() {
      // Left side explosion
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0.35, y: 0.45 },
        colors: colors,
        zIndex: 9999,
        startVelocity: 25,
      });
      // Right side explosion
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 0.65, y: 0.45 },
        colors: colors,
        zIndex: 9999,
        startVelocity: 25,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // 2. Custom Monad Logo Particles
    const particles = Array.from({ length: 45 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2; 
      const distance = Math.random() * 600 - 300; // X spread
      return {
        id: i,
        endX: distance,
        rotate: Math.random() * 720 - 360,
        scale: Math.random() * 0.6 + 0.4, // Size variation
        delay: Math.random() * 0.4, // Staggered start
        duration: Math.random() * 1.5 + 2.5 // Falling duration
      };
    });
    setMonadParticles(particles);

    const cleanup = setTimeout(() => {
      setMonadParticles([]);
    }, 4500);

    return () => clearTimeout(cleanup);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #01140d, #000a06, #000000)",
      }}
    >
      {/* Monad Custom Confetti Layer (Pointer Events None) */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998, overflow: 'hidden' }}>
        {monadParticles.map(p => (
          <motion.img
            key={p.id}
            src="/monad-logo.png"
            alt=""
            initial={{ 
              x: "50vw", 
              y: "40vh", // Start from middle
              scale: 0,
              rotate: 0,
              opacity: 1
            }}
            animate={{ 
              x: `calc(50vw + ${p.endX}px)`, 
              y: "120vh", // Fall below screen
              scale: p.scale,
              rotate: p.rotate + (Math.random() > 0.5 ? 720 : -720),
            }}
            transition={{ 
              duration: p.duration, 
              ease: [0.35, 0, 0.75, 1], // Accelerate downwards (gravity-like)
              delay: p.delay 
            }}
            style={{
              position: 'absolute',
              width: 32,
              height: 32,
              objectFit: 'contain',
              marginLeft: -16,
              marginTop: -16
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.5rem",
          zIndex: 9995
        }}
      >
        {/* Glowing checkmark */}
        <div
          style={{
            width: 104,
            height: 104,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.04) 70%)",
            boxShadow:
              "0 0 50px rgba(16,185,129,0.45), 0 0 120px rgba(16,185,129,0.2)",
            animation: "pulseGlow 2s ease-in-out infinite",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: 52,
              height: 52,
              filter: "drop-shadow(0 0 12px #10b981)",
            }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: 800,
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              textShadow: "0 0 40px rgba(16,185,129,0.55)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Your bid won! 🎉
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "1rem",
              maxWidth: 340,
              lineHeight: 1.8,
              marginTop: "1.2rem",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Congratulations! Your bid has been successfully confirmed on the Monad network. Upload your ad to get started.
          </p>
        </div>

        {/* Next button */}
        <button
          onClick={() => { window.location.href = "/upload-ad"; }}
          style={{
            marginTop: "0.5rem",
            padding: "0.85rem 3rem",
            borderRadius: "9999px",
            border: "none",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "#ffffff",
            fontSize: "1.1rem",
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(16,185,129,0.4)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 50px rgba(16,185,129,0.65)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(16,185,129,0.4)";
          }}
        >
          Next →
        </button>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 50px rgba(16,185,129,0.45), 0 0 120px rgba(16,185,129,0.2); }
          50%       { box-shadow: 0 0 80px rgba(16,185,129,0.7), 0 0 160px rgba(16,185,129,0.35); }
        }
      `}</style>
    </div>
  );
}

