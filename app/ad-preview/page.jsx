"use client";

import { useEffect, useState } from "react";

// Fake articles for the mock news site
const ARTICLES = [
  {
    tag: "Technology",
    title: "Monad Network Breaks Throughput Records With Latest Testnet Update",
    excerpt: "The high-performance EVM-compatible blockchain achieved over 10,000 TPS in controlled benchmark conditions, setting a new standard for parallel execution.",
    time: "2 hours ago",
    author: "Sarah Mitchell",
  },
  {
    tag: "Finance",
    title: "Decentralized Advertising Markets Are Reshaping Brand Budgets",
    excerpt: "Major brands are redirecting up to 30% of digital ad spend toward on-chain auction platforms that guarantee verifiable reach and transparent pricing.",
    time: "5 hours ago",
    author: "James O'Brien",
  },
  {
    tag: "Web3",
    title: "Billboard NFTs: The Next Frontier for Out-of-Home Advertising",
    excerpt: "Tokenized ad slots are allowing businesses of every size to compete for premium placements previously locked behind large agency contracts.",
    time: "Yesterday",
    author: "Priya Anand",
  },
  {
    tag: "Business",
    title: "Q3 Report: On-Chain Ad Platforms See 4x Growth in Active Auctions",
    excerpt: "Data from multiple blockchain networks shows a sharp rise in auction participation, driven by SMEs seeking cost-effective digital exposure.",
    time: "Yesterday",
    author: "Tom Reeves",
  },
];

export default function AdPreview() {
  const [adImage, setAdImage] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("adImage");
      if (stored) setAdImage(stored);
    } catch (_) {}
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "Inter, sans-serif" }}>

      {/* ── Mock Browser Chrome ── */}
      <div style={{
        background: "#122017",
        padding: "0.6rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
      }}>
        {/* Traffic lights */}
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        {/* Address bar */}
        <div style={{
          flex: 1,
          marginLeft: "0.75rem",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "6px",
          padding: "0.3rem 0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span style={{ color: "#9ca3af", fontSize: "0.78rem" }}>www.monadtribune.io/tech-news</span>
        </div>
        {/* Preview badge */}
        <span style={{
          background: "rgba(52,211,153,0.15)",
          border: "1px solid rgba(52,211,153,0.4)",
          color: "#34d399",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          padding: "0.2rem 0.6rem",
          borderRadius: "9999px",
          marginLeft: "0.5rem",
        }}>
          AD PREVIEW
        </span>
      </div>

      {/* ── Mock Site: Navbar ── */}
      <div style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 2rem",
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em" }}>Monad</span>
            <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#10b981", letterSpacing: "-0.03em" }}>Tribune</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Technology", "Finance", "Web3", "Business", "Markets"].map(item => (
              <span key={item} style={{ color: "#374151", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>{item}</span>
            ))}
          </div>
          <span style={{ background: "#0f172a", color: "#fff", fontSize: "0.8rem", fontWeight: 600, padding: "0.4rem 1rem", borderRadius: "6px", cursor: "pointer" }}>
            Subscribe
          </span>
        </div>
      </div>

      {/* ── Mock Site: Top Banner Ad ── */}
      {adImage && (
        <div style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.75rem",
          position: "relative",
        }}>
          <span style={{
            position: "absolute",
            top: 4,
            left: 8,
            fontSize: "0.65rem",
            color: "#9ca3af",
            letterSpacing: "0.05em",
          }}>ADVERTISEMENT</span>
          <img
            src={adImage}
            alt="Your ad"
            style={{
              maxHeight: 90,
              maxWidth: "100%",
              objectFit: "contain",
              borderRadius: "4px",
              outline: "2px dashed rgba(16,185,129,0.5)",
              outlineOffset: 3,
            }}
          />
          {/* Glowing label */}
          <span style={{
            position: "absolute",
            bottom: 4,
            right: 8,
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
            color: "#10b981",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "0.15rem 0.45rem",
            borderRadius: "9999px",
          }}>
            YOUR AD
          </span>
        </div>
      )}

      {/* ── Mock Site: Content + Sidebar ── */}
      <div style={{ maxWidth: 1100, margin: "2rem auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>

        {/* Main content */}
        <div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {["All", "Technology", "Finance", "Web3"].map(t => (
              <span key={t} style={{
                padding: "0.3rem 0.85rem",
                borderRadius: "9999px",
                background: t === "All" ? "#0f172a" : "#f3f4f6",
                color: t === "All" ? "#fff" : "#374151",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
              }}>{t}</span>
            ))}
          </div>

          {/* Featured article */}
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "1.25rem",
            border: "1px solid #e5e7eb",
          }}>
            <div style={{ height: 200, background: "linear-gradient(135deg, #020c08 0%, #072a1b 100%)", display: "flex", alignItems: "center", justifyValue: "center", justifyContent: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "3rem" }}>📰</span>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <span style={{ background: "#ecfdf5", color: "#059669", fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>FEATURED</span>
              <h2 style={{ color: "#0f172a", fontSize: "1.2rem", fontWeight: 800, margin: "0.6rem 0 0.5rem", lineHeight: 1.3 }}>
                {ARTICLES[0].title}
              </h2>
              <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>{ARTICLES[0].excerpt}</p>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem", alignItems: "center" }}>
                <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{ARTICLES[0].author}</span>
                <span style={{ color: "#d1d5db", fontSize: "0.75rem" }}>·</span>
                <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{ARTICLES[0].time}</span>
              </div>
            </div>
          </div>

          {/* Rest of articles */}
          {ARTICLES.slice(1).map((a, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "1rem 1.25rem",
              marginBottom: "0.75rem",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}>
              <span style={{ background: "#f3f4f6", color: "#374151", fontSize: "0.7rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "9999px", width: "fit-content" }}>{a.tag}</span>
              <h3 style={{ color: "#0f172a", fontSize: "0.95rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{a.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>{a.excerpt}</p>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <span style={{ color: "#9ca3af", fontSize: "0.72rem" }}>{a.author}</span>
                <span style={{ color: "#d1d5db" }}>·</span>
                <span style={{ color: "#9ca3af", fontSize: "0.72rem" }}>{a.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Sidebar Ad — the uploaded image */}
          {adImage ? (
            <div style={{
              background: "#fff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              position: "relative",
            }}>
              <div style={{ padding: "0.5rem 0.75rem", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ fontSize: "0.65rem", color: "#9ca3af", letterSpacing: "0.05em" }}>ADVERTISEMENT</span>
              </div>
              <img
                src={adImage}
                alt="Your sidebar ad"
                style={{
                  width: "100%",
                  maxHeight: 260,
                  objectFit: "contain",
                  display: "block",
                  outline: "2px dashed rgba(16,185,129,0.4)",
                  outlineOffset: -2,
                }}
              />
              <span style={{
                position: "absolute",
                bottom: 6,
                right: 6,
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#10b981",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "0.15rem 0.45rem",
                borderRadius: "9999px",
              }}>YOUR AD</span>
            </div>
          ) : (
            <div style={{
              background: "#fff",
              borderRadius: "12px",
              border: "2px dashed #e5e7eb",
              padding: "2rem",
              textAlign: "center",
            }}>
              <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>No ad uploaded yet.<br/>Go back and upload your creative.</p>
            </div>
          )}

          {/* Trending box */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "1.25rem" }}>
            <h4 style={{ color: "#0f172a", fontSize: "0.9rem", fontWeight: 800, margin: "0 0 1rem", letterSpacing: "-0.01em" }}>Trending Now</h4>
            {["Monad TPS record", "On-chain ad auctions", "Billboard NFTs", "DeFi Q3 report"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <span style={{ color: "#d1d5db", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}>0{i + 1}</span>
                <p style={{ color: "#374151", fontSize: "0.82rem", fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{t}</p>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div style={{ background: "#0f172a", borderRadius: "12px", padding: "1.25rem" }}>
            <h4 style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 800, margin: "0 0 0.5rem" }}>Newsletter</h4>
            <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: "0 0 1rem", lineHeight: 1.5 }}>Get the latest Web3 ad news delivered weekly.</p>
            <input placeholder="your@email.com" style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "6px", border: "none", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "0.82rem", boxSizing: "border-box" }} readOnly />
            <button style={{ marginTop: "0.6rem", width: "100%", padding: "0.55rem", borderRadius: "6px", border: "none", background: "#10b981", color: "#fff", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* ── Floating back bar ── */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(3,18,11,0.96)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "0.85rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%", background: "#10b981",
            boxShadow: "0 0 8px #10b981",
            display: "inline-block",
            animation: "blink 1.5s ease-in-out infinite",
          }} />
          <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontFamily: "Inter, sans-serif" }}>
            This is a <strong style={{ color: "#f1f5f9" }}>preview</strong> of how your ad will appear on partner sites.
          </span>
        </div>
        <button
          onClick={() => { window.location.href = "/upload-ad"; }}
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent",
            color: "#f1f5f9",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}
        >
          ← Back to Upload
        </button>
        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.3; }
          }
        `}</style>
      </div>

      {/* Bottom padding so content doesn't hide behind fixed bar */}
      <div style={{ height: 80 }} />
    </div>
  );
}
