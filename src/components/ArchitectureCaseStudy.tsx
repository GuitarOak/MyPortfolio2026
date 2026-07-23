import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

// Diagram and reflection copy for the internal metrics platform, taken
// directly from project.md's Architecture Case Study example.
const diagramSteps = [
  "React frontend",
  "Express API layer",
  "External APIs",
  "Firebase Authentication",
  "Firestore database",
];

export function ArchitectureCaseStudy() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container>
        <SectionHeading
          number="03"
          title="Architecture Case Study"
          description="Internal Website & Metrics Management Platform — the reasoning behind the stack, and where it would need to change."
        />

        <div
          className="flex flex-col items-stretch gap-2 border border-border bg-surface p-6 md:p-8"
          role="img"
          aria-label={`Architecture flow: ${diagramSteps.join(" to ")}`}
        >
          {diagramSteps.map((step, index) => (
            <div key={step}>
              <div className="border border-border bg-background px-4 py-3 font-mono text-sm text-foreground">
                {step}
              </div>
              {index < diagramSteps.length - 1 && (
                <div className="flex justify-center py-1 text-muted" aria-hidden>
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wide text-muted">Why each technology was chosen</h3>
            <p className="mt-2 text-sm text-foreground">
              Firebase Authentication and Firestore enabled rapid development, built-in authentication and
              flexible, schema-less data storage without standing up a full custom backend.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wide text-muted">Limitations and what would change at scale</h3>
            <p className="mt-2 text-sm text-foreground">
              The nested document structure made some bulk operations and reporting more complicated. At
              greater scale, I would evaluate a relational model or a dedicated search and reporting layer.
            </p>
          </div>
        </div>

        <blockquote className="mt-10 border-l-2 border-accent pl-6 text-base md:text-lg text-muted italic">
          &ldquo;Firebase allowed rapid development, authentication and flexible data storage. However, the
          nested document structure made some bulk operations and reporting more complicated. At greater
          scale, I would evaluate a relational model or a dedicated search and reporting layer.&rdquo;
        </blockquote>
      </Container>
    </section>
  );
}
