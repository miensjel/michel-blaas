import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:       "Logboek — Michel Blaas",
  description: "Notities, schetsen en gedachten over ontwerpen.",
};

export default function JournalPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section style={{ padding: "150px 48px 56px", maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40, alignItems: "end" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text-soft)", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 28, height: 1, background: "var(--color-text)", display: "inline-block" }} />
              <span lang="nl">№ Logboek · Michel Blaas</span>
              <span lang="en">№ Journal · Michel Blaas</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(56px,11vw,168px)", lineHeight: 0.88, letterSpacing: "-0.035em" }}>
              <span lang="nl">Log<em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>boek.</em></span>
              <span lang="en">Jour<em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>nal.</em></span>
            </h1>
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(20px,2.4vw,30px)", lineHeight: 1.3, color: "var(--color-text-soft)", maxWidth: "32ch" }}>
            <span lang="nl">Notities, schetsen en gedachten over ontwerpen, materiaal en proces.</span>
            <span lang="en">Notes, sketches and thoughts on design, material and process.</span>
          </p>
        </section>

        {/* ── Coming soon ── */}
        <section style={{ borderTop: "1px solid var(--color-text)", padding: "80px 48px 120px", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-soft)", marginBottom: 32 }}>
            <span lang="nl">00 berichten · nog niets gepubliceerd</span>
            <span lang="en">00 posts · nothing published yet</span>
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(28px,4vw,56px)", lineHeight: 1, letterSpacing: "-0.02em", color: "var(--color-text-soft)", maxWidth: "20ch" }}>
            <span lang="nl">Eerste notitie is onderweg.</span>
            <span lang="en">First note is on its way.</span>
          </p>
        </section>
      </main>

      <Footer
        backHref="/"
        backLabel={{ nl: "← Terug naar portfolio", en: "← Back to portfolio" }}
      />
    </>
  );
}
