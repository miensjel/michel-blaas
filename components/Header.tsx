"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

export default function Header() {
  const { lang, setLang } = useLang();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const nav = [
    { href: "/",        label: { nl: "Home",    en: "Home" },    pill: true },
    { href: "/#werk",   label: { nl: "Werk",    en: "Work" } },
    { href: "/#proces", label: { nl: "Proces",  en: "Process" } },
    { href: "/about",   label: { nl: "Over",    en: "About" } },
    { href: "/journal", label: { nl: "Logboek", en: "Journal" } },
    { href: "/#contact",label: { nl: "Contact", en: "Contact" } },
  ];

  const menuNav = [
    { num: "№ 01", href: "/",         label: { nl: "Home",    en: "Home" },    arr: "↘" },
    { num: "№ 02", href: "/#werk",    label: { nl: "Werk",    en: "Work" },    arr: "↘" },
    { num: "№ 03", href: "/#proces",  label: { nl: "Proces",  en: "Process" }, arr: "↘" },
    { num: "№ 04", href: "/about",    label: { nl: "Over mij",en: "About" },   arr: "↗" },
    { num: "№ 05", href: "/journal",  label: { nl: "Logboek", en: "Journal" }, arr: "↗" },
    { num: "№ 06", href: "/#contact", label: { nl: "Contact", en: "Contact" }, arr: "↘" },
  ];

  return (
    <>
      {/* ── Main Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding:         "18px 48px",
          display:         "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems:      "center",
          gap:             "32px",
          background:      scrolled ? "rgba(235,229,219,0.92)" : "rgba(235,229,219,0.72)",
          backdropFilter:  "blur(14px) saturate(1.05)",
          borderBottom:    scrolled ? "1px solid var(--color-text)" : "1px solid transparent",
          transition:      "background 0.35s ease, border-color 0.35s ease",
        }}
      >
        {/* Left: hamburger + logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <button
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{ width: 30, height: 20, padding: 0, background: "transparent", border: 0, cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", position: "relative", zIndex: 60 }}
          >
            {(["ham-1", "ham-2", "ham-3"] as const).map((cls) => (
              <span
                key={cls}
                className={cls}
                style={{
                  display: "block",
                  height: "1.5px",
                  background: menuOpen ? "var(--color-bg)" : "var(--color-text)",
                  borderRadius: "1px",
                  transformOrigin: "center",
                  transition: "transform 0.45s cubic-bezier(0.65,0,0.35,1), opacity 0.3s, background 0.3s",
                }}
              />
            ))}
          </button>
          <Link
            href="/"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1, color: "inherit", textDecoration: "none" }}
          >
            Michel<sup style={{ fontSize: 10, verticalAlign: "super", fontFamily: "var(--font-mono)", fontStyle: "normal", opacity: 0.5, marginLeft: 4 }}>MB</sup>
          </Link>
        </div>

        {/* Center: nav */}
        <nav
          style={{ display: "flex", gap: 32, justifySelf: "center" }}
          className="primary-nav"
        >
          {nav.map(({ href, label, pill }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href.split("#")[0]));
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily:     "var(--font-mono)",
                  fontSize:       11,
                  letterSpacing:  "0.08em",
                  textTransform:  "uppercase",
                  color:          isActive ? "var(--color-accent)" : "var(--color-text)",
                  textDecoration: "none",
                  padding:        pill ? "6px 14px" : "8px 0",
                  border:         pill ? "1px solid var(--color-text)" : "none",
                  borderRadius:   pill ? "999px" : undefined,
                  position:       "relative",
                  transition:     "background 0.3s, color 0.3s",
                }}
              >
                {lang === "nl" ? label.nl : label.en}
              </Link>
            );
          })}
        </nav>

        {/* Right: lang toggle + availability */}
        <div style={{ justifySelf: "end", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "inline-flex", border: "1px solid var(--color-text)", borderRadius: "999px", overflow: "hidden" }}>
            {(["nl", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background:     lang === l ? "var(--color-text)" : "transparent",
                  color:          lang === l ? "var(--color-bg)"   : "var(--color-text)",
                  border:         0,
                  padding:        "6px 11px",
                  cursor:         "pointer",
                  fontFamily:     "var(--font-mono)",
                  fontSize:       10,
                  letterSpacing:  "0.1em",
                  textTransform:  "uppercase",
                  transition:     "background 0.3s, color 0.3s",
                  lineHeight:     1,
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 7, height: 7,
                borderRadius: "50%",
                background: "var(--color-accent)",
                animation: "pulse 2.4s ease-in-out infinite",
              }}
            />
            <span lang="nl">Open voor opdrachten</span>
            <span lang="en">Open for commissions</span>
          </div>
        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden
        style={{
          position:       "fixed",
          inset:          0,
          zIndex:         53,
          background:     "rgba(26,24,21,0.35)",
          backdropFilter: "blur(2px)",
          opacity:        menuOpen ? 1 : 0,
          pointerEvents:  menuOpen ? "auto" : "none",
          transition:     "opacity 0.45s ease",
        }}
      />

      {/* ── Side drawer ── */}
      <aside
        aria-hidden={!menuOpen}
        style={{
          position:   "fixed",
          top:        0,
          left:       0,
          height:     "100dvh",
          width:      "min(420px, 88vw)",
          zIndex:     55,
          background: "var(--color-text)",
          color:      "var(--color-bg)",
          padding:    "96px 36px 32px",
          display:    "flex",
          flexDirection: "column",
          gap:        28,
          transform:  menuOpen ? "translateX(0)" : "translateX(-105%)",
          transition: "transform 0.55s cubic-bezier(0.85,0,0.15,1)",
          pointerEvents: menuOpen ? "auto" : "none",
          overflowY:  "auto",
          boxShadow:  menuOpen ? "24px 0 80px -20px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", margin: "8px 0 auto" }}>
          {menuNav.map(({ num, href, label, arr }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:     "var(--font-display)",
                fontStyle:      "italic",
                fontSize:       "clamp(34px, 4.2vw, 46px)",
                lineHeight:     1.05,
                letterSpacing:  "-0.02em",
                color:          "var(--color-bg)",
                textDecoration: "none",
                padding:        "14px 0 16px",
                display:        "grid",
                gridTemplateColumns: "52px 1fr auto",
                alignItems:     "center",
                gap:            18,
                borderBottom:   "1px solid rgba(235,229,219,0.12)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontStyle: "normal", letterSpacing: "0.12em", color: "rgba(235,229,219,0.5)", textTransform: "uppercase" }}>
                {num}
              </span>
              <span>
                <span lang="nl">{label.nl}</span>
                <span lang="en">{label.en}</span>
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55em", color: "rgba(235,229,219,0.4)" }}>
                {arr}
              </span>
            </Link>
          ))}
        </nav>

        <footer style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(235,229,219,0.55)", paddingTop: 22, borderTop: "1px solid rgba(235,229,219,0.12)", lineHeight: 1.6 }}>
          <div>
            <div lang="nl">Delft · Nederland</div>
            <div lang="en">Delft · The Netherlands</div>
            <div><a href="mailto:michelblaas@caiway.net" style={{ color: "rgba(235,229,219,0.85)", textDecoration: "none" }}>michelblaas@caiway.net</a></div>
          </div>
          <div>
            <div lang="nl">Op zoek naar atelierruimte</div>
            <div lang="en">Looking for studio space</div>
            <div lang="nl">Beschikbaar voor opdrachten</div>
            <div lang="en">Available for commissions</div>
          </div>
          <div>
            <div>© 2026 Michel Blaas</div>
            <div lang="nl">Interactief portfolio</div>
            <div lang="en">Interactive portfolio</div>
          </div>
          <div style={{ paddingTop: 10, borderTop: "1px solid rgba(235,229,219,0.12)" }}>
            <Link
              href="/cms"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--color-bg)",
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "10px 16px",
                border: "1px solid rgba(235,229,219,0.25)",
                transition: "border-color 0.2s",
              }}
            >
              ⚙ CMS beheer
            </Link>
          </div>
        </footer>
      </aside>
    </>
  );
}
