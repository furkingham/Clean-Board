"use client";

import { useEffect } from "react";

export default function BidProcessing() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/bid-won";
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #01140d, #000a06, #000000)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.5rem",
        }}
      >
        {/* Spinning ring */}
        <div style={{ position: "relative", width: 88, height: 88 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "4px solid rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "4px solid transparent",
              borderTopColor: "#34d399",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>

        {/* Text + animated dots */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "2.4rem",
              fontWeight: 600,
              color: "#f1f5f9",
              letterSpacing: "0.02em",
              fontFamily: "Inter, sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.2rem",
              margin: 0,
            }}
          >
            Processing your bid
            <span
              style={{
                display: "inline-flex",
                gap: 5,
                marginLeft: 8,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#34d399",
                  display: "inline-block",
                  animation: "dotBounce 1.2s infinite ease-in-out",
                  animationDelay: "0ms",
                }}
              />
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#34d399",
                  display: "inline-block",
                  animation: "dotBounce 1.2s infinite ease-in-out",
                  animationDelay: "200ms",
                }}
              />
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#34d399",
                  display: "inline-block",
                  animation: "dotBounce 1.2s infinite ease-in-out",
                  animationDelay: "400ms",
                }}
              />
            </span>
          </p>

          <p
            style={{
              color: "#64748b",
              fontSize: "0.95rem",
              textAlign: "center",
              maxWidth: 300,
              lineHeight: 1.7,
              marginTop: "1rem",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Verifying on the Monad network. This will only take a moment.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40%           { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
