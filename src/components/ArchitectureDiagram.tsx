"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { StickyNote } from "./StickyNote";

type ArchitectureDiagramProps = {
  steps: readonly string[];
};

/**
 * Architecture diagram with sequential scroll-triggered animation. Each step
 * appears one by one as you scroll. The reflection quote appears after all
 * steps are visible, styled as a sticky note.
 */
export function ArchitectureDiagram({ steps }: ArchitectureDiagramProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const stepElements = Array.from(
      container.querySelectorAll("[data-diagram-step]")
    ) as HTMLElement[];
    const arrows = Array.from(
      container.querySelectorAll("[data-diagram-arrow]")
    ) as HTMLElement[];

    if (!stepElements.length) return;

    // Reduced motion: show everything immediately.
    if (prefersReducedMotion()) {
      gsap.set([...stepElements, ...arrows], { opacity: 1, y: 0 });
      return;
    }

    // Start state: all hidden.
    gsap.set([...stepElements, ...arrows], { opacity: 0, y: 16 });

    // Sequential reveal: each step + its arrow, then the quote.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 95%",
        end: "bottom 20%",
        // Scrub so the animation progresses with scroll.
        scrub: 0.5,
      },
    });

    stepElements.forEach((step, index) => {
      tl.to(step, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      // Arrow appears right after its step (if it exists).
      if (arrows[index]) {
        tl.to(arrows[index], { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1");
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <h2 className="font-mono text-xs uppercase tracking-wide text-muted">Architecture</h2>
      
      {/* Each step appears sequentially as you scroll. */}
      <div className="mt-4 flex flex-col items-stretch gap-2">
        {steps.map((step, index) => (
          <div key={step}>
            <div
              data-diagram-step
              className="border border-border bg-background px-4 py-3 font-mono text-sm text-foreground"
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <div
                data-diagram-arrow
                className="flex justify-center py-1 text-muted"
                aria-hidden
              >
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reflection quote styled as a sticky note, always visible. */}
      <StickyNote className="mt-6">
        &ldquo;Firebase allowed rapid development, authentication and flexible data storage.
        However, the nested document structure made some bulk operations and reporting more
        complicated. At greater scale, I would evaluate a relational model or a dedicated search
        and reporting layer.&rdquo;
      </StickyNote>
    </div>
  );
}
