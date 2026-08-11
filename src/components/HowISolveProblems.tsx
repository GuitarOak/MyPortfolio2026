import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { ProcessSteps } from "./ProcessSteps";

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
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading number="02" title="How I Solve Problems" />
        {/* Markup and animation live in ProcessSteps: the columns and the
            arrows between them are one sequenced timeline, so they can't be
            split across separate components. */}
        <ProcessSteps steps={steps} />
      </Container>
    </section>
  );
}
