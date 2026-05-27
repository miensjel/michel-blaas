import Reveal from "@/components/Reveal";
import { home } from "@/content/home";

export default function ProcesSection() {
  const p = home.proces;
  return (
    <section className="proces container" id="proces">
      <Reveal className="section-label">
        <span className="num">{p.label.num}</span>
        <span>{p.label.text}</span>
        <span>{p.label.sub}</span>
      </Reveal>

      <Reveal>
        <h2 className="section-heading">
          {p.headingLines[0]}
          <br />
          <em>{p.headingLines[1]}</em>
        </h2>
      </Reveal>

      <div className="proces-grid">
        {p.steps.map((step) => (
          <Reveal key={step.num} className="proces-step">
            <span className="num">{step.num}</span>
            <h4>
              {step.title}
              {step.titleItalic && <em>{step.titleItalic}</em>}
              {step.titleItalicSuffix && <em>{step.titleItalicSuffix}</em>}
            </h4>
            <p>{step.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
