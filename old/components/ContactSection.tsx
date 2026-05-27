import Reveal from "@/components/Reveal";
import { home } from "@/content/home";

export default function ContactSection() {
  const c = home.contact;
  return (
    <section className="contact container" id="contact">
      <Reveal className="section-label">
        <span className="num">{c.label.num}</span>
        <span>{c.label.text}</span>
        <span>{c.label.location}</span>
      </Reveal>

      <Reveal>
        <h2>
          {c.headingLines[0].split(" ").map((word, i) =>
            i % 2 === 1 ? <em key={i}> {word}</em> : <span key={i}>{i > 0 ? " " : ""}{word}</span>
          )}
          <br />
          {c.headingLines[1].split(" ").map((word, i) =>
            i % 2 === 1 ? <em key={i}> {word}</em> : <span key={i}>{i > 0 ? " " : ""}{word}</span>
          )}
        </h2>
      </Reveal>

      <div className="contact-grid">
        <Reveal>
          <a className="email" href={`mailto:${c.email}`}>
            {c.email}
          </a>
          <p className="font-mono" style={{ marginTop: 24, color: "var(--color-ink-soft)" }}>
            {c.reply}
          </p>
        </Reveal>

        <div className="channels">
          {c.channels.map((ch) => (
            <Reveal key={ch.code}>
              <a href={ch.href} target={ch.arrow === "↗" ? "_blank" : undefined} rel="noopener">
                <span>{ch.code}</span>
                <span>{ch.label}</span>
                <span className="arrow">{ch.arrow}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
