import { home } from "@/content/home";

export default function Ticker() {
  const { ticker } = home;
  const repeat = [...ticker.nl, ...ticker.nl];
  const repeatEn = [...ticker.en, ...ticker.en];

  return (
    <div
      aria-hidden
      style={{
        position:   "relative",
        borderTop:  "1px solid var(--color-text)",
        borderBottom: "1px solid var(--color-text)",
        padding:    "18px 0",
        overflow:   "hidden",
        fontFamily: "var(--font-display)",
        fontStyle:  "italic",
        fontSize:   32,
        whiteSpace: "nowrap",
        background: "var(--color-bg)",
      }}
    >
      <div style={{ display: "inline-flex", gap: 56, animation: "ticker 38s linear infinite" }}>
        <span lang="nl" style={{ display: "inline-flex", alignItems: "center", gap: 56 }}>
          {repeat.map((word, i) => (
            <span key={i}>{i % 2 === 1 ? <span style={{ color: "var(--color-accent)", fontSize: 22, fontStyle: "normal" }}>✦</span> : word}</span>
          ))}
        </span>
        <span lang="en" style={{ display: "inline-flex", alignItems: "center", gap: 56 }}>
          {repeatEn.map((word, i) => (
            <span key={i}>{i % 2 === 1 ? <span style={{ color: "var(--color-accent)", fontSize: 22, fontStyle: "normal" }}>✦</span> : word}</span>
          ))}
        </span>
      </div>
    </div>
  );
}
