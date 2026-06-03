import Reveal from "@/components/Reveal";
import { home } from "@/content/home";
import { getProcess } from "@/lib/cms-store";

const { process } = home;

export default function ProcessSection() {
  const cms = getProcess();
  const bodyMap = new Map(cms.steps.map((s) => [s.num, s.body]));
  return (
    <section
      id="proces"
      style={{ padding: "120px 0", borderTop: "1px solid var(--color-text)", maxWidth: 1440, margin: "0 auto", paddingLeft: 48, paddingRight: 48 }}
    >
      <Reveal style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 24, fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text)", marginBottom: 64 } as React.CSSProperties}>
        <span style={{ color: "var(--color-muted)" }}>№ 04</span>
        <span>
          <span lang="nl">{process.label.nl}</span>
          <span lang="en">{process.label.en}</span>
        </span>
        <span>
          <span lang="nl">{process.subtitle.nl}</span>
          <span lang="en">{process.subtitle.en}</span>
        </span>
      </Reveal>

      <Reveal as="h2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,6vw,88px)", lineHeight: 0.95, letterSpacing: "-0.025em", marginBottom: 64, maxWidth: "14ch" } as React.CSSProperties}>
        <span lang="nl">
          {process.heading.nl[0]}<br />
          <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{process.heading.nl[1]}</em>
        </span>
        <span lang="en">
          {process.heading.en[0]}<br />
          <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{process.heading.en[1]}</em>
        </span>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24, marginTop: 48 }}>
        {process.steps.map((step, i) => (
          <Reveal
            key={i}
            style={{
              borderTop:     "1px solid var(--color-text)",
              paddingTop:    16,
              display:       "flex",
              flexDirection: "column",
              gap:           12,
              minHeight:     200,
            } as React.CSSProperties}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-muted)", letterSpacing: "0.1em" }}>
              {step.num} /{" "}
              {typeof step.numLabel === "string" ? step.numLabel : (
                <><span lang="nl">{(step.numLabel as {nl: string; en: string}).nl}</span><span lang="en">{(step.numLabel as {nl: string; en: string}).en}</span></>
              )}
            </span>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>
              {step.titleEm === true ? (
                <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
                  {typeof step.title === "string" ? step.title : (
                    <><span lang="nl">{(step.title as {nl: string; en: string}).nl}</span><span lang="en">{(step.title as {nl: string; en: string}).en}</span></>
                  )}
                </em>
              ) : (
                <>
                  {typeof step.title === "string" ? step.title : (
                    <><span lang="nl">{(step.title as {nl: string; en: string}).nl}</span><span lang="en">{(step.title as {nl: string; en: string}).en}</span></>
                  )}
                  {step.titleEm && <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{step.titleEm as string}</em>}
                  {step.titleSuffix && (
                    <> <span lang="nl">{(step.titleSuffix as {nl: string; en: string}).nl}</span><span lang="en">{(step.titleSuffix as {nl: string; en: string}).en}</span></>
                  )}
                </>
              )}
            </h4>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--color-text-soft)", marginTop: "auto" }}>
              <span lang="nl">{bodyMap.get(step.num)?.nl ?? step.body.nl}</span>
              <span lang="en">{bodyMap.get(step.num)?.en ?? step.body.en}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
