"use client";

import { useEffect, useState } from "react";
import { home } from "@/content/home";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="logo">
        <span>Michel</span>
        <sup>est. 2014</sup>
      </div>

      <nav>
        {home.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="status">
        <span className="dot" />
        <span>{home.hero.availability}</span>
      </div>
    </header>
  );
}
