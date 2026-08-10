import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { RevealGroup } from "./RevealGroup";
import { ScribbleCircle } from "./ScribbleCircle";
import { site } from "@/content/site";

export function Contact() {
  const { contact } = site;
  return (
    <section id="contact" className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeading number="06" title="Contact" />
        <RevealGroup>
          <p className="max-w-xl text-base md:text-lg text-foreground">
            I am looking for developer, application specialist and junior solution-architecture roles where I
            can combine hands-on implementation with systems thinking and{" "}
            {/* Circled by hand at the point where the page asks for a decision. */}
            <ScribbleCircle delay={0.35}>technical ownership</ScribbleCircle>.
          </p>
        </RevealGroup>

        <RevealGroup as="dl" className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${contact.email}`} className="text-foreground underline hover:text-accent">
                {contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">LinkedIn</dt>
            <dd className="mt-1">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:text-accent"
              >
                linkedin.com/in/emil-karlsson-web
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">GitHub</dt>
            <dd className="mt-1">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:text-accent"
              >
                github.com/GuitarOak
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">Location</dt>
            <dd className="mt-1 text-foreground">{contact.location} &middot; {contact.preference}</dd>
          </div>
        </RevealGroup>

        {/* Wrapper carries the top margin so the anchor keeps inline-flex sizing. */}
        <RevealGroup className="mt-10">
          <a
            href={contact.cvHref}
            download
            className="inline-flex items-center rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            Download CV
          </a>
        </RevealGroup>
      </Container>
    </section>
  );
}
