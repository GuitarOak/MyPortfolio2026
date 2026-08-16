"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SectionHeading } from "./SectionHeading";
import type { CapabilityGroup } from "@/content/types";

type CapabilityColumnsProps = {
  groups: readonly CapabilityGroup[];
};

/**
 * The three capability columns, revealed in sequence via a scrubbed + pinned
 * timeline. Same interaction model as `ProcessSteps`: the page stops scrolling
 * when the grid enters view, scroll input drives the timeline, and when the
 * sequence completes the page unpins and normal scrolling resumes.
 *
 * Unlike ProcessSteps there are no arrows to draw here — just the three columns
 * staggering in left to right — but the pinned scrub treatment keeps the two
 * sections feeling consistent.
 */
export function CapabilityColumns({ groups }: CapabilityColumnsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const columns = Array.from(grid.children) as HTMLElement[];
    if (!columns.length) return;

    // Reduced motion: everything visible, no sequencing.
    if (prefersReducedMotion()) {
      gsap.set(columns, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(columns, { opacity: 0, y: 16 });

    // Scrubbed inside a pinned container, same as ProcessSteps. The heading
    // stays visible at the top while the columns scrub below it.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        // Pin once the heading reaches the top (accounting for nav height).
        start: "top 125px",
        // Shorter scroll distance than ProcessSteps (only 3 columns, no arrows).
        end: "+=100%",
        pin: true,
        scrub: 0.5,
      },
    });

    columns.forEach((column) => {
      tl.to(column, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Padding prevents the heading from hiding under the sticky nav when pinned. */}
      <div className="pt-20">
        <SectionHeading number="03" title="Capabilities" />
      </div>
      <div ref={gridRef} className="grid gap-10 md:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
}
