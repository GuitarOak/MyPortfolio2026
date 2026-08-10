"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { ScribbleUnderline } from "./ScribbleUnderline";

// Sticky nav with active-section highlighting via IntersectionObserver.
// Kept simple and non-blocking: navigation still works via plain anchor
// links even if JS/observer fails, so the site remains fully usable.
export function Nav() {
  const [activeId, setActiveId] = useState<string>(nav[0].id);
  // Hover/focus is tracked in state (not CSS) because the underline is drawn
  // by GSAP, and keyboard focus should reveal it the same way hover does.
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible in the viewport to decide the active nav item.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="ink-rule-bottom sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        {/* Wordmark in Rock Salt so it reads as a handwritten signature. */}
        <a href="#top" className="font-handwritten text-sm md:text-base text-foreground">
          {site.name}
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 md:gap-8">
            {nav.map((item) => {
              const isActive = activeId === item.id;
              const isHovered = hoveredId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    onPointerEnter={() => setHoveredId(item.id)}
                    onPointerLeave={() => setHoveredId((id) => (id === item.id ? null : id))}
                    onFocus={() => setHoveredId(item.id)}
                    onBlur={() => setHoveredId((id) => (id === item.id ? null : id))}
                    className={`relative inline-block font-mono text-xs md:text-sm uppercase tracking-wide transition-colors ${
                      isActive ? "text-accent" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {/* Drawn for the active link, faintly on hover/focus. */}
                    <ScribbleUnderline drawn={isActive || isHovered} faint={!isActive} />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
