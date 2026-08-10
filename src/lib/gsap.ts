"use client";

// Central GSAP setup. Import gsap/ScrollTrigger from here everywhere instead
// of "gsap" directly, so plugins are registered exactly once and this file
// stays the single source of truth for GSAP configuration.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Guard against running on the server (GSAP/ScrollTrigger require the DOM).
// Calling registerPlugin() more than once (e.g. on Fast Refresh) is safe —
// GSAP just re-registers the same plugin, it doesn't throw or duplicate.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/**
 * True when the user has requested reduced motion at the OS/browser level.
 * project.md requires reduced-motion support; the existing CSS
 * @media (prefers-reduced-motion: reduce) block only affects CSS
 * transitions/animations, not GSAP's JS-driven tweens, so every GSAP
 * animation must check this (ideally via gsap.matchMedia()) and either skip
 * or drastically simplify motion when it's true.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
