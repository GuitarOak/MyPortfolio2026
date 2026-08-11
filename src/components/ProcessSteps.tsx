"use client";

import { useRef } from "react";
// ScrollTrigger isn't imported directly: the plugin is registered in @/lib/gsap
// and used declaratively via the timeline's `scrollTrigger` config below.
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ScribbleArrow, SCRIBBLE_ARROW_ATTR } from "./ScribbleArrow";

type Step = {
  title: string;
  points: readonly string[];
};

type ProcessStepsProps = {
  steps: readonly Step[];
};

/**
 * The four-step process grid, animated as one continuous sequence:
 * column 1 reveals → its arrow draws → column 2 reveals → and so on.
 *
 * The sequence is **scrubbed to scroll position**, so the user's scrolling
 * drives the pen: stop scrolling and the drawing stops with you; scroll back up
 * and it un-draws. (This is the one place that intentionally departs from the
 * "play once per page load" decision — a scrubbed timeline is inherently
 * reversible, which is what makes it feel scroll-driven rather than merely
 * scroll-triggered.)
 *
 * It owns the whole chain in a single timeline rather than using RevealGroup
 * plus self-triggering arrows: on desktop all four columns sit side by side and
 * enter the viewport at the same instant, so per-element triggers could never
 * produce a step-by-step order. Ordering comes from position in the timeline,
 * which the scroll position then maps onto.
 */
export function ProcessSteps({ steps }: ProcessStepsProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const columns = Array.from(grid.children) as HTMLElement[];
    if (!columns.length) return;

    // Each column's arrow points at the *next* column, so the last has none.
    const arrowPathsByColumn = columns.map((column) =>
      Array.from(column.querySelectorAll<SVGPathElement>(`[${SCRIBBLE_ARROW_ATTR}] path`)),
    );
    const allArrowPaths = arrowPathsByColumn.flat();

    // Reduced motion: everything visible, nothing sequenced.
    if (prefersReducedMotion()) {
      gsap.set(columns, { opacity: 1, y: 0 });
      gsap.set(allArrowPaths, { strokeDashoffset: 0 });
      return;
    }

    gsap.set(columns, { opacity: 0, y: 16 });
    allArrowPaths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    // Scrubbed: progress through the timeline is mapped to scroll position
    // between `start` and `end`. The 0.5s scrub smooths the mapping so the
    // strokes glide rather than jitter with every scroll tick.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        // Begins once the grid is well into view and completes before it
        // leaves, so the whole sequence is watchable without pinning the page.
        start: "top 75%",
        end: "bottom 55%",
        scrub: 0.5,
      },
    });

    columns.forEach((column, index) => {
      tl.to(column, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });

      const [shaft, head] = arrowPathsByColumn[index] ?? [];
      if (shaft && head) {
        // Shaft then head, slightly overlapping — one pen gesture, not two.
        tl.to(shaft, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" }, "-=0.05");
        tl.to(head, { strokeDashoffset: 0, duration: 0.2, ease: "power2.out" }, "-=0.08");
      }
    });
  }, { scope: gridRef });

  return (
    <div ref={gridRef} className="grid gap-8 md:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step.title} className="relative">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            {step.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {/* The last step has nothing to point at. */}
          {index < steps.length - 1 ? <ScribbleArrow /> : null}
        </div>
      ))}
    </div>
  );
}
