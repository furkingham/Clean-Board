"use client";

import { useState, useRef, useCallback } from "react";

export default function UploadAd() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f) return;
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"];
    if (!allowed.includes(f.type)) {
      alert("Please upload an image file (PNG, JPG, GIF, WEBP).");
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setPreview(dataUrl);
      // Store in localStorage so the preview page can read it
      try { localStorage.setItem("adImage", dataUrl); } catch (_) {}
    };
    reader.readAsDataURL(f);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  }, [handleFile]);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #01140d, #000a06, #000000)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "Inter, sans-serif",
    }}>

      {/* Card */}
      <div style={{
        width: "100%",
        maxWidth: 540,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.5rem",
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}>

        {/* Header */}
        <div>
          <p style={{ color: "#34d399", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>
            Step 3 — Upload
          </p>
          <h1 style={{ color: "#f1f5f9", fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0 0", letterSpacing: "-0.02em" }}>
            Upload Your Ad
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem", margin: "0.5rem 0 0", lineHeight: 1.6 }}>
            Upload the creative you want to display on your won billboard slot. Supported formats: PNG, JPG, GIF, WEBP.
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          style={{
            border: `2px dashed ${dragging ? "#34d399" : file ? "#10b981" : "rgba(255,255,255,0.15)"}`,
            borderRadius: "1rem",
            padding: "2.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
            background: dragging ? "rgba(52,211,153,0.05)" : "rgba(255,255,255,0.02)",
            transition: "all 0.2s",
          }}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt="Ad preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: 200,
                  borderRadius: "0.75rem",
                  objectFit: "contain",
                  boxShadow: "0 0 30px rgba(16,185,129,0.2)",
                }}
              />
              <p style={{ color: "#34d399", fontSize: "0.85rem", margin: 0 }}>
                ✓ {file.name} — Click to replace
              </p>
            </>
          ) : (
            <>
              {/* Upload icon */}
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(52,211,153,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#f1f5f9", fontSize: "1rem", fontWeight: 600, margin: 0 }}>
                  Drag &amp; drop your ad here
                </p>
                <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.3rem 0 0" }}>
                  or click to browse files
                </p>
              </div>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        {/* File info */}
        {file && (
          <div style={{
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: "0.75rem",
            padding: "0.85rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <div>
              <p style={{ color: "#f1f5f9", fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>{file.name}</p>
              <p style={{ color: "#64748b", fontSize: "0.78rem", margin: "0.15rem 0 0" }}>
                {(file.size / 1024).toFixed(1)} KB · {file.type}
              </p>
            </div>
          </div>
        )}

        {/* Preview button — only shown after upload */}
        {file && (
          <button
            onClick={() => { window.location.href = "/ad-preview"; }}
            style={{
              padding: "0.9rem",
              borderRadius: "9999px",
              border: "none",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              fontSize: "1.05rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(16,185,129,0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 50px rgba(16,185,129,0.6)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(16,185,129,0.35)";
            }}
          >
            Preview Ad →
          </button>
        )}
      </div>
    </div>
  );
}
