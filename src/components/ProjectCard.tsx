import type { Project } from "@/content/types";
import { StatusLabel } from "./StatusLabel";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="border border-border bg-surface p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
        <div className="flex flex-wrap justify-end gap-2">
          {project.statuses.map((status) => (
            <StatusLabel key={status} label={status} />
          ))}
        </div>
      </div>

      <h3 className="mt-6 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-3 text-base text-muted">{project.summary}</p>

      {/* Placeholder image slot: no real screenshots supplied yet. */}
      <div
        className="mt-6 flex aspect-video items-center justify-center border border-dashed border-border bg-background font-mono text-xs text-muted"
        aria-hidden
      >
        {project.screenshots && project.screenshots.length > 0 ? "Screenshot" : "Screenshot / diagram placeholder"}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wide text-muted">Problem</h4>
          <p className="mt-2 text-sm text-foreground">{project.problem}</p>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wide text-muted">My responsibility</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground list-disc pl-4">
            {project.responsibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {project.decisions.length > 0 && (
        <div className="mt-8">
          <h4 className="font-mono text-xs uppercase tracking-wide text-muted">Technical decisions</h4>
          <div className="mt-3 space-y-4">
            {project.decisions.map((decision) => (
              <div key={decision.decision} className="border-l-2 border-accent/50 pl-4">
                <p className="text-sm font-medium text-foreground">{decision.decision}</p>
                <p className="mt-1 text-sm text-muted">{decision.reason}</p>
                {decision.alternatives && decision.alternatives.length > 0 && (
                  <p className="mt-1 text-xs text-muted">
                    Alternatives considered: {decision.alternatives.join(", ")}
                  </p>
                )}
                {decision.tradeoffs && decision.tradeoffs.length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-xs text-muted">
                    {decision.tradeoffs.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border px-2.5 py-1 font-mono text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="font-mono text-xs uppercase tracking-wide text-muted">Result / business impact</h4>
        <ul className="mt-2 space-y-1.5 text-sm text-foreground list-disc pl-4">
          {project.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
