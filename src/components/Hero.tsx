"use client";

import { Container } from "./Container";
import { site } from "@/content/site";
import { useWriteInReveal, writeInDuration } from "@/hooks/useWriteInReveal";
import { ScribbleUnderline } from "./ScribbleUnderline";

// Force the title onto exactly two lines ("Developer with a" / "systems
// perspective") instead of relying on responsive wrapping, without
// duplicating the copy from site.title in two places.
const TITLE_HIGHLIGHT = "systems perspective";

// Derived from the write-in timing rather than hard-coded, so the underline
// still lands right as the heading finishes even if the title copy changes.
const UNDERLINE_DELAY = writeInDuration(site.title.length);

export function Hero() {
  const [titleLead] = site.title.split(TITLE_HIGHLIGHT);
  // "load" (not "scroll") since the Hero is visible immediately on page
  // load — there's nothing to scroll into view.
  const { headingRef, bodyRef } = useWriteInReveal<HTMLHeadingElement, HTMLDivElement>({
    trigger: "load",
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden"
    >
      <Container className="py-12 md:py-16">
        <h1
          ref={headingRef}
          className="mt-4 max-w-4xl py-1 text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.2] tracking-tight text-foreground"
        >
          {titleLead.trim() + " "}
          {/* Held back until the write-in finishes, so the pen reads as one
              gesture: write the words, then underline the key phrase. */}
          <span className="relative inline-block">
            {TITLE_HIGHLIGHT}
            <ScribbleUnderline drawn delay={UNDERLINE_DELAY} className="text-accent" />
          </span>
        </h1>

        <div ref={bodyRef}>
          <p className="mt-5 max-w-xl font-handwritten text-lg md:text-xl text-muted">
            {site.supportingText}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              View selected work
            </a>
            <a
              href={site.contact.cvHref}
              download
              className="inline-flex items-center rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Download CV
            </a>
          </div>

          <p className="mt-10 font-mono text-xs md:text-sm text-muted">
            {site.techRow.join(" · ")}
          </p>
        </div>
      </Container>
    </section>
  );
}
