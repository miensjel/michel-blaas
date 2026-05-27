import ThreeCanvas from "@/components/ThreeCanvas";
import { home } from "@/content/home";

export default function Hero() {
  const h = home.hero;
  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <div className="font-mono" style={{ marginBottom: 24, color: "var(--color-ink-soft)" }}>
            {h.label}
          </div>
          <h1>
            {h.titleLines[0]} <br />
            <em>{h.titleLines[1]}</em> <br />
            {h.titleLines[2]}
            <span className="small">.</span>
          </h1>
          <dl className="hero-meta">
            {h.meta.map((item) => (
              <>
                <dt key={`dt-${item.term}`}>{item.term}</dt>
                <dd key={`dd-${item.term}`}>{item.desc}</dd>
              </>
            ))}
          </dl>
        </div>

        <div className="hero-canvas">
          <ThreeCanvas model="monolith" dist={5.6} height={1.6} speed={0.5} />
          <div className="hint">
            <span>↔</span>
            <span>{h.dragHint}</span>
          </div>
        </div>
      </div>

      <div className="scroll-cue">{h.scrollCue}</div>
    </section>
  );
}
