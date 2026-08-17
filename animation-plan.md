# GSAP Animation Plan — "Handwritten / Pinned-to-Paper" Direction

Status: **In progress — steps 1–3 done.** This supersedes the phase order
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

1. ~~**Heading write-in + body-follows pattern**~~ — **DONE.** Built as the
   shared `useWriteInReveal` hook (`src/hooks/useWriteInReveal.ts`), applied to
   `SectionHeading` (scroll-triggered) and `Hero`'s `h1` (on load).
2. ~~**Nav active-link scribble-underline**~~ — **DONE.** `ScribbleUnderline`
   component (`src/components/ScribbleUnderline.tsx`) animates
   `stroke-dashoffset` directly instead of using `DrawSVGPlugin`. Draws for the
   active link and faintly on hover/focus. Same step also switched the wordmark
   to Rock Salt and replaced the header/footer straight borders with the
   hand-drawn `.ink-rule-bottom` / `.ink-rule-top` utilities.
3. ~~**Section scroll-entrances**~~ — **DONE** via the `RevealGroup` component
   (`src/components/RevealGroup.tsx`), which staggers its direct children.
   Applied to Experience, About and Contact. **How I Solve Problems and
   Capabilities now use pinned scrubbed timelines instead** (see below).
   **`ProjectCard`s deliberately excluded** — deferred to step 5 so each card
   animates together with its taped screenshot as one motion.
4. ~~**Scribble draw-in**~~ — **DONE**, but not as originally written. The
   `.underline-scribble` / `.scribble-circle` CSS utilities turned out to be
   (a) a `background-image` and a `border-radius` oval, neither of which can be
   stroke-animated, and (b) **unused anywhere in the codebase**. So this became
   a placement decision as much as an animation one. Implemented as real inline
   SVGs. The **underline idea was scrapped** after review — only the circle
   survived, now used in three places:
   - `ScribbleCircle` around "User-Centric" in the Hero `h1`, delayed by
     `writeInDuration()` so it lands as the heading finishes writing.
   - Around "technical ownership" in Contact.
   - Around "Next.js, React, TypeScript and Firebase" in Experience (with
     `nowrap={false}`, since that phrase must be able to wrap on mobile).

   Circle insets are in `em`, not `rem`, so the loop keeps identical visual
   breathing room around a 72px headline and 14px body copy.

   `ScribbleUnderline` still exists and is used by the nav active-link
   underline (step 2); its `delay` prop is now unused. The two original CSS
   utilities are superseded and unused; safe to delete whenever.

   **Pinned scrubbed timelines added to How I Solve Problems and
   Capabilities:** both sections now pin the page and map scroll input onto
   their reveal timelines, so scrolling drives the animation and reversing
   un-draws it. Implemented in `ProcessSteps.tsx` (4 columns + arrows) and
   `CapabilityColumns.tsx` (3 columns). This is the one intentional departure
   from the "play once per page load" decision — scrubbed timelines are
   inherently reversible, which is the point of the effect.
5. ~~**`TapedImage` component**~~ — **DONE.** Wraps images (or any content) with
   a white paper margin (Polaroid-ish bottom edge), slight rotation, lift shadow,
   and a washi-tape strip across the top-left corner. The content drops and
   settles into place (overshoots slightly, then bounces back) on first view.
   Applied to:
   - Hero portrait (`trigger="load"` since it's above the fold)
   - Architecture diagram steps (scroll-triggered, see step 6)
   
   **Project screenshots removed** per user request — `ProjectCard` and
   case-study page no longer show images. `ProjectCard`s are wrapped in
   `RevealGroup` so each card reveals as one motion.
   
   The container reserves its final size from first paint and only animates
   `transform`, so there's no layout shift — safe to use above the fold.
6. ~~**Architecture diagram sequential animation**~~ — **DONE.** Implemented in
   `ArchitectureDiagram.tsx` on the Internal Metrics Platform case-study page.
   Each step appears one by one as you scroll (scrubbed timeline, starts at
   `top 85%`). Steps and arrows stagger in sequence, controlled by scroll
   position. The reflection quote appears after all steps are visible.
7. ~~**Sticky-note blockquote styling**~~ — **DONE.** Implemented in
   `StickyNote.tsx` and applied to the architecture reflection quote. Yellow
   paper appearance (`#fef3c7` background), slight rotation (`-1deg`), subtle
   drop shadow, and a paper texture via CSS grid pattern. Animates in with a
   drop-and-settle motion (`back.out` easing) on scroll. Triggers at `top 95%`
   and plays once.
8. ~~**Margin-note annotations**~~ — **DONE.** Implemented in `MarginNote.tsx`
   and applied to two sections on the homepage:
   - **How I Solve Problems** (left margin): "Not just code — understanding the
     whole system" — emphasizes the systems thinking approach
   - **Capabilities** (right margin): "Frontend to architecture to deployment" —
     highlights the full-stack nature
   
   Styled with the pencil font, slight rotation (±2deg), and a simple arrow
   pointing to the content. Fades in at `top 85%`. Hidden on mobile/tablet
   (only visible on `lg` breakpoint and above).
9. **Scroll-pinned Hero section** (previously agreed as the riskiest/last
   item — unchanged position).
10. *Optional, revisit later:* paper-grain texture — only after the above
    feels good and isn't visually overloaded.
11. **Review all copy and SEO** to align with positioning ("User-Centric
    Developer" vs "Developer with a Systems Perspective").

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
  - **Exception:** the How I Solve Problems sequence is **scrubbed to scroll
    position** (`scrub: 0.5`), so scrolling drives the drawing and reversing
    un-draws it. A scrubbed timeline is inherently reversible; that reversal
    is the point of the effect there, so `once` does not apply.
- **Sticky-note blockquote and margin-note annotations are in scope** —
  folded into the main implementation order below, no longer optional/stretch.
