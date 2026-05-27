import ThreeCanvas from "@/components/ThreeCanvas";
import Reveal from "@/components/Reveal";
import { home } from "@/content/home";

export default function StudioSection() {
  const s = home.studio;
  return (
    <section className="studio container" id="studio">
      <Reveal className="section-label">
        <span className="num">{s.label.num}</span>
        <span>{s.label.text}</span>
        <span>{s.label.since}</span>
      </Reveal>

      <div className="studio-grid">
        <div>
          <Reveal>
            <h2>
              {s.headingLines[0]} <br />
              <em>{s.headingLines[1]}</em> <br />
              {s.headingLines[2]}
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <p className="lede">{s.lede}</p>
          <div className="body">
            {s.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <ul className="client-list">
            {s.clients.map((c) => (
              <li key={c.name}>
                <span>{c.name}</span>
                <span>{c.period}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="bio-card" style={{ gridColumn: "1" }}>
          <div className="bio-portrait">
            <ThreeCanvas model="bust" dist={4} height={0.9} speed={0.8} bg={0x1a1815} />
            <div className="tag">{s.bio.portraitTag}</div>
            <div className="tag-2">{s.bio.portraitYear}</div>
          </div>
          <dl className="bio-details">
            {s.bio.details.map((d) => (
              <>
                <dt key={`dt-${d.term}`}>{d.term}</dt>
                <dd key={`dd-${d.term}`}>{d.desc}</dd>
              </>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
