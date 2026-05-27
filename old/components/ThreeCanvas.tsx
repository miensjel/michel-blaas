"use client";

import { useEffect, useRef } from "react";
import type { ModelName } from "@/content/home";

interface Props {
  model: ModelName;
  dist?: number;
  height?: number;
  speed?: number;
  bg?: number;
}

export default function ThreeCanvas({
  model,
  dist = 5,
  height = 1.2,
  speed = 0.7,
  bg = 0xebe5db,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let stage: any = null;

    (async () => {
      const { Stage, builders } = await import("@/lib/scene");
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      stage = new Stage(canvas, {
        cameraDistance: dist,
        cameraHeight: height,
        autoRotateSpeed: speed,
        background: bg,
      });
      stage.add(builders[model]());
    })();

    return () => {
      cancelled = true;
      stage?.dispose();
    };
  }, [model, dist, height, speed, bg]);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />;
}
