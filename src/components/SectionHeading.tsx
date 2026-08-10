"use client";

import { useWriteInReveal } from "@/hooks/useWriteInReveal";

type SectionHeadingProps = {
  number: string;
  title: string;
  description?: string;
};

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  const { headingRef, bodyRef } = useWriteInReveal<HTMLHeadingElement, HTMLDivElement>({
    trigger: "scroll",
  });

  return (
    <div className="mb-14 md:mb-20">
      <h2
        ref={headingRef}
        className="py-1 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.3] tracking-tight text-foreground"
      >
        <span className="mr-5 md:mr-7 text-2xl md:text-3xl text-accent align-middle">{number}</span>
        {title}
      </h2>
      {description ? (
        <div ref={bodyRef}>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-muted">{description}</p>
        </div>
      ) : null}
    </div>
  );
}
