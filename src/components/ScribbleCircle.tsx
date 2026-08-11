"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type ScribbleCircleProps = {
  /** The phrase to circle. */
  children: ReactNode;
  /** Seconds to wait after the trigger fires before drawing. */
  delay?: number;
  /**
   * Keep the phrase on one line. Correct for short phrases, but a long one
   * would overflow narrow viewports — pass false there and the loop stretches
   * around the wrapped block instead, which still reads as circling by hand.
   */
  nowrap?: boolean;
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
export function ScribbleCircle({ children, delay = 0, nowrap = true }: ScribbleCircleProps) {
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
    <span className={`relative inline-block ${nowrap ? "whitespace-nowrap" : "max-w-full"}`}>
      {children}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute overflow-visible text-accent"
        // Offsets are in em, not rem/px, so the loop keeps the same visual
        // breathing room whether it's around a 72px headline or 14px body copy.
        // Generous enough that the stroke clears ascenders and descenders
        // instead of cutting through the letterforms.
        style={{ left: "-0.5em", right: "-0.5em", top: "-0.34em", bottom: "-0.34em" }}
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
