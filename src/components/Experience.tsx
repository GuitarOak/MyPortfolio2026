import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <Container>
        <SectionHeading number="04" title="Experience" />
        <ol className="space-y-10">
          {experience.map((entry) => (
            <li key={`${entry.company}-${entry.role}`} className="grid gap-4 md:grid-cols-[1fr_2fr]">
              <div>
                <p className="font-semibold text-foreground">{entry.role}</p>
                <p className="text-sm text-muted">{entry.company}</p>
                <p className="mt-1 font-mono text-xs text-muted">{entry.dates}</p>
              </div>
              <ul className="space-y-1.5 text-sm text-foreground list-disc pl-4">
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
