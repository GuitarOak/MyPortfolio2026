import { Container } from "./Container";
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
        {/* Heading + grid are both inside ProcessSteps so they pin together. */}
        <ProcessSteps steps={steps} />
      </Container>
    </section>
  );
}
