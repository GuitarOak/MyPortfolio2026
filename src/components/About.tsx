import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { RevealGroup } from "./RevealGroup";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeading number="05" title="About" />
        <RevealGroup className="space-y-5 text-base md:text-sm text-foreground" stagger={0.1}>
          <p>
            My background is in SEO, digital growth and client-facing work. Over time, I increasingly moved
            toward the technical problems behind the results — building internal tools, improving web
            platforms, connecting systems and translating operational needs into software.
          </p>
          <p>
            That combination has shaped how I work today: I care about the code, but also about the system
            around it, the people using it and the business problem it is supposed to solve.
          </p>
          <p>
            Alongside that, I studied New Media Design (Informatics) at Jönköping University from 2021 to
            2024, after Software Development and Mobile Platforms at the same university from 2019 to 2021 —
            which is where the technical and design sides of how I work today first came together.
          </p>
          <p className="text-muted">Outside of work: guitar, and generally building things I find useful.</p>
        </RevealGroup>
      </Container>
    </section>
  );
}
