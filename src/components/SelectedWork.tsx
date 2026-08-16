import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { RevealGroup } from "./RevealGroup";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section id="work" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          number="01"
          title="Selected Work"
          description="More case studies coming soon. Each one explains the problem, my responsibility, the technical decisions made, and the trade-offs behind them."
        />
        {/* Each card reveals with its taped screenshot as one motion. */}
        <RevealGroup className="space-y-10" stagger={0.2}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
