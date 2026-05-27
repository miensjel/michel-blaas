import ThreeCanvas from "@/components/ThreeCanvas";
import Reveal from "@/components/Reveal";
import type { WorkItem } from "@/content/home";

const sizeClass: Record<WorkItem["size"], string> = {
  lg: "work size-lg",
  md: "work size-md",
  sm: "work size-sm",
};

const DragIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 12h10M9 8l-2 4 2 4M15 8l2 4-2 4" />
  </svg>
);

export default function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Reveal className={sizeClass[item.size]}>
      <div className="work-canvas">
        <ThreeCanvas
          model={item.model}
          dist={item.dist}
          height={item.height}
          speed={item.speed}
          bg={item.bg}
        />
        <div className="pill">{item.category}</div>
        <div className="year">{item.year}</div>
        <div className="drag-hint">
          <DragIcon />
          Sleep
        </div>
      </div>

      <div className="work-info">
        <div className="title-row">
          <h3>
            {item.title} <em>{item.subtitle}</em>
          </h3>
          <span className="price">{item.price}</span>
        </div>
        <p>{item.description}</p>
        <div className="specs">
          {item.specs.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
