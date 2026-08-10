"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type ScribbleCircleProps = {
  /** The phrase to circle. */
  children: ReactNode;
  /** Seconds to wait after the trigger fires before drawing. */
  delay?: number;
};

/**
 * An open, slightly-overshooting loop drawn around a phrase — the gesture of
 * circling a word by hand.
 *
 * Unlike the old `.scribble-circle` CSS utility (a `border-radius: 50%` border,
 * i.e. a mathematically perfect oval), this is a real hand-drawn path: the loop
 * doesn't close cleanly and overshoots past its start, which is what makes it
 * read as pen rather than CSS. It draws itself in via stroke-dashoffset when
 * scrolled into view, once per page load.
 */
export function ScribbleCircle({ children, delay = 0 }: ScribbleCircleProps) {
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    // Reduced motion: show the finished loop, skip the drawing.
    if (prefersReducedMotion()) {
      gsap.set(path, { strokeDashoffset: 0 });
      return;
    }

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.7,
      delay,
      // Slight acceleration then release, like a hand sweeping around a word.
      ease: "power1.inOut",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: path,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
    };
  }, { dependencies: [delay] });

  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        // Inset negatively so the loop sits around the text, not on top of it.
        className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] overflow-visible text-accent"
      >
        <path
          ref={pathRef}
          // Open loop that overshoots its own start, as a real circled word does.
          d="M172 14 C 152 3, 60 1, 28 12 C 2 21, 4 44, 34 52 C 74 62, 168 58, 190 44 C 200 37, 196 24, 160 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeOpacity={0.65}
          style={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        />
      </svg>
    </span>
  );
}
