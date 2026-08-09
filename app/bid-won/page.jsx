"use client";

export default function BidWon() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #001428, #000d1f, #000000)",
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

