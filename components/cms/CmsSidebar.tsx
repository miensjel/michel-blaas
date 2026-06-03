"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = { active: "works" };

export default function CmsSidebar({ active }: Props) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    router.push("/cms");
  }

  const items = [
    { id: "works", href: "/cms/dashboard", num: "01", label: "Werken" },
  ] as const;

  return (
    <aside
      style={{
        width: 200,
        minHeight: "100dvh",
        background: "var(--color-text)",
        color: "var(--color-bg)",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <Link
        href="/cms/dashboard"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 20,
          letterSpacing: "-0.02em",
          color: "var(--color-bg)",
          textDecoration: "none",
          marginBottom: 32,
          display: "block",
        }}
      >
        Michel
        <sup
          style={{
            fontFamily: "var(--font-mono)",
            fontStyle: "normal",
            fontSize: 8,
            opacity: 0.45,
            marginLeft: 3,
          }}
        >
          CMS
        </sup>
      </Link>

      <nav style={{ flex: 1 }}>
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 0",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:
                active === item.id
                  ? "var(--color-bg)"
                  : "rgba(235,229,219,0.4)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(235,229,219,0.07)",
            }}
          >
            <span style={{ opacity: 0.4, fontSize: 9 }}>№ {item.num}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        style={{
          borderTop: "1px solid rgba(235,229,219,0.1)",
          paddingTop: 14,
        }}
      >
        <Link
          href="/"
          target="_blank"
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(235,229,219,0.35)",
            textDecoration: "none",
            marginBottom: 10,
          }}
        >
          ↗ Bekijk site
        </Link>
        <button
          onClick={logout}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(235,229,219,0.35)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Uitloggen →
        </button>
      </div>
    </aside>
  );
}
