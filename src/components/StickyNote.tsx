"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type StickyNoteProps = {
  children: ReactNode;
  /** Optional className for the outer container. */
  className?: string;
};

/**
 * Sticky-note styled blockquote with a yellow paper appearance, slight rotation,
 * and a subtle drop shadow. Animates in with a drop-and-settle motion on scroll.
 */
export function StickyNote({ children, className }: StickyNoteProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const note = container.querySelector("[data-sticky-note]") as HTMLElement | null;
    if (!note) return;

    // Always visible, no animation.
    gsap.set(note, { rotation: -1 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      <blockquote
        data-sticky-note
        className="relative bg-[#fef3c7] p-5 text-sm md:text-base text-[#78716c] italic shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)]"
        style={{
          // Subtle paper texture via noise pattern.
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      >
        {children}
      </blockquote>
    </div>
  );
}
