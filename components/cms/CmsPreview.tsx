"use client";

import { useRef, useState } from "react";

export default function CmsPreview() {
  const [lang, setLang] = useState<"nl" | "en">("nl");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function sendLang(l: "nl" | "en") {
    setLang(l);
    iframeRef.current?.contentWindow?.postMessage({ lang: l }, "*");
  }

  function refresh() {
    const iframe = iframeRef.current;
    if (iframe) iframe.src = iframe.src;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#111" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          background: "#1a1815",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(235,229,219,0.3)",
          }}
        >
          Live preview
        </span>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "inline-flex",
            border: "1px solid rgba(235,229,219,0.15)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          {(["nl", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => sendLang(l)}
              style={{
                background: lang === l ? "rgba(235,229,219,0.12)" : "transparent",
                color: lang === l ? "rgba(235,229,219,0.85)" : "rgba(235,229,219,0.3)",
                border: 0,
                padding: "5px 10px",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "background 0.2s, color 0.2s",
                lineHeight: 1,
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={refresh}
          title="Ververs"
          style={{
            background: "transparent",
            border: "1px solid rgba(235,229,219,0.15)",
            borderRadius: "50%",
            width: 24,
            height: 24,
            cursor: "pointer",
            color: "rgba(235,229,219,0.35)",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s",
            lineHeight: 1,
          }}
        >
          ↺
        </button>
      </div>
      <iframe
        ref={iframeRef}
        src="/"
        style={{ flex: 1, border: "none", width: "100%" }}
        title="Site preview"
      />
    </div>
  );
}
