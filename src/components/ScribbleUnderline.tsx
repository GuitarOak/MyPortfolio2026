"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type ScribbleUnderlineProps = {
  /** When true the squiggle draws itself in; when false it un-draws. */
  drawn: boolean;
  /** Renders at reduced opacity — used for the hover (not active) state. */
  faint?: boolean;
  /**
   * Seconds to wait before drawing. Used to hold the stroke back until a
   * heading's write-in has finished, so the pen reads as one continuous
   * gesture: write the words, then underline them.
   */
  delay?: number;
  className?: string;
};

// Same squiggle geometry as the .underline-scribble CSS utility in globals.css,
// so the drawn-in version and the static background version look identical.
const SQUIGGLE_PATH = "M0 8 Q 15 2, 30 7 T 60 6 T 100 7";

/**
 * A hand-drawn underline that draws itself in like a pen stroke, by animating
 * stroke-dashoffset. Deliberately avoids DrawSVGPlugin — plain dashoffset math
 * gives the same result with one less plugin to register.
 *
 * The parent must be positioned (e.g. `relative`) and controls the colour via
 * `currentColor`.
 */
export function ScribbleUnderline({
  drawn,
  faint = false,
  delay = 0,
  className,
}: ScribbleUnderlineProps) {
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    // Measured in viewBox user units, which is what the dash properties use —
    // the SVG's non-uniform stretch to the label width doesn't affect this.
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length });

    const offset = drawn ? 0 : length;

    // Reduced motion: jump to the drawn/undrawn state with no stroke animation.
    if (prefersReducedMotion()) {
      gsap.set(path, { strokeDashoffset: offset });
      return;
    }

    gsap.to(path, {
      strokeDashoffset: offset,
      // Only delay drawing in; un-drawing should always be immediate.
      delay: drawn ? delay : 0,
      // Drawing in is a deliberate pen stroke; un-drawing is quicker so the
      // outgoing link doesn't linger while the new one is already drawing.
      duration: drawn ? 0.4 : 0.2,
      ease: drawn ? "power2.out" : "power2.in",
    });
  }, { dependencies: [drawn, delay] });

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 top-full h-[0.4em] w-full overflow-visible transition-opacity ${
        faint ? "opacity-40" : "opacity-100"
      } ${className ?? ""}`}
    >
      <path
        ref={pathRef}
        d={SQUIGGLE_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        // Start fully un-drawn; useGSAP sets the real dash values before paint.
        style={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
      />
    </svg>
  );
}
