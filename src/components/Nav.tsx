"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

// Sticky nav with active-section highlighting via IntersectionObserver.
// Kept simple and non-blocking: navigation still works via plain anchor
// links even if JS/observer fails, so the site remains fully usable.
export function Nav() {
  const [activeId, setActiveId] = useState<string>(nav[0].id);

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-mono text-sm font-medium tracking-wide text-foreground">
          {site.name}
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 md:gap-8">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={`font-mono text-xs md:text-sm uppercase tracking-wide transition-colors ${
                    activeId === item.id ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
