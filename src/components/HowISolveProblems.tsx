import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    title: "Understand",
    points: ["The business problem", "The users", "Existing systems", "Constraints", "Success criteria"],
  },
  {
    title: "Design",
    points: ["Requirements", "Responsibilities", "Data flows", "Integrations", "Technical choices", "Trade-offs"],
  },
  {
    title: "Build",
    points: ["Maintainable components", "Clear interfaces", "Appropriate architecture", "Responsive and accessible functionality"],
  },
  {
    title: "Operate",
    points: ["Testing", "Deployment", "Monitoring", "Maintenance", "Iterative improvements"],
  },
];

export function HowISolveProblems() {
  return (
    <section className="border-b border-border bg-grid-lines py-20 md:py-28">
      <Container>
        <SectionHeading number="02" title="How I Solve Problems" />
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="">
              <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
