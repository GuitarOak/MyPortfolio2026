/** Marks the arrow so a parent timeline can find its strokes to draw. */
export const SCRIBBLE_ARROW_ATTR = "data-scribble-arrow";

/**
 * A hand-sketched arrow, drawn as markup only — the animation is deliberately
 * owned by the parent (`ProcessSteps`), which sequences each arrow between the
 * two columns it connects. A self-contained ScrollTrigger here would fire
 * independently of that sequence and break the step-by-step ordering.
 *
 * If JS never runs, the arrows simply render fully drawn, which is the correct
 * fallback.
 *
 * Positioning is breakpoint-aware and handled here rather than by the caller:
 * it sits in the gutter to the right of its parent on desktop (pointing at the
 * next column), and below it on mobile where the columns stack. The single
 * right-pointing SVG is rotated 90deg on mobile instead of maintaining two
 * separate arrow drawings.
 *
 * The parent must be positioned (`relative`).
 */
export function ScribbleArrow() {
  return (
    <span
      {...{ [SCRIBBLE_ARROW_ATTR]: "" }}
      aria-hidden="true"
      // On md+ the arrow sits inside the grid's 2rem gutter (-right-7 with a
      // 1.5rem width leaves ~4px clearance on each side, so it never touches
      // either column's text).
      className="pointer-events-none absolute left-1/2 -bottom-6 h-5 w-10 -translate-x-1/2 rotate-90 text-accent md:left-auto md:-right-7 md:bottom-auto md:top-2 md:w-6 md:translate-x-0 md:rotate-0"
    >
      <svg viewBox="0 0 40 24" fill="none" className="h-full w-full overflow-visible">
        {/* Shaft: deliberately not straight, so it reads as drawn by hand. */}
        <path
          d="M2 12 C 11 9, 21 15, 34 11.5"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeOpacity={0.7}
        />
        {/* Head: a single continuous stroke through the tip, not two ticks. */}
        <path
          d="M26 5 C 29.5 8, 32 10, 35.5 11.5 C 32 13.5, 29 16.5, 27 19"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeOpacity={0.7}
        />
      </svg>
    </span>
  );
}
