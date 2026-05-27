"use client";

import { useEffect, useRef } from "react";
import type { ModelName } from "@/lib/scene";

interface Props {
  model: ModelName;
  dist?:   number;
  height?: number;
  speed?:  number;
  bg?:     number;
  className?: string;
}

export default function ThreeCanvas({ model, dist = 5, height = 1.2, speed = 0.7, bg, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let stage: import("@/lib/scene").Stage | null = null;

    import("@/lib/scene").then(({ Stage, builders }) => {
      const builder = builders[model];
      if (!builder) return;

      stage = new Stage(canvas, {
        cameraDistance:  dist,
        cameraHeight:    height,
        autoRotateSpeed: speed,
        background:      bg ?? 0xebe5db,
      });

      const obj = builder();
      stage.add(obj);
    });

    return () => {
      stage?.dispose();
    };
  }, [model, dist, height, speed, bg]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
