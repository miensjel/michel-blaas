import Reveal from "@/components/Reveal";
import WorkCard from "@/components/WorkCard";
import { home } from "@/content/home";

export default function WerkSection() {
  const w = home.werk;
  return (
    <section className="werk container" id="werk">
      <Reveal className="section-label">
        <span className="num">{w.label.num}</span>
        <span>{w.label.text}</span>
        <span>{w.label.count}</span>
      </Reveal>

      <Reveal>
        <h2 className="section-heading">
          {w.headingLines[0]}
          <br />
          <em>{w.headingLines[1]}</em>
        </h2>
      </Reveal>

      <div className="works-grid">
        {w.items.map((item, i) => (
          <WorkCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
