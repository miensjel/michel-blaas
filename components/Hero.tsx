import ThreeCanvas from "@/components/ThreeCanvas";
import { home } from "@/content/home";

const { hero } = home;

export default function Hero() {
  return (
    <section
      id="hero"
      style={{ position: "relative", minHeight: "100vh", padding: "140px 48px 80px", display: "grid", gridTemplateColumns: "1fr", alignItems: "end" }}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "end" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 24, color: "var(--color-text-soft)" }}>
            <span lang="nl">{hero.kicker.nl}</span>
            <span lang="en">{hero.kicker.en}</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(64px,11vw,168px)", lineHeight: 0.88, letterSpacing: "-0.035em", color: "var(--color-text)" }}>
            <span lang="nl">
              {hero.headline.nl[0]}<br />
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>{hero.headline.nl[1]}</em><br />
              {hero.headline.nl[2]}<span style={{ fontStyle: "italic", fontSize: "0.42em", letterSpacing: "-0.01em", display: "inline-block", transform: "translateY(-0.15em)", color: "var(--color-text-soft)" }}>.</span>
            </span>
            <span lang="en">
              {hero.headline.en[0]}<br />
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>{hero.headline.en[1]}</em><br />
              {hero.headline.en[2]}<span style={{ fontStyle: "italic", fontSize: "0.42em", letterSpacing: "-0.01em", display: "inline-block", transform: "translateY(-0.15em)", color: "var(--color-text-soft)" }}>.</span>
            </span>
          </h1>

          <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px 24px", fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-soft)", marginTop: 48, borderTop: "1px solid var(--color-text)", paddingTop: 16, maxWidth: 520 }}>
            {hero.meta.map((item, i) => (
              <>
                <dt key={`dt-${i}`} style={{ color: "var(--color-text)", fontWeight: 500 }}>
                  {typeof item.label === "string" ? item.label : (
                    <><span lang="nl">{item.label.nl}</span><span lang="en">{item.label.en}</span></>
                  )}
                </dt>
                <dd key={`dd-${i}`}>
                  <span lang="nl">{item.value.nl}</span>
                  <span lang="en">{item.value.en}</span>
                </dd>
              </>
            ))}
          </dl>
        </div>

        <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", minHeight: 520 }}>
          <ThreeCanvas model="monolith" dist={5.6} height={1.6} speed={0.5} />
          <div style={{ position: "absolute", bottom: 16, right: 16, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-soft)", display: "flex", alignItems: "center", gap: 8, background: "rgba(235,229,219,0.6)", padding: "6px 10px", borderRadius: "999px", backdropFilter: "blur(4px)" }}>
            <span style={{ display: "inline-flex", gap: 2, fontSize: 12 }}>↔</span>
            <span lang="nl">{hero.dragHint.nl}</span>
            <span lang="en">{hero.dragHint.en}</span>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 48, bottom: 32, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text-soft)", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 32, height: 1, background: "var(--color-text-soft)", animation: "cue 2.2s ease-in-out infinite", transformOrigin: "left", display: "inline-block" }} />
        <span lang="nl">{hero.scroll.nl}</span>
        <span lang="en">{hero.scroll.en}</span>
      </div>
    </section>
  );
}
