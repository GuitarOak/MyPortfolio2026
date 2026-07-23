import { Container } from "./Container";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border bg-grid-lines">
      <Container className="py-24 md:py-36">
        <p className="font-mono text-sm tracking-widest text-accent uppercase">Emil Karlsson</p>
        <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
          {site.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg md:text-xl text-muted">{site.supportingText}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            View selected work
          </a>
          <a
            href={site.contact.cvHref}
            download
            className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            Download CV
          </a>
        </div>

        <p className="mt-12 font-mono text-xs md:text-sm text-muted">
          {site.techRow.join(" · ")}
        </p>
      </Container>
    </section>
  );
}
