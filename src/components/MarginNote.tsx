"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type MarginNoteProps = {
  children: ReactNode;
  /** Position relative to the parent: "left" or "right" */
  position?: "left" | "right";
};

/**
 * Handwritten-style margin annotation that appears next to content. Styled
 * with the pencil font, slight rotation, and a subtle arrow pointing to the
 * relevant content. Fades in on scroll.
 */
export function MarginNote({ children, position = "right" }: MarginNoteProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduced motion: show immediately.
    if (prefersReducedMotion()) {
      gsap.set(container, { opacity: 1 });
      return;
    }

    gsap.set(container, { opacity: 0 });

    gsap.to(container, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`
        absolute hidden lg:block font-pencil text-sm text-muted/80
        ${position === "right" ? "-right-12 top-0" : "-left-12 top-0"}
      `}
      style={{
        transform: position === "right" ? "rotate(2deg)" : "rotate(-2deg)",
        width: "140px",
      }}
    >
      {/* Arrow pointing to the content */}
      <div
        className={`mb-2 text-muted/60 ${position === "right" ? "text-left -top-10" : "text-right"}`}
        aria-hidden
      >
        {position === "right" ? "←" : "→"}
      </div>
      {children}
    </div>
  );
}
