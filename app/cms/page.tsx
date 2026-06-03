"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CmsLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/cms/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/cms/dashboard");
    } else {
      setError("Ongeldig wachtwoord.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "var(--color-bg)",
          padding: "44px 48px",
          width: "100%",
          maxWidth: 380,
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 30,
            letterSpacing: "-0.02em",
            marginBottom: 32,
            color: "var(--color-text)",
          }}
        >
          Michel
          <sup
            style={{
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              fontStyle: "normal",
              opacity: 0.4,
              marginLeft: 3,
            }}
          >
            CMS
          </sup>
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: 22,
          }}
        >
          Admin toegang
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            autoFocus
            style={{
              width: "100%",
              padding: "11px 13px",
              border: `1px solid ${error ? "var(--color-accent)" : "var(--color-text)"}`,
              background: "transparent",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--color-text)",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: error ? 8 : 16,
            }}
          />

          {error && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-accent)",
                marginBottom: 14,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              padding: "12px",
              background: "var(--color-text)",
              color: "var(--color-bg)",
              border: "none",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: loading || !password ? "not-allowed" : "pointer",
              opacity: !password || loading ? 0.5 : 1,
            }}
          >
            {loading ? "Even wachten…" : "Inloggen →"}
          </button>
        </form>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--color-muted)",
            marginTop: 20,
            opacity: 0.6,
          }}
        >
          Stel CMS_PASSWORD in via .env.local
        </p>
      </div>
    </div>
  );
}
