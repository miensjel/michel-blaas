import Reveal from "@/components/Reveal";
import { home } from "@/content/home";

const { contact } = home;

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{ padding: "140px 0 80px", borderTop: "1px solid var(--color-text)", position: "relative", maxWidth: 1440, margin: "0 auto", paddingLeft: 48, paddingRight: 48 }}
    >
      <Reveal style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 24, fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-text)", marginBottom: 64 } as React.CSSProperties}>
        <span style={{ color: "var(--color-muted)" }}>№ 05</span>
        <span>
          <span lang="nl">{contact.label.nl}</span>
          <span lang="en">{contact.label.en}</span>
        </span>
        <span>{contact.location}</span>
      </Reveal>

      <Reveal as="h2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(72px,13vw,220px)", lineHeight: 0.85, letterSpacing: "-0.04em", marginBottom: 48 } as React.CSSProperties}>
        <span lang="nl">
          {contact.heading.nl[0].split(" ").map((w, i) => i === 1 ? <em key={i} style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{w}</em> : ` ${w}`)}
          <br />
          {contact.heading.nl[1].split(" ").map((w, i) => (i === 0 ? w : i === 1 ? <em key={i} style={{ color: "var(--color-accent)", fontStyle: "italic" }}> {w}</em> : ` ${w}`))}
        </span>
        <span lang="en">
          {contact.heading.en[0].split(" ").map((w, i) => i === 1 ? <em key={i} style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{w}</em> : ` ${w}`)}
          <br />
          {contact.heading.en[1].split(" ").map((w, i) => (i === 0 ? w : i === 1 ? <em key={i} style={{ color: "var(--color-accent)", fontStyle: "italic" }}> {w}</em> : ` ${w}`))}
        </span>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "end" }}>
        <Reveal>
          <a
            href={`mailto:${contact.email}`}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,56px)", fontStyle: "italic", color: "var(--color-text)", textDecoration: "none", borderBottom: "1px solid var(--color-text)", paddingBottom: 8, display: "inline-block", transition: "color 0.3s, border-color 0.3s" }}
          >
            {contact.email}
          </a>
          <p style={{ marginTop: 24, color: "var(--color-text-soft)", fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            <span lang="nl">{contact.reply.nl}</span>
            <span lang="en">{contact.reply.en}</span>
          </p>
        </Reveal>

        <Reveal style={{ display: "flex", flexDirection: "column", gap: 14 } as React.CSSProperties}>
          {contact.channels.map((ch) => (
            <a
              key={ch.abbr}
              href={ch.href}
              target={ch.href.startsWith("http") ? "_blank" : undefined}
              rel={ch.href.startsWith("http") ? "noopener" : undefined}
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text)", textDecoration: "none", display: "grid", gridTemplateColumns: "28px 1fr auto", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid var(--color-text)", transition: "padding-left 0.3s" }}
            >
              <span>{ch.abbr}</span>
              <span>
                <span lang="nl">{ch.label.nl}</span>
                <span lang="en">{ch.label.en}</span>
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontStyle: "italic" }}>{ch.arrow}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
