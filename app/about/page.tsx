import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import PortraitSVG from "@/components/PortraitSVG";
import Footer from "@/components/Footer";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title:       about.meta.title,
  description: about.meta.description,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section style={{ padding: "160px 48px 60px", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text-soft)", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 28, height: 1, background: "var(--color-text)", display: "inline-block" }} />
            <span lang="nl">{about.hero.kicker.nl}</span>
            <span lang="en">{about.hero.kicker.en}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(56px,10vw,152px)", lineHeight: 0.9, letterSpacing: "-0.035em", maxWidth: "16ch" }}>
            <span lang="nl">
              {about.hero.heading.nl[0]}<br />
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>{about.hero.heading.nl[1]}</em>
            </span>
            <span lang="en">
              {about.hero.heading.en[0]}<br />
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>{about.hero.heading.en[1]}</em>
            </span>
          </h1>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(22px,2.6vw,32px)", lineHeight: 1.3, letterSpacing: "-0.01em", marginTop: 32, maxWidth: "28ch", color: "var(--color-text-soft)" }}>
            <span lang="nl">{about.hero.lede.nl}</span>
            <span lang="en">{about.hero.lede.en}</span>
          </p>
        </section>

        {/* ── Bio ── */}
        <section style={{ padding: "80px 48px 80px", maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start", borderTop: "1px solid var(--color-text)" }}>
          <div style={{ position: "relative", top: 96, aspectRatio: "4/5", background: "var(--color-text)", borderRadius: 2, overflow: "hidden" }}>
            <PortraitSVG gradientSuffix="2" />
            <div style={{ position: "absolute", top: 16, left: 16, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-bg)", opacity: 0.7 }}>
              <span lang="nl">— Portret</span>
              <span lang="en">— Portrait</span>
            </div>
            <div style={{ position: "absolute", bottom: 16, right: 16, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--color-bg)", opacity: 0.6 }}>
              Delft, 2026
            </div>
          </div>

          <div>
            <h2 style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text)", marginBottom: 28 }}>
              <span lang="nl">Over mij</span>
              <span lang="en">About me</span>
            </h2>
            {about.body.map((para, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.65, color: "var(--color-text-soft)", maxWidth: "58ch", marginTop: i > 0 ? 18 : 0 }}>
                <span lang="nl">{para.nl}</span>
                <span lang="en">{para.en}</span>
              </p>
            ))}
          </div>
        </section>

        {/* ── Timeline ── */}
        <section style={{ borderTop: "1px solid var(--color-text)", padding: "80px 48px", maxWidth: 1440, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 48 }}>
            <span lang="nl"><em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>Tijdlijn</em> · 2021 — nu</span>
            <span lang="en"><em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>Timeline</em> · 2021 — now</span>
          </h2>
          <div>
            {about.timeline.items.map((item, i) => (
              <Reveal key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 2fr", gap: 32, padding: "22px 0", borderTop: "1px solid var(--color-text)", alignItems: "baseline" } as React.CSSProperties}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--color-text-soft)", textTransform: "uppercase" }}>{item.year}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,2.6vw,32px)", letterSpacing: "-0.015em", lineHeight: 1.15 }}>
                  <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
                    <span lang="nl">{item.title.nl.split(" · ")[0]}</span>
                    <span lang="en">{item.title.en.split(" · ")[0]}</span>
                  </em>
                  {item.title.nl.includes(" · ") && (
                    <>
                      {" · "}
                      <span lang="nl">{item.title.nl.split(" · ").slice(1).join(" · ")}</span>
                      <span lang="en">{item.title.en.split(" · ").slice(1).join(" · ")}</span>
                    </>
                  )}
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.55, color: "var(--color-text-soft)", maxWidth: "60ch" }}>
                  <span lang="nl">{item.desc.nl}</span>
                  <span lang="en">{item.desc.en}</span>
                </span>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid var(--color-text)" }} />
          </div>
        </section>

        {/* ── Skills ── */}
        <section style={{ borderTop: "1px solid var(--color-text)", padding: "80px 48px", maxWidth: 1440, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 48 }}>
            <span lang="nl"><em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>Wat</em> ik kan</span>
            <span lang="en"><em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>What</em> I do</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {about.skills.columns.map((col, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--color-text)", paddingTop: 16 }}>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text)", marginBottom: 16 }}>
                  <span lang="nl">{col.title.nl}</span>
                  <span lang="en">{col.title.en}</span>
                </h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.items.map((item, j) => (
                    <li key={j} style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.01em", lineHeight: 1.2, color: "var(--color-text)" }}>
                      {item.em ? (
                        <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
                          <span lang="nl">{item.nl}</span>
                          <span lang="en">{item.en}</span>
                        </em>
                      ) : (
                        <>
                          <span lang="nl">{item.nl}</span>
                          <span lang="en">{item.en}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ borderTop: "1px solid var(--color-text)", padding: "100px 48px 80px", maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "end" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,9vw,144px)", letterSpacing: "-0.035em", lineHeight: 0.9 }}>
            <span lang="nl">
              {about.cta.heading.nl[0]}<br />
              <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{about.cta.heading.nl[1]}</em>
            </span>
            <span lang="en">
              {about.cta.heading.en[0]}<br />
              <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{about.cta.heading.en[1]}</em>
            </span>
          </h2>
          <Link
            href="/#contact"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-bg)", background: "var(--color-text)", padding: "18px 26px", borderRadius: "999px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 14, transition: "background 0.3s" }}
          >
            <span>
              <span lang="nl">{about.cta.button.nl}</span>
              <span lang="en">{about.cta.button.en}</span>
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontStyle: "italic" }}>↗</span>
          </Link>
        </section>
      </main>

      <Footer
        page="Pagina 2 / 2"
        backHref="/"
        backLabel={{ nl: "← Terug naar werk", en: "← Back to work" }}
      />
    </>
  );
}
