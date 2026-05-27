import ThreeCanvas from "@/components/ThreeCanvas";
import Reveal from "@/components/Reveal";
import type { home } from "@/content/home";

type WorkItem = (typeof home.works.items)[number];

const colSpan: Record<string, number> = { lg: 7, md: 5, sm: 4 };

interface Props {
  item: WorkItem;
}

export default function WorkCard({ item }: Props) {
  return (
    <Reveal
      as="article"
      className=""
      style={{
        gridColumn:     `span ${colSpan[item.size] ?? 4}`,
        position:       "relative",
        background:     "var(--color-surface)",
        borderRadius:   "var(--radius-card)",
        overflow:       "hidden",
        display:        "flex",
        flexDirection:  "column",
      } as React.CSSProperties}
    >
      {/* Canvas */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "5/4", cursor: "grab" }}>
        <ThreeCanvas model={item.model} dist={item.dist} height={item.height} speed={item.speed} bg={item.bg} />
        <div style={{ position: "absolute", top: 16, left: 16, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text)", padding: "6px 10px", background: "rgba(235,229,219,0.7)", backdropFilter: "blur(4px)", borderRadius: "999px" }}>
          <span lang="nl">{item.category.nl}</span>
          <span lang="en">{item.category.en}</span>
        </div>
        <div style={{ position: "absolute", top: 16, right: 16, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-soft)", letterSpacing: "0.08em" }}>
          {item.year}
        </div>
        <div style={{ position: "absolute", bottom: 16, left: 16, fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text-soft)", display: "flex", alignItems: "center", gap: 6, opacity: 0 }} className="drag-hint-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 12, height: 12 }}>
            <path d="M7 12h10M9 8l-2 4 2 4M15 8l2 4-2 4" />
          </svg>
          <span lang="nl">Sleep</span><span lang="en">Drag</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 14, borderTop: "1px solid rgba(26,24,21,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 32, letterSpacing: "-0.02em", lineHeight: 1 }}>
            {item.title} <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              <span lang="nl">{item.subtitle.nl}</span>
              <span lang="en">{item.subtitle.en}</span>
            </em>
          </h3>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", color: "var(--color-text-soft)", letterSpacing: "0.08em" }}>
            <span lang="nl">{item.status.nl}</span>
            <span lang="en">{item.status.en}</span>
          </span>
        </div>

        <p style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--color-text-soft)", maxWidth: "46ch" }}>
          <span lang="nl">{item.body.nl}</span>
          <span lang="en">{item.body.en}</span>
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
          {item.specs.map((spec, i) => (
            <span
              key={i}
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text)", padding: "4px 9px", border: "1px solid var(--color-text)", borderRadius: "999px" }}
            >
              <span lang="nl">{spec.nl}</span>
              <span lang="en">{spec.en}</span>
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
