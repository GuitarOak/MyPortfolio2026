# GSAP Animation Plan — "Handwritten / Pinned-to-Paper" Direction

Status: **Planning — nothing implemented yet.** This supersedes the phase order
discussed earlier in favor of the merged plan in [Implementation Order](#implementation-order-final)
below.

Goal: use motion to reinforce the site's existing hand-drawn / graph-paper
aesthetic (Rock Salt headings, Caveat accents, scribble underlines/circles,
grid-paper background) rather than generic fade-ins. Two directions were
requested directly by the user:

1. Headings animate as if being **handwritten**, then body copy follows once
   the heading finishes.
2. Images look **physically pinned/clipped to the page**, like a photo
   tacked to a corkboard or paper.

Plus additional ideas below to reinforce the same concept.

---

## 1. Heading "handwriting" reveal

**What it looks like:** heading characters appear left-to-right in a quick
cascade, each starting from a slightly rotated/offset "unwritten" state and
settling into place — reads as handwriting motion without needing actual
stroke-path animation (which isn't feasible for a variable web font).

**How:** `SplitText` (free plugin, part of the GSAP 3.13+ free release) splits
the heading into `chars`. Each char starts at:
```
opacity: 0, y: 6-10px (random small per-char), rotate: -6deg to 6deg (random per-char, seeded not Math.random() at render to avoid SSR/hydration mismatches)
```
then animates to `opacity:1, y:0, rotate:0` with a fast stagger
(~0.02–0.04s/char, `duration: 0.35-0.5`, `ease: "power2.out"`). Fast enough
across a whole heading (~0.6–1s total) that it reads as "being written,"
not a slow typewriter.

- Applies to `SectionHeading` (all section `h2`s) and the `Hero` `h1`.
- The inline section-number prefix (`03`) should finish its own tiny reveal
  fractionally before the title starts, since visually it reads as "the
  number, then the words" — small `position` offset in the timeline.
- **Reduced motion:** skip straight to the final state (`gsap.set` instead of
  animating) via `gsap.matchMedia()`.

## 2. Body text follows heading

Once the heading's char-reveal timeline completes (or slightly overlaps its
tail, e.g. starts at `-0.15s` from the end for snappier pacing), the section's
body copy (description paragraph, list items, cards) fades/slides up
(`opacity:0→1, y:12→0`, `duration:0.5`, small stagger if multiple
paragraphs/list items).

- This should be a **single reusable timeline pattern**, not bespoke per
  section — one hook/component wraps "heading writes in → then body reveals,"
  reused by every section instead of copy-pasted GSAP code.
- Combine with entry via `ScrollTrigger` (`start: "top 80%"`, `once: true`) so
  it fires once per section as the user scrolls to it, not just on page load.

## 3. Images pinned/clipped to the page

**What it looks like:** each screenshot/diagram sits slightly rotated (like a
photo dropped onto a desk), with a small decorative pin or binder-clip
graphic overlapping its top edge, and a soft drop shadow to suggest it's
sitting above the paper rather than flat inside a bordered box.

**How:**
- New reusable `PinnedImage` (or `PinnedFrame`, since it can wrap either an
  `<Image>` or a placeholder/diagram block) component:
  - Fixed (not random-per-render) small rotation per instance, passed as a
    prop or derived from a stable seed (e.g. hash of the image src) — avoids
    hydration mismatches from `Math.random()` running differently on server
    vs. client.
  - Decorative pin/clip rendered as an inline SVG (hand-drawn style, matching
    the existing scribble-underline aesthetic) absolutely positioned over the
    top edge/corner.
  - `box-shadow` for subtle lift instead of the current flat `border`.
- Animation: on scroll into view, the image "drops" in from slightly above
  with a small rotation settle and a quick scale bounce (`ease:
  "back.out(1.4)"`), as if just being pinned up. The pin/clip can pop in
  fractionally after the image lands, like it's fastening it down.
- Applies to: `ProjectCard`'s screenshot slot, the case-study page's
  screenshot slot, and potentially the architecture-diagram block (see below).

---

## Additional ideas to reinforce the concept

Listed roughly in order of impact vs. effort. Marked where something
conflicts with an existing `project.md` constraint.

- **Scribbles draw themselves in** *(already agreed in the original GSAP
  scope)* — the underline-scribble and scribble-circle SVGs animate their
  `stroke-dashoffset` from full to 0 on scroll-into-view, like they're being
  drawn with a pen. This pairs naturally with the heading-writing effect: the
  scribble draws in right after the heading finishes.
- **Architecture diagram animates sequentially** *(already agreed)* — each
  box + arrow on the case-study page appears in order. Fits the "pinned to
  paper" idea well if each diagram step is treated like a pinned note.
- **Sticky-note style blockquote** — the architecture "reflection" quote
  could be styled like a torn sticky note (slight rotation, small shadow,
  maybe a tiny tape strip) instead of a plain left-border blockquote,
  reinforcing the paper/desk metaphor in a spot that already exists.
- **Nav active-link underline as a scribble** *(refines the earlier-agreed
  "nav active-link underline")* — instead of a plain sliding bar, use a small
  scribble-underline SVG that draws itself under the active nav item.
- **Margin-note style annotations** — small Caveat-font asides near a few key
  moments (e.g. next to the architecture reflection, or a callout on the
  Capabilities section) that animate in with a quick handwritten flourish,
  like a note scribbled in a margin. Keep to 1–2 spots, not sprinkled
  everywhere, to avoid overdoing it.
- **NOT recommended: custom pencil cursor.** `project.md` explicitly lists
  "custom cursors that reduce usability" as something to avoid. Skipping
  this even though it would reinforce the theme.
- **Optional/stretch: subtle paper-grain texture** on the background instead
  of (or blended with) the flat grid, to make the "paper" feel more literal.
  Risk: could clash with the crisp technical/blueprint grid look that's
  already working well — worth a visual check before committing, not a
  given.

---

## Implementation order (final)

This merges the previously-agreed GSAP phases with the handwritten/pinned
direction above. Foundation (GSAP install + config) is already done.

1. **Heading write-in + body-follows pattern** (new, this session's ask) —
   the single most reused piece of motion on the site; build it once as a
   shared hook/component, apply to `SectionHeading` first, then `Hero`'s `h1`.
2. **Nav active-link scribble-underline** — small, self-contained, good
   second step while the heading pattern is still fresh.
3. **Section scroll-entrances** for content that isn't headings/body text
   already covered by step 1 (e.g. `ProjectCard`s, capability groups,
   experience timeline items) — reuses the same ScrollTrigger conventions.
4. **Scribble draw-in** for `underline-scribble` / `scribble-circle` SVGs
   (stroke-dashoffset reveal).
5. **`TapedImage` component** (washi-tape strip decoration) + apply to
   `ProjectCard` and case-study screenshot slots.
6. **Architecture diagram sequential animation** on the case-study page —
   natural pairing with `TapedImage` if the diagram steps get the same
   taped-note treatment.
7. **Sticky-note blockquote styling** for the architecture reflection quote.
8. **Margin-note annotations** — 1–2 well-chosen spots only (e.g. next to
   the architecture reflection and/or a Capabilities callout).
9. **Scroll-pinned Hero section** (previously agreed as the riskiest/last
   item — unchanged position).
10. *Optional, revisit later:* paper-grain texture — only after the above
    feels good and isn't visually overloaded.

Every step must be checked against `prefers-reduced-motion` via
`gsap.matchMedia()` (skip straight to end-state, no animation) before being
considered done.

## Decisions (resolved)

- **Decorative style:** a single consistent style everywhere — **washi-tape
  strip** (a short rotated semi-transparent rectangle across a top corner).
  Chosen over a pin/thumbtack or paperclip because it's the simplest to
  build (a styled `div`, no illustrated SVG artwork needed) and the easiest
  to maintain/restyle later. "`PinnedImage`" in the plan above is renamed to
  **`TapedImage`** to match.
- **Reveal frequency:** heading write-in (and all scroll-triggered reveals)
  play **once per page load** (`ScrollTrigger` `once: true`), not every time
  a section re-enters the viewport.
- **Sticky-note blockquote and margin-note annotations are in scope** —
  folded into the main implementation order below, no longer optional/stretch.
