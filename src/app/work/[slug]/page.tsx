import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { StatusLabel } from "@/components/StatusLabel";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

// Only projects with real, confirmed content get a case-study page. Adding a
// slug here without real content would violate project.md's "never invent"
// constraint, so this stays a deliberate allowlist rather than "all projects".
const CASE_STUDY_SLUGS = ["internal-metrics-platform"];

// Architecture diagram + reflection, taken directly from project.md's
// Architecture Case Study example. Specific to the Internal Metrics Platform,
// so it only renders on that project's case-study page.
const diagramSteps = [
  "React frontend",
  "Express API layer",
  "External APIs",
  "Firebase Authentication",
  "Firestore database",
];

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

function getProject(slug: string) {
  if (!CASE_STUDY_SLUGS.includes(slug)) return undefined;
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${site.name}`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <Container className="max-w-4xl">
            <Link href="/#work" className="font-pencil text-lg text-muted hover:text-accent">
              ← Back to selected work
            </Link>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.statuses.map((status) => (
                <StatusLabel key={status} label={status} />
              ))}
            </div>

            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>

            <div
              className="mt-10 flex aspect-video items-center justify-center border border-dashed border-border bg-surface font-pencil text-lg text-muted"
              aria-hidden
            >
              {project.screenshots && project.screenshots.length > 0
                ? "Screenshot"
                : "(screenshot / diagram goes here)"}
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container className="max-w-4xl space-y-14">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">Problem</h2>
              <p className="mt-3 text-base md:text-lg text-foreground">{project.problem}</p>
            </div>

            {project.stakeholders && project.stakeholders.length > 0 && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                  Users / stakeholders
                </h2>
                <ul className="mt-3 space-y-1.5 text-base text-foreground list-disc pl-5">
                  {project.stakeholders.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                My responsibility
              </h2>
              <ul className="mt-3 space-y-1.5 text-base text-foreground list-disc pl-5">
                {project.responsibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {project.slug === "internal-metrics-platform" && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-wide text-muted">Architecture</h2>
                <div
                  className="mt-4 flex flex-col items-stretch gap-2 border border-border bg-surface p-6"
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
                <blockquote className="mt-6 border-l-2 border-accent pl-6 text-base text-muted italic">
                  &ldquo;Firebase allowed rapid development, authentication and flexible data storage.
                  However, the nested document structure made some bulk operations and reporting more
                  complicated. At greater scale, I would evaluate a relational model or a dedicated search
                  and reporting layer.&rdquo;
                </blockquote>
              </div>
            )}

            {project.decisions.length > 0 && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                  Technical decisions
                </h2>
                <div className="mt-4 space-y-6">
                  {project.decisions.map((decision) => (
                    <div key={decision.decision} className="border-l-2 border-accent/50 pl-5">
                      <p className="text-base font-medium text-foreground">{decision.decision}</p>
                      <p className="mt-1.5 text-sm text-muted">{decision.reason}</p>
                      {decision.alternatives && decision.alternatives.length > 0 && (
                        <p className="mt-1.5 text-sm text-muted">
                          Alternatives considered: {decision.alternatives.join(", ")}
                        </p>
                      )}
                      {decision.tradeoffs && decision.tradeoffs.length > 0 && (
                        <ul className="mt-1.5 list-disc pl-5 text-sm text-muted">
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

            <div>
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">Technologies</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.tradeoffs && project.tradeoffs.length > 0 && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-wide text-muted">Trade-offs</h2>
                <ul className="mt-3 space-y-1.5 text-base text-foreground list-disc pl-5">
                  {project.tradeoffs.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
                Result / business impact
              </h2>
              <ul className="mt-3 space-y-1.5 text-base text-foreground list-disc pl-5">
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
