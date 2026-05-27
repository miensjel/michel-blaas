"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface Props {
  children:   React.ReactNode;
  className?: string;
  style?:     CSSProperties;
  as?:        keyof React.JSX.IntrinsicElements;
}

export default function Reveal({ children, className = "", style, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const AnyTag = Tag as React.ElementType;
  return (
    <AnyTag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </AnyTag>
  );
}
