"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Per-character stagger of the heading write-in, in seconds. */
export const CHAR_STAGGER = 0.025;
/** Duration of a single character's reveal, in seconds. */
export const CHAR_DURATION = 0.45;

/**
 * How long a heading of `charCount` characters takes to finish writing in.
 * Exported so anything that needs to land *after* the heading (e.g. the Hero's
 * scribble underline) can stay in sync with the timing above instead of
 * hard-coding a guessed delay.
 */
export function writeInDuration(charCount: number): number {
  return charCount * CHAR_STAGGER + CHAR_DURATION;
}

type WriteInOptions = {
  /**
   * "load" plays immediately on mount (use for content visible on first
   * paint, e.g. the Hero). "scroll" waits until the heading scrolls into
   * view, firing once (ScrollTrigger "once: true" per the confirmed
   * decision that reveals should not replay on repeated scroll-up/down).
   */
  trigger: "load" | "scroll";
  /** ScrollTrigger start position, only used when trigger === "scroll". */
  scrollStart?: string;
};

/**
 * Shared "heading writes in, then body follows" animation pattern.
 *
 * Attach `headingRef` to the heading element (its text gets split into
 * characters and revealed left-to-right, like handwriting). Attach
 * `bodyRef` to a wrapper element whose direct children (e.g. a description
 * paragraph, a CTA row) fade/slide in right after the heading finishes.
 * `bodyRef` is optional — if there's no body content, only the heading
 * animates.
 */
export function useWriteInReveal<
  HeadingEl extends HTMLElement = HTMLElement,
  BodyEl extends HTMLElement = HTMLElement,
>(options: WriteInOptions) {
  const headingRef = useRef<HeadingEl | null>(null);
  const bodyRef = useRef<BodyEl | null>(null);
  const { trigger, scrollStart = "top 80%" } = options;

  useGSAP(() => {
    const headingEl = headingRef.current;
    if (!headingEl) return;

    const bodyEls = bodyRef.current ? Array.from(bodyRef.current.children) : [];

    // Reduced motion: skip straight to the final visible state, no animation.
    if (prefersReducedMotion()) {
      gsap.set(headingEl, { opacity: 1 });
      if (bodyEls.length) gsap.set(bodyEls, { opacity: 1, y: 0 });
      return;
    }

    // "words,chars" rather than just "chars": splitting into chars alone makes
    // every character its own inline-block box, so the browser will happily
    // break a line mid-word ("Develo / per"). Wrapping chars in word elements
    // keeps each word an unbreakable unit while still animating per character.
    const split = new SplitText(headingEl, { type: "words,chars" });

    gsap.set(split.chars, {
      opacity: 0,
      y: 8,
      rotate: () => gsap.utils.random(-6, 6),
    });
    if (bodyEls.length) {
      gsap.set(bodyEls, { opacity: 0, y: 12 });
    }

    const tl = gsap.timeline({ paused: trigger === "scroll" });
    tl.to(split.chars, {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: CHAR_DURATION,
      stagger: CHAR_STAGGER,
      ease: "power2.out",
    });
    if (bodyEls.length) {
      tl.to(
        bodyEls,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "-=0.15",
      );
    }

    let scrollTriggerInstance: ScrollTrigger | undefined;
    if (trigger === "scroll") {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: headingEl,
        start: scrollStart,
        once: true,
        onEnter: () => tl.play(),
      });
    } else {
      tl.play();
    }

    // SplitText instances must be explicitly reverted to restore the
    // original DOM/text content — useGSAP's automatic context cleanup
    // handles the tween/timeline/ScrollTrigger, but not this.
    return () => {
      scrollTriggerInstance?.kill();
      split.revert();
    };
  }, { scope: headingRef, dependencies: [trigger, scrollStart] });

  return { headingRef, bodyRef };
}
