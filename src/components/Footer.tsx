import { Container } from "./Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="ink-rule-top relative py-8">
      <Container className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs text-muted">Built with Next.js, React, TypeScript, Tailwind CSS</p>
      </Container>
    </footer>
  );
}
