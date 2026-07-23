import Link from "next/link";
import type { Project } from "@/content/types";
import { StatusLabel } from "./StatusLabel";

// A project only gets a dedicated case-study page once it has real content.
// Right now that's just the Internal Metrics Platform.
const CASE_STUDY_SLUGS = new Set(["internal-metrics-platform"]);

export function ProjectCard({ project }: { project: Project }) {
  const hasCaseStudy = CASE_STUDY_SLUGS.has(project.slug);

  return (
    <article className="border border-border bg-surface p-6 md:p-8">
      <div className="flex flex-wrap justify-end gap-2">
        {project.statuses.map((status) => (
          <StatusLabel key={status} label={status} />
        ))}
      </div>

      <h3 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-3 text-base text-muted">{project.summary}</p>

      {/* Placeholder image slot: no real screenshots supplied yet. */}
      <div
        className="mt-6 flex aspect-video items-center justify-center border border-dashed border-border bg-background font-pencil text-base text-muted"
        aria-hidden
      >
        {project.screenshots && project.screenshots.length > 0 ? "Screenshot" : "(screenshot / diagram goes here)"}
      </div>

      <div className="mt-8">
        <h4 className="font-mono text-xs uppercase tracking-wide text-muted">Problem</h4>
        <p className="mt-2 text-sm text-foreground">{project.problem}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border px-2.5 py-1 font-mono text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {hasCaseStudy && (
        <Link
          href={`/work/${project.slug}`}
          className="mt-8 inline-flex items-center gap-1.5 font-pencil text-lg text-accent underline-scribble"
        >
          Read more →
        </Link>
      )}
    </article>
  );
}
