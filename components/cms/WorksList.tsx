"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { reorderWorks } from "@/app/cms/actions";
import DeleteWorkButton from "@/components/cms/DeleteWorkButton";
import type { WorkItem } from "@/lib/cms-store";

export default function WorksList({ initialWorks }: { initialWorks: WorkItem[] }) {
  const [works, setWorks] = useState(initialWorks);
  const dragIdx = useRef<number | null>(null);

  function handleDragStart(i: number) {
    dragIdx.current = i;
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIdx.current === null || dragIdx.current === i) return;
    const arr = [...works];
    const [dragged] = arr.splice(dragIdx.current, 1);
    arr.splice(i, 0, dragged);
    dragIdx.current = i;
    setWorks(arr);
  }

  async function handleDrop() {
    dragIdx.current = null;
    await reorderWorks(works.map((w) => w.id));
  }

  return (
    <div style={{ borderTop: "1px solid var(--color-text)" }}>
      {works.length === 0 && (
        <p style={{ padding: "28px 0", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-muted)" }}>
          Geen werken. Voeg je eerste werk toe ↑
        </p>
      )}
      {works.map((work, i) => (
        <div
          key={work.id}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={handleDrop}
          style={{
            display: "grid",
            gridTemplateColumns: "20px 28px 1fr 70px 70px 70px",
            alignItems: "center",
            gap: 14,
            padding: "12px 0",
            borderBottom: "1px solid var(--color-rule)",
            cursor: "grab",
          }}
        >
          <span
            style={{
              color: "var(--color-muted)",
              fontSize: 14,
              lineHeight: 1,
              cursor: "grab",
              userSelect: "none",
            }}
          >
            ⠿
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-muted)", letterSpacing: "0.1em" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--color-text)", marginBottom: 2 }}>
              {work.title}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {work.category.nl} · {work.year} · {work.size}
            </div>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {work.model}
          </span>
          <Link
            href={`/cms/works/${work.id}`}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--color-text)", textDecoration: "none", padding: "6px 10px",
              border: "1px solid var(--color-text)", display: "inline-block", textAlign: "center",
            }}
          >
            Bewerk
          </Link>
          <DeleteWorkButton id={work.id} />
        </div>
      ))}
    </div>
  );
}
