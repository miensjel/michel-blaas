import WorkCard from "@/components/WorkCard";
import Reveal from "@/components/Reveal";
import { home } from "@/content/home";

const { works } = home;

export default function WorksSection() {
  return (
    <section
      id="werk"
      style={{ padding: "120px 0 60px", maxWidth: 1440, margin: "0 auto", paddingLeft: 48, paddingRight: 48 }}
    >
      <Reveal style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 24, fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text)", marginBottom: 64 } as React.CSSProperties}>
        <span style={{ color: "var(--color-muted)" }}>№ 02</span>
        <span>
          <span lang="nl">{works.sectionLabel.nl}</span>
          <span lang="en">{works.sectionLabel.en}</span>
        </span>
        <span>
          <span lang="nl">{works.count.nl}</span>
          <span lang="en">{works.count.en}</span>
        </span>
      </Reveal>

      <Reveal as="h2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,6vw,88px)", lineHeight: 0.95, letterSpacing: "-0.025em", marginBottom: 64, maxWidth: "14ch" } as React.CSSProperties}>
        <span lang="nl">
          {works.heading.nl[0]}<br />
          <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{works.heading.nl[1]}</em>
        </span>
        <span lang="en">
          {works.heading.en[0]}<br />
          <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{works.heading.en[1]}</em>
        </span>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "24px 24px" }}>
        {works.items.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
