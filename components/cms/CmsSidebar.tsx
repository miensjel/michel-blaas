"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function CmsSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    router.push("/cms");
  }

  const items = [
    { id: "works",   href: "/cms/dashboard", num: "01", label: "Werken" },
    { id: "studio",  href: "/cms/studio",    num: "02", label: "Studio" },
    { id: "contact", href: "/cms/contact",   num: "03", label: "Contact" },
    { id: "process", href: "/cms/process",   num: "04", label: "Proces" },
  ];

  function isActive(href: string) {
    if (href === "/cms/dashboard") {
      return pathname === "/cms/dashboard" || pathname.startsWith("/cms/works");
    }
    return pathname.startsWith(href);
  }

  return (
    <aside
      style={{
        width: 174,
        height: "100dvh",
        background: "var(--color-text)",
        color: "var(--color-bg)",
        padding: "26px 16px",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      <Link
        href="/cms/dashboard"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 18,
          letterSpacing: "-0.02em",
          color: "var(--color-bg)",
          textDecoration: "none",
          marginBottom: 28,
          display: "block",
          lineHeight: 1,
        }}
      >
        Michel
        <sup
          style={{
            fontFamily: "var(--font-mono)",
            fontStyle: "normal",
            fontSize: 7,
            opacity: 0.4,
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
              gap: 8,
              padding: "9px 0",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isActive(item.href)
                ? "var(--color-bg)"
                : "rgba(235,229,219,0.38)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(235,229,219,0.07)",
              transition: "color 0.2s",
            }}
          >
            <span style={{ opacity: 0.38, fontSize: 8.5, flexShrink: 0 }}>
              № {item.num}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        style={{
          borderTop: "1px solid rgba(235,229,219,0.1)",
          paddingTop: 14,
          display: "flex",
          flexDirection: "column",
          gap: 10,
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
            color: "rgba(235,229,219,0.3)",
            textDecoration: "none",
          }}
        >
          ↗ Site
        </Link>
        <button
          onClick={logout}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(235,229,219,0.3)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textAlign: "left",
          }}
        >
          Uitloggen →
        </button>
      </div>
    </aside>
  );
}
