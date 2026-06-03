"use client";

import { useState, useRef } from "react";
import WorkCard from "@/components/WorkCard";
import { reorderWorks } from "@/app/cms/actions";
import type { WorkItem } from "@/lib/cms-store";

export default function WorksGrid({ initialItems }: { initialItems: WorkItem[] }) {
  const [items, setItems] = useState(initialItems);
  const dragIdx = useRef<number | null>(null);

  function handleDragStart(i: number) {
    dragIdx.current = i;
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIdx.current === null || dragIdx.current === i) return;
    const arr = [...items];
    const [dragged] = arr.splice(dragIdx.current, 1);
    arr.splice(i, 0, dragged);
    dragIdx.current = i;
    setItems(arr);
  }

  async function handleDrop() {
    dragIdx.current = null;
    await reorderWorks(items.map((item) => item.id));
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "24px" }}>
      {items.map((item, i) => (
        <WorkCard
          key={item.id}
          item={item}
          dragProps={{
            draggable: true,
            onDragStart: () => handleDragStart(i),
            onDragOver: (e) => handleDragOver(e as React.DragEvent, i),
            onDrop: handleDrop,
          }}
          onUpdate={(updated) =>
            setItems((prev) => prev.map((w) => (w.id === updated.id ? updated : w)))
          }
        />
      ))}
    </div>
  );
}
