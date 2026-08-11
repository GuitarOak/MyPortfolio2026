import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { RevealGroup } from "./RevealGroup";
import { ScribbleCircle } from "./ScribbleCircle";
import { experience } from "@/content/experience";

// The core stack, circled by hand where it appears in the timeline. Kept here
// rather than as markup in content/experience.ts so the content layer stays
// plain strings (it's also consumed for SEO/metadata, which must not contain JSX).
const CIRCLED_PHRASE = "Next.js, React, TypeScript and Firebase";

function renderPoint(point: string) {
  if (!point.includes(CIRCLED_PHRASE)) return point;

  const [before, after] = point.split(CIRCLED_PHRASE);
  return (
    <>
      {before}
      {/* nowrap disabled: the phrase is too long to hold one line on mobile. */}
      <ScribbleCircle nowrap={false}>{CIRCLED_PHRASE}</ScribbleCircle>
      {after}
    </>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <Container>
        <SectionHeading number="04" title="Experience" />
        <RevealGroup as="ol" className="space-y-10" stagger={0.15}>
          {experience.map((entry) => (
            <li key={`${entry.company}-${entry.role}`} className="grid gap-4 md:grid-cols-[1fr_2fr]">
              <div>
                <p className="font-semibold text-foreground">{entry.role}</p>
                <p className="text-sm text-muted">{entry.company}</p>
                <p className="mt-1 font-mono text-xs text-muted">{entry.dates}</p>
              </div>
              <ul className="space-y-1.5 text-sm text-foreground list-disc pl-4">
                {entry.points.map((point) => (
                  <li key={point}>{renderPoint(point)}</li>
                ))}
              </ul>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
