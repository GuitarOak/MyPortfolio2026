"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type TapedImageProps = {
  children: ReactNode;
  /**
   * "load" plays immediately on mount (use for above-the-fold images like the
   * Hero portrait). "scroll" waits until the image scrolls into view.
   */
  trigger?: "load" | "scroll";
  /** Additional classes for the outer container. */
  className?: string;
};

/**
 * Wraps an image with a white paper margin (Polaroid-ish bottom edge), slight
 * rotation, lift shadow, and a washi-tape strip across one corner. The image
 * drops and settles into place on first view.
 *
 * The container reserves its final size from first paint, and the animation
 * only transforms (no layout shift), so it's safe to use above the fold without
 * blocking LCP.
 */
export function TapedImage({ children, trigger = "scroll", className }: TapedImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const frame = container.querySelector("[data-taped-frame]") as HTMLElement | null;
    const tape = container.querySelector("[data-tape-strip]") as HTMLElement | null;
    if (!frame) return;

    // Reduced motion: show the final state, skip the drop-in.
    if (prefersReducedMotion()) {
      gsap.set(frame, { y: 0, rotation: 2 });
      if (tape) gsap.set(tape, { opacity: 1 });
      return;
    }

    // Start state: slightly above and rotated more, tape invisible.
    gsap.set(frame, { y: -20, rotation: 6 });
    if (tape) gsap.set(tape, { opacity: 0 });

    const tl = gsap.timeline({ paused: trigger === "scroll" });
    // Drop and settle: overshoots slightly then bounces back.
    tl.to(frame, { y: 0, rotation: 2, duration: 0.7, ease: "back.out(1.2)" });
    // Tape appears once the photo has settled.
    if (tape) {
      tl.to(tape, { opacity: 1, duration: 0.3 }, "-=0.2");
    }

    if (trigger === "load") {
      tl.play();
    } else {
      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => tl.play(),
      });

      return () => {
        scrollTrigger.kill();
      };
    }
  }, { dependencies: [trigger] });

  return (
    <div ref={containerRef} className={className}>
      {/* The frame: white paper margin, rotation, shadow. */}
      <div
        data-taped-frame
        className="relative rounded-sm bg-surface p-3 pb-10 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.35)]"
      >
        {children}

        {/* Washi-tape strip: semi-transparent, rotated, across the top-left corner. */}
        <div
          data-tape-strip
          className="pointer-events-none absolute -left-4 -top-2 h-8 w-24 -rotate-12 bg-accent/20 opacity-0"
          style={{
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </div>
  );
}
