"use client";

import Image from "next/image";
import { Container } from "./Container";
import { site } from "@/content/site";
import { useWriteInReveal, writeInDuration } from "@/hooks/useWriteInReveal";
import { ScribbleCircle } from "./ScribbleCircle";

// The phrase circled by hand in the headline, pulled out of site.title rather
// than duplicated, so the copy stays defined in one place.
const TITLE_HIGHLIGHT = "User-Centric";

// Derived from the write-in timing rather than hard-coded, so the circle still
// lands right as the heading finishes even if the title copy changes.
const CIRCLE_DELAY = writeInDuration(site.title.length);

export function Hero() {
  // The circled phrase leads the headline here, so we render what follows it.
  const titleTail = site.title.split(TITLE_HIGHLIGHT)[1] ?? "";
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
        {/* Text and portrait sit side by side from lg up; the portrait drops
            below the copy on smaller screens rather than shrinking further. */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <h1
              ref={headingRef}
              className="mt-4 py-1 text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.2] tracking-tight text-foreground"
            >
              {/* Held back until the write-in finishes, so the pen reads as one
                  gesture: write the words, then circle the key one. */}
              <ScribbleCircle delay={CIRCLE_DELAY}>{TITLE_HIGHLIGHT}</ScribbleCircle>
              {" " + titleTail.trim()}
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
          </div>

          {/* Sits on the page like a photo dropped on a desk: slight rotation,
              a white paper margin and a soft lift shadow. The washi-tape strip
              and drop-in animation arrive with TapedImage in step 5 of the
              animation plan — this is the static groundwork for it. */}
          <div className="justify-self-center lg:justify-self-end">
            <div className="rotate-2 rounded-sm bg-surface p-3 pb-10 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.35)]">
              <Image
                src="/emil.png"
                alt={`${site.name}, ${site.title}`}
                width={640}
                height={960}
                // Above the fold and a likely LCP element, so it must not be lazy.
                priority
                sizes="(min-width: 1024px) 320px, 240px"
                className="h-auto w-[240px] rounded-sm object-cover lg:w-[320px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
