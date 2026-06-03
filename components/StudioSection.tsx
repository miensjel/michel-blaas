import Reveal from "@/components/Reveal";
import PortraitSVG from "@/components/PortraitSVG";
import { home } from "@/content/home";
import { getStudio } from "@/lib/cms-store";

const { studio } = home;

export default async function StudioSection() {
  const cms = await getStudio();
  return (
    <section
      id="studio"
      style={{ padding: "140px 0 120px", borderTop: "1px solid var(--color-text)", marginTop: 100, maxWidth: 1440, margin: "100px auto 0", paddingLeft: 48, paddingRight: 48 }}
    >
      <Reveal style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 24, fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text)", marginBottom: 64, borderTop: "1px solid var(--color-text)", paddingTop: 16 } as React.CSSProperties}>
        <span style={{ color: "var(--color-muted)" }}>№ 03</span>
        <span>
          <span lang="nl">{studio.label.nl}</span>
          <span lang="en">{studio.label.en}</span>
        </span>
        <span>
          <span lang="nl">{studio.since.nl}</span>
          <span lang="en">{studio.since.en}</span>
        </span>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 80, alignItems: "start", paddingTop: 48 }}>
        <div>
          <Reveal as="h2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,7vw,104px)", lineHeight: 0.92, letterSpacing: "-0.03em" } as React.CSSProperties}>
            <span lang="nl">
              {studio.heading.nl[0]}<br />
              <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{studio.heading.nl[1]}</em> {studio.heading.nl[2]}<br />
              {studio.heading.nl[3]}
            </span>
            <span lang="en">
              {studio.heading.en[0]}<br />
              <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{studio.heading.en[1]}</em> {studio.heading.en[2]}<br />
              {studio.heading.en[3]}
            </span>
          </Reveal>
        </div>

        <Reveal>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.25, letterSpacing: "-0.01em", color: "var(--color-text)", marginBottom: 32 }}>
            <span lang="nl">{cms.lede.nl}</span>
            <span lang="en">{cms.lede.en}</span>
          </p>

          <div style={{ fontSize: 15, lineHeight: 1.65, color: "var(--color-text-soft)", maxWidth: "56ch", marginBottom: 40 }}>
            {cms.body.map((para, i) => (
              <p key={i} style={{ marginTop: i > 0 ? 16 : 0 }}>
                <span lang="nl">{para.nl}</span>
                <span lang="en">{para.en}</span>
              </p>
            ))}
          </div>

          <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 32px", fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text)", paddingTop: 24, borderTop: "1px solid var(--color-text)", maxWidth: 480, listStyle: "none", padding: 0 }}>
            {studio.education.map((item, i) => (
              <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid rgba(26,24,21,0.15)", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-soft)" }}>
                  <span lang="nl">{item.label.nl}</span>
                  <span lang="en">{item.label.en}</span>
                </span>
                <span style={{ color: "var(--color-text-soft)" }}>{item.year}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Bio card */}
        <Reveal style={{ gridColumn: 1, position: "sticky", top: 100, background: "var(--color-surface)", borderRadius: "var(--radius-card)", padding: 32, display: "flex", flexDirection: "column", gap: 24 } as React.CSSProperties}>
          <div style={{ aspectRatio: "4/5", background: "var(--color-text)", borderRadius: 2, position: "relative", overflow: "hidden" }}>
            <PortraitSVG gradientSuffix="1" />
            <div style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-bg)", opacity: 0.7 }}>
              <span lang="nl">— Portret</span>
              <span lang="en">— Portrait</span>
            </div>
            <div style={{ position: "absolute", bottom: 14, right: 14, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-bg)", opacity: 0.6, letterSpacing: "0.08em" }}>
              2026
            </div>
          </div>

          <dl style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "8px 16px", fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {studio.bioDetails.map((item, i) => (
              <>
                <dt key={`k-${i}`} style={{ color: "var(--color-muted)" }}>
                  <span lang="nl">{item.key.nl}</span>
                  <span lang="en">{item.key.en}</span>
                </dt>
                <dd key={`v-${i}`} style={{ color: "var(--color-text)" }}>
                  <span lang="nl">{item.value.nl}</span>
                  <span lang="en">{item.value.en}</span>
                </dd>
              </>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
