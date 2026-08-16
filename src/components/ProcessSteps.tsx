"use client";

import { useRef } from "react";
// ScrollTrigger isn't imported directly: the plugin is registered in @/lib/gsap
// and used declaratively via the timeline's `scrollTrigger` config below.
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SectionHeading } from "./SectionHeading";
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
 * The sequence is **scrubbed to scroll position inside a pinned container**, so
 * the page stops scrolling and your scroll input drives the timeline instead:
 * the pen draws as you "scroll" (really: scrub the timeline), and when the
 * sequence completes the page unpins and normal scrolling resumes. Scroll back
 * up and the timeline reverses, un-drawing the strokes.
 *
 * This is the one place that intentionally departs from the "play once per page
 * load" decision — a scrubbed + pinned timeline is inherently reversible, which
 * is what makes it feel like you're controlling the pen rather than watching a
 * triggered animation.
 *
 * It owns the whole chain in a single timeline rather than using RevealGroup
 * plus self-triggering arrows: on desktop all four columns sit side by side and
 * enter the viewport at the same instant, so per-element triggers could never
 * produce a step-by-step order. Ordering comes from position in the timeline,
 * which the scroll position then maps onto.
 */
export function ProcessSteps({ steps }: ProcessStepsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

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

    // Scrubbed inside a pinned container: the page stops scrolling when the
    // container (heading + grid) reaches the trigger point, and scroll input
    // drives the timeline instead. The heading stays visible at the top while
    // the grid scrubs below it. When the timeline completes, the page unpins.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        // Pin once the heading reaches the top (accounting for nav height).
        start: "top 125px",
        // The end determines how much scroll distance maps onto the timeline.
        // "+=150%" means you scroll roughly 1.5 viewports to play the whole
        // sequence — enough that each step feels deliberate, not so much that
        // it drags. Tune this if the pace feels wrong.
        end: "+=150%",
        pin: true,
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
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Padding prevents the heading from hiding under the sticky nav when pinned. */}
      <div className="pt-20">
        <SectionHeading number="02" title="How I Solve Problems" />
      </div>
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
    </div>
  );
}
