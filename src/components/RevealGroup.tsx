"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type RevealGroupProps = {
  children: ReactNode;
  /**
   * Rendered element. Defaults to "div", but sections with semantic list
   * markup (Experience uses <ol>, Contact uses <dl>) must keep their own
   * element so the animation wrapper doesn't break the list semantics.
   */
  as?: "div" | "ol" | "dl" | "ul";
  className?: string;
  /** Seconds between each child's reveal. */
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
};

/**
 * Staggers the reveal of its *direct children* as the group scrolls into
 * view — one step/column/entry at a time, matching the heading write-in
 * pattern in useWriteInReveal (same easing, distance and "once per page
 * load" behaviour).
 *
 * It's a client component wrapping server-rendered children, so the
 * sections using it don't need to become client components themselves.
 */
export function RevealGroup({
  children,
  as: Tag = "div",
  className,
  stagger = 0.12,
  start = "top 85%",
}: RevealGroupProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = Array.from(el.children);
    if (!items.length) return;

    // Reduced motion: render final state, no movement.
    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 16 });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger,
      ease: "power2.out",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
    };
  }, { dependencies: [stagger, start] });

  return (
    <Tag
      // Callback ref (rather than a typed object ref) because Tag varies
      // between div/ol/dl/ul, which have different element types.
      ref={(node: HTMLElement | null) => {
        containerRef.current = node;
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
