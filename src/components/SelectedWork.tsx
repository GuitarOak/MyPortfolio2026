import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section id="work" className="border-b border-border py-20 md:py-28">
      <Container>
        <SectionHeading
          number="01"
          title="Selected Work"
          description="Four projects, strongest first. Each one explains the problem, my responsibility, the technical decisions made, and the trade-offs behind them."
        />
        <div className="space-y-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
