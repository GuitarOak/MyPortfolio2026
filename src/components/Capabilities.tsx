import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { capabilities } from "@/content/experience";

export function Capabilities() {
  return (
    <section id="capabilities" className="py-20 md:py-28">
      <Container>
        <SectionHeading number="03" title="Capabilities" />
        <div className="grid gap-10 md:grid-cols-3">
          {capabilities.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
